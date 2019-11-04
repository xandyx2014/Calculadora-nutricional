import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ICategoria } from 'src/app/interfaces/usuarioCategoria.interface';
import { ModalController } from '@ionic/angular';
import { AddCategoriaPage } from '../add-categoria/add-categoria.page';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
})
export class CategoriaComponent implements OnInit {
  @Input() categorias: ICategoria[] = [];
  @Output() recetaUpdateOK = new EventEmitter<void>();
  constructor(private modalController: ModalController) { }

  ngOnInit() {}
  async presentModal(item: ICategoria) {
    const modal = await this.modalController.create({
      component: AddCategoriaPage,
      componentProps: {
        ...item,
        actualizar: true,
      },
      cssClass: 'my-custom-modal-css'
    });
    modal.onDidDismiss().then(() => {
      this.recetaUpdateOK.emit();
    });
    return await modal.present();
  }
}
