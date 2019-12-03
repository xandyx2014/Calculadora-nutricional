import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getValueObject'
})
export class GetValueObjectPipe implements PipeTransform {

  transform(object: any, args: string, numeroPersona: number = 1 , numberCondition: boolean = false): any {
    if (numberCondition) {
      return object.map(value => {
        return Number(value[args]) * numeroPersona;
      });
    } else {
      return object.map(value => {
        return value[args];
      });
    }
  }

}
