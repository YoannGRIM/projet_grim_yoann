import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardCcvFormatter',
  standalone: true
})
export class CardCcvFormatterPipe implements PipeTransform {
  transform(value: number): string {
    let ccv = value.toString();
    if (!value) return '';

    const cleanedValue = ccv.replace(/\D/g, '');

    return '***';
  }
}
