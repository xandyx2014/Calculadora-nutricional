import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ListPage } from './list.page';
import { UrlRecetasPipe } from 'src/app/pipes/url-recetas.pipe';
import { AgregarAlimentoComponent } from './components/agregar-alimento/agregar-alimento.component';
import { ListAlimentoComponent } from './components/list-alimento/list-alimento.component';
import { UrlImgPipe } from 'src/app/pipes/url-img.pipe';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PipesModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListPage
      }
    ])
  ],
  declarations: [ListPage, AgregarAlimentoComponent, ListAlimentoComponent],
  entryComponents: [AgregarAlimentoComponent]
})
export class ListPageModule {}
