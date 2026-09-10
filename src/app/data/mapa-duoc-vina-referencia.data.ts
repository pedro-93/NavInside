import {
  LugarPlano,
  MapaNavegacion,
  TipoNodo
} from '../models/nodo.model';

function crearLugarReferencia(
  id: string,
  nombre: string,
  tipo: TipoNodo,
  sector: string
): LugarPlano {
  return {
    id,
    nombre,
    tipo,
    nivel: null,
    sector,
    x: null,
    y: null,
    accesible: null,
    restringido: null,
    estado: 'confirmado'
  };
}

/*
 * Lugares identificados en el mapa general actual de Duoc UC Viña del Mar.
 *
 * Son referencias de orientación. No forman parte del grafo navegable:
 * faltan coordenadas, medidas, rutas internas y validación en terreno.
 */
export const LUGARES_DUOC_VINA_REFERENCIA:
  LugarPlano[] = [
    crearLugarReferencia(
      'acceso-calle-alvarez',
      'Acceso por calle Álvarez',
      'entrada',
      'Acceso'
    ),
    crearLugarReferencia(
      'porteria',
      'Portería',
      'servicio',
      'Acceso'
    ),
    crearLugarReferencia(
      'edificio-administrativo',
      'Edificio Administrativo',
      'servicio',
      'Sector administrativo'
    ),
    crearLugarReferencia(
      'edificio-norte',
      'Edificio Norte',
      'servicio',
      'Sector norte'
    ),
    crearLugarReferencia(
      'edificio-central',
      'Edificio Central',
      'servicio',
      'Sector central'
    ),
    crearLugarReferencia(
      'edificio-sur',
      'Edificio Sur',
      'servicio',
      'Sector sur'
    ),
    crearLugarReferencia(
      'edificio-tecnologico-cti',
      'Edificio Tecnológico CTI',
      'servicio',
      'Sector tecnológico'
    ),
    crearLugarReferencia(
      'patio-central',
      'Patio Central',
      'servicio',
      'Exterior'
    ),
    crearLugarReferencia(
      'patio-los-aromos',
      'Patio Los Aromos',
      'servicio',
      'Exterior'
    ),
    crearLugarReferencia(
      'punto-estudiantil',
      'Punto Estudiantil',
      'servicio',
      'Sector central'
    ),
    crearLugarReferencia(
      'capilla',
      'Capilla',
      'servicio',
      'Sector central'
    ),
    crearLugarReferencia(
      'fotocopiadora',
      'Fotocopiadora',
      'servicio',
      'Edificio Tecnológico CTI'
    ),
    crearLugarReferencia(
      'punto-comida',
      'Punto de Comida',
      'restaurante',
      'Sector central'
    ),
    crearLugarReferencia(
      'cafeteria',
      'Cafetería',
      'restaurante',
      'Edificio Tecnológico CTI'
    ),
    crearLugarReferencia(
      'multicancha-1',
      'Multicancha 1',
      'cancha',
      'Sector central'
    ),
    crearLugarReferencia(
      'multicancha-2',
      'Multicancha 2',
      'cancha',
      'Sector sur'
    ),
    crearLugarReferencia(
      'ascensor-1',
      'Ascensor 1',
      'ascensor',
      'Acceso'
    ),
    crearLugarReferencia(
      'ascensor-2',
      'Ascensor 2',
      'ascensor',
      'Edificio Tecnológico CTI'
    ),
    crearLugarReferencia(
      'ascensor-3',
      'Ascensor 3',
      'ascensor',
      'Edificio Tecnológico CTI'
    ),
    crearLugarReferencia(
      'zona-seguridad-1',
      'Zona de seguridad 1',
      'servicio',
      'Patio Central'
    ),
    crearLugarReferencia(
      'zona-seguridad-2',
      'Zona de seguridad 2',
      'servicio',
      'Patio Los Aromos'
    ),
    crearLugarReferencia(
      'zona-seguridad-3',
      'Zona de seguridad 3',
      'servicio',
      'Multicancha 1'
    ),
    crearLugarReferencia(
      'zona-seguridad-4',
      'Zona de seguridad 4',
      'servicio',
      'Calle Cantera'
    )
  ];

/*
 * Referencia institucional basada en señalética actual y antecedentes
 * arquitectónicos públicos. No contiene rutas navegables aún.
 */
export const MAPA_DUOC_VINA_REFERENCIA:
  MapaNavegacion = {
    id: 'duoc-vina-referencia',
    nombre: 'Sede Duoc UC Viña del Mar',
    descripcion:
      'Mapa general de referencia con edificios y puntos visibles. Las rutas internas, medidas y accesibilidad requieren validación en terreno.',
    estado: 'referencia',
    nodos: [],
    conexiones: []
  };