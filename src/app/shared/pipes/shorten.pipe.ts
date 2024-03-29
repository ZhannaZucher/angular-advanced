import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
})
//pipe cutting text after 50 chars and adding "..."
export class ShortenPipe implements PipeTransform {
  transform(value: string, maxLength = 50): string {
    if (value.length <= maxLength) {
      return value;
    } else {
      return value.substring(0, maxLength) + '...';
    }
  }
}
