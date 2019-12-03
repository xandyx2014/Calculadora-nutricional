import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { switchMap, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IRespApi } from '../interfaces/resp.interface';
import { IReceta } from '../interfaces/usuarioReceta.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioRecetaService {
  private url = environment.urlHost;
  constructor(private http: HttpClient,
              private loginService: LoginService) {}

  obtenerUsuarioReceta(): Observable<IRespApi<IReceta>> {
    return this.loginService.getUserLocalStorage().pipe(
      switchMap(usuario =>
      this.http.get< IRespApi<IReceta> >(`${this.url}/usuario/${usuario.id}/receta`)
      )
    );
  }
  buscarReceta(query: string) {
   // /usuario/1/receta/buscar?q=
   return this.loginService.getUserLocalStorage().pipe(
    switchMap(usuario =>
    this.http.get< IRespApi<IReceta> >(`${this.url}/usuario/${usuario.id}/receta/buscar?q=${query}`).pipe(
      debounceTime(500)
    )
    )
  );
  }
  crearReceta(receta: IReceta): Observable<IRespApi<IReceta>> {
    return this.loginService.getUserLocalStorage().pipe(
      switchMap(usuario =>
      this.http.post< IRespApi<IReceta> >(`${this.url}/usuario/${usuario.id}/receta`, receta)
      )
    );
  }
  obtenerReceta(idReceta: string) {
    return this.loginService.getUserLocalStorage().pipe(
      switchMap(usuario =>
      this.http.get< IRespApi<IReceta> >(`${this.url}/usuario/${usuario.id}/receta/${idReceta}`)
      )
    );
  }
  actualizarReceta( receta: IReceta) {
    return this.http.put(`${this.url}/usuario/receta/${receta.id}`, {...receta});
  }
  eliminarReceta(receta: IReceta) {
    return this.http.delete(`${this.url}/usuario/receta/${receta.id}`);
  }
}
