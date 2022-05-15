import { joinClasses } from './joinClasses';

describe('joinClasses', () => {
  it('should join classes', () => {
    expect(joinClasses('a', 'b', 'c')).toBe('a b c');
  });
  it('should return empty string if no classes', () => {
    expect(joinClasses()).toBe('');
  });
  it('should return empty string if empty array', () => {
    expect(joinClasses.apply(null, [])).toBe('');
  });
  it('should return empty string if empty array of strings', () => {
    expect(joinClasses.apply(null, ['', ''])).toBe('');
  });
});
