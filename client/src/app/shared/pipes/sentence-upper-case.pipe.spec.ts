import { SentenceUpperCasePipe } from './sentence-upper-case.pipe';

describe('SentenceUpperCasePipe', () => {
  it('create an instance', () => {
    const pipe = new SentenceUpperCasePipe();
    expect(pipe).toBeTruthy();
  });
});
