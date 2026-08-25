export type EstadoVersionMapa =
  | 'simulado'
  | 'preliminar'
  | 'oficial';

export interface VersionMapa {
  id: string;
  version: string;
  fechaActualizacion: string;
  estado: EstadoVersionMapa;
  nivelesDisponibles: number[];
  origenDatos: string;
  requiereInternet: boolean;
}