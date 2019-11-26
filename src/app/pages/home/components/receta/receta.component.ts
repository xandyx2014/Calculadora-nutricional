import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IReceta } from 'src/app/interfaces/usuarioReceta.interface';
import { IRespApi } from 'src/app/interfaces/resp.interface';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { ModalController } from '@ionic/angular';
import { UpdateRecetaComponent } from '../update-receta/update-receta.component';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.scss'],
})
export class RecetaComponent implements OnInit {
  @Input() receta: IReceta[] = [];
  @Output() completadoReceta = new EventEmitter();
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private modalController: ModalController
    ) { }
  irReceta(item): void {
    this.router.navigate(['/list', item.id], { queryParams: { ...item, foto: item.foto } });
  }
  ngOnInit() { }
  mostrar(item: IReceta) {
    this.notificationService.presentActionSheet({
      header: 'Opciones',
      mode: 'md',
      buttons: [{
        text: 'Borrar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Ver',
        icon: 'book',
        handler: () => {
          this.irReceta(item);
        }
      }, {
        text: 'Modificar',
        icon: 'build',
        handler: async () => {
          const modal = await this.modalController.create({
            component: UpdateRecetaComponent,
            cssClass: 'my-custom-modal-css',
            componentProps: {
              ...item
            }
          });
          modal.onDidDismiss().then(() => {
            this.completadoReceta.emit();
            this.notificationService.presentToast('Actualizado Correctamente', 'top');
          });
          return await modal.present();
        }
      }, {
        text: 'Agregar Favorito',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
  }
}
