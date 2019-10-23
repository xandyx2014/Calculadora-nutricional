import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-receta',
  templateUrl: './add-receta.component.html',
  styleUrls: ['./add-receta.component.scss'],
})
export class AddRecetaComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}
  crear() {
    this.modalCtrl.dismiss();
  }
}
