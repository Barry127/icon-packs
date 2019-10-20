import xmldom from 'xmldom';
import camelCase from 'camelcase';

import { Icon } from '../types';
import { CSSProperties } from 'react';

const { DOMParser } = xmldom;

const filters = ['length'];

export const parseXml = (xml: string): Icon | string => {
  const doc = new DOMParser().parseFromString(xml);
  if (doc.childNodes.length === 0) {
    return xml;
  }

  const nodes = parseNodes(doc.childNodes);

  if (nodes.length === 1) {
    return nodes[0];
  } else {
    return {
      tag: 'div',
      attrs: {},
      children: nodes
    };
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
    .filter(node => !(typeof node === 'string'))
    .map(n => {
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

function parseNode(node: Element): Icon | string {
  if (node.nodeValue) {
    return node.nodeValue;
  }

  return {
    tag: node.nodeName as Icon['tag'],
    attrs: parseAttrs(node),
    children: parseNodes(node.childNodes)
  };
}

function parseAttrs(node: Element): Icon['attrs'] {
  return Object.entries(node.attributes)
    .filter(([key]) => !(key.startsWith('_') || filters.includes(key)))
    .reduce((attrs: Icon['attrs'], [key, value]) => {
      let name = value.name;
      if (name === 'xmlns:xlink') {
        name = 'xmlnsXlink';
      }
      if (name === 'xml:space') {
        name = 'xmlSpace';
      }
      //@ts-ignore
      attrs[camelCase(name)] = value.value;
      if (name === 'style') {
        attrs.style = parseStyle(value.value);
      }
      return attrs;
    }, {});
}

function parseStyle(style: string): CSSProperties {
  const styles = {} as CSSProperties;

  style.split(';').forEach(rule => {
    if ((rule.match(/\:/g) || []).length === 1) {
      const [key, value] = rule.split(':');
      //@ts-ignore
      styles[camelCase(key)] = value.trim();
    }
  });

  return styles;
}
