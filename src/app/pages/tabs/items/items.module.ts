import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ItemsPage } from './items.page';
import { ModalCreateComponent } from './components/modal-create/modal-create.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListItemComponent } from './components/list-item/list-item.component';

const routes: Routes = [
  {
    path: '',
    component: ItemsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FlexLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ItemsPage, ModalCreateComponent, ListItemComponent],
  entryComponents: [ModalCreateComponent]
})
export class ItemsPageModule {}
