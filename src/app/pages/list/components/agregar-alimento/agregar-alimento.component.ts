import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-alimento',
  templateUrl: './agregar-alimento.component.html',
  styleUrls: ['./agregar-alimento.component.scss'],
})
export class AgregarAlimentoComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}
  crear() {
    this.modalCtrl.dismiss();
  }
}
