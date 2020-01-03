import { parseXml } from './parseXml';

describe('parseXml', () => {
  it('parses xml based tags', () => {
    const xml = `<svg aria-hidden data-name="no-name" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="class">
  <desc>Alert Icon</desc>
  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
  <line fill="red" x1="12" y1="9" x2="12" y2="13"></line>
  <line x1="12" y1="17" x2="12.01" y2="17" />
  <path fill="none" d="" />
</svg>`;

    const expected = {
      tag: 'svg',
      attrs: {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        className: 'class'
      },
      children: [
        {
          tag: 'desc',
          attrs: {},
          children: 'Alert Icon'
        },
        {
          tag: 'path',
          attrs: {
            d:
              'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z'
          }
        },
        {
          tag: 'line',
          attrs: {
            x1: '12',
            y1: '9',
            x2: '12',
            y2: '13'
          }
        },
        {
          tag: 'line',
          attrs: {
            x1: '12',
            y1: '17',
            x2: '12.01',
            y2: '17'
          }
        }
      ]
    };

    expect(parseXml(xml)).toEqual(expected);
  });

  it('parses fragments', () => {
    const xml =
      '<path d="a" /><path d="b" style="color: red; background: blue" />';
    const expected = {
      tag: 'div',
      attrs: {},
      children: [
        {
          tag: 'path',
          attrs: {
            d: 'a'
          }
        },
        {
          tag: 'path',
          attrs: {
            d: 'b',
            style: {
              color: 'red',
              background: 'blue'
            }
          }
        }
      ]
    };

    expect(parseXml(xml)).toEqual(expected);
  });
});
