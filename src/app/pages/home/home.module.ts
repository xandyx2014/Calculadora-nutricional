import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UrlRecetasPipe } from 'src/app/pipes/url-recetas.pipe';
import { AddRecetaComponent } from './components/add-receta/add-receta.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlexLayoutModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, UrlRecetasPipe, AddRecetaComponent],
  entryComponents: [AddRecetaComponent]
})
export class HomePageModule {}
