import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';

@Pipe({
  name: 'dateTimeAgo',
})
export class DateTimeAgoPipe implements PipeTransform {
  transform(value: string | Date | undefined): string {
    if (!value) return '';
    try {
      const date = new Date(value);

      if (isNaN(date.getTime())) {
        return '';
      }
      return formatDistanceToNow(date, { addSuffix: true });

    } catch (error) {
      console.error('Error in DateTimeAgoPipe:', error);
      return '';
    }

  }
}
