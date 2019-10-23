import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalCreateComponent } from './components/modal-create/modal-create.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  array = [, , , , , , , , , , ];
  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalCreateComponent,
      cssClass: 'my-custom-modal-css'
    });
    return await modal.present();
  }
}
