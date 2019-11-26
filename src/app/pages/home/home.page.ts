import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddRecetaComponent } from './components/add-receta/add-receta.component';
import { UsuarioRecetaService } from 'src/app/services/usuarioReceta.service';
import { Observable } from 'rxjs';
import { IReceta } from 'src/app/interfaces/usuarioReceta.interface';
import { IRespApi } from 'src/app/interfaces/resp.interface';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  $receta: Observable<IRespApi<IReceta>>;
  $usuario: Observable<Usuario>;
  constructor(
    private router: Router,
    private modalController: ModalController,
    private usuarioRecetaService: UsuarioRecetaService,
    private loginService: LoginService) { }
  ionViewWillEnter() {
    this.obtenerDatos();
    this.obtenerDatosUsuario();
  }
  obtenerDatos() {
    this.$receta = this.usuarioRecetaService.obtenerUsuarioReceta();
  }
  obtenerDatosUsuario() {
    this.$usuario = this.loginService.getUserLocalStorage();
  }
  login() {
    this.router.navigate(['/login']);
  }
  irInventario() {
    this.router.navigate(['/inventario/items']);
  }
  irConfiguracion() {
    this.router.navigate(['/configuracion-usuario']);
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: AddRecetaComponent,
      cssClass: 'my-custom-modal-css'
    });
    modal.onDidDismiss()
      .then(() => {
        this.obtenerDatos();
      });
    return await modal.present();
  }
  cambio() {
    document.body.classList.toggle('dark');
  }
}
