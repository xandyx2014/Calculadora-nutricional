import { NgModule } from '@angular/core';
import { RandomWithPipe } from './random-with.pipe';
import { UrlImgPipe } from './url-img.pipe';
import { UrlRecetasPipe } from './url-recetas.pipe';
import { GetValueObjectPipe } from './get-value-object.pipe';


@NgModule({
  declarations: [RandomWithPipe, UrlImgPipe, UrlRecetasPipe, GetValueObjectPipe],
  imports: [ ],
  exports: [RandomWithPipe, UrlImgPipe, UrlRecetasPipe, GetValueObjectPipe],
  providers: [],
})
export class PipesModule {}
