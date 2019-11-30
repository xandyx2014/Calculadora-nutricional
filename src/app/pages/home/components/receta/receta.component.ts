import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IReceta } from 'src/app/interfaces/usuarioReceta.interface';
import { IRespApi } from 'src/app/interfaces/resp.interface';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { ModalController } from '@ionic/angular';
import { UpdateRecetaComponent } from '../update-receta/update-receta.component';
import { FavoriteStorageService } from 'src/app/services/favorite-storage.service';
import { environment } from 'src/environments/environment';
import { CategoriaFavorite } from 'src/app/enums/favorite.enum';
import { UsuarioRecetaService } from 'src/app/services/usuarioReceta.service';

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
    private modalController: ModalController,
    private usuarioRecetaService: UsuarioRecetaService,
    private favoriteStorageService: FavoriteStorageService
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
          this.mostrarNotificacion(item);
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
        handler:  () => {
          this.actualizarReceta(item);
        }
      }, {
        text: 'Agregar Favorito',
        icon: 'heart',
        handler: () => {
          this.favoriteStorageService.agregarFavorito(item);
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
  mostrarNotificacion(item: IReceta) {
    this.notificationService.presentAlert({
      header: 'Confirmar!',
      mode: 'md',
      message: `Deseas eliminar <strong>${item.nombre}</strong>!!!`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.eliminarReceta(item);
          }
        }
      ]
    });
  }
  private async actualizarReceta(item) {
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
  eliminarReceta(item) {
    this.usuarioRecetaService.eliminarReceta(item)
          .subscribe(() => {
            this.completadoReceta.emit();
            this.notificationService.presentToast(`Receta ${item.nombre} borrada`, 'top');
          });
  }
}
