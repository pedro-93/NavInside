export interface Nodo {
  id: string;
  nombre: string;
  x: number;
  y: number;
  tipo: TipoNodo;
  nivel?: number;
  sector?: string;
  accesible?: boolean;
  restringido?: boolean;
}

export type TipoNodo =
  | 'entrada'
  | 'recepcion'
  | 'pasillo'
  | 'ascensor'
  | 'escalera'
  | 'rampa'
  | 'baño'
  | 'habitacion'
  | 'estacionamiento'
  | 'salon'
  | 'piscina'
  | 'restaurante'
  | 'mirador'
  | 'cancha'
  | 'spa'
  | 'gimnasio'
  | 'parque'
  | 'servicio';

export interface Conexion {
  origen: string;
  destino: string;
  distancia: number;
  tipo?: TipoConexion;
  accesible?: boolean;
  restringida?: boolean;
  habilitada?: boolean;
}

export type TipoConexion =
  | 'pasillo'
  | 'ascensor'
  | 'escalera'
  | 'rampa';

export interface LugarPlano {
  id: string;
  nombre: string;
  tipo: TipoNodo;
  nivel: number | null;
  sector: string | null;
  x: number | null;
  y: number | null;
  accesible: boolean | null;
  restringido: boolean | null;
  estado: EstadoDato;
}

export type EstadoDato =
  | 'confirmado'
  | 'pendiente-validacion';