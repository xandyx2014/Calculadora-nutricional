import { Component, OnInit } from '@angular/core';
import { CategoriaFavorite } from 'src/app/enums/favorite.enum';
import { FavoriteStorageService } from 'src/app/services/favorite-storage.service';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  valores = CategoriaFavorite;
  datos = [];
  constructor(
    private favoriteStorageService: FavoriteStorageService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.agregarDatos();
  }
  async agregarDatos() {
    this.datos = await this.favoriteStorageService.obtenerDatos(environment.storageKeyFavorites);
    return this.datos;
  }
  async verCategoria(evento) {
    const arrayRest = await this.agregarDatos();
    if (arrayRest !== null || arrayRest !== undefined) {
      this.datos = arrayRest.filter(item => item.referencia === evento.target.innerText);
    }
  }
  borrarReceta(item) {
    this.notificationService.presentActionSheet({
      header: 'Recetas',
      mode: 'md',
      buttons: [
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Dejar Seguir',
          icon: 'heart-dislike',
          handler: () => {
            this.router.navigate(['/home']);
            this.notificationService.presentToast('Eliminada la Receta', 'top');
            this.favoriteStorageService.eliminarDato(
              item.id,
              environment.storageKeyFavorites);
          }
        }
      ]
    });
  }
}
