import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CategoriasPage } from './categorias.page';
import { AddCategoriaPage } from './components/add-categoria/add-categoria.page';
import { CategoriaComponent } from './components/categoria/categoria.component';


const routes: Routes = [
  {
    path: '',
    component: CategoriasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CategoriasPage, AddCategoriaPage, CategoriaComponent],
  entryComponents: [AddCategoriaPage]
})
export class CategoriasPageModule {}
