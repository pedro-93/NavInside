import {
  Idioma
} from '../services/idioma.service';

const NOMBRES_NODOS: Record<
  Idioma,
  Record<string, string>
> = {
  es: {
    entrada: 'Entrada',
    recepcion: 'Recepción',
    pasillo: 'Pasillo principal',
    'habitacion-101': 'Habitación 101',
    baño: 'Baño',
    ascensor: 'Ascensor nivel 1',
    'escalera-nivel-1':
      'Escalera nivel 1',
    'ascensor-nivel-3':
      'Ascensor nivel 3',
    'escalera-nivel-3':
      'Escalera nivel 3',
    'pasillo-nivel-3':
      'Pasillo nivel 3',
    'salon-nivel-3':
      'Salón nivel 3',

    'entrada-nivel-4':
      'Entrada',
    'recepcion-turismo-vina-nivel-4':
      'Recepción Turismo Viña',
    'recepcion-resort-nivel-4':
      'Recepción Resort',
    'ascensor-central-nivel-4':
      'Ascensor Central - Nivel 4',
    'puerta-exterior-derecha-nivel-4':
      'Puerta Exterior Derecha',
    'puerta-exterior-izquierda-nivel-4':
      'Puerta Exterior Izquierda',
    'acceso-escalera-derecha-nivel-3':
      'Acceso Nivel 3 - Escalera Derecha',
    'acceso-escalera-izquierda-nivel-3':
      'Acceso Nivel 3 - Escalera Izquierda',
    'ascensor-central-nivel-3':
      'Salida Ascensor Central - Nivel 3',
    'piscina-acceso-escalones-nivel-3':
      'Piscina - Acceso por Escalones',
    'piscina-acceso-accesible-nivel-3':
      'Piscina - Acceso Accesible',
    'piscina-temperada-nivel-3':
      'Piscina Temperada',
    'restaurant-faro-nivel-3':
      'Restaurant Faro',
    'canchas-tenis-nivel-3':
      'Canchas de Tenis',
    'ascensor-central-nivel-1':
      'Salida Ascensor Central - Nivel 1',
    'zona-kid-nivel-1':
      'Zona Kid',
    'zona-juego-adulto-nivel-1':
      'Zona Juego Adulto',
    'zona-play-nivel-1':
      'Zona Play',
    'hall-nivel-1':
      'Hall',
    'mini-market-proa-nivel-1':
      'Mini Market Proa',
    'gimnasio-nivel-1':
      'Gimnasio',
    'salon-eventos-montemar-nivel-1':
      'Salón Eventos Montemar',
    'salon-eventos-terramar-nivel-1':
      'Salón Eventos Terramar',
    'alma-spa-nivel-1':
      'Alma Spa',
    'ascensor-habitaciones-nivel-1':
      'Ascensor Edificio Habitaciones - Nivel 1',
    'ascensor-habitaciones-piso-6':
      'Salida Ascensor Edificio Habitaciones - Piso 6',
    'puerta-acceso-tinajas-piso-6':
      'Tinajas / Puerta de Acceso',
    'alma-spa-tinaja-piso-6':
      'Alma Spa Tinaja'
  },

  en: {
    entrada: 'Entrance',
    recepcion: 'Reception',
    pasillo: 'Main corridor',
    'habitacion-101': 'Room 101',
    baño: 'Restroom',
    ascensor: 'Elevator level 1',
    'escalera-nivel-1':
      'Stairs level 1',
    'ascensor-nivel-3':
      'Elevator level 3',
    'escalera-nivel-3':
      'Stairs level 3',
    'pasillo-nivel-3':
      'Corridor level 3',
    'salon-nivel-3':
      'Hall level 3',

    'entrada-nivel-4':
      'Entrance',
    'recepcion-turismo-vina-nivel-4':
      'Turismo Viña Reception',
    'recepcion-resort-nivel-4':
      'Resort Reception',
    'ascensor-central-nivel-4':
      'Central Elevator - Level 4',
    'puerta-exterior-derecha-nivel-4':
      'Right Exterior Door',
    'puerta-exterior-izquierda-nivel-4':
      'Left Exterior Door',
    'acceso-escalera-derecha-nivel-3':
      'Level 3 Access - Right Stairs',
    'acceso-escalera-izquierda-nivel-3':
      'Level 3 Access - Left Stairs',
    'ascensor-central-nivel-3':
      'Central Elevator Exit - Level 3',
    'piscina-acceso-escalones-nivel-3':
      'Swimming Pool - Stair Access',
    'piscina-acceso-accesible-nivel-3':
      'Swimming Pool - Accessible Entrance',
    'piscina-temperada-nivel-3':
      'Heated Swimming Pool',
    'restaurant-faro-nivel-3':
      'Faro Restaurant',
    'canchas-tenis-nivel-3':
      'Tennis Courts',
    'ascensor-central-nivel-1':
      'Central Elevator Exit - Level 1',
    'zona-kid-nivel-1':
      'Kids Area',
    'zona-juego-adulto-nivel-1':
      'Adult Games Area',
    'zona-play-nivel-1':
      'Play Area',
    'hall-nivel-1':
      'Hall',
    'mini-market-proa-nivel-1':
      'Proa Mini Market',
    'gimnasio-nivel-1':
      'Gym',
    'salon-eventos-montemar-nivel-1':
      'Montemar Event Hall',
    'salon-eventos-terramar-nivel-1':
      'Terramar Event Hall',
    'alma-spa-nivel-1':
      'Alma Spa',
    'ascensor-habitaciones-nivel-1':
      'Guest Rooms Building Elevator - Level 1',
    'ascensor-habitaciones-piso-6':
      'Guest Rooms Building Elevator Exit - Floor 6',
    'puerta-acceso-tinajas-piso-6':
      'Hot Tubs / Access Door',
    'alma-spa-tinaja-piso-6':
      'Alma Spa Hot Tub'
  },

  pt: {
    entrada: 'Entrada',
    recepcion: 'Recepção',
    pasillo: 'Corredor principal',
    'habitacion-101': 'Quarto 101',
    baño: 'Banheiro',
    ascensor: 'Elevador nível 1',
    'escalera-nivel-1':
      'Escada nível 1',
    'ascensor-nivel-3':
      'Elevador nível 3',
    'escalera-nivel-3':
      'Escada nível 3',
    'pasillo-nivel-3':
      'Corredor nível 3',
    'salon-nivel-3':
      'Salão nível 3',

    'entrada-nivel-4':
      'Entrada',
    'recepcion-turismo-vina-nivel-4':
      'Recepção Turismo Viña',
    'recepcion-resort-nivel-4':
      'Recepção do Resort',
    'ascensor-central-nivel-4':
      'Elevador Central - Nível 4',
    'puerta-exterior-derecha-nivel-4':
      'Porta Exterior Direita',
    'puerta-exterior-izquierda-nivel-4':
      'Porta Exterior Esquerda',
    'acceso-escalera-derecha-nivel-3':
      'Acesso ao Nível 3 - Escada Direita',
    'acceso-escalera-izquierda-nivel-3':
      'Acesso ao Nível 3 - Escada Esquerda',
    'ascensor-central-nivel-3':
      'Saída do Elevador Central - Nível 3',
    'piscina-acceso-escalones-nivel-3':
      'Piscina - Acesso por Escadas',
    'piscina-acceso-accesible-nivel-3':
      'Piscina - Acesso Acessível',
    'piscina-temperada-nivel-3':
      'Piscina Aquecida',
    'restaurant-faro-nivel-3':
      'Restaurante Faro',
    'canchas-tenis-nivel-3':
      'Quadras de Tênis',
    'ascensor-central-nivel-1':
      'Saída do Elevador Central - Nível 1',
    'zona-kid-nivel-1':
      'Área Infantil',
    'zona-juego-adulto-nivel-1':
      'Área de Jogos para Adultos',
    'zona-play-nivel-1':
      'Área de Recreação',
    'hall-nivel-1':
      'Hall',
    'mini-market-proa-nivel-1':
      'Mini Mercado Proa',
    'gimnasio-nivel-1':
      'Academia',
    'salon-eventos-montemar-nivel-1':
      'Salão de Eventos Montemar',
    'salon-eventos-terramar-nivel-1':
      'Salão de Eventos Terramar',
    'alma-spa-nivel-1':
      'Alma Spa',
    'ascensor-habitaciones-nivel-1':
      'Elevador do Edifício de Quartos - Nível 1',
    'ascensor-habitaciones-piso-6':
      'Saída do Elevador do Edifício de Quartos - Andar 6',
    'puerta-acceso-tinajas-piso-6':
      'Banheiras de Hidromassagem / Porta de Acesso',
    'alma-spa-tinaja-piso-6':
      'Banheira de Hidromassagem Alma Spa'
  }
};

export function obtenerNombreNodo(
  nodoId: string,
  idioma: Idioma,
  nombrePredeterminado: string
): string {
  return (
    NOMBRES_NODOS[idioma][nodoId] ??
    NOMBRES_NODOS.es[nodoId] ??
    nombrePredeterminado
  );
}