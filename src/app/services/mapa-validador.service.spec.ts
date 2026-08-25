import {
  beforeEach,
  describe,
  expect,
  it
} from 'vitest';

import {
  CONEXIONES_SIMULADAS,
  NODOS_SIMULADOS
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
      'debe aprobar el mapa simulado actual',
      () => {
        const resultado =
          servicio.validarMapa(
            NODOS_SIMULADOS,
            CONEXIONES_SIMULADAS
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
          ...NODOS_SIMULADOS,
          {
            ...NODOS_SIMULADOS[0]
          }
        ];

        const resultado =
          servicio.validarMapa(
            nodos,
            CONEXIONES_SIMULADAS
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
      'debe detectar conexiones hacia nodos inexistentes',
      () => {
        const conexiones:
          Conexion[] = [
            ...CONEXIONES_SIMULADAS,
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
            NODOS_SIMULADOS,
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
          CONEXIONES_SIMULADAS.map(
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
            NODOS_SIMULADOS,
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
      'debe detectar conexiones multinivel inválidas',
      () => {
        const conexiones:
          Conexion[] = [
            ...CONEXIONES_SIMULADAS,
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
            NODOS_SIMULADOS,
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
            ...CONEXIONES_SIMULADAS,
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
            NODOS_SIMULADOS,
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
              ...NODOS_SIMULADOS,
              nodoAislado
            ],
            CONEXIONES_SIMULADAS
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
            ...CONEXIONES_SIMULADAS,
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
            NODOS_SIMULADOS,
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