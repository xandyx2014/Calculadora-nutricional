import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'urlImg'
})
export class UrlImgPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return environment.urlHost + '/upload/receta/' + value;
  }

}
