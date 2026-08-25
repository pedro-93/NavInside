import {
  beforeEach,
  describe,
  expect,
  it
} from 'vitest';

import {
  VersionMapaService
} from './version-mapa.service';

describe(
  'VersionMapaService',
  () => {
    let servicio:
      VersionMapaService;

    beforeEach(() => {
      servicio =
        new VersionMapaService();
    });

    it(
      'debe entregar los datos de la versión actual',
      () => {
        const version =
          servicio.obtenerVersionActual();

        expect(version.id)
          .toBe(
            'hippocampus-simulado'
          );

        expect(version.version)
          .toBe('0.1.0');

        expect(version.estado)
          .toBe('simulado');
      }
    );

    it(
      'debe devolver una copia independiente de los niveles',
      () => {
        const primeraCopia =
          servicio.obtenerVersionActual();

        primeraCopia
          .nivelesDisponibles
          .push(99);

        const segundaCopia =
          servicio.obtenerVersionActual();

        expect(
          segundaCopia
            .nivelesDisponibles
        ).toEqual([1, 3]);
      }
    );

    it(
      'debe indicar que el mapa todavía no es oficial',
      () => {
        expect(
          servicio.esMapaOficial()
        ).toBe(false);
      }
    );

    it(
      'debe indicar que el mapa funciona sin internet',
      () => {
        expect(
          servicio
            .funcionaSinInternet()
        ).toBe(true);
      }
    );

    it(
      'debe reconocer los niveles disponibles',
      () => {
        expect(
          servicio.contieneNivel(1)
        ).toBe(true);

        expect(
          servicio.contieneNivel(3)
        ).toBe(true);

        expect(
          servicio.contieneNivel(5)
        ).toBe(false);
      }
    );

    it(
      'debe reconocer la misma versión',
      () => {
        expect(
          servicio.esMismaVersion(
            '0.1.0'
          )
        ).toBe(true);

        expect(
          servicio.esMismaVersion(
            '0.2.0'
          )
        ).toBe(false);
      }
    );

    it(
      'debe detectar versiones más nuevas',
      () => {
        expect(
          servicio
            .hayActualizacionDisponible(
              '0.1.1'
            )
        ).toBe(true);

        expect(
          servicio
            .hayActualizacionDisponible(
              '0.2.0'
            )
        ).toBe(true);

        expect(
          servicio
            .hayActualizacionDisponible(
              '1.0.0'
            )
        ).toBe(true);
      }
    );

    it(
      'debe rechazar versiones iguales, antiguas o inválidas',
      () => {
        expect(
          servicio
            .hayActualizacionDisponible(
              '0.1.0'
            )
        ).toBe(false);

        expect(
          servicio
            .hayActualizacionDisponible(
              '0.0.9'
            )
        ).toBe(false);

        expect(
          servicio
            .hayActualizacionDisponible(
              'version-invalida'
            )
        ).toBe(false);
      }
    );
  }
);