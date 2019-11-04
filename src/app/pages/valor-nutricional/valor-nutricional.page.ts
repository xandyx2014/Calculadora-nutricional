import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioAlimentoService } from 'src/app/services/usuario-alimento.service';
import { flatMap, map, delay, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IAlimento } from 'src/app/interfaces/usuario_alimento.interface';

@Component({
  selector: 'app-valor-nutricional',
  templateUrl: './valor-nutricional.page.html',
  styleUrls: ['./valor-nutricional.page.scss'],
})
export class ValorNutricionalPage implements OnInit {
  delayAlimento  = [, , , , , , , , ];
  $alimento: Observable<IAlimento | IAlimento[]>;
  cantidadTotalAlimento;
  pn: number;
  pnRacionDia: number;
  constructor(private activatedRoute: ActivatedRoute,
              private usuarioAlimentoService: UsuarioAlimentoService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.$alimento =  this.activatedRoute.params.pipe(
      flatMap( ({id}) => this.usuarioAlimentoService.obtenerAlimento(id)),
      tap( () => {
        this.activatedRoute.queryParams.subscribe( ( {cantidad} ) => {
          this.cantidadTotalAlimento = cantidad;
        });
      }),
      map(resp => resp.data)
    );
  }
  randomIntFromInterval(min, max) {
    console.log( min, max );
    return Math.floor(Math.random() * (max - min + 1) + min) + '%';
  }
  pnKg(pbKg, fc) {
    this.pn = (Number(pbKg) / Number(fc));
    return this.pn;
  }
  total(pb, unidad) {
    return Number(pb) * Number(unidad);
  }
  pnRacDia(): number {
    this.pnRacionDia = (((this.pn) / 1) / 1);
    return this.pnRacionDia;
  }
  pracAGramo() {
    return this.pnRacDia() * 1000;
  }
  calculoNutricion(valorNutricional: number) {
    return (this.pracAGramo() * Number(valorNutricional)) / 100;
  }
}
