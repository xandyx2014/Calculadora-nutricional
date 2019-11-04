import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import {
  IDetalleReceta
} from 'src/app/interfaces/detalleReceta.interface';
import {
  Router
} from '@angular/router';
import {
  DetalleRecetaService
} from 'src/app/services/detalle-receta.service';
import {
  NotificationService
} from 'src/app/services/notification.service';
import {
  ActionSheetController
} from '@ionic/angular';

@Component({
  selector: 'app-list-alimento',
  templateUrl: './list-alimento.component.html',
  styleUrls: ['./list-alimento.component.scss'],
})
export class ListAlimentoComponent implements OnInit {
  @Input() detalleReceta: IDetalleReceta[] | IDetalleReceta = [];
  @Output() actualizarDatos = new EventEmitter < void > ();
  constructor(private router: Router,
              private detalleRecetaService: DetalleRecetaService,
              private notificationService: NotificationService,
              public actionSheetController: ActionSheetController) {}

  ngOnInit() {}
  async verValorNutricional(item) {
    await this.router.navigate(['/valor-nutricional', item.alimento_id], {
      queryParams: {
        cantidad: item.cantidad
      }
    });
  }
  eliminarDetalleReceta(item) {
    this.detalleRecetaService.destroyDetalleReceta(item.id).subscribe(() => {
      this.notificationService.presentToast(`Eliminado correctamente ${item.Alimento.nombre}`, 'bottom');
      this.actualizarDatos.emit();
    });
  }
  async presentActionSheet(item) {
    const actionSheet = await this.actionSheetController.create({
        header: 'Alimento Nutricional',
        mode: 'md',
        buttons: [
          {
            text: 'Ver',
            icon: 'eye',
            handler: () => {
              this.verValorNutricional(item);
            }
          },
          {
            text: 'Borrar',
            role: 'destructive',
            icon: 'trash',
            handler: () => {
              this.eliminarDetalleReceta(item);
            }
          },
          {
            text: 'Cancelar',
            icon: 'close',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
    });
    await actionSheet.present();
  }
}
