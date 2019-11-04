import { NgModule } from '@angular/core';
import { RandomWithPipe } from './random-with.pipe';
import { UrlImgPipe } from './url-img.pipe';
import { UrlRecetasPipe } from './url-recetas.pipe';


@NgModule({
  declarations: [RandomWithPipe, UrlImgPipe, UrlRecetasPipe],
  imports: [ ],
  exports: [RandomWithPipe, UrlImgPipe, UrlRecetasPipe],
  providers: [],
})
export class PipesModule {}