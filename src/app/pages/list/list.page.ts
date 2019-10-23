import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AgregarAlimentoComponent } from './components/agregar-alimento/agregar-alimento.component';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  public icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  constructor(private router: Router,
              private modalController: ModalController) {
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: AgregarAlimentoComponent,
      cssClass: 'my-custom-modal-css'
    });
    return await modal.present();
  }
  irPagina() {
    this.router.navigate(['/valor-nutricional']);
  }
  ngOnInit() {
  }
}
