import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalCreateComponent } from './components/modal-create/modal-create.component';
import { UsuarioAlimentoService } from 'src/app/services/usuario-alimento.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAlimento } from 'src/app/interfaces/usuario_alimento.interface';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  array = [, , , , , , , , , , ];
  $alimentos: Observable<IAlimento | IAlimento[]>;
  constructor(public modalController: ModalController,
              private usuarioAlimentoService: UsuarioAlimentoService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.obtenerDatos();
  }
  obtenerDatos() {
    this.$alimentos = this.usuarioAlimentoService.obtenerUsuarioAlimento().pipe(map( item => item.data));
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
    return await modal.present();
  }
}
