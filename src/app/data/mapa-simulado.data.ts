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
    tipo: 'entrada',
    nivel: 1,
    accesible: true,
    restringido: false
  },
  {
    id: 'recepcion',
    nombre: 'Recepción',
    x: 2,
    y: 0,
    tipo: 'recepcion',
    nivel: 1,
    accesible: true,
    restringido: false
  },
  {
    id: 'pasillo',
    nombre: 'Pasillo principal',
    x: 5,
    y: 0,
    tipo: 'pasillo',
    nivel: 1,
    accesible: true,
    restringido: false
  },
  {
    id: 'habitacion-101',
    nombre: 'Habitación 101',
    x: 9,
    y: 0,
    tipo: 'habitacion',
    nivel: 1,
    accesible: true,
    restringido: false
  },
  {
    id: 'baño',
    nombre: 'Baño',
    x: 5,
    y: 3,
    tipo: 'baño',
    nivel: 1,
    accesible: true,
    restringido: false
  },
  {
    id: 'ascensor',
    nombre: 'Ascensor nivel 1',
    x: 5,
    y: 6,
    tipo: 'ascensor',
    nivel: 1,
    accesible: true,
    restringido: false
  },
  {
    id: 'escalera-nivel-1',
    nombre: 'Escalera nivel 1',
    x: 7,
    y: 0,
    tipo: 'escalera',
    nivel: 1,
    accesible: false,
    restringido: false
  },
  {
    id: 'ascensor-nivel-3',
    nombre: 'Ascensor nivel 3',
    x: 5,
    y: 6,
    tipo: 'ascensor',
    nivel: 3,
    accesible: true,
    restringido: false
  },
  {
    id: 'escalera-nivel-3',
    nombre: 'Escalera nivel 3',
    x: 7,
    y: 0,
    tipo: 'escalera',
    nivel: 3,
    accesible: false,
    restringido: false
  },
  {
    id: 'pasillo-nivel-3',
    nombre: 'Pasillo nivel 3',
    x: 5,
    y: 3,
    tipo: 'pasillo',
    nivel: 3,
    accesible: true,
    restringido: false
  },
  {
    id: 'salon-nivel-3',
    nombre: 'Salón nivel 3',
    x: 9,
    y: 3,
    tipo: 'salon',
    nivel: 3,
    accesible: true,
    restringido: false
  }
];

export const CONEXIONES_SIMULADAS: Conexion[] = [
  {
    origen: 'entrada',
    destino: 'recepcion',
    distancia: 2,
    tipo: 'pasillo',
    accesible: true,
    restringida: false,
    habilitada: true
  },
  {
    origen: 'recepcion',
    destino: 'pasillo',
    distancia: 3,
    tipo: 'pasillo',
    accesible: true,
    restringida: false,
    habilitada: true
  },
  {
    origen: 'pasillo',
    destino: 'habitacion-101',
    distancia: 4,
    tipo: 'pasillo',
    accesible: true,
    restringida: false,
    habilitada: true
  },
  {
    origen: 'pasillo',
    destino: 'baño',
    distancia: 3,
    tipo: 'pasillo',
    accesible: true,
    restringida: false,
    habilitada: true
  },
  {
    origen: 'baño',
    destino: 'ascensor',
    distancia: 3,
    tipo: 'pasillo',
    accesible: true,
    restringida: false,
    habilitada: true
  },
  {
    origen: 'recepcion',
    destino: 'baño',
    distancia: 5,
    tipo: 'pasillo',
    accesible: true,
    restringida: false,
    habilitada: true
  },
  {
    origen: 'pasillo',
    destino: 'escalera-nivel-1',
    distancia: 1,
    tipo: 'pasillo',
    accesible: false,
    restringida: false,
    habilitada: true
  },
  {
    origen: 'escalera-nivel-1',
    destino: 'escalera-nivel-3',
    distancia: 2,
    tipo: 'escalera',
    accesible: false,
    restringida: false,
    habilitada: true
  },
  {
    origen: 'escalera-nivel-3',
    destino: 'pasillo-nivel-3',
    distancia: 1,
    tipo: 'pasillo',
    accesible: false,
    restringida: false,
    habilitada: true
  },
  {
    origen: 'ascensor',
    destino: 'ascensor-nivel-3',
    distancia: 3,
    tipo: 'ascensor',
    accesible: true,
    restringida: false,
    habilitada: true
  },
  {
    origen: 'ascensor-nivel-3',
    destino: 'pasillo-nivel-3',
    distancia: 1,
    tipo: 'pasillo',
    accesible: true,
    restringida: false,
    habilitada: true
  },
  {
    origen: 'pasillo-nivel-3',
    destino: 'salon-nivel-3',
    distancia: 4,
    tipo: 'pasillo',
    accesible: true,
    restringida: false,
    habilitada: true
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