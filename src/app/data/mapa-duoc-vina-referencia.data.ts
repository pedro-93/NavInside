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

function crearLugaresCodificados(
  codigos: string[],
  nombreBase: string,
  tipo: TipoNodo,
  sector: string,
  nivel: number
): LugarPlano[] {
  return codigos.map(codigo =>
    crearLugarReferencia(
      `cti-${codigo.toLowerCase()}`,
      `${nombreBase} ${codigo}`,
      tipo,
      sector,
      nivel
    )
  );
}

/*
 * Lugares identificados en el mapa general de Duoc UC Viña del Mar
 * y en la señalética del Edificio Tecnológico CTI.
 *
 * Los niveles se registran con la numeración visible para el usuario:
 * del nivel 1 al nivel 6.
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
      'cti-estacionamientos',
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

    ...crearLugaresCodificados(
      [
        'VI-LC1',
        'VI-LC2',
        'VI-LC3',
        'VI-LC4',
        'VI-LC5',
        'VI-LC6',
        'VI-LC7',
        'VI-LC8',
        'VI-LC9',
        'VI-LC10',
        'VI-LC11',
        'VI-LC12'
      ],
      'Laboratorio',
      'salon',
      'Edificio Tecnológico CTI · Nivel 2',
      2
    ),
    crearLugarReferencia(
      'cti-bano-mujeres-nivel-2',
      'Baño de mujeres',
      'baño',
      'Edificio Tecnológico CTI · Nivel 2',
      2
    ),

    crearLugarReferencia(
      'cti-laboratorio-mac-1',
      'Laboratorio MAC 1 (VI-LC13)',
      'salon',
      'Edificio Tecnológico CTI · Nivel 3',
      3
    ),
    crearLugarReferencia(
      'cti-laboratorio-redes-1',
      'Laboratorio de Redes 1 (VI-LR1)',
      'salon',
      'Edificio Tecnológico CTI · Nivel 3',
      3
    ),
    crearLugarReferencia(
      'cti-laboratorio-redes-2',
      'Laboratorio de Redes 2 (VI-LR2)',
      'salon',
      'Edificio Tecnológico CTI · Nivel 3',
      3
    ),
    crearLugarReferencia(
      'cti-taller-proyectos-1',
      'Taller de Proyectos 1',
      'salon',
      'Edificio Tecnológico CTI · Nivel 3',
      3
    ),
    crearLugarReferencia(
      'cti-taller-proyectos-2',
      'Taller de Proyectos 2',
      'salon',
      'Edificio Tecnológico CTI · Nivel 3',
      3
    ),
    crearLugarReferencia(
      'cti-laboratorio-telecomunicaciones',
      'Laboratorio de Telecomunicaciones (VI-LT1)',
      'salon',
      'Edificio Tecnológico CTI · Nivel 3',
      3
    ),
    ...crearLugaresCodificados(
      [
        'VI-LC14',
        'VI-LC15',
        'VI-LC16',
        'VI-LC17'
      ],
      'Laboratorio MAC',
      'salon',
      'Edificio Tecnológico CTI · Nivel 3',
      3
    ),
    ...crearLugaresCodificados(
      [
        'VI-S301',
        'VI-S302',
        'VI-S303'
      ],
      'Sala',
      'salon',
      'Edificio Tecnológico CTI · Nivel 3',
      3
    ),
    crearLugarReferencia(
      'cti-servicios-digitales',
      'Servicios Digitales',
      'servicio',
      'Edificio Tecnológico CTI · Nivel 3',
      3
    ),

    crearLugarReferencia(
      'cti-casino',
      'Casino',
      'restaurante',
      'Edificio Tecnológico CTI · Nivel 4',
      4
    ),
    ...crearLugaresCodificados(
      [
        'VI-S401',
        'VI-S402'
      ],
      'Sala',
      'salon',
      'Edificio Tecnológico CTI · Nivel 4',
      4
    ),
    crearLugarReferencia(
      'cti-banos-nivel-4',
      'Baños',
      'baño',
      'Edificio Tecnológico CTI · Nivel 4',
      4
    ),

    crearLugarReferencia(
      'cti-bano-hombres-nivel-5',
      'Baño de hombres',
      'baño',
      'Edificio Tecnológico CTI · Nivel 5',
      5
    ),
    ...crearLugaresCodificados(
      [
        'VI-S501',
        'VI-S502',
        'VI-S503',
        'VI-S504',
        'VI-S505',
        'VI-S506',
        'VI-S507'
      ],
      'Sala',
      'salon',
      'Edificio Tecnológico CTI · Nivel 5',
      5
    ),
    ...crearLugaresCodificados(
      [
        'VI-LC508',
        'VI-LC509'
      ],
      'Laboratorio de Computación',
      'salon',
      'Edificio Tecnológico CTI · Nivel 5',
      5
    ),
    crearLugarReferencia(
      'cti-biblioteca',
      'Biblioteca',
      'servicio',
      'Edificio Tecnológico CTI · Nivel 5',
      5
    ),

    crearLugarReferencia(
      'cti-bano-mujeres-nivel-6',
      'Baño de mujeres',
      'baño',
      'Edificio Tecnológico CTI · Nivel 6',
      6
    ),
    ...crearLugaresCodificados(
      [
        'VI-S601',
        'VI-S602',
        'VI-S603',
        'VI-S604',
        'VI-S605',
        'VI-S606',
        'VI-S607',
        'VI-S608'
      ],
      'Sala',
      'salon',
      'Edificio Tecnológico CTI · Nivel 6',
      6
    ),
    crearLugarReferencia(
      'cti-sala-agencia-609',
      'Sala Agencia 609',
      'salon',
      'Edificio Tecnológico CTI · Nivel 6',
      6
    ),
    crearLugarReferencia(
      'cti-centro-tecnologico',
      'Centro Tecnológico',
      'servicio',
      'Edificio Tecnológico CTI · Nivel 6',
      6
    ),
    crearLugarReferencia(
      'cti-centro-negocios',
      'Centro de Negocios',
      'servicio',
      'Edificio Tecnológico CTI · Nivel 6',
      6
    ),
    crearLugarReferencia(
      'cti-laboratorio-computacion-606',
      'Laboratorio de Computación (VI-LC606)',
      'salon',
      'Edificio Tecnológico CTI · Nivel 6',
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
      'Mapa general de referencia con lugares identificados por señalética. Las coordenadas, rutas internas, medidas y accesibilidad requieren validación en terreno.',
    estado: 'referencia',
    nodos: [],
    conexiones: []
  };