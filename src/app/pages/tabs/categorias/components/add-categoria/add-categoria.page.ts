import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioCategoriaService } from 'src/app/services/usuario-categoria.service';
import { filter } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.page.html',
  styleUrls: ['./add-categoria.page.scss'],
})
export class AddCategoriaPage implements OnInit {
  color = 'primary';
  form: FormGroup;
  constructor(private modalCtrl: ModalController,
              private fb: FormBuilder,
              private notificationService: NotificationService,
              private usuarioCategoriaService: UsuarioCategoriaService,
              private navParams: NavParams) { }

  ngOnInit() {
    this.crearFormulario();
    console.log('hi', this.navParams.get('actualizar') !== undefined );
  }
  crearFormulario() {
    this.form = this.fb.group({
      nombre: [this.navParams.get('nombre') || '', Validators.required],
      descripcion: [this.navParams.get('descripcion') || '', Validators.required],
      color: [this.navParams.get('color') || this.color, Validators.required]
    });
  }
  cambiarColor(event) {
    this.color = event.detail.value;
    console.log( event.detail.value );
  }
  verificarEstado() {
    return this.navParams.get('actualizar') === undefined;
  }
  actualizarReceta() {
    this.usuarioCategoriaService.actualizarUsuarioCategoria(
      { ...this.form.value,
        id: this.navParams.get('id')
      })
      .pipe(filter(item => item !== null))
      .subscribe( ( resp ) => {
        this.notificationService.presentAlert({
          header: `${this.form.value.nombre}`,
          subHeader: 'Actualizado Exitosamente',
          buttons: ['Aceptar'],
          mode: 'md'
        });
     });
    this.modalCtrl.dismiss();
  }
  crear() {
    this.usuarioCategoriaService.crearUsuarioReceta({...this.form.value})
      .pipe(filter(item => item !== null))
      .subscribe( ( resp ) => {
        this.notificationService.presentAlert({
          header: `${this.form.value.nombre}`,
          subHeader: 'Creado Exitosamente',
          buttons: ['Aceptar'],
          mode: 'md'
        });
      });
    this.modalCtrl.dismiss();
  }
}
