import { SentenceUpperCasePipe } from './sentence-upper-case.pipe';

describe('SentenceUpperCasePipe', () => {
  let pipe: SentenceUpperCasePipe;

  beforeEach(() => {
    pipe = new SentenceUpperCasePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform fist letter to uppercase', () => {
    expect(pipe.transform('abc')).toBe('Abc');
  });

  it('should transform first letter uppercase, rest lowercase', () => {
    expect(pipe.transform('aBc')).toBe('Abc');
  });

  it('should make only first letter uppercase when input is all uppercase', () => {
    expect(pipe.transform('ABC')).toBe('Abc');
  });

  it('should return empty string when input is empty string', () => {
    expect(pipe.transform('')).toBe('');
  });
});
