import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioRecetaService } from 'src/app/services/usuarioReceta.service';
import { filter } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-receta',
  templateUrl: './add-receta.component.html',
  styleUrls: ['./add-receta.component.scss'],
})
export class AddRecetaComponent implements OnInit {
  form: FormGroup;
  constructor(private modalCtrl: ModalController,
              private fb: FormBuilder,
              private usuarioRecetaService: UsuarioRecetaService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.crearFormulario();
  }
  crear() {
    this.usuarioRecetaService.crearReceta({...this.form.value})
      .pipe(
        filter(item => item !== null)
      )
      .subscribe( async ( resp ) => {
      await this.modalCtrl.dismiss();
      await this.notificationService.presentAlert({
        header: `Receta: ${this.form.value.nombre}`,
        subHeader: 'Creada Exitosamente',
        mode: 'md',
        buttons: ['Aceptar']
      });
    });
  }
  crearFormulario()  {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      total_persona: ['', Validators.required]
    });
  }
}
