import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { switchMap, tap } from 'rxjs/operators';
import { IRespApi } from '../interfaces/resp.interface';
import { HttpClient } from '@angular/common/http';
import { IDetalleReceta } from '../interfaces/detalleReceta.interface';

@Injectable({
  providedIn: 'root'
})
export class DetalleRecetaService {
  private url = environment.urlHost;
  constructor(private http: HttpClient,
              private loginService: LoginService) {}
  obtenerDetalleReceta(id: string) {
    return this.http.get< IRespApi<IDetalleReceta> >(`${this.url}/receta/${id}/detalleReceta`);
  }
  crearDetalleReceta(idReceta: string , detalleReceta: IDetalleReceta) {
      return this.http.post< IRespApi<IDetalleReceta> >(`${this.url}/receta/${idReceta}/detalleReceta`, detalleReceta);
  }
  destroyDetalleReceta(idDetalle) {
    return this.http.delete< IRespApi<IDetalleReceta> >(`${this.url}/receta/detalleReceta/${idDetalle}`);
  }
  /*
  actualizarUsuarioCategoria(categoria: ICategoria) {
    return this.loginService.getUserLocalStorage().pipe(
      switchMap(usuario =>
      this.http.put< IRespApi<ICategoria> >(`${this.url}/usuario/${usuario.id}/categoria`, categoria)
      )
    );
  } */
}
