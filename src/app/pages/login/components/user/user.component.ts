import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, LoadingController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { filter } from 'minimatch';
import { async } from 'q';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private notificationService: NotificationService,
              private loadingController: LoadingController,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.crearFormulario();
  }
  async crearUsuario() {
    const loading = await this.loadingController.create({
      message: 'Cargando..'
    });
    this.usuarioService.crearUsuario({...this.form.value})
    .pipe(
      catchError( ( err ) => {
        loading.dismiss();
        this.notificationService.presentAlert({
          header: 'Ups',
          subHeader: 'Ha ocurrido un error creando el usuario',
          buttons: ['Aceptar']
        });
        this.form.reset();
        this.modalCtrl.dismiss();
        return throwError(err);
      }),
      tap(async (resp) => {
        await loading.dismiss();
        // tslint:disable-next-line: no-string-literal
        if (resp['ok'] === false) {
          await this.notificationService.presentAlert({
            header: 'Ups',
            subHeader: resp.message,
            buttons: ['Aceptar']
          });
        }
      }),
    )
    .subscribe(async (resp) => {
      await loading.dismiss();
      if (resp.ok === true) {
        await this.notificationService.presentAlert({
          header: 'Creado Exitosamente',
          // tslint:disable-next-line: no-string-literal
          subHeader: `${resp.data['username']} ha sido creado`,
          buttons: ['Aceptar']
        });
      }
      await this.modalCtrl.dismiss();
      this.form.reset();
    });
  }
  crearFormulario() {
    this.form = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
        nombre: ['', Validators.required],
        apellidos: ['', Validators.required],
        sexo: ['', Validators.required],
      }
    );
  }
  quitarEspacios(item) {
    this.form.patchValue({ [item.srcElement.name]: item.detail.value.trim() });
  }
}
