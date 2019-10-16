import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list/:id',
    loadChildren: () => import('./pages/list/list.module').then(m => m.ListPageModule)
  },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'valor-nutricional', loadChildren:
   () => import('./pages/valor-nutricional/valor-nutricional.module').then( m => m.ValorNutricionalPageModule) },
  {
    path: 'inventario',
    loadChildren: () => import('./pages/tabs/home/home.module').then(m => m.HomePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
