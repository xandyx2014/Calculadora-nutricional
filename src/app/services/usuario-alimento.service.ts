import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { switchMap } from 'rxjs/operators';
import { IRespApi } from '../interfaces/resp.interface';
import { IAlimento } from '../interfaces/usuario_alimento.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAlimentoService {
  private url = environment.urlHost;
  constructor(private http: HttpClient,
              private loginService: LoginService) {}
  obtenerUsuarioAlimento() {
    return this.loginService.getUserLocalStorage().pipe(
      switchMap(usuario =>
      this.http.get< IRespApi<IAlimento> >(`${this.url}/usuario/${usuario.id}/alimento`)
      ));
  }
  obtenerAlimento(id: string) {
    return this.http.get< IRespApi<IAlimento> >(`${this.url}/usuario/alimento/${id}`);
  }
  crearUsuarioAlimento(alimento: IAlimento) {
    return this.loginService.getUserLocalStorage().pipe(
      switchMap(usuario => {
        alimento = {...alimento, usuario_id: usuario.id};
        return  this.http.post< IRespApi<IAlimento> >(`${this.url}/usuario/${usuario.id}/alimento`, alimento);
      }
      )
    );
  }
  actualizarUsuarioAlimento(categoria: IAlimento) {
    return this.loginService.getUserLocalStorage().pipe(
      switchMap(usuario =>
      this.http.put< IRespApi<IAlimento> >(`${this.url}/usuario/${usuario.id}/alimento`, categoria)
      )
    );
  }
}
