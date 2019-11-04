import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AgregarAlimentoComponent } from './components/agregar-alimento/agregar-alimento.component';
import { flatMap, map } from 'rxjs/operators';
import { DetalleRecetaService } from 'src/app/services/detalle-receta.service';
import { IDetalleReceta } from 'src/app/interfaces/detalleReceta.interface';
import { Observable } from 'rxjs';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { IReceta } from 'src/app/interfaces/usuarioReceta.interface';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  imagenPreview: any;
  receta: any;
  public $detalleReceta: Observable<IDetalleReceta[] | IDetalleReceta>;
  private idReceta: number;
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
              private modalController: ModalController,
              private activatedRoute: ActivatedRoute,
              private detalleRecetaService: DetalleRecetaService,
              private uploadFileService: UploadFileService) {
  }
  ionViewWillEnter() {
    this.obtenerDatos();
  }
  obtenerDatos() {
    this.$detalleReceta = this.activatedRoute.queryParams.pipe(
      flatMap( (receta) => {
        this.receta = receta;
        this.imagenPreview = receta.foto;
        return this.activatedRoute.params;
      }),
      flatMap(({id}) => {
        this.idReceta = id;
        return this.detalleRecetaService.obtenerDetalleReceta(id);
      }),
      map(resp =>  resp.data)
    );
  }
  async obtenerImagen(file) {
    this.imagenPreview = await this.uploadFileService.fileProgress(this.idReceta, file);
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: AgregarAlimentoComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        id: this.idReceta
      }
    });
    modal.onDidDismiss().then( () => {
      this.obtenerDatos();
    } );
    return await modal.present();
  }
  irPagina() {
    this.router.navigate(['/valor-nutricional']);
  }
  ngOnInit() {
  }
}
