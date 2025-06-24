import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sentenceUpperCase',
})
export class SentenceUpperCasePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    const sentences = value.split('. ');

    const transformed = sentences.map((sentence) => {
      return sentence.charAt(0).toUpperCase().concat(sentence.slice(1).toLowerCase());
    });

    return transformed.join('. ');
  }
}
