import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.scss'],
})
export class GraficaComponent implements OnInit {
  // Pie
  @Input() chartLabel: any[] = ['Download'] ;
  @Input() chartData: any[] = [300];
  @Input() titulo = 'Titulo';
  numeroPersona = 1;
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[];
  public pieChartData: any[];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  constructor(
    private notificacionService: NotificationService
  ) { }

  ngOnInit() {
    this.pieChartData = this.chartData;
    this.pieChartLabels = this.chartLabel;
  }
  sumar() {
    if (this.numeroPersona < 300) {
      this.numeroPersona = this.numeroPersona + 1;
      this.multiplicarValor();
    } else {
      this.notificacionService.presentToast('Ha llegado al limite de personas', 'top');
    }
  }
  restar() {
    if (this.numeroPersona !== 1) {
      this.dividirValor();
      this.numeroPersona = this.numeroPersona - 1;
    } else {
      this.notificacionService.presentToast('Ha llegado al limite de personas', 'top');
    }
  }
  multiplicarValor() {
    this.pieChartData = this.pieChartData.map( value => (value * this.numeroPersona).toFixed(3));
  }
  dividirValor() {
    this.pieChartData = this.pieChartData.map( value => (value / this.numeroPersona).toFixed(3));
  }
}
