import {
  beforeEach,
  describe,
  expect,
  it
} from 'vitest';

import { MapaService } from './mapa.service';

describe('MapaService', () => {
  let servicio: MapaService;

  beforeEach(() => {
    servicio = new MapaService();
  });

  it(
    'debe entregar los nodos navegables simulados',
    () => {
      const nodos =
        servicio.obtenerNodosNavegables();

      expect(nodos.length)
        .toBeGreaterThan(0);

      expect(
        nodos.some(
          nodo => nodo.id === 'recepcion'
        )
      ).toBe(true);
    }
  );

  it(
    'debe entregar las conexiones navegables',
    () => {
      const conexiones =
        servicio.obtenerConexionesNavegables();

      expect(conexiones.length)
        .toBeGreaterThan(0);
    }
  );

  it(
    'debe encontrar un lugar preliminar de Duoc Viña',
    () => {
      const lugar =
        servicio.obtenerLugarPreliminarPorId(
          'punto-estudiantil'
        );

      expect(lugar?.nombre).toBe(
        'Punto Estudiantil'
      );

      expect(lugar?.nivel).toBeNull();
    }
  );

  it(
    'debe identificar los lugares pendientes',
    () => {
      const lugares =
        servicio.obtenerLugaresPreliminares();

      const pendientes =
        servicio.obtenerLugaresPendientes();

      expect(pendientes.length).toBe(
        lugares.length
      );
    }
  );

  it(
    'no debe considerar navegable un lugar de referencia',
    () => {
      expect(
        servicio.esNodoNavegable(
          'punto-estudiantil'
        )
      ).toBe(false);
    }
  );
});