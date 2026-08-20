import { Conexion, Nodo } from '../models/nodo.model';

export const NODOS_SIMULADOS: Nodo[] = [
  {
    id: 'entrada',
    nombre: 'Entrada',
    x: 0,
    y: 0,
    tipo: 'entrada'
  },
  {
    id: 'recepcion',
    nombre: 'Recepción',
    x: 2,
    y: 0,
    tipo: 'recepcion'
  },
  {
    id: 'pasillo',
    nombre: 'Pasillo principal',
    x: 5,
    y: 0,
    tipo: 'pasillo'
  },
  {
    id: 'habitacion-101',
    nombre: 'Habitación 101',
    x: 9,
    y: 0,
    tipo: 'habitacion'
  },
  {
    id: 'baño',
    nombre: 'Baño',
    x: 5,
    y: 3,
    tipo: 'baño'
  },
  {
    id: 'ascensor',
    nombre: 'Ascensor',
    x: 5,
    y: 6,
    tipo: 'ascensor'
  }
];

export const CONEXIONES_SIMULADAS: Conexion[] = [
  {
    origen: 'entrada',
    destino: 'recepcion',
    distancia: 2
  },
  {
    origen: 'recepcion',
    destino: 'pasillo',
    distancia: 3
  },
  {
    origen: 'pasillo',
    destino: 'habitacion-101',
    distancia: 4
  },
  {
    origen: 'pasillo',
    destino: 'baño',
    distancia: 3
  },
  {
    origen: 'baño',
    destino: 'ascensor',
    distancia: 3
  },
  {
    origen: 'recepcion',
    destino: 'baño',
    distancia: 5
  }
];