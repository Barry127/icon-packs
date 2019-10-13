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
});
