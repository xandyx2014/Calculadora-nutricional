import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlRecetas'
})
export class UrlRecetasPipe implements PipeTransform {

  transform(value: any): any {
    return this.randomIntFromInterval(1, 10);
  }
  randomIntFromInterval(min, max) {
    /* this.cdRef.detectChanges(); */
    return `assets/img/recetas/${Math.floor(Math.random() * (max - min + 1) + min)}` + '.svg';
  }
}
