import { ICategoria } from './usuarioCategoria.interface';

export interface IAlimento {
  id: number;
  nombre: string;
  categoria_id: number;
  pb_kg: number;
  precio_unidad: number;
  fc: number;
  h_d_c: number;
  prot: number;
  grs: number;
  ca: number;
  fe: number;
  fibra: number;
  na: number;
  potasio: number;
  vitamina_c: number;
  vitamina_a: number;
  vitamina_e: number;
  vitamina_k: number;
  colesterol: number;
  vitamina_b1: number;
  vitamina_b6: number;
  vitamina_b12: number;
  usuario_id: number;
  Categorium?: ICategoria | ICategoria[];
  foto?: any;
  createdAt: string;
  updatedAt: string;
}
