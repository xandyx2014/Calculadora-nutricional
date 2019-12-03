import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canLoad: [AuthGuard],
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list/:id',
    canLoad: [AuthGuard],
    loadChildren: () => import('./pages/list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  {
    path: 'valor-nutricional/:id',
    canLoad: [AuthGuard],
    loadChildren: () => import('./pages/valor-nutricional/valor-nutricional.module').then( m => m.ValorNutricionalPageModule) },
  {
    path: 'inventario',
    canLoad: [AuthGuard],
    loadChildren: () => import('./pages/tabs/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'configuracion-usuario',
    canLoad: [AuthGuard],
    loadChildren: () => import('./pages/configuracion-usuario/configuracion-usuario.module').then(m => m.ConfiguracionUsuarioPageModule)
  },
  { path: 'favorites', loadChildren: () => import('./pages/favorites/favorites.module').then( m => m.FavoritesPageModule ) },
  {
  path: 'nutricion/:id',
  loadChildren: () => import('./pages/nutricion/nutricion.module').then( ( m) => m.NutricionPageModule ) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
