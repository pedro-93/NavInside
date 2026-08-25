import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest';

import {
  IdiomaService
} from './idioma.service';

describe('IdiomaService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it(
    'debe traducir contenido al inglés',
    () => {
      const servicio =
        new IdiomaService();

      servicio.establecerIdioma('en');

      expect(
        servicio.traducir(
          'calcularRuta'
        )
      ).toBe('Calculate route');
    }
  );

  it(
    'debe traducir contenido al portugués',
    () => {
      const servicio =
        new IdiomaService();

      servicio.establecerIdioma('pt');

      expect(
        servicio.traducir(
          'rutaAccesible'
        )
      ).toBe('Rota acessível');
    }
  );

  it(
    'debe conservar el idioma seleccionado',
    () => {
      const primerServicio =
        new IdiomaService();

      primerServicio
        .establecerIdioma('pt');

      const segundoServicio =
        new IdiomaService();

      expect(
        segundoServicio.idiomaActual
      ).toBe('pt');
    }
  );

  it(
    'debe sustituir parámetros dinámicos',
    () => {
      const servicio =
        new IdiomaService();

      servicio.establecerIdioma('es');

      const mensaje = servicio.traducir(
        'ubicacionDetectada',
        {
          nombre: 'Recepción'
        }
      );

      expect(mensaje).toBe(
        'Ubicación detectada: Recepción'
      );
    }
  );

  it(
    'debe detectar portugués desde el dispositivo',
    () => {
      vi.spyOn(
        window.navigator,
        'language',
        'get'
      ).mockReturnValue('pt-BR');

      const servicio =
        new IdiomaService();

      expect(
        servicio.idiomaActual
      ).toBe('pt');
    }
  );

  it(
    'debe usar español para un idioma no compatible',
    () => {
      vi.spyOn(
        window.navigator,
        'language',
        'get'
      ).mockReturnValue('fr-FR');

      const servicio =
        new IdiomaService();

      expect(
        servicio.idiomaActual
      ).toBe('es');
    }
  );

  it(
    'debe devolver la clave cuando no existe traducción',
    () => {
      const servicio =
        new IdiomaService();

      expect(
        servicio.traducir(
          'clave-inexistente'
        )
      ).toBe('clave-inexistente');
    }
  );
});