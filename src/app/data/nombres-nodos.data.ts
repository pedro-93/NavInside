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
      'Salón nivel 3'
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
      'Hall level 3'
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
      'Salão nível 3'
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