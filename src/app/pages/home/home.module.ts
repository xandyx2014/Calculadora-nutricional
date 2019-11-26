import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UrlRecetasPipe } from 'src/app/pipes/url-recetas.pipe';
import { AddRecetaComponent } from './components/add-receta/add-receta.component';
import { RecetaComponent } from './components/receta/receta.component';
import { UrlImgPipe } from 'src/app/pipes/url-img.pipe';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { UpdateRecetaComponent } from './components/update-receta/update-receta.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FlexLayoutModule,
    PipesModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [
    HomePage,
    AddRecetaComponent,
    RecetaComponent,
    UpdateRecetaComponent],
  entryComponents: [
    AddRecetaComponent,
    UpdateRecetaComponent
  ]
})
export class HomePageModule { }
