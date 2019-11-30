import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NotificationService } from './notification.service';
import { CategoriaFavorite } from '../enums/favorite.enum';
import { environment } from 'src/environments/environment';
import { IReceta } from '../interfaces/usuarioReceta.interface';
@Injectable({
  providedIn: 'root'
})
export class FavoriteStorageService {
  constructor(
    private storage: Storage,
    private notificationService: NotificationService
    ) { }

  guardarDatos<T>({dato, referencia}: {dato: T, referencia: string}) {
    return new Promise( ( resolve, reject ) => {
      this.storage.get(referencia).then((resp) => {
        if (resp === null || resp === undefined) {
          this.storage.set(referencia, [dato]).then(() => {
            resolve();
          });
        } else {
          this.verificarDato({dato, referencia}).then( () => {
            resolve();
          } );
        }
      });
    } );
  }
  obtenerDatos<T>(referencia): Promise<T> {
    return this.storage.get(referencia);
  }
  private verificarDato({dato, referencia}) {
    return new Promise( ( resolve, reject ) => {
      this.storage.get(referencia).then((resp: any[]) => {
        const existeItem = resp.find( item => item.id === dato.id);
        if (existeItem === undefined) {
         resp.push(dato);
         this.storage.set(referencia, resp).then( ( ) => {
           resolve();
         } );
        }
     });
    } );
  }
  eliminarDato(id, referencia) {
    return new Promise( ( resolve, reject ) => {
      this.storage.get(referencia).then((resp: any[]) => {
        resp = resp.filter( item => item.id !== id);
        if (resp.length === 0) {
          resp = null;
        }
        this.storage.set(referencia, resp).then( () => {
          resolve();
        });
      });
    } );
  }
  actualizarDato(id, dato, referencia) {
    return new Promise( ( resolve, reject ) => {
      this.storage.get(referencia).then( (resp: any[]) => {
        resp.map( (item, i) => {
          if (item.id === id) {
            resp[i] = {...dato};
            this.storage.set(referencia, resp).then(() => {
              resolve();
            });
          }
        });
      });
    });
  }
  agregarFavorito(item: IReceta) {
    this.notificationService.presentActionSheet({
      header: 'Tipo de comida',
      mode: 'md',
      buttons: [{
        text: CategoriaFavorite.ENTRADAS,
        icon: 'add-circle-outline',
        handler: () => {
          this.guardarDatosComnida(item, CategoriaFavorite.ENTRADAS);
        }
      }, {
        text: CategoriaFavorite.SOPAS,
        icon: 'add-circle-outline',
        handler: () => {
          this.guardarDatosComnida(item, CategoriaFavorite.SOPAS);
        }
      }, {
        text: CategoriaFavorite.PLATOS_PRINCIPALES,
        icon: 'add-circle-outline',
        handler: () => {
          this.guardarDatosComnida(item, CategoriaFavorite.PLATOS_PRINCIPALES);
        }
      }, {
        text: CategoriaFavorite.BEBIDAS,
        icon: 'add-circle-outline',
        handler: () => {
          this.guardarDatosComnida(item, CategoriaFavorite.BEBIDAS);
        }
      },
      {
        text: CategoriaFavorite.POSTRES,
        icon: 'add-circle-outline',
        handler: () => {
          this.guardarDatosComnida(item, CategoriaFavorite.POSTRES);
        }
      },
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
  }
  private async guardarDatosComnida(item: IReceta, referencia: CategoriaFavorite) {
    await this.notificationService.presentToast(`Agregado a Favoritos ${item.nombre}`, 'top');
    await this.guardarDatos({
      dato: {...item, referencia},
      referencia: environment.storageKeyFavorites
    });
  }
}
