import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddRecetaComponent } from './components/add-receta/add-receta.component';
import { UsuarioRecetaService } from 'src/app/services/usuarioReceta.service';
import { Observable } from 'rxjs';
import { IReceta } from 'src/app/interfaces/usuarioReceta.interface';
import { IRespApi } from 'src/app/interfaces/resp.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  $receta: Observable<IRespApi<IReceta>>;
  constructor(private router: Router,
              private modalController: ModalController,
              private usuarioRecetaService: UsuarioRecetaService) {}
  ionViewWillEnter() {
    this.obtenerDatos();
  }
  obtenerDatos() {
    this.$receta = this.usuarioRecetaService.obtenerUsuarioReceta();
  }
  login() {
    this.router.navigate(['/login']);
  }
  irInventario() {
    this.router.navigate(['/inventario/items']);
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
}
