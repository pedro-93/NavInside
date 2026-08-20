export interface Nodo {
  id: string;
  nombre: string;
  x: number;
  y: number;
  tipo: TipoNodo;
}

export type TipoNodo =
  | 'entrada'
  | 'recepcion'
  | 'pasillo'
  | 'ascensor'
  | 'baño'
  | 'habitacion';

export interface Conexion {
  origen: string;
  destino: string;
  distancia: number;
}