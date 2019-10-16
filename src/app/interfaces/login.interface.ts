import { Usuario } from './usuario.interface';

export interface RespLogin {
  ok: boolean;
  data: Usuario;
  token: string;
}

