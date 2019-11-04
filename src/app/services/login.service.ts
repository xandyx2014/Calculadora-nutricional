import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { RespLogin } from '../interfaces/login.interface';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { filter, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private auth = new BehaviorSubject<boolean>(false);
  private usuario = new BehaviorSubject<Usuario>(null);
  constructor(private http: HttpClient,
              private loadingController: LoadingController,
              private notificationService: NotificationService,
              private storage: Storage,
              private router: Router) { }

  async login(username, password) {
    const loading = await this.loadingController.create({
      message: 'Cargando..'
    });
    await loading.present();
    this.http.post< RespLogin >(`${ environment.urlHost }/usuario`, { username, password })
      .subscribe( async ( resp ) => {
      if ( resp !== null || resp !== undefined ) {
        if ( resp.ok === true ) {
          this.usuario.next(resp.data);
          this.auth.next( true );
          await loading.dismiss();
          await this.storage.set(environment.storageKey, {...resp.data, token: resp.token});
          await this.router.navigate(['/home']);
        } else {
          await loading.dismiss();
          this.notificationService.presentToast('Ups! Ha ocurrido un Error', 'bottom');
        }
      }
    },
    () => {
      loading.dismiss();
    }
    );
  }
  async loginstorage() {
    const itemStore = await this.storage.get( environment.storageKey );
    if (itemStore !== undefined || itemStore !== null) {
      this.auth.next(true);
      this.usuario.next(itemStore);
    }
  }
  getUserLocalStorage(): Observable<Usuario> {
    return from(this.storage.get( environment.storageKey )).pipe(
      filter( item => item !== null),
      take(1)
    );
  }
  getUser() {
    return this.usuario.asObservable();
  }
  isLogin() {
    return this.auth.asObservable();
  }
  logout() {
     this.auth.next(false);
     this.storage.remove( environment.storageKey);
  }
}
