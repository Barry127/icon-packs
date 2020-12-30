import xmldom from 'xmldom';
import camelCase from 'camelcase';

import { Icon } from '../types';
import { CSSProperties } from 'react';

const { DOMParser } = xmldom;

export const parseXml = (xml: string, wrapInDiv = true): Icon | string => {
  xml = xml.replace(/aria\-hidden/g, '');
  const doc = new DOMParser().parseFromString(xml);
  if (doc.childNodes.length === 0) {
    return xml;
  }

  const nodes = parseNodes(doc.childNodes);

  if (nodes.length === 1) {
    return nodes[0];
  } else {
    //@ts-ignore
    return wrapInDiv
      ? {
          tag: 'div',
          attrs: {},
          children: nodes
        }
      : nodes;
  }
};

const parseNodes = (nodes: NodeListOf<any>): Icon[] | string => {
  const parsedNodes = Object.entries(nodes)
    .filter(([key]) => !filters.includes(key))
    .map(([key, value]) => parseNode(value));

  if (parsedNodes.length === 1 && typeof parsedNodes[0] === 'string') {
    return parsedNodes[0];
  }

  return parsedNodes
    .filter((node) => node !== null && !(typeof node === 'string'))
    .map((n) => {
      const node = n as Icon;
      if (node.children && node.children!.length === 0) {
        delete node.children;
      }
      //@ts-ignore
      if (node.attrs.class) {
        //@ts-ignore
        node.attrs.className = node.attrs.class;
        //@ts-ignore
        delete node.attrs.class;
      }
      return node as Icon;
    });
};

function parseNode(node: Element): Icon | string | null {
  if (node.nodeName.toLocaleLowerCase().includes('metadata')) return null;
  if (node.nodeName.toLocaleLowerCase().includes('sodipodi')) return null;

  if (node.nodeValue) {
    return node.nodeValue;
  }

  const attrs = parseAttrs(node);
  if (attrs.fill === 'none' && node.nodeName !== 'svg') {
    return null;
  }
  if (attrs.fill !== 'currentColor') delete attrs.fill;

  return {
    tag: node.nodeName as Icon['tag'],
    attrs,
    children: parseNodes(node.childNodes)
  };
}

const filters = ['length'];
const attrFilters = [
  'xmlns:cc',
  'xmlns:dc',
  'xmlns:inkscape',
  'xmlns:rdf',
  'xmlns:sodipodi',
  'xmlns:svg'
];

function parseAttrs(node: Element): Icon['attrs'] {
  return Object.entries(node.attributes)
    .filter(
      ([key, value]) =>
        !(
          key.startsWith('_') ||
          (value.name && value.name.startsWith('inkscape')) ||
          (value.name && value.name.startsWith('sodipodi')) ||
          key.startsWith('inkscape') ||
          filters.includes(key) ||
          attrFilters.includes(value.name)
        )
    )
    .reduce((attrs: Icon['attrs'], [key, value]) => {
      let name = value.name;
      if (name.includes(':')) {
        name = name
          .split(':')
          .map((part, index) => {
            if (index === 0) return part;
            return `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`;
          })
          .join('');
      }

      if (name.startsWith('data')) {
        return attrs;
      }

      //@ts-ignore
      attrs[camelCase(name)] = value.value;
      if (name === 'style') {
        attrs.style = parseStyle(value.value);
      }

      return attrs;
    }, {});
}

const styleFilters = [
  'blockProgression',
  'enableBackground',
  'solidColor',
  'textDecorationColor'
];
const numericKeys = ['fillOpacity', 'strokeMiterlimit', 'strokeOpacity'];

function parseStyle(style: string): CSSProperties {
  const styles = {} as CSSProperties;

  style.split(';').forEach((rule) => {
    if ((rule.match(/\:/g) || []).length === 1) {
      const [key, value] = rule.split(':');
      const camelKey = camelCase(key);

      if (styleFilters.includes(camelKey)) return;

      //@ts-ignore
      styles[camelKey] = value.trim();

      if (numericKeys.includes(camelKey) && !isNaN(Number(value))) {
        //@ts-ignore
        styles[camelKey] = Number(value);
      }
    }
  });

  return styles;
}
