import { appendToFile, makeName } from './helpers';

describe('appendToFile', () => {
  it('appends to a file', () => {
    expect(appendToFile('new data', 'old data')).toBe('old data\n\nnew data');
  });

  it('appends to an empty file', () => {
    expect(appendToFile('some data')).toBe('some data');
  });
});

describe('makeName', () => {
  it('returns icon name', () => {
    expect(makeName('add-icon')).toBe('addIcon');
  });

  it('returns a safe name for a reserved keyword', () => {
    expect(makeName('delete')).toBe('delete_');
    expect(makeName('export')).toBe('export_');
  });

  it('returns a safe name for a name starting with a number', () => {
    expect(makeName('4k')).toBe('_4K');
    expect(makeName('8k')).toBe('_8K');
  });

  it('replaces a . with dot at the start of a name', () => {
    expect(makeName('.net')).toBe('dotNet');
    expect(makeName('about.me')).toBe('aboutMe');
  });

  it('handles special characters', () => {
    expect(makeName('at&t')).toBe('atAndT');
    expect(makeName('c++')).toBe('cPlusPlus');
    expect(makeName("let's encrypt")).toBe('letsEncrypt');
    expect(makeName('yahoo!')).toBe('yahoo');
  });
});
