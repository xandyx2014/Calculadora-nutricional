import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioCategoriaService } from 'src/app/services/usuario-categoria.service';
import { Observable } from 'rxjs';
import { IRespApi } from 'src/app/interfaces/resp.interface';
import { ICategoria } from 'src/app/interfaces/usuarioCategoria.interface';
import { AddCategoriaPage } from './components/add-categoria/add-categoria.page';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  array = [];
  categoria$: Observable<IRespApi <ICategoria> >;
  constructor(private modalController: ModalController,
              private usuarioCategoriaService: UsuarioCategoriaService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.cargarDatos();
  }
  cargarDatos() {
    this.categoria$ = this.usuarioCategoriaService.obtenerUsuarioCategoria();
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: AddCategoriaPage,
      cssClass: 'my-custom-modal-css'
    });
    modal.onDidDismiss().then(() => {
      this.cargarDatos();
    });
    return await modal.present();
  }
}
