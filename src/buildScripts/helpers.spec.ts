import { appendToFile } from './helpers';

describe('appendToFile', () => {
  it('appends to a file', () => {
    expect(appendToFile('new data', 'old data')).toBe('old data\n\nnew data');
  });

  it('appends to an empty file', () => {
    expect(appendToFile('some data')).toBe('some data');
  });
});
