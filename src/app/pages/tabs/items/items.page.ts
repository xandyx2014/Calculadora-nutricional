import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { ModalCreateComponent } from './components/modal-create/modal-create.component';
import { UsuarioAlimentoService } from 'src/app/services/usuario-alimento.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IAlimento } from 'src/app/interfaces/usuario_alimento.interface';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  array = [, , , , , , , , , , ];
  $alimentos: Observable<IAlimento | IAlimento[]>;
  constructor(
    public modalController: ModalController,
    private loadingController: LoadingController,
    private usuarioAlimentoService: UsuarioAlimentoService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.obtenerDatos();
  }
  async obtenerDatos() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.$alimentos = this.usuarioAlimentoService.obtenerUsuarioAlimento()
    .pipe(
      map( item => item.data),
      tap( () => loading.dismiss()));
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalCreateComponent,
      cssClass: 'my-custom-modal-css'
    });
    modal.onDidDismiss().then(() => {
      this.obtenerDatos();
      console.log( 'modal dismiiss' );
    });
    await modal.present();
  }
}
