import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioCategoriaService } from 'src/app/services/usuario-categoria.service';
import { map, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { ICategoria } from 'src/app/interfaces/usuarioCategoria.interface';
import { ModalController, NavParams } from '@ionic/angular';
import { UsuarioAlimentoService } from 'src/app/services/usuario-alimento.service';
import { IAlimento } from 'src/app/interfaces/usuario_alimento.interface';
@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.scss'],
})
export class ModalCreateComponent implements OnInit {
  form: FormGroup;
  ok = false;
  categorias: ICategoria[];
  constructor(private fb: FormBuilder,
              private usuarioCategoriaService: UsuarioCategoriaService,
              private modalController: ModalController,
              private router: Router,
              private notificationService: NotificationService,
              private navParams: NavParams,
              private UsuarioComidaService: UsuarioAlimentoService) { }

  ngOnInit() {
    this.usuarioCategoriaService.obtenerUsuarioCategoria()
      .pipe(
        filter(item => item !== null),
        map(item => item.data)
        ).subscribe( ( categorias: ICategoria[] ) => {
        this.categorias = categorias;
        if (categorias.length === 0) {
          this.notificationService.presentAlert({
            header: 'Informacion',
            subHeader: 'Necesitas crear una Categoria',
            buttons: [
              {
                text: 'Aceptar',
                cssClass: 'primary',
                handler: async () => {
                  await this.modalController.dismiss();
                  await this.router.navigate(['/inventario/categorias']);
                }
              }
            ],
          });
        } else {
          this.ok = true;
          this.crearFormulario();
        }
      });
  }
  formularioBoton() {
    return this.navParams.get('actualizar') === undefined;
  }
  tomarFoto() {
  }
  actualizarComida() {
    this.UsuarioComidaService.actualizarUsuarioAlimento({
      ...this.form.value,
      id: this.navParams.get('id')
    }).pipe(
      filter( alimento => alimento !== null),
      map(item => item.data)
    ).subscribe(async (item) => {
      await this.modalController.dismiss();
      this.notificationService.presentAlert({
        // tslint:disable-next-line: no-string-literal
        header: `${this.form.value.nombre}`,
        subHeader: 'Actualizado exitosamente',
        mode: 'md',
        buttons: ['Aceptar']
      });
      this.form.reset();
    });
  }
  crearFormulario() {
    const alimento = this.navParams.data as IAlimento ;
    this.form = this.fb.group({
      nombre: [alimento.nombre || 'Alimento nombre', Validators.required],
      categoria_id: [ alimento.categoria_id || '', Validators.required],
      pb_kg: [ alimento.pb_kg || 0, [Validators.required]],
      precio_unidad: [alimento.precio_unidad || 0, Validators.required],
      fc: [alimento.fc || 0, Validators.min(0)] ,
      h_d_c: [alimento.h_d_c || 0, Validators.min(0)] ,
      prot: [alimento.prot || 0, Validators.min(0)] ,
      grs: [alimento.grs || 0, Validators.min(0)] ,
      ca: [alimento.ca || 0, Validators.min(0)] ,
      fe: [alimento.fe || 0, Validators.min(0)] ,
      fibra: [alimento.fibra || 0, Validators.min(0)] ,
      na: [alimento.na || 0, Validators.min(0)] ,
      potasio: [alimento.potasio || 0, Validators.min(0)] ,
      vitamina_c: [alimento.vitamina_c || 0, Validators.min(0)] ,
      vitamina_a: [alimento.vitamina_a || 0, Validators.min(0)] ,
      vitamina_e: [alimento.vitamina_e || 0, Validators.min(0)] ,
      vitamina_k: [alimento.vitamina_k || 0, Validators.min(0)] ,
      colesterol: [alimento.colesterol || 0, Validators.min(0)] ,
      vitamina_b1: [alimento.vitamina_b1 || 0, Validators.min(0)] ,
      vitamina_b6: [alimento.vitamina_b6 || 0, Validators.min(0)] ,
      vitamina_b12: [alimento.vitamina_b12 || 0, Validators.min(0) ]
    });
  }
  crear() {
    this.UsuarioComidaService.crearUsuarioAlimento({
      ...this.form.value
    }).pipe(
      filter( alimento => alimento !== null),
      map(item => item.data)
    ).subscribe(async ( item ) => {
      await this.modalController.dismiss();
      this.notificationService.presentAlert({
        // tslint:disable-next-line: no-string-literal
        header: `${item['nombre']}`,
        subHeader: 'Creado exitosamente',
        mode: 'md',
        buttons: ['Aceptar']
      });
      this.form.reset();
    });
  }
  verArchivo(e) {
    console.log( e.target.files[0] as File );
  }
}
