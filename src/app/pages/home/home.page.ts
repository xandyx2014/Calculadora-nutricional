import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddRecetaComponent } from './components/add-receta/add-receta.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  array = [, , , , , , , ];
  constructor(private router: Router,
              private modalController: ModalController) {}
  randomIntFromInterval(min, max) {
    /* this.cdRef.detectChanges(); */
    return `assets/img/recetas/${Math.floor(Math.random() * (max - min + 1) + min)}` + '.svg';
  }
  login() {
    this.router.navigate(['/login']);
  }
  irReceta(id: string): void {
    this.router.navigate(['/list', 1]);
  }
  irInventario() {
    this.router.navigate(['/inventario/items']);
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: AddRecetaComponent,
      cssClass: 'my-custom-modal-css'
    });
    return await modal.present();
  }
}
