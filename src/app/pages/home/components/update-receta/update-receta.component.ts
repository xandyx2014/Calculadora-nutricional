import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavParams, ModalController } from '@ionic/angular';
import { UsuarioRecetaService } from 'src/app/services/usuarioReceta.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-update-receta',
  templateUrl: './update-receta.component.html',
  styleUrls: ['./update-receta.component.scss'],
})
export class UpdateRecetaComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private navParams: NavParams,
    private usuarioRecetaService: UsuarioRecetaService,
    private notificationService: NotificationService,
    private modalController: ModalController
    ) { }

  ngOnInit() {
    this.crearFormulario();
  }
  obtenerNombre() {
    return this.navParams.get('nombre');
  }
  crearFormulario() {
    this.form = this.fb.group({
      nombre: [this.navParams.get('nombre') || ''],
      descripcion: [this.navParams.get('descripcion') || ''],
      total_persona: [this.navParams.get('total_persona') || '']
    });
  }
  actualizar() {
    this.usuarioRecetaService.actualizarReceta({...this.form.value, id: this.navParams.get('id')}).subscribe(
      ( resp ) => {
        this.modalController.dismiss();
        this.notificationService.presentToast('Actualizado Correctamente', 'top');
      });
  }

}
