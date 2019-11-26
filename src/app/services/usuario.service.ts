import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IRespApi } from '../interfaces/resp.interface';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  crearUsuario(usuario) {
    return this.http.post<IRespApi<Usuario>>(`${environment.urlHost}/usuario/login`, {...usuario});
  }
}
