import { Injectable } from '@angular/core';
import { CONEXIONES_SIMULADAS, NODOS_SIMULADOS } from '../data/mapa-simulado.data';
import { Conexion, Nodo } from '../models/nodo.model';

@Injectable({
  providedIn: 'root'
})
export class RutaService {

  private nodos: Nodo[] = NODOS_SIMULADOS;
  private conexiones: Conexion[] = CONEXIONES_SIMULADAS;

  calcularRuta(origenId: string, destinoId: string): Nodo[] {
    const pendientes = new Set(this.nodos.map(nodo => nodo.id));
    const distancias = new Map<string, number>();
    const anteriores = new Map<string, string | null>();

    for (const nodo of this.nodos) {
      distancias.set(nodo.id, Infinity);
      anteriores.set(nodo.id, null);
    }

    distancias.set(origenId, 0);

    while (pendientes.size > 0) {
      const actual = this.obtenerNodoMasCercano(
        pendientes,
        distancias
      );

      if (!actual || distancias.get(actual) === Infinity) {
        break;
      }

      pendientes.delete(actual);

      if (actual === destinoId) {
        break;
      }

      const vecinos = this.obtenerVecinos(actual);

      for (const vecino of vecinos) {
        if (!pendientes.has(vecino.id)) {
          continue;
        }

        const nuevaDistancia =
          (distancias.get(actual) ?? Infinity) + vecino.distancia;

        if (
          nuevaDistancia <
          (distancias.get(vecino.id) ?? Infinity)
        ) {
          distancias.set(vecino.id, nuevaDistancia);
          anteriores.set(vecino.id, actual);
        }
      }
    }

    return this.reconstruirRuta(
      origenId,
      destinoId,
      anteriores
    );
  }

  private obtenerNodoMasCercano(
    pendientes: Set<string>,
    distancias: Map<string, number>
  ): string | null {
    let seleccionado: string | null = null;
    let distanciaMenor = Infinity;

    for (const id of pendientes) {
      const distancia = distancias.get(id) ?? Infinity;

      if (distancia < distanciaMenor) {
        distanciaMenor = distancia;
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
      .map(id => this.nodos.find(nodo => nodo.id === id))
      .filter((nodo): nodo is Nodo => nodo !== undefined);
  }
}