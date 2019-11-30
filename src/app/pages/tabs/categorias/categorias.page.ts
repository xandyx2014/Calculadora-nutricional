import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { UsuarioCategoriaService } from 'src/app/services/usuario-categoria.service';
import { Observable } from 'rxjs';
import { IRespApi } from 'src/app/interfaces/resp.interface';
import { ICategoria } from 'src/app/interfaces/usuarioCategoria.interface';
import { AddCategoriaPage } from './components/add-categoria/add-categoria.page';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  array = [];
  categoria$: Observable<IRespApi<ICategoria>>;
  constructor(
    private modalController: ModalController,
    private loadingController: LoadingController,
    private usuarioCategoriaService: UsuarioCategoriaService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.cargarDatos();
  }
  async cargarDatos() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.categoria$ = this.usuarioCategoriaService.obtenerUsuarioCategoria()
    .pipe(tap( (  ) => {
      loading.dismiss();
    } ));
  }
  async presentModal() {
    console.log( 'hi' );
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    const modal = await this.modalController.create({
      component: AddCategoriaPage,
      cssClass: 'my-custom-modal-css'
    });
    modal.onDidDismiss().then(() => {
      this.cargarDatos();
    });
    await modal.present();
    await loading.dismiss();
  }
}
