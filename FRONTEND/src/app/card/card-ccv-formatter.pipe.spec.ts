import { CardCcvFormatterPipe } from './card-ccv-formatter.pipe';

describe('CardCcvFormatterPipe', () => {
  it('create an instance', () => {
    const pipe = new CardCcvFormatterPipe();
    expect(pipe).toBeTruthy();
  });
});
