import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.page.html',
  styleUrls: ['./add-categoria.page.scss'],
})
export class AddCategoriaPage implements OnInit {
  color = 'primary';
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  cambiarColor(event) {
    this.color = event.detail.value;
    console.log( event.detail.value );
  }
  crear() {
    this.modalCtrl.dismiss();
  }
}
