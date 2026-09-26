import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest';

import {
  MapaService
} from './mapa.service';

const respuestaSupabase = vi.hoisted(
  () => ({
    mapa: {
      data: {
        id: 'hippocampus-resort'
      },
      error: null
    },
    nodos: {
      data: [] as object[],
      error: null
    },
    conexiones: {
      data: [] as object[],
      error: null
    }
  })
);

vi.mock(
  '@supabase/supabase-js',
  () => ({
    createClient: vi.fn(
      () => ({
        from: vi.fn(
          (tabla: string) => {
            if (tabla === 'mapas') {
              return {
                select: vi.fn(
                  () => ({
                    eq: vi.fn(
                      () => ({
                        maybeSingle:
                          vi.fn()
                            .mockResolvedValue(
                              respuestaSupabase.mapa
                            )
                      })
                    )
                  })
                )
              };
            }

            if (tabla === 'nodos') {
              return {
                select: vi.fn(
                  () => ({
                    eq: vi.fn(
                      () => ({
                        eq: vi.fn(
                          () => ({
                            order:
                              vi.fn()
                                .mockResolvedValue(
                                  respuestaSupabase.nodos
                                )
                          })
                        )
                      })
                    )
                  })
                )
              };
            }

            return {
              select: vi.fn(
                () => ({
                  eq: vi.fn(
                    () => ({
                      order:
                        vi.fn()
                          .mockResolvedValue(
                            respuestaSupabase.conexiones
                          )
                    })
                  )
                })
              )
            };
          }
        )
      })
    )
  })
);

describe('MapaService', () => {
  let servicio: MapaService;

  beforeEach(() => {
    respuestaSupabase.mapa = {
      data: {
        id: 'hippocampus-resort'
      },
      error: null
    };

    respuestaSupabase.nodos = {
      data: [],
      error: null
    };

    respuestaSupabase.conexiones = {
      data: [],
      error: null
    };

    servicio = new MapaService();
  });

  afterEach(() => {
    vi.restoreAllMocks();
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

  it('conserva el mapa local si Supabase no entrega nodos', async () => {
    respuestaSupabase.nodos.data = [];
    respuestaSupabase.conexiones.data = [
      {
        origen_id: 'entrada-nivel-4',
        destino_id:
          'recepcion-resort-nivel-4',
        distancia: 6.751,
        tipo: 'pasillo',
        accesible: true,
        restringida: false,
        habilitada: true
      }
    ];

    const nodosLocales =
      servicio.obtenerNodosNavegables();

    vi.spyOn(
      console,
      'warn'
    ).mockImplementation(() => undefined);

    const resultado =
      await servicio.cargarMapaDesdeSupabase();

    expect(resultado).toBe(false);

    expect(
      servicio.obtenerNodosNavegables()
    ).toEqual(nodosLocales);
  });

  it('conserva el mapa local si Supabase no entrega conexiones', async () => {
    respuestaSupabase.nodos.data = [
      {
        id: 'entrada-nivel-4',
        nombre: 'Entrada',
        x: 0,
        y: 0,
        tipo: 'entrada',
        nivel: 4,
        sector: 'Acceso',
        accesible: true,
        restringido: false
      }
    ];

    respuestaSupabase.conexiones.data = [];

    const nodosLocales =
      servicio.obtenerNodosNavegables();

    vi.spyOn(
      console,
      'warn'
    ).mockImplementation(() => undefined);

    const resultado =
      await servicio.cargarMapaDesdeSupabase();

    expect(resultado).toBe(false);

    expect(
      servicio.obtenerNodosNavegables()
    ).toEqual(nodosLocales);
  });
});
