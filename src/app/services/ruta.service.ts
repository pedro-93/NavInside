import { Injectable } from '@angular/core';
import {
  CONEXIONES_SIMULADAS,
  NODOS_SIMULADOS
} from '../data/mapa-simulado.data';
import { Conexion, Nodo } from '../models/nodo.model';

@Injectable({
  providedIn: 'root'
})
export class RutaService {

  private nodos: Nodo[] = NODOS_SIMULADOS;
  private conexiones: Conexion[] = CONEXIONES_SIMULADAS;

  calcularRuta(origenId: string, destinoId: string): Nodo[] {
    const abiertos = new Set<string>([origenId]);

    const anteriores = new Map<string, string | null>();
    const costoReal = new Map<string, number>();
    const costoEstimado = new Map<string, number>();

    for (const nodo of this.nodos) {
      anteriores.set(nodo.id, null);
      costoReal.set(nodo.id, Infinity);
      costoEstimado.set(nodo.id, Infinity);
    }

    costoReal.set(origenId, 0);
    costoEstimado.set(
      origenId,
      this.calcularHeuristica(origenId, destinoId)
    );

    while (abiertos.size > 0) {
      const actual = this.obtenerMenorCostoEstimado(
        abiertos,
        costoEstimado
      );

      if (!actual) {
        break;
      }

      if (actual === destinoId) {
        return this.reconstruirRuta(
          origenId,
          destinoId,
          anteriores
        );
      }

      abiertos.delete(actual);

      const vecinos = this.obtenerVecinos(actual);

      for (const vecino of vecinos) {
        const nuevoCosto =
          (costoReal.get(actual) ?? Infinity) +
          vecino.distancia;

        if (
          nuevoCosto <
          (costoReal.get(vecino.id) ?? Infinity)
        ) {
          anteriores.set(vecino.id, actual);
          costoReal.set(vecino.id, nuevoCosto);

          const heuristica = this.calcularHeuristica(
            vecino.id,
            destinoId
          );

          costoEstimado.set(
            vecino.id,
            nuevoCosto + heuristica
          );

          abiertos.add(vecino.id);
        }
      }
    }

    return [];
  }

  calcularDistanciaTotal(ruta: Nodo[]): number {
    let distanciaTotal = 0;

    for (let i = 0; i < ruta.length - 1; i++) {
      const origenId = ruta[i].id;
      const destinoId = ruta[i + 1].id;

      const conexion = this.conexiones.find(conexion =>
        (
          conexion.origen === origenId &&
          conexion.destino === destinoId
        ) ||
        (
          conexion.origen === destinoId &&
          conexion.destino === origenId
        )
      );

      if (!conexion) {
        return Infinity;
      }

      distanciaTotal += conexion.distancia;
    }

    return distanciaTotal;
  }

  private calcularHeuristica(
    origenId: string,
    destinoId: string
  ): number {
    const origen = this.obtenerNodo(origenId);
    const destino = this.obtenerNodo(destinoId);

    if (!origen || !destino) {
      return Infinity;
    }

    const diferenciaX = destino.x - origen.x;
    const diferenciaY = destino.y - origen.y;

    return Math.sqrt(
      diferenciaX ** 2 + diferenciaY ** 2
    );
  }

  private obtenerMenorCostoEstimado(
    abiertos: Set<string>,
    costos: Map<string, number>
  ): string | null {
    let seleccionado: string | null = null;
    let menorCosto = Infinity;

    for (const id of abiertos) {
      const costo = costos.get(id) ?? Infinity;

      if (costo < menorCosto) {
        menorCosto = costo;
        seleccionado = id;
      }
    }

    return seleccionado;
  }

  private obtenerVecinos(
    nodoId: string
  ): { id: string; distancia: number }[] {
    const vecinos: { id: string; distancia: number }[] = [];

    for (const conexion of this.conexiones) {
      if (conexion.origen === nodoId) {
        vecinos.push({
          id: conexion.destino,
          distancia: conexion.distancia
        });
      }

      if (conexion.destino === nodoId) {
        vecinos.push({
          id: conexion.origen,
          distancia: conexion.distancia
        });
      }
    }

    return vecinos;
  }

  private obtenerNodo(id: string): Nodo | undefined {
    return this.nodos.find(nodo => nodo.id === id);
  }

  private reconstruirRuta(
    origenId: string,
    destinoId: string,
    anteriores: Map<string, string | null>
  ): Nodo[] {
    const idsRuta: string[] = [];
    let actual: string | null = destinoId;

    while (actual !== null) {
      idsRuta.unshift(actual);

      if (actual === origenId) {
        break;
      }

      actual = anteriores.get(actual) ?? null;
    }

    if (idsRuta[0] !== origenId) {
      return [];
    }

    return idsRuta
      .map(id => this.obtenerNodo(id))
      .filter((nodo): nodo is Nodo => nodo !== undefined);
  }
}