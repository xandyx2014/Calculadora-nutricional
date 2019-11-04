import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'randomWith'
})
export class RandomWithPipe implements PipeTransform {

  transform(value: any, min, max): any {
    return Math.floor(Math.random() * (Number(max) - Number(min) + 1) + Number(min)) + '%';
  }
}
