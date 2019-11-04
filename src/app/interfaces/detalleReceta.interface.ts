import { IAlimento } from './usuario_alimento.interface';

export interface IDetalleReceta {
  id: number;
  cantidad: number;
  receta_id: number;
  alimento_id: number;
  createdAt: string;
  updatedAt: string;
  Alimento?: IAlimento;
}
