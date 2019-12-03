import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NutricionPage } from './nutricion.page';
import { ListNutricionComponent } from './components/list-nutricion/list-nutricion.component';
import { GraficaComponent } from './components/grafica/grafica.component';
import { ListGraficaComponent } from './components/list-grafica/list-grafica.component';
import { ChartsModule } from 'ng2-charts';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RadarGraficaComponent } from './components/radar-grafica/radar-grafica.component';
const routes: Routes = [
  {
    path: '',
    component: NutricionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartsModule,
    PipesModule,
    FlexLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    NutricionPage,
    ListNutricionComponent,
    GraficaComponent,
    ListGraficaComponent,
    RadarGraficaComponent
  ]
})
export class NutricionPageModule {}
