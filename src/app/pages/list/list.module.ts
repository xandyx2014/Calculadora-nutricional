import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ListPage } from './list.page';
import { UrlRecetasPipe } from 'src/app/pipes/url-recetas.pipe';
import { AgregarAlimentoComponent } from './components/agregar-alimento/agregar-alimento.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListPage
      }
    ])
  ],
  declarations: [ListPage, AgregarAlimentoComponent],
  entryComponents: [AgregarAlimentoComponent]
})
export class ListPageModule {}
