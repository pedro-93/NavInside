import {
  beforeEach,
  describe,
  expect,
  it
} from 'vitest';

import {
  RutaService
} from './ruta.service';

describe(
  'RutaService con mediciones de Hippocampus',
  () => {
    let servicio: RutaService;

    beforeEach(() => {
      servicio = new RutaService();
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
  }
);