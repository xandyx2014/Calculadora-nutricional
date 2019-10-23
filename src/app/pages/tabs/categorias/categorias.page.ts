import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddCategoriaPage } from './add-categoria/add-categoria.page';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  array = [];
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: AddCategoriaPage,
      cssClass: 'my-custom-modal-css'
    });
    return await modal.present();
  }
}
