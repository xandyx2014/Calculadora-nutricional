import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioAlimentoService } from 'src/app/services/usuario-alimento.service';
import { Observable, throwError } from 'rxjs';
import { IAlimento } from 'src/app/interfaces/usuario_alimento.interface';
import { map, tap, filter, flatMap, catchError } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { DetalleRecetaService } from 'src/app/services/detalle-receta.service';
import { async } from 'q';

@Component({
  selector: 'app-agregar-alimento',
  templateUrl: './agregar-alimento.component.html',
  styleUrls: ['./agregar-alimento.component.scss'],
})
export class AgregarAlimentoComponent implements OnInit {
  form: FormGroup;
  @Input() id: string;
  $alimentos: Observable<IAlimento | IAlimento[]>;
  constructor(private modalCtrl: ModalController,
              private usuarioAlimentoService: UsuarioAlimentoService,
              private detalleRecetaService: DetalleRecetaService,
              private notificationService: NotificationService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.obtenerUsuarioAlimento();
    this.crearFormulario();
  }
  crearFormulario() {
    this.form = this.fb.group({
      cantidad: [0, Validators.required],
      alimento_id: [null, Validators.required]
    });
  }
  obtenerUsuarioAlimento() {
    this.$alimentos = this.usuarioAlimentoService.obtenerUsuarioAlimento()
      .pipe(
        filter( resp => resp !== null),
        map(resp => resp.data),
        tap( (resp: any[]) => {
          if (resp.length === 0) {
            this.notificarUsuario();
          }
        })
        );
  }
  notificarUsuario() {
    this.notificationService.presentAlert({
      header: 'No existen Alimentos',
      subHeader: 'cree un Alimento',
      buttons: [
        {
          text: 'Aceptar',
          cssClass: 'secondary',
          handler: async () => {
            await this.modalCtrl.dismiss();
            await this.router.navigate(['/inventario/items']);
          }
        }
      ]
    });
  }
  crear() {
    this.detalleRecetaService.crearDetalleReceta(this.id, {
      ...this.form.value,
      cantidad: (this.form.value.cantidad / 1000)})
    .pipe(
      catchError( ( respError ) => {
        this.notificationService.presentAlert({
          header: `${respError.error.message}`,
          subHeader: 'para agregar a la receta',
          buttons: [{
            text: 'Aceptar',
            handler: (  ) => {
              this.modalCtrl.dismiss();
            }
          }]
        });
        return throwError(respError);
      }),
      filter( ( resp ) => resp.ok === true )
    )
    .subscribe( async ( resp ) => {
      await this.modalCtrl.dismiss();
      await this.notificationService.presentToast('Añadido Correctamente', 'bottom');
      /**/
    });
  }
}
