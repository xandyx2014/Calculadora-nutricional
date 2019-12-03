import { Component, OnInit, Input } from '@angular/core';
import { RadialChartOptions, ChartDataSets, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-radar-grafica',
  templateUrl: './radar-grafica.component.html',
  styleUrls: ['./radar-grafica.component.scss'],
})
export class RadarGraficaComponent implements OnInit {
  @Input() data: any[] = [];
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['Calorias', 'Carbohidratos', 'Grasas', 'Proteinas'];

  public radarChartData: ChartDataSets[] = [
    { data: [65, 59, 90, 81], label: 'Series A' },
    { data: [28, 48, 40, 19], label: 'Series B' }
  ];
  public radarChartType: ChartType = 'radar';

  constructor() { }

  ngOnInit() {
    this.radarChartData = this.data.map(value => {
      const nombre = value.Alimento.nombre;
      const caloria = Number(value.Alimento.ca);
      const carbohidrato = Number(value.Alimento.h_d_c);
      const grasas = Number(value.Alimento.grs);
      const proteinas = Number(value.Alimento.prot);
      return { data: [caloria, carbohidrato, grasas, proteinas], label: nombre };
    });
    console.log( this.radarChartData );
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
