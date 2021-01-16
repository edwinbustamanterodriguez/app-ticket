import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'toDateTimePipe',
  pure: true,
})
export class ToDateTimePipe implements PipeTransform {
  transform(value: string): string {
    //value Unix Timestamp
   let date = moment.unix(Number(value));
    return date.format('ddd MMM-DD-YYYY, hh:mm A');
  }
}
