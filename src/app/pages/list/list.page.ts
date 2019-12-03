import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AgregarAlimentoComponent } from './components/agregar-alimento/agregar-alimento.component';
import { flatMap, map, tap } from 'rxjs/operators';
import { DetalleRecetaService } from 'src/app/services/detalle-receta.service';
import { IDetalleReceta } from 'src/app/interfaces/detalleReceta.interface';
import { Observable } from 'rxjs';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { IReceta } from 'src/app/interfaces/usuarioReceta.interface';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private tamagnoArray = [];
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
  constructor(
    private router: Router,
    private modalController: ModalController,
    private notificacionService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private detalleRecetaService: DetalleRecetaService,
    private uploadFileService: UploadFileService) {
  }
  ionViewWillEnter() {
    this.obtenerDatos();
  }
  obtenerDatos() {
    this.$detalleReceta = this.activatedRoute.queryParams.pipe(
      flatMap((receta) => {
        this.receta = receta;
        this.imagenPreview = receta.foto;
        return this.activatedRoute.params;
      }),
      flatMap(({ id }) => {
        this.idReceta = id;
        return this.detalleRecetaService.obtenerDetalleReceta(id).pipe(
          map(item => {
            const calculo = this.calcularDatos(item.data);
            this.tamagnoArray = calculo;
            return {
              ...item,
              data: calculo
            };
          })
        );
      }),
      map(resp => resp.data)
    );
  }
  calcularDatos(receta: any) {
    const calculoReceta = receta.map(item => {
      const cantidad = Number(item.cantidad);
      const precioUnidad = Number(item.Alimento.precio_unidad);
      const total = cantidad * precioUnidad;
      const fc = Number(item.Alimento.fc);
      const pnKg = (cantidad / fc);
      const pnRacDia = ((pnKg / 1) / 1);
      // calculo principal
      // (pracGramo * valorNutricional) / 100
      const pracGramo = pnRacDia * 1000;
      return {
        ...item,
        Alimento: {
          ...item.Alimento,
          total,
          na: this.calculoNutricion(pracGramo, item.Alimento.na),
          ca: this.calculoNutricion(pracGramo, item.Alimento.ca),
          colesterol: this.calculoNutricion(pracGramo, item.Alimento.colesterol),
          fe: this.calculoNutricion(pracGramo, item.Alimento.fe),
          fibra: this.calculoNutricion(pracGramo, item.Alimento.fibra),
          grs: this.calculoNutricion(pracGramo, item.Alimento.grs),
          h_d_c: this.calculoNutricion(pracGramo, item.Alimento.h_d_c),
          potasio: this.calculoNutricion(pracGramo, item.Alimento.potasio),
          prot: this.calculoNutricion(pracGramo, item.Alimento.prot),
          vitamina_a: this.calculoNutricion(pracGramo, item.Alimento.vitamina_a),
          vitamina_b1: this.calculoNutricion(pracGramo, item.Alimento.vitamina_b1),
          vitamina_b6: this.calculoNutricion(pracGramo, item.Alimento.vitamina_b6),
          vitamina_b12: this.calculoNutricion(pracGramo, item.Alimento.vitamina_b12),
          vitamina_c: this.calculoNutricion(pracGramo, item.Alimento.vitamina_c),
          vitamina_e: this.calculoNutricion(pracGramo, item.Alimento.vitamina_e),
          vitamina_k: this.calculoNutricion(pracGramo, item.Alimento.vitamina_k)
        }
      };
    });
    return calculoReceta;
  }
  calculoNutricion(pracGramo, valorNutricional) {
    return ((Number(pracGramo) * Number(valorNutricional)) / 100);
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
    modal.onDidDismiss().then(() => {
      this.obtenerDatos();
    });
    return await modal.present();
  }
  verValorNutricional() {
    if (this.tamagnoArray.length > 0) {
    this.router.navigate(['/nutricion', this.idReceta], { queryParams: { total_persona: this.receta.total_persona } });
    } else {
      this.notificacionService.presentToast('No hay datos para mostrar', 'top');
    }
  }
  irPagina() {
    this.router.navigate(['/valor-nutricional']);
  }
  ngOnInit() {
  }
}
