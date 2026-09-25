import {
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest';
import {
  TestBed
} from '@angular/core/testing';

import {
  MapaService
} from './mapa.service';
import {
  RutaService
} from './ruta.service';

describe(
  'RutaService con mediciones de Hippocampus',
  () => {
    let servicio: RutaService;
    let mapaService: MapaService;

    beforeEach(() => {
      servicio =
        TestBed.inject(
          RutaService
        );

      mapaService =
        TestBed.inject(
          MapaService
        );
    });

    it('calcula una ruta desde la entrada al Restaurant Faro', () => {
      const ruta =
        servicio.calcularRuta(
          'entrada-nivel-4',
          'restaurant-faro-nivel-3'
        );

      expect(
        ruta.map(
          nodo => nodo.id
        )
      ).toEqual([
        'entrada-nivel-4',
        'ascensor-central-nivel-4',
        'ascensor-central-nivel-3',
        'restaurant-faro-nivel-3'
      ]);

      expect(
        servicio.calcularDistanciaTotal(
          ruta
        )
      ).toBeCloseTo(
        22.877,
        3
      );
    });

    it('calcula la ruta accesible hacia la piscina', () => {
      const ruta =
        servicio.calcularRuta(
          'entrada-nivel-4',
          'piscina-acceso-accesible-nivel-3',
          true
        );

      expect(
        ruta.map(
          nodo => nodo.id
        )
      ).toContain(
        'ascensor-central-nivel-3'
      );

      expect(
        servicio.calcularDistanciaTotal(
          ruta
        )
      ).toBeCloseTo(
        18.877,
        3
      );
    });

    it('rechaza la ruta por escalones en modo accesible', () => {
      const ruta =
        servicio.calcularRuta(
          'ascensor-central-nivel-3',
          'piscina-acceso-escalones-nivel-3',
          true
        );

      expect(ruta).toEqual([]);
    });

    it('conecta el nivel 1 con el Piso 6', () => {
      const ruta =
        servicio.calcularRuta(
          'hall-nivel-1',
          'alma-spa-tinaja-piso-6'
        );

      expect(
        ruta.map(
          nodo => nodo.id
        )
      ).toEqual([
        'hall-nivel-1',
        'salon-eventos-montemar-nivel-1',
        'ascensor-habitaciones-nivel-1',
        'ascensor-habitaciones-piso-6',
        'puerta-acceso-tinajas-piso-6',
        'alma-spa-tinaja-piso-6'
      ]);

      expect(
        servicio.calcularDistanciaTotal(
          ruta
        )
      ).toBeCloseTo(
        90.42,
        3
      );
    });

    it('genera pasos de cambio de nivel por ascensor', () => {
      const ruta =
        servicio.calcularRuta(
          'entrada-nivel-4',
          'restaurant-faro-nivel-3'
        );

      const pasos =
        servicio.generarPasos(ruta);

      const cambio =
        pasos.find(
          paso =>
            paso.tipo ===
            'cambio-nivel'
        );

      expect(cambio?.medio)
        .toBe('ascensor');

      expect(cambio?.direccionNivel)
        .toBe('bajar');
    });

    it('devuelve el mismo nodo cuando origen y destino coinciden', () => {
      const ruta =
        servicio.calcularRuta(
          'entrada-nivel-4',
          'entrada-nivel-4'
        );

      expect(
        ruta.map(
          nodo => nodo.id
        )
      ).toEqual([
        'entrada-nivel-4'
      ]);

      expect(
        servicio.calcularDistanciaTotal(
          ruta
        )
      ).toBe(0);
    });

    it('rechaza un origen inexistente', () => {
      const ruta =
        servicio.calcularRuta(
          'origen-inexistente',
          'entrada-nivel-4'
        );

      expect(ruta).toEqual([]);
    });

    it('rechaza un destino inexistente', () => {
      const ruta =
        servicio.calcularRuta(
          'entrada-nivel-4',
          'destino-inexistente'
        );

      expect(ruta).toEqual([]);
    });

    it('devuelve una ruta vacía cuando no existen conexiones disponibles', () => {
      vi.spyOn(
        mapaService,
        'obtenerConexionesHabilitadas'
      ).mockReturnValueOnce([]);

      const ruta =
        servicio.calcularRuta(
          'entrada-nivel-4',
          'restaurant-faro-nivel-3'
        );

      expect(ruta).toEqual([]);
    });

    it('devuelve infinito si la ruta contiene un tramo inexistente', () => {
      const origen =
        mapaService.obtenerNodoPorId(
          'entrada-nivel-4'
        );

      const destino =
        mapaService.obtenerNodoPorId(
          'restaurant-faro-nivel-3'
        );

      expect(origen)
        .toBeDefined();

      expect(destino)
        .toBeDefined();

      if (
        !origen ||
        !destino
      ) {
        throw new Error(
          'No se encontraron los nodos de prueba.'
        );
      }

      expect(
        servicio.calcularDistanciaTotal([
          origen,
          destino
        ])
      ).toBe(
        Number.POSITIVE_INFINITY
      );
    });
  }
);