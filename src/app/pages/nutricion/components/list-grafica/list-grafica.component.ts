import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-grafica',
  templateUrl: './list-grafica.component.html',
  styleUrls: ['./list-grafica.component.scss'],
})
export class ListGraficaComponent implements OnInit {
  @Input() dataReceta: any;
  numeroPersona = 1;
  receta = [];
  ok = false;
  constructor() { }

  ngOnInit() {
    this.receta = this.conseguirAlimento(this.dataReceta);
    this.ok = true;
  }
  private conseguirAlimento(alimento: any[]) {
    return alimento.map(value => value.Alimento);
  }
  sumar() {
    this.numeroPersona = this.numeroPersona + 1;
  }
  restar() {
    if (this.numeroPersona !== 1) {
      this.numeroPersona = this.numeroPersona - 1;
    }
  }
}
