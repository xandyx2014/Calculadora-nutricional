import { Component, OnInit, Input } from '@angular/core';
import { IDetalleRecetaSum } from 'src/app/interfaces/detalleRecetaSum.interface';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-list-nutricion',
  templateUrl: './list-nutricion.component.html',
  styleUrls: ['./list-nutricion.component.scss'],
})
export class ListNutricionComponent implements OnInit {
  @Input() detalleRecetaSum: IDetalleRecetaSum;
  numeroPersona = 1;
  constructor(
    private notificacionService: NotificationService
  ) { }

  ngOnInit() {
    // console.log( this.detalleRecetaSum );
  }
  sumar() {
    if (this.numeroPersona < 300) {
      this.numeroPersona = this.numeroPersona + 1;
    } else {
      this.notificacionService.presentToast('Ha llegado al limite de personas', 'top');
    }
  }
  restar() {
    if (this.numeroPersona !== 1) {
      this.numeroPersona = this.numeroPersona - 1;
    } else {
      this.notificacionService.presentToast('Ha llegado al limite de personas', 'top');
    }
  }
}
