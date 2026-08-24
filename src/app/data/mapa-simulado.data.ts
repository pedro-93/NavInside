import {
  Conexion,
  LugarPlano,
  Nodo
} from '../models/nodo.model';

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

/*
 * Lugares identificados visualmente en el plano de orientación.
 *
 * Todavía no forman parte del grafo de navegación porque faltan
 * los planos restantes, medidas, coordenadas y validación oficial.
 */
export const LUGARES_HIPPOCAMPUS_PRELIMINARES:
  LugarPlano[] = [
    {
      id: 'recepcion',
      nombre: 'Recepción',
      tipo: 'recepcion',
      nivel: null,
      sector: null,
      x: null,
      y: null,
      accesible: null,
      restringido: null,
      estado: 'confirmado'
    },
    {
      id: 'lobby',
      nombre: 'Lobby',
      tipo: 'servicio',
      nivel: null,
      sector: null,
      x: null,
      y: null,
      accesible: null,
      restringido: null,
      estado: 'confirmado'
    },
    {
      id: 'estacionamiento',
      nombre: 'Estacionamiento',
      tipo: 'estacionamiento',
      nivel: null,
      sector: null,
      x: null,
      y: null,
      accesible: null,
      restringido: null,
      estado: 'confirmado'
    },
    {
      id: 'piscina-temperada',
      nombre: 'Piscina temperada',
      tipo: 'piscina',
      nivel: null,
      sector: null,
      x: null,
      y: null,
      accesible: null,
      restringido: null,
      estado: 'confirmado'
    },
    {
      id: 'piscina-exterior',
      nombre: 'Piscina exterior',
      tipo: 'piscina',
      nivel: null,
      sector: null,
      x: null,
      y: null,
      accesible: null,
      restringido: null,
      estado: 'confirmado'
    },
    {
      id: 'restaurante-faro',
      nombre: 'Restaurante Faro',
      tipo: 'restaurante',
      nivel: null,
      sector: null,
      x: null,
      y: null,
      accesible: null,
      restringido: null,
      estado: 'confirmado'
    },
    {
      id: 'mirador',
      nombre: 'Mirador',
      tipo: 'mirador',
      nivel: null,
      sector: null,
      x: null,
      y: null,
      accesible: null,
      restringido: null,
      estado: 'confirmado'
    },
    {
      id: 'canchas',
      nombre: 'Canchas',
      tipo: 'cancha',
      nivel: null,
      sector: null,
      x: null,
      y: null,
      accesible: null,
      restringido: null,
      estado: 'confirmado'
    },
    {
      id: 'spa',
      nombre: 'Spa',
      tipo: 'spa',
      nivel: null,
      sector: null,
      x: null,
      y: null,
      accesible: null,
      restringido: null,
      estado: 'confirmado'
    },
    {
      id: 'gimnasio',
      nombre: 'Gimnasio',
      tipo: 'gimnasio',
      nivel: null,
      sector: null,
      x: null,
      y: null,
      accesible: null,
      restringido: null,
      estado: 'confirmado'
    },
    {
      id: 'parque',
      nombre: 'Parque',
      tipo: 'parque',
      nivel: null,
      sector: null,
      x: null,
      y: null,
      accesible: null,
      restringido: null,
      estado: 'confirmado'
    },
    {
      id: 'ascensor-central',
      nombre: 'Ascensor edificio central',
      tipo: 'ascensor',
      nivel: null,
      sector: null,
      x: null,
      y: null,
      accesible: null,
      restringido: null,
      estado: 'confirmado'
    },
    {
      id: 'ascensor-habitaciones',
      nombre: 'Ascensor edificio habitaciones',
      tipo: 'ascensor',
      nivel: null,
      sector: null,
      x: null,
      y: null,
      accesible: null,
      restringido: null,
      estado: 'confirmado'
    },
    {
      id: 'salon-costamar',
      nombre: 'Salón Costamar',
      tipo: 'salon',
      nivel: null,
      sector: null,
      x: null,
      y: null,
      accesible: null,
      restringido: null,
      estado: 'confirmado'
    },
    {
      id: 'salon-vistamar',
      nombre: 'Salón Vistamar',
      tipo: 'salon',
      nivel: null,
      sector: null,
      x: null,
      y: null,
      accesible: null,
      restringido: null,
      estado: 'confirmado'
    },
    {
      id: 'salon-terramar',
      nombre: 'Salón Terramar',
      tipo: 'salon',
      nivel: null,
      sector: null,
      x: null,
      y: null,
      accesible: null,
      restringido: null,
      estado: 'confirmado'
    },
    {
      id: 'salon-montemar',
      nombre: 'Salón Montemar',
      tipo: 'salon',
      nivel: null,
      sector: null,
      x: null,
      y: null,
      accesible: null,
      restringido: null,
      estado: 'confirmado'
    }
  ];