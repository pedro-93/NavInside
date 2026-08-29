import {
  beforeEach,
  describe,
  expect,
  it
} from 'vitest';

import { RutaService } from './ruta.service';

describe('RutaService', () => {
  let servicio: RutaService;

  beforeEach(() => {
    servicio = new RutaService();
  });

  it(
    'debe calcular la ruta más corta desde Entrada hasta Baño',
    () => {
      const ruta = servicio.calcularRuta(
        'entrada',
        'baño'
      );

      const ids = ruta.map(
        nodo => nodo.id
      );

      expect(ids).toEqual([
        'entrada',
        'recepcion',
        'baño'
      ]);
    }
  );

  it(
    'debe calcular una ruta en sentido inverso',
    () => {
      const ruta = servicio.calcularRuta(
        'baño',
        'entrada'
      );

      const ids = ruta.map(
        nodo => nodo.id
      );

      expect(ids).toEqual([
        'baño',
        'recepcion',
        'entrada'
      ]);
    }
  );

  it(
    'debe calcular la distancia total',
    () => {
      const ruta = servicio.calcularRuta(
        'entrada',
        'ascensor'
      );

      const distancia =
        servicio.calcularDistanciaTotal(
          ruta
        );

      expect(distancia).toBe(10);
    }
  );

  it(
    'debe devolver una ruta vacía para un nodo inexistente',
    () => {
      const ruta = servicio.calcularRuta(
        'entrada',
        'nodo-inexistente'
      );

      expect(ruta).toEqual([]);
    }
  );

  it(
    'debe calcular una ruta normal entre niveles usando la escalera',
    () => {
      const ruta = servicio.calcularRuta(
        'entrada',
        'salon-nivel-3'
      );

      const ids = ruta.map(
        nodo => nodo.id
      );

      expect(ids).toContain(
        'escalera-nivel-1'
      );

      expect(ids).toContain(
        'escalera-nivel-3'
      );

      expect(ids).not.toContain(
        'ascensor-nivel-3'
      );
    }
  );

  it(
    'debe calcular una ruta accesible entre niveles usando el ascensor',
    () => {
      const ruta = servicio.calcularRuta(
        'entrada',
        'salon-nivel-3',
        true
      );

      const ids = ruta.map(
        nodo => nodo.id
      );

      expect(ids).toContain(
        'ascensor'
      );

      expect(ids).toContain(
        'ascensor-nivel-3'
      );

      expect(ids).not.toContain(
        'escalera-nivel-1'
      );

      expect(ids).not.toContain(
        'escalera-nivel-3'
      );
    }
  );

  it(
    'debe rechazar una escalera como destino accesible',
    () => {
      const ruta = servicio.calcularRuta(
        'entrada',
        'escalera-nivel-3',
        true
      );

      expect(ruta).toEqual([]);
    }
  );

  it(
    'debe calcular las distancias de las rutas entre niveles',
    () => {
      const rutaNormal =
        servicio.calcularRuta(
          'entrada',
          'salon-nivel-3'
        );

      const rutaAccesible =
        servicio.calcularRuta(
          'entrada',
          'salon-nivel-3',
          true
        );

      const distanciaNormal =
        servicio.calcularDistanciaTotal(
          rutaNormal
        );

      const distanciaAccesible =
        servicio.calcularDistanciaTotal(
          rutaAccesible
        );

      expect(distanciaNormal).toBe(13);
      expect(distanciaAccesible).toBe(18);

      expect(
        distanciaAccesible
      ).toBeGreaterThan(
        distanciaNormal
      );
    }
  );

  it(
    'debe devolver pasos vacíos cuando no existe una ruta',
    () => {
      const pasos =
        servicio.generarPasos([]);

      expect(pasos).toEqual([]);
    }
  );

  it(
    'debe generar un paso inicial y uno de llegada',
    () => {
      const ruta = servicio.calcularRuta(
        'entrada',
        'baño'
      );

      const pasos =
        servicio.generarPasos(ruta);

      expect(pasos[0].tipo).toBe(
        'inicio'
      );

      expect(pasos[0].nodo.id).toBe(
        'entrada'
      );

      expect(
        pasos[pasos.length - 1].tipo
      ).toBe('llegada');

      expect(
        pasos[pasos.length - 1].nodo.id
      ).toBe('baño');
    }
  );

  it(
    'debe numerar los pasos correlativamente',
    () => {
      const ruta = servicio.calcularRuta(
        'entrada',
        'baño'
      );

      const pasos =
        servicio.generarPasos(ruta);

      const ordenes = pasos.map(
        paso => paso.orden
      );

      expect(ordenes).toEqual(
        pasos.map(
          (_, indice) => indice + 1
        )
      );
    }
  );

  it(
    'debe detectar una subida mediante escalera',
    () => {
      const ruta = servicio.calcularRuta(
        'entrada',
        'salon-nivel-3'
      );

      const pasos =
        servicio.generarPasos(ruta);

      const cambioNivel = pasos.find(
        paso =>
          paso.tipo === 'cambio-nivel'
      );

      expect(cambioNivel).toBeDefined();

      expect(
        cambioNivel?.direccionNivel
      ).toBe('subir');

      expect(
        cambioNivel?.medio
      ).toBe('escalera');

      expect(
        cambioNivel?.nodo.nivel
      ).toBe(3);
    }
  );

  it(
    'debe detectar una subida accesible mediante ascensor',
    () => {
      const ruta = servicio.calcularRuta(
        'entrada',
        'salon-nivel-3',
        true
      );

      const pasos =
        servicio.generarPasos(ruta);

      const cambioNivel = pasos.find(
        paso =>
          paso.tipo === 'cambio-nivel'
      );

      expect(cambioNivel).toBeDefined();

      expect(
        cambioNivel?.direccionNivel
      ).toBe('subir');

      expect(
        cambioNivel?.medio
      ).toBe('ascensor');

      expect(
        cambioNivel?.nodo.nivel
      ).toBe(3);
    }
  );
});