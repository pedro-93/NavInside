import {
  inject,
  Injectable
} from '@angular/core';

import {
  DatosQrUbicacion
} from '../models/qr-ubicacion.model';
import {
  Nodo
} from '../models/nodo.model';
import {
  MapaService
} from './mapa.service';

@Injectable({
  providedIn: 'root'
})
export class QrService {
  private readonly mapaService =
    inject(MapaService);

  procesarCodigo(
    contenido: string
  ): Nodo | null {
    const nodoIdSimple =
      this.extraerNodoIdSimple(
        contenido
      );

    if (nodoIdSimple) {
      return (
        this.mapaService.obtenerNodoPorId(
          nodoIdSimple
        ) ?? null
      );
    }

    try {
      const datos =
        JSON.parse(
          contenido
        ) as DatosQrUbicacion;

      if (
        datos.sistema !== 'navinside' ||
        datos.version !== 1 ||
        typeof datos.nodoId !== 'string'
      ) {
        return null;
      }

      return (
        this.mapaService.obtenerNodoPorId(
          datos.nodoId
        ) ?? null
      );
    } catch {
      return null;
    }
  }

  private extraerNodoIdSimple(
    contenido: string
  ): string | null {
    const prefijo = 'NAVINSIDE:';

    if (!contenido.startsWith(prefijo)) {
      return null;
    }

    const nodoId = contenido
      .slice(prefijo.length)
      .trim();

    return nodoId || null;
  }
}
