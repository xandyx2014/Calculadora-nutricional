import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConfiguracionUsuarioPage } from './configuracion-usuario.page';
import { ConfigFormComponent } from './components/config-form/config-form.component';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracionUsuarioPage
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
  declarations: [
    ConfiguracionUsuarioPage,
    ConfigFormComponent
  ]
})
export class ConfiguracionUsuarioPageModule {}
