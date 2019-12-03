import { Component, OnInit } from '@angular/core';
import { DetalleRecetaService } from 'src/app/services/detalle-receta.service';
import { ActivatedRoute } from '@angular/router';
import { flatMap, pluck, map } from 'rxjs/operators';
import { IDetalleReceta } from 'src/app/interfaces/detalleReceta.interface';
import { IDetalleRecetaSum } from 'src/app/interfaces/detalleRecetaSum.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nutricion',
  templateUrl: './nutricion.page.html',
  styleUrls: ['./nutricion.page.scss'],
})
export class NutricionPage implements OnInit {
  sumatoriaReceta$: Observable<any>;
  constructor(
    private detalleRecetaService: DetalleRecetaService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
     this.sumatoriaReceta$ = this.activatedRoute.params
    .pipe(
      flatMap( ({id}) => this.detalleRecetaService.obtenerDetalleReceta(id) ),
      map( item => item.data),
      map( (resp: any) => {
        const detalleReceta =  this.calcularDatos(resp);
        const sumatoria = this.sumatoria(detalleReceta);
        return {
          sumatoria,
          detalleReceta
        };
      })
      );
  }
  calcularDatos(receta: any[]) {
    const calculoReceta = receta.map(item => {
      const cantidad = Number(item.cantidad);
      const precioUnidad = Number(item.Alimento.precio_unidad);
      const total = cantidad * precioUnidad;
      const fc = Number(item.Alimento.fc);
      const pnKg = (cantidad / fc);
      const pnRacDia = ((pnKg / 1) / 1);
      // calculo principal
      // (pracGramo * valorNutricional) / 100
      const pracGramo = pnRacDia * 1000;
      return {
        ...item,
        Alimento: {
          ...item.Alimento,
          total,
          na: this.calculoNutricion(pracGramo, item.Alimento.na),
          ca: this.calculoNutricion(pracGramo, item.Alimento.ca),
          colesterol: this.calculoNutricion(pracGramo, item.Alimento.colesterol),
          fe: this.calculoNutricion(pracGramo, item.Alimento.fe),
          fibra: this.calculoNutricion(pracGramo, item.Alimento.fibra),
          grs: this.calculoNutricion(pracGramo, item.Alimento.grs),
          h_d_c: this.calculoNutricion(pracGramo, item.Alimento.h_d_c),
          potasio: this.calculoNutricion(pracGramo, item.Alimento.potasio),
          prot: this.calculoNutricion(pracGramo, item.Alimento.prot),
          vitamina_a: this.calculoNutricion(pracGramo, item.Alimento.vitamina_a),
          vitamina_b1: this.calculoNutricion(pracGramo, item.Alimento.vitamina_b1),
          vitamina_b6: this.calculoNutricion(pracGramo, item.Alimento.vitamina_b6),
          vitamina_b12: this.calculoNutricion(pracGramo, item.Alimento.vitamina_b12),
          vitamina_c: this.calculoNutricion(pracGramo, item.Alimento.vitamina_c),
          vitamina_e: this.calculoNutricion(pracGramo, item.Alimento.vitamina_e),
          vitamina_k: this.calculoNutricion(pracGramo, item.Alimento.vitamina_k)
        }
      };
    });
    return calculoReceta;
  }
  calculoNutricion(pracGramo, valorNutricional) {
    return ((Number(pracGramo) * Number(valorNutricional)) / 100);
  }
  sumatoria(receta: any[]): IDetalleRecetaSum {
    // tslint:disable-next-line: prefer-const
    let alimento: IDetalleRecetaSum = {
      ca: 0,
      na: 0,
      colesterol: 0,
      fe: 0,
      fibra: 0,
      grs: 0,
      h_d_c: 0,
      potasio: 0,
      prot: 0,
      vitamina_a: 0,
      vitamina_b1: 0,
      vitamina_b6: 0,
      vitamina_b12: 0,
      vitamina_c: 0,
      vitamina_e: 0,
      vitamina_k: 0,
      total: 0
    };
    receta.forEach( ( resp ) => {
      alimento.ca += resp.Alimento.ca;
      alimento.na += resp.Alimento.na;
      alimento.colesterol += resp.Alimento.colesterol;
      alimento.fibra += resp.Alimento.fibra;
      alimento.grs += resp.Alimento.grs;
      alimento.h_d_c += resp.Alimento.h_d_c;
      alimento.potasio += resp.Alimento.potasio;
      alimento.vitamina_a += resp.Alimento.vitamina_a;
      alimento.vitamina_b6 += resp.Alimento.vitamina_b6;
      alimento.vitamina_b12 += resp.Alimento.vitamina_b12;
      alimento.vitamina_c += resp.Alimento.vitamina_c;
      alimento.vitamina_e += resp.Alimento.vitamina_e;
      alimento.vitamina_k += resp.Alimento.vitamina_k;
      alimento.total += resp.Alimento.total;
    });
    return alimento;
  }
}
