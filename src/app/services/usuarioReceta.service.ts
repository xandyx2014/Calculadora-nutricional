import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { Usuario } from '../interfaces/usuario.interface';
import { switchMap } from 'rxjs/operators';
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
  crearReceta(receta: IReceta): Observable<IRespApi<IReceta>> {
    return this.loginService.getUserLocalStorage().pipe(
      switchMap(usuario =>
      this.http.post< IRespApi<IReceta> >(`${this.url}/usuario/${usuario.id}/receta`, receta)
      )
    );
  }
}
