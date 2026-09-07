import {
  beforeEach,
  describe,
  expect,
  it
} from 'vitest';

import {
  MAPA_ACTIVO
} from '../data/mapa-simulado.data';

import {
  Conexion,
  Nodo
} from '../models/nodo.model';

import {
  MapaValidadorService
} from './mapa-validador.service';

describe(
  'MapaValidadorService',
  () => {
    let servicio:
      MapaValidadorService;

    beforeEach(() => {
      servicio =
        new MapaValidadorService();
    });

    it(
      'debe aprobar el mapa activo actual',
      () => {
        const resultado =
          servicio.validarMapa(
            MAPA_ACTIVO.nodos,
            MAPA_ACTIVO.conexiones
          );

        expect(resultado.valido)
          .toBe(true);

        expect(resultado.errores)
          .toEqual([]);

        expect(resultado.advertencias)
          .toEqual([]);
      }
    );

    it(
      'debe detectar identificadores de nodos duplicados',
      () => {
        const nodos: Nodo[] = [
          ...MAPA_ACTIVO.nodos,
          {
            ...MAPA_ACTIVO.nodos[0]
          }
        ];

        const resultado =
          servicio.validarMapa(
            nodos,
            MAPA_ACTIVO.conexiones
          );

        expect(resultado.valido)
          .toBe(false);

        expect(
          resultado.errores.some(
            problema =>
              problema.codigo ===
              'NODO_ID_DUPLICADO'
          )
        ).toBe(true);
      }
    );

    it(
      'debe detectar un identificador de nodo vacío',
      () => {
        const nodos: Nodo[] =
          MAPA_ACTIVO.nodos.map(
            (nodo, indice) =>
              indice === 0
                ? {
                    ...nodo,
                    id: ''
                  }
                : { ...nodo }
          );

        const resultado =
          servicio.validarMapa(
            nodos,
            MAPA_ACTIVO.conexiones
          );

        expect(resultado.valido)
          .toBe(false);

        expect(
          resultado.errores.some(
            problema =>
              problema.codigo ===
              'NODO_ID_VACIO'
          )
        ).toBe(true);
      }
    );

    it(
      'debe detectar conexiones hacia nodos inexistentes',
      () => {
        const conexiones:
          Conexion[] = [
            ...MAPA_ACTIVO.conexiones,
            {
              origen: 'entrada',
              destino:
                'nodo-inexistente',
              distancia: 4,
              tipo: 'pasillo',
              accesible: true,
              restringida: false,
              habilitada: true
            }
          ];

        const resultado =
          servicio.validarMapa(
            MAPA_ACTIVO.nodos,
            conexiones
          );

        expect(resultado.valido)
          .toBe(false);

        expect(
          resultado.errores.some(
            problema =>
              problema.codigo ===
              'CONEXION_DESTINO_INEXISTENTE'
          )
        ).toBe(true);
      }
    );

    it(
      'debe detectar distancias inválidas',
      () => {
        const conexiones:
          Conexion[] =
          MAPA_ACTIVO.conexiones.map(
            (conexion, indice) =>
              indice === 0
                ? {
                    ...conexion,
                    distancia: 0
                  }
                : { ...conexion }
          );

        const resultado =
          servicio.validarMapa(
            MAPA_ACTIVO.nodos,
            conexiones
          );

        expect(resultado.valido)
          .toBe(false);

        expect(
          resultado.errores.some(
            problema =>
              problema.codigo ===
              'CONEXION_DISTANCIA_INVALIDA'
          )
        ).toBe(true);
      }
    );

    it(
      'debe detectar una conexión hacia el mismo nodo',
      () => {
        const conexiones:
          Conexion[] = [
            ...MAPA_ACTIVO.conexiones,
            {
              origen: 'entrada',
              destino: 'entrada',
              distancia: 1,
              tipo: 'pasillo',
              accesible: true,
              restringida: false,
              habilitada: true
            }
          ];

        const resultado =
          servicio.validarMapa(
            MAPA_ACTIVO.nodos,
            conexiones
          );

        expect(resultado.valido)
          .toBe(false);

        expect(
          resultado.errores.some(
            problema =>
              problema.codigo ===
              'CONEXION_MISMO_NODO'
          )
        ).toBe(true);
      }
    );

    it(
      'debe detectar conexiones multinivel inválidas',
      () => {
        const conexiones:
          Conexion[] = [
            ...MAPA_ACTIVO.conexiones,
            {
              origen: 'entrada',
              destino:
                'salon-nivel-3',
              distancia: 10,
              tipo: 'pasillo',
              accesible: true,
              restringida: false,
              habilitada: true
            }
          ];

        const resultado =
          servicio.validarMapa(
            MAPA_ACTIVO.nodos,
            conexiones
          );

        expect(resultado.valido)
          .toBe(false);

        expect(
          resultado.errores.some(
            problema =>
              problema.codigo ===
              'CONEXION_MULTINIVEL_INVALIDA'
          )
        ).toBe(true);
      }
    );

    it(
      'debe detectar accesibilidad inconsistente',
      () => {
        const conexiones:
          Conexion[] = [
            ...MAPA_ACTIVO.conexiones,
            {
              origen: 'entrada',
              destino:
                'escalera-nivel-1',
              distancia: 7,
              tipo: 'pasillo',
              accesible: true,
              restringida: false,
              habilitada: true
            }
          ];

        const resultado =
          servicio.validarMapa(
            MAPA_ACTIVO.nodos,
            conexiones
          );

        expect(resultado.valido)
          .toBe(false);

        expect(
          resultado.errores.some(
            problema =>
              problema.codigo ===
              'CONEXION_ACCESIBILIDAD_INCONSISTENTE'
          )
        ).toBe(true);
      }
    );

    it(
      'debe detectar una escalera marcada como accesible',
      () => {
        const conexiones:
          Conexion[] = [
            ...MAPA_ACTIVO.conexiones.map(
              conexion =>
                conexion.tipo === 'escalera'
                  ? {
                      ...conexion,
                      accesible: true
                    }
                  : { ...conexion }
            )
          ];

        const resultado =
          servicio.validarMapa(
            MAPA_ACTIVO.nodos,
            conexiones
          );

        expect(resultado.valido)
          .toBe(false);

        expect(
          resultado.errores.some(
            problema =>
              problema.codigo ===
              'ESCALERA_MARCADA_ACCESIBLE'
          )
        ).toBe(true);
      }
    );

    it(
      'debe advertir sobre nodos aislados',
      () => {
        const nodoAislado: Nodo = {
          id: 'nodo-aislado',
          nombre: 'Nodo aislado',
          x: 20,
          y: 20,
          tipo: 'pasillo',
          nivel: 1,
          accesible: true,
          restringido: false
        };

        const resultado =
          servicio.validarMapa(
            [
              ...MAPA_ACTIVO.nodos,
              nodoAislado
            ],
            MAPA_ACTIVO.conexiones
          );

        expect(resultado.valido)
          .toBe(true);

        expect(
          resultado.advertencias.some(
            problema =>
              problema.codigo ===
              'NODO_AISLADO'
          )
        ).toBe(true);
      }
    );

    it(
      'debe detectar conexiones duplicadas en cualquier sentido',
      () => {
        const conexiones:
          Conexion[] = [
            ...MAPA_ACTIVO.conexiones,
            {
              origen: 'recepcion',
              destino: 'entrada',
              distancia: 2,
              tipo: 'pasillo',
              accesible: true,
              restringida: false,
              habilitada: true
            }
          ];

        const resultado =
          servicio.validarMapa(
            MAPA_ACTIVO.nodos,
            conexiones
          );

        expect(resultado.valido)
          .toBe(false);

        expect(
          resultado.errores.some(
            problema =>
              problema.codigo ===
              'CONEXION_DUPLICADA'
          )
        ).toBe(true);
      }
    );
  }
);