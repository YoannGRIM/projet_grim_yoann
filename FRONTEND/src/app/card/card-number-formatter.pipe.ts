import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardNumberFormatter',
  standalone: true
})
export class CardNumberFormatterPipe implements PipeTransform {
  transform(value: number): string {
    let cardNumber = value.toString();
    if (!value) return cardNumber;

    const cleanedValue = cardNumber.replace(/\D/g, '');
    if (cleanedValue.length !== 16) {
      return cardNumber;
    }

    return `${cleanedValue.slice(0, 4)} **** **** ${cleanedValue.slice(12)}`;
  }
}
