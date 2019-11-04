import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { IAlimento } from 'src/app/interfaces/usuario_alimento.interface';
import { ModalController } from '@ionic/angular';
import { ModalCreateComponent } from '../modal-create/modal-create.component';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() alimentos: IAlimento[] = [];
  @Output() requestComplete = new EventEmitter<void>();
  constructor(private modalController: ModalController) { }

  ngOnInit() {}
  async presentModal(alimento: IAlimento) {
    const modal = await this.modalController.create({
      component: ModalCreateComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        ...alimento,
        actualizar: true
      }
    });
    modal.onDidDismiss().then(() => {
      this.requestComplete.emit();
      console.log( 'cerrar modal' );
    });
    return await modal.present();
  }
  crearPdf() {
    const doc = new jsPDF();
    /* doc.setFontSize(22);
    doc.text('This is a title', 20, 20); */
    doc.fromHTML(document.getElementById('obrz'), 15, 15, {
      width: 170
   }, () => {
      doc.save('sample-file.pdf');
   });
  /*   doc.setFontSize(16);
    doc.text('This is some normal sized text underneath.', 20, 30);
    doc.save('obrz.pdf'); */
  }
}
