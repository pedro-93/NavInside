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

    it('aprueba el mapa de referencia con advertencias', () => {
      const resultado =
        servicio.validarMapa(
          MAPA_ACTIVO.nodos,
          MAPA_ACTIVO.conexiones
        );

      expect(resultado.valido)
        .toBe(true);

      expect(resultado.errores)
        .toEqual([]);

      expect(
        resultado.advertencias.length
      ).toBeGreaterThan(0);
    });

    it('permite distancia cero únicamente en ascensores', () => {
      const ascensores =
        MAPA_ACTIVO.conexiones.filter(
          conexion =>
            conexion.tipo ===
              'ascensor' &&
            conexion.distancia === 0
        );

      expect(ascensores.length)
        .toBe(3);

      const resultado =
        servicio.validarMapa(
          MAPA_ACTIVO.nodos,
          MAPA_ACTIVO.conexiones
        );

      expect(resultado.valido)
        .toBe(true);
    });

    it('rechaza distancia cero en un pasillo', () => {
      const conexiones:
        Conexion[] = [
          ...MAPA_ACTIVO.conexiones,
          {
            origen:
              'entrada-nivel-4',
            destino:
              'recepcion-resort-nivel-4',
            distancia: 0,
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

      expect(
        resultado.errores.some(
          problema =>
            problema.codigo ===
            'CONEXION_DISTANCIA_INVALIDA'
        )
      ).toBe(true);
    });

    it('detecta identificadores duplicados', () => {
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

      expect(
        resultado.errores.some(
          problema =>
            problema.codigo ===
            'NODO_ID_DUPLICADO'
        )
      ).toBe(true);
    });

    it('detecta conexiones multinivel inválidas', () => {
      const conexiones:
        Conexion[] = [
          ...MAPA_ACTIVO.conexiones,
          {
            origen:
              'entrada-nivel-4',
            destino:
              'hall-nivel-1',
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

      expect(
        resultado.errores.some(
          problema =>
            problema.codigo ===
            'CONEXION_MULTINIVEL_INVALIDA'
        )
      ).toBe(true);
    });
  }
);