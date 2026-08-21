import { Injectable } from '@angular/core';
import { NODOS_SIMULADOS } from '../data/mapa-simulado.data';
import { DatosQrUbicacion } from '../models/qr-ubicacion.model';
import { Nodo } from '../models/nodo.model';

@Injectable({
  providedIn: 'root'
})
export class QrService {

  procesarCodigo(contenido: string): Nodo | null {
    try {
      const datos = JSON.parse(contenido) as DatosQrUbicacion;

      if (
        datos.sistema !== 'navinside' ||
        datos.version !== 1 ||
        typeof datos.nodoId !== 'string'
      ) {
        return null;
      }

      return NODOS_SIMULADOS.find(
        nodo => nodo.id === datos.nodoId
      ) ?? null;

    } catch {
      return null;
    }
  }
}