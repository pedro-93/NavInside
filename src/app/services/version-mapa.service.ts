import {
  Injectable
} from '@angular/core';

import {
  VERSION_MAPA_ACTUAL
} from '../data/version-mapa.data';

import {
  VersionMapa
} from '../models/version-mapa.model';

@Injectable({
  providedIn: 'root'
})
export class VersionMapaService {
  obtenerVersionActual():
    VersionMapa {
    return {
      ...VERSION_MAPA_ACTUAL,
      nivelesDisponibles: [
        ...VERSION_MAPA_ACTUAL
          .nivelesDisponibles
      ]
    };
  }

  obtenerNumeroVersion(): string {
    return VERSION_MAPA_ACTUAL.version;
  }

  esMapaOficial(): boolean {
    return (
      VERSION_MAPA_ACTUAL.estado ===
      'oficial'
    );
  }

  funcionaSinInternet(): boolean {
    return (
      VERSION_MAPA_ACTUAL
        .requiereInternet === false
    );
  }

  contieneNivel(
    nivel: number
  ): boolean {
    return VERSION_MAPA_ACTUAL
      .nivelesDisponibles
      .includes(nivel);
  }

  esMismaVersion(
    version: string
  ): boolean {
    return (
      VERSION_MAPA_ACTUAL.version ===
      version
    );
  }

  hayActualizacionDisponible(
    versionDisponible: string
  ): boolean {
    const actual =
      this.convertirVersion(
        VERSION_MAPA_ACTUAL.version
      );

    const disponible =
      this.convertirVersion(
        versionDisponible
      );

    if (!actual || !disponible) {
      return false;
    }

    for (
      let indice = 0;
      indice < 3;
      indice++
    ) {
      if (
        disponible[indice] >
        actual[indice]
      ) {
        return true;
      }

      if (
        disponible[indice] <
        actual[indice]
      ) {
        return false;
      }
    }

    return false;
  }

  private convertirVersion(
    version: string
  ): [number, number, number] | null {
    const partes =
      version.split('.');

    if (partes.length !== 3) {
      return null;
    }

    const numeros =
      partes.map(
        parte => Number(parte)
      );

    if (
      numeros.some(
        numero =>
          !Number.isInteger(numero) ||
          numero < 0
      )
    ) {
      return null;
    }

    return [
      numeros[0],
      numeros[1],
      numeros[2]
    ];
  }
}