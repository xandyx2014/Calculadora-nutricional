import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { switchMap } from 'rxjs/operators';
import { IRespApi } from '../interfaces/resp.interface';
import { ICategoria } from '../interfaces/usuarioCategoria.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioCategoriaService {
  private url = environment.urlHost;
  constructor(private http: HttpClient,
              private loginService: LoginService) {}
  obtenerUsuarioCategoria() {
    return this.loginService.getUserLocalStorage().pipe(
      switchMap(usuario =>
      this.http.get< IRespApi<ICategoria> >(`${this.url}/usuario/${usuario.id}/categoria`)
      ));
  }
  crearUsuarioReceta(categoria: ICategoria) {
    return this.loginService.getUserLocalStorage().pipe(
      switchMap(usuario => {
        return this.http.post< IRespApi<ICategoria> >(`${this.url}/usuario/${usuario.id}/categoria`, categoria);
      })
    );
  }
  actualizarUsuarioCategoria(categoria: ICategoria) {
    return this.loginService.getUserLocalStorage().pipe(
      switchMap(usuario =>
      this.http.put< IRespApi<ICategoria> >(`${this.url}/usuario/${usuario.id}/categoria`, categoria)
      )
    );
  }
}
