import {
  Conexion,
  LugarPlano,
  MapaNavegacion,
  Nodo
} from '../models/nodo.model';

/*
 * Coordenadas esquemáticas para visualizar el grafo.
 * Las distancias navegables provienen del levantamiento en terreno.
 */
export const NODOS_HIPPOCAMPUS: Nodo[] = [
  {
    id: 'entrada-nivel-4',
    nombre: 'Entrada',
    x: 0,
    y: 0,
    tipo: 'entrada',
    nivel: 4,
    accesible: true,
    restringido: false
  },
  {
    id: 'recepcion-turismo-vina-nivel-4',
    nombre: 'Recepción Turismo Viña',
    x: 2,
    y: -2,
    tipo: 'recepcion',
    nivel: 4,
    accesible: true,
    restringido: false
  },
  {
    id: 'recepcion-resort-nivel-4',
    nombre: 'Recepción Resort',
    x: 2,
    y: 2,
    tipo: 'recepcion',
    nivel: 4,
    accesible: true,
    restringido: false
  },
  {
    id: 'ascensor-central-nivel-4',
    nombre: 'Ascensor Central - Nivel 4',
    x: 4,
    y: 0,
    tipo: 'ascensor',
    nivel: 4,
    accesible: true,
    restringido: false
  },
  {
    id: 'puerta-exterior-derecha-nivel-4',
    nombre: 'Puerta Exterior Derecha',
    x: 4,
    y: -3,
    tipo: 'entrada',
    nivel: 4,
    restringido: false
  },
  {
    id: 'puerta-exterior-izquierda-nivel-4',
    nombre: 'Puerta Exterior Izquierda',
    x: 4,
    y: 3,
    tipo: 'entrada',
    nivel: 4,
    restringido: false
  },
  {
    id: 'acceso-escalera-derecha-nivel-3',
    nombre: 'Acceso Nivel 3 - Escalera Derecha',
    x: 1,
    y: -3,
    tipo: 'escalera',
    nivel: 3,
    accesible: false,
    restringido: false
  },
  {
    id: 'acceso-escalera-izquierda-nivel-3',
    nombre: 'Acceso Nivel 3 - Escalera Izquierda',
    x: 1,
    y: 3,
    tipo: 'escalera',
    nivel: 3,
    accesible: false,
    restringido: false
  },
  {
    id: 'ascensor-central-nivel-3',
    nombre: 'Salida Ascensor Central - Nivel 3',
    x: 4,
    y: 0,
    tipo: 'ascensor',
    nivel: 3,
    accesible: true,
    restringido: false
  },
  {
    id: 'piscina-acceso-escalones-nivel-3',
    nombre: 'Piscina - Acceso por Escalones',
    x: 7,
    y: -3,
    tipo: 'piscina',
    nivel: 3,
    accesible: false,
    restringido: false
  },
  {
    id: 'piscina-acceso-accesible-nivel-3',
    nombre: 'Piscina - Acceso Accesible',
    x: 7,
    y: -1,
    tipo: 'piscina',
    nivel: 3,
    accesible: true,
    restringido: false
  },
  {
    id: 'piscina-temperada-nivel-3',
    nombre: 'Piscina Temperada',
    x: 7,
    y: 1,
    tipo: 'piscina',
    nivel: 3,
    restringido: false
  },
  {
    id: 'restaurant-faro-nivel-3',
    nombre: 'Restaurant Faro',
    x: 7,
    y: 3,
    tipo: 'restaurante',
    nivel: 3,
    restringido: false
  },
  {
    id: 'canchas-tenis-nivel-3',
    nombre: 'Canchas de Tenis',
    x: 7,
    y: 5,
    tipo: 'cancha',
    nivel: 3,
    accesible: false,
    restringido: false
  },
  {
    id: 'ascensor-central-nivel-1',
    nombre: 'Salida Ascensor Central - Nivel 1',
    x: 0,
    y: 0,
    tipo: 'ascensor',
    nivel: 1,
    accesible: true,
    restringido: false
  },
  {
    id: 'zona-kid-nivel-1',
    nombre: 'Zona Kid',
    x: 2,
    y: -4,
    tipo: 'servicio',
    nivel: 1,
    restringido: false
  },
  {
    id: 'zona-juego-adulto-nivel-1',
    nombre: 'Zona Juego Adulto',
    x: 2,
    y: -2,
    tipo: 'servicio',
    nivel: 1,
    restringido: false
  },
  {
    id: 'zona-play-nivel-1',
    nombre: 'Zona Play',
    x: 2,
    y: 0,
    tipo: 'servicio',
    nivel: 1,
    restringido: false
  },
  {
    id: 'hall-nivel-1',
    nombre: 'Hall',
    x: 4,
    y: 0,
    tipo: 'pasillo',
    nivel: 1,
    restringido: false
  },
  {
    id: 'mini-market-proa-nivel-1',
    nombre: 'Mini Market Proa',
    x: 7,
    y: -4,
    tipo: 'servicio',
    nivel: 1,
    restringido: false
  },
  {
    id: 'gimnasio-nivel-1',
    nombre: 'Gimnasio',
    x: 7,
    y: -2,
    tipo: 'gimnasio',
    nivel: 1,
    restringido: false
  },
  {
    id: 'salon-eventos-montemar-nivel-1',
    nombre: 'Salón Eventos Montemar',
    x: 7,
    y: 0,
    tipo: 'salon',
    nivel: 1,
    restringido: false
  },
  {
    id: 'salon-eventos-terramar-nivel-1',
    nombre: 'Salón Eventos Terramar',
    x: 7,
    y: 2,
    tipo: 'salon',
    nivel: 1,
    restringido: false
  },
  {
    id: 'alma-spa-nivel-1',
    nombre: 'Alma Spa',
    x: 7,
    y: 4,
    tipo: 'spa',
    nivel: 1,
    restringido: false
  },
  {
    id: 'ascensor-habitaciones-nivel-1',
    nombre: 'Ascensor Edificio Habitaciones - Nivel 1',
    x: 10,
    y: 0,
    tipo: 'ascensor',
    nivel: 1,
    accesible: true,
    restringido: false
  },
  {
    id: 'ascensor-habitaciones-piso-6',
    nombre: 'Salida Ascensor Edificio Habitaciones - Piso 6',
    x: 0,
    y: 0,
    tipo: 'ascensor',
    nivel: 6,
    accesible: true,
    restringido: false
  },
  {
    id: 'puerta-acceso-tinajas-piso-6',
    nombre: 'Tinajas / Puerta de Acceso',
    x: 6,
    y: 0,
    tipo: 'spa',
    nivel: 6,
    restringido: false
  },
  {
    id: 'alma-spa-tinaja-piso-6',
    nombre: 'Alma Spa Tinaja',
    x: 8,
    y: 0,
    tipo: 'spa',
    nivel: 6,
    restringido: false
  }
];

