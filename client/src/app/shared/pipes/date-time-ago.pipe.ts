import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTimeAgo',
})
export class DateTimeAgoPipe implements PipeTransform {
  transform(value: string | Date | undefined): string {
    let result = '';
    console.log('Date:', value);

    if (!value) {
      return result;
    }

    const createdDate = new Date(value);
    const todayDate = new Date();

    const diffTime = todayDate.getTime() - createdDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      result = `${diffDays} days ago`;
    }

    if (diffDays >= 30 && diffDays < 365) {
      const months = Math.floor(diffDays / 30);

      result = `${months} months ago`;
    }

    if (diffDays >= 365) {
      const years = Math.floor(diffDays / 365);

      result = `${years} years ago`;
    }

    return result;
  }
}
