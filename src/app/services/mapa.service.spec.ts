import {
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest';

import {
  MapaService
} from './mapa.service';

describe('MapaService', () => {
  let servicio: MapaService;

  beforeEach(() => {
    servicio = new MapaService();
  });

  it('entrega los nodos reales del mapa activo', () => {
    const nodos =
      servicio.obtenerNodosNavegables();

    expect(
      nodos.some(
        nodo =>
          nodo.id ===
          'entrada-nivel-4'
      )
    ).toBe(true);

    expect(
      nodos.some(
        nodo =>
          nodo.id ===
          'alma-spa-tinaja-piso-6'
      )
    ).toBe(true);
  });

  it('encuentra un lugar de Hippocampus', () => {
    const lugar =
      servicio.obtenerLugarPreliminarPorId(
        'piscina-temperada-nivel-3'
      );

    expect(lugar?.nombre)
      .toBe('Piscina Temperada');

    expect(lugar?.nivel)
      .toBe(3);
  });

  it('entrega los niveles levantados', () => {
    expect(
      servicio.obtenerNiveles()
    ).toEqual([1, 3, 4, 6]);
  });

  it('cierra y habilita una conexión', () => {
    const origen =
      'entrada-nivel-4';

    const destino =
      'recepcion-resort-nivel-4';

    servicio.cerrarConexion(
      origen,
      destino
    );

    expect(
      servicio.estaConexionCerrada(
        origen,
        destino
      )
    ).toBe(true);

    servicio.habilitarConexion(
      origen,
      destino
    );

    expect(
      servicio.estaConexionCerrada(
        origen,
        destino
      )
    ).toBe(false);
  });

  it('excluye datos sin validar en modo accesible', () => {
    const conexiones =
      servicio
        .obtenerConexionesHabilitadas(
          true
        );

    expect(
      conexiones.some(
        conexion =>
          conexion.destino ===
          'restaurant-faro-nivel-3'
      )
    ).toBe(false);
  });

  it('excluye conexiones con distancias inválidas', () => {
    vi.spyOn(
      servicio,
      'obtenerConexionesNavegables'
    ).mockReturnValue([
      {
        origen:
          'entrada-nivel-4',
        destino:
          'recepcion-resort-nivel-4',
        distancia:
          Number.NEGATIVE_INFINITY,
        habilitada: true
      },
      {
        origen:
          'entrada-nivel-4',
        destino:
          'recepcion-resort-nivel-4',
        distancia: -5,
        habilitada: true
      },
      {
        origen:
          'entrada-nivel-4',
        destino:
          'recepcion-resort-nivel-4',
        distancia: Number.NaN,
        habilitada: true
      },
      {
        origen:
          'entrada-nivel-4',
        destino:
          'recepcion-resort-nivel-4',
        distancia:
          Number.POSITIVE_INFINITY,
        habilitada: true
      }
    ]);

    expect(
      servicio
        .obtenerConexionesHabilitadas()
    ).toEqual([]);
  });

  it('excluye conexiones cuyos nodos no existen', () => {
    vi.spyOn(
      servicio,
      'obtenerConexionesNavegables'
    ).mockReturnValue([
      {
        origen:
          'entrada-nivel-4',
        destino:
          'nodo-inexistente',
        distancia: 10,
        habilitada: true
      }
    ]);

    expect(
      servicio
        .obtenerConexionesHabilitadas()
    ).toEqual([]);
  });

  it('mantiene conexiones válidas', () => {
    vi.spyOn(
      servicio,
      'obtenerConexionesNavegables'
    ).mockReturnValue([
      {
        origen:
          'entrada-nivel-4',
        destino:
          'recepcion-resort-nivel-4',
        distancia: 6.751,
        habilitada: true
      }
    ]);

    expect(
      servicio
        .obtenerConexionesHabilitadas()
    ).toHaveLength(1);
  });
});