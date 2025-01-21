import { CardNumberFormatterPipe } from './card-number-formatter.pipe';

describe('CardNumberFormatterPipe', () => {
  it('create an instance', () => {
    const pipe = new CardNumberFormatterPipe();
    expect(pipe).toBeTruthy();
  });
});