export const CONEXIONES_HIPPOCAMPUS: Conexion[] = [
  {
    origen: 'entrada-nivel-4',
    destino: 'recepcion-turismo-vina-nivel-4',
    distancia: 6.387,
    tipo: 'pasillo',
    accesible: true,
    restringida: false,
    habilitada: true
  },
  {
    origen: 'entrada-nivel-4',
    destino: 'recepcion-resort-nivel-4',
    distancia: 6.751,
    tipo: 'pasillo',
    accesible: true,
    restringida: false,
    habilitada: true
  },
  {
    origen: 'entrada-nivel-4',
    destino: 'ascensor-central-nivel-4',
    distancia: 6.877,
    tipo: 'pasillo',
    accesible: true,
    restringida: false,
    habilitada: true
  },
  {
    origen: 'entrada-nivel-4',
    destino: 'puerta-exterior-derecha-nivel-4',
    distancia: 8.53,
    tipo: 'pasillo',
    restringida: false,
    habilitada: true
  },
  {
    origen: 'entrada-nivel-4',
    destino: 'puerta-exterior-izquierda-nivel-4',
    distancia: 9.008,
    tipo: 'pasillo',
    restringida: false,
    habilitada: true
  },
  {
    origen: 'puerta-exterior-derecha-nivel-4',
    destino: 'acceso-escalera-derecha-nivel-3',
    distancia: 2.577,
    tipo: 'escalera',
    accesible: false,
    restringida: false,
    habilitada: true
  },
  {
    origen: 'puerta-exterior-izquierda-nivel-4',
    destino: 'acceso-escalera-izquierda-nivel-3',
    distancia: 2.577,
    tipo: 'escalera',
    accesible: false,
    restringida: false,
    habilitada: true
  },
  {
    origen: 'ascensor-central-nivel-4',
    destino: 'ascensor-central-nivel-3',
    distancia: 0,
    tipo: 'ascensor',
    accesible: true,
    restringida: false,
    habilitada: true
  },
  {
    origen: 'ascensor-central-nivel-3',
    destino: 'ascensor-central-nivel-1',
    distancia: 0,
    tipo: 'ascensor',
    accesible: true,
    restringida: false,
    habilitada: true
  },
  {
    origen: 'ascensor-habitaciones-nivel-1',
    destino: 'ascensor-habitaciones-piso-6',
    distancia: 0,
    tipo: 'ascensor',
    accesible: true,
    restringida: false,
    habilitada: true
  },
  {
    origen: 'ascensor-central-nivel-3',
    destino: 'piscina-acceso-escalones-nivel-3',
    distancia: 8.6,
    tipo: 'escalera',
    accesible: false,
    restringida: false,
    habilitada: true
  },
  {
    origen: 'ascensor-central-nivel-3',
    destino: 'piscina-acceso-accesible-nivel-3',
    distancia: 12,
    tipo: 'rampa',
    accesible: true,
    restringida: false,
    habilitada: true
  },
  {
    origen: 'ascensor-central-nivel-3',
    destino: 'piscina-temperada-nivel-3',
    distancia: 12,
    tipo: 'pasillo',
    restringida: false,
    habilitada: true
  },
  {
    origen: 'ascensor-central-nivel-3',
    destino: 'restaurant-faro-nivel-3',
    distancia: 16,
    tipo: 'pasillo',
    restringida: false,
    habilitada: true
  },
  {
    origen: 'ascensor-central-nivel-3',
    destino: 'canchas-tenis-nivel-3',
    distancia: 36,
    tipo: 'pasillo',
    accesible: false,
    restringida: false,
    habilitada: true
  },
  {
    origen: 'ascensor-central-nivel-1',
    destino: 'zona-kid-nivel-1',
    distancia: 4.411,
    tipo: 'pasillo',
    restringida: false,
    habilitada: true
  },
  {
    origen: 'ascensor-central-nivel-1',
    destino: 'zona-juego-adulto-nivel-1',
    distancia: 2.054,
    tipo: 'pasillo',
    restringida: false,
    habilitada: true
  },
  {
    origen: 'ascensor-central-nivel-1',
    destino: 'zona-play-nivel-1',
    distancia: 6.255,
    tipo: 'pasillo',
    restringida: false,
    habilitada: true
  },
  {
    origen: 'ascensor-central-nivel-1',
    destino: 'hall-nivel-1',
    distancia: 10.336,
    tipo: 'pasillo',
    restringida: false,
    habilitada: true
  },
  {
    origen: 'hall-nivel-1',
    destino: 'mini-market-proa-nivel-1',
    distancia: 10.171,
    tipo: 'pasillo',
    restringida: false,
    habilitada: true
  },
  {
    origen: 'hall-nivel-1',
    destino: 'gimnasio-nivel-1',
    distancia: 15.272,
    tipo: 'pasillo',
    restringida: false,
    habilitada: true
  },
  {
    origen: 'hall-nivel-1',
    destino: 'salon-eventos-montemar-nivel-1',
    distancia: 32.184,
    tipo: 'pasillo',
    restringida: false,
    habilitada: true
  },
  {
    origen: 'hall-nivel-1',
    destino: 'salon-eventos-terramar-nivel-1',
    distancia: 13.586,
    tipo: 'pasillo',
    restringida: false,
    habilitada: true
  },
  {
    origen: 'hall-nivel-1',
    destino: 'alma-spa-nivel-1',
    distancia: 26.521,
    tipo: 'pasillo',
    restringida: false,
    habilitada: true
  },
  {
    origen: 'salon-eventos-montemar-nivel-1',
    destino: 'ascensor-habitaciones-nivel-1',
    distancia: 5.143,
    tipo: 'pasillo',
    restringida: false,
    habilitada: true
  },
  {
    origen: 'ascensor-habitaciones-piso-6',
    destino: 'puerta-acceso-tinajas-piso-6',
    distancia: 48.293,
    tipo: 'pasillo',
    restringida: false,
    habilitada: true
  },
  {
    origen: 'puerta-acceso-tinajas-piso-6',
    destino: 'alma-spa-tinaja-piso-6',
    distancia: 4.8,
    tipo: 'pasillo',
    restringida: false,
    habilitada: true
  }
];

export const LUGARES_HIPPOCAMPUS_PRELIMINARES: LugarPlano[] =
  NODOS_HIPPOCAMPUS.map(nodo => ({
    id: nodo.id,
    nombre: nodo.nombre,
    tipo: nodo.tipo,
    nivel: nodo.nivel ?? null,
    sector: nodo.sector ?? null,
    x: nodo.x,
    y: nodo.y,
    accesible: nodo.accesible ?? null,
    restringido: nodo.restringido ?? null,
    estado:
      nodo.accesible === undefined
        ? 'pendiente-validacion'
        : 'confirmado'
  }));

export const MAPA_ACTIVO: MapaNavegacion = {
  id: 'hippocampus-resort',
  nombre: 'Hippocampus Resort & Club',
  descripcion:
    'Grafo de referencia construido con mediciones realizadas en terreno.',
  estado: 'referencia',
  nodos: NODOS_HIPPOCAMPUS,
  conexiones: CONEXIONES_HIPPOCAMPUS
};