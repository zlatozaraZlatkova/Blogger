import { DateTimeAgoPipe } from './date-time-ago.pipe';

describe('DateTimeAgoPipe', () => {
  let pipe: DateTimeAgoPipe;

  beforeEach(() => {
    pipe = new DateTimeAgoPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "over 1 year ago"', () => {
    spyOn(Date, 'now').and.returnValue(new Date('2025-08-09T12:00:00Z').getTime());
    const date = new Date('2024-08-01T11:59:30Z');
    const expected = 'about 1 year ago';

    expect(pipe.transform(date)).toBe(expected);
  });


  it('should return "1 day ago"', () => {
    spyOn(Date, 'now').and.returnValue(new Date('2025-08-09T12:00:00Z').getTime());
    const date = new Date('2025-08-08T12:00:00Z');
    const expected = '1 day ago';

    expect(pipe.transform(date)).toBe(expected);
  });

  it('should return "1 minute ago"', () => {
    spyOn(Date, 'now').and.returnValue(new Date('2025-08-09T12:00:00Z').getTime());
    const date = new Date('2025-08-09T11:59:30Z');
    const expected = '1 minute ago';

    expect(pipe.transform(date)).toBe(expected);
  });

  it('should return 7 days ago, not week', () => {
    spyOn(Date, 'now').and.returnValue(new Date('2025-08-06T12:00:00Z').getTime());
    const date = new Date('2025-07-30T12:00:00Z');
    const expected = '7 days ago';

    expect(pipe.transform(date)).toBe(expected);
  });


  it('should handle invalid date', () => {
    const date = new Date('');
    expect(pipe.transform(date)).toBe('');
  });

  it('should handle invalid date', () => {
    const date = new Date(NaN);
    expect(pipe.transform(date)).toBe('');
  });

  it('should handle invalid date', () => {
    const date = new Date('date');
    expect(pipe.transform(date)).toBe('');
  });



});
