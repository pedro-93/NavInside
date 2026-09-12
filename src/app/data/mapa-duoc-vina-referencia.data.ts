import {
  LugarPlano,
  MapaNavegacion,
  TipoNodo
} from '../models/nodo.model';

function crearLugarReferencia(
  id: string,
  nombre: string,
  tipo: TipoNodo,
  sector: string,
  nivel: number | null = null
): LugarPlano {
  return {
    id,
    nombre,
    tipo,
    nivel,
    sector,
    x: null,
    y: null,
    accesible: null,
    restringido: null,
    estado: 'confirmado'
  };
}

/*
 * Lugares identificados en el mapa general actual de Duoc UC Viña del Mar
 * y en antecedentes arquitectónicos públicos del Edificio Tecnológico CTI.
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
      'Edificio Tecnológico CTI',
      4
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
    ),

    crearLugarReferencia(
      'cti-subterraneo',
      'Subterráneo CTI',
      'pasillo',
      'Edificio Tecnológico CTI',
      0
    ),
    crearLugarReferencia(
      'cti-acceso-calle-cantera',
      'Acceso CTI por calle Cantera',
      'entrada',
      'Edificio Tecnológico CTI',
      1
    ),
    crearLugarReferencia(
      'cti-recepcion',
      'Recepción CTI',
      'recepcion',
      'Edificio Tecnológico CTI',
      1
    ),
    crearLugarReferencia(
      'cti-estacionamientos-nivel-1',
      'Estacionamientos CTI',
      'estacionamiento',
      'Edificio Tecnológico CTI',
      1
    ),
    crearLugarReferencia(
      'cti-nucleo-vertical',
      'Núcleo de circulación vertical CTI',
      'escalera',
      'Edificio Tecnológico CTI'
    ),
    crearLugarReferencia(
      'cti-conexion-duoc-existente',
      'Conexión con edificio Duoc existente',
      'pasillo',
      'Edificio Tecnológico CTI'
    ),
    crearLugarReferencia(
      'cti-laboratorios-nivel-2',
      'Laboratorios CTI',
      'salon',
      'Edificio Tecnológico CTI',
      2
    ),
    crearLugarReferencia(
      'cti-laboratorios-nivel-3',
      'Laboratorios CTI',
      'salon',
      'Edificio Tecnológico CTI',
      3
    ),
    crearLugarReferencia(
      'cti-biblioteca-nivel-5',
      'Biblioteca CTI',
      'servicio',
      'Edificio Tecnológico CTI',
      5
    ),
    crearLugarReferencia(
      'cti-salas-ingles-nivel-5',
      'Salas de Inglés',
      'salon',
      'Edificio Tecnológico CTI',
      5
    ),
    crearLugarReferencia(
      'cti-area-nivel-6',
      'Área CTI',
      'servicio',
      'Edificio Tecnológico CTI',
      6
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