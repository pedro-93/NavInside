import { Injectable } from '@angular/core';

import {
  Conexion,
  Nodo,
  TipoConexion
} from '../models/nodo.model';
import { MapaService } from './mapa.service';

export type TipoPasoRuta =
  | 'inicio'
  | 'avance'
  | 'cambio-nivel'
  | 'llegada';

export type DireccionNivel =
  | 'subir'
  | 'bajar';

export interface PasoRuta {
  orden: number;
  tipo: TipoPasoRuta;
  nodo: Nodo;
  desde?: Nodo;
  medio?: TipoConexion;
  direccionNivel?: DireccionNivel;
}

@Injectable({
  providedIn: 'root'
})
export class RutaService {
  private nodos: Nodo[];
  private conexiones: Conexion[];

  constructor(
    private mapaService: MapaService =
      new MapaService()
  ) {
    this.nodos =
      this.mapaService.obtenerNodosNavegables();

    this.conexiones =
      this.mapaService.obtenerConexionesNavegables();
  }

  calcularRuta(
    origenId: string,
    destinoId: string,
    modoAccesible: boolean = false
  ): Nodo[] {
    const origen = this.obtenerNodo(origenId);
    const destino = this.obtenerNodo(destinoId);

    if (!origen || !destino) {
      return [];
    }

    if (
      origen.restringido === true ||
      destino.restringido === true
    ) {
      return [];
    }

    if (
      modoAccesible &&
      (
        origen.accesible === false ||
        destino.accesible === false
      )
    ) {
      return [];
    }

    const conexionesDisponibles =
      this.mapaService
        .obtenerConexionesHabilitadas(
          modoAccesible
        );

    const abiertos =
      new Set<string>([origenId]);

    const anteriores =
      new Map<string, string | null>();

    const costoReal =
      new Map<string, number>();

    const costoEstimado =
      new Map<string, number>();

    for (const nodo of this.nodos) {
      anteriores.set(nodo.id, null);
      costoReal.set(nodo.id, Infinity);
      costoEstimado.set(nodo.id, Infinity);
    }

    costoReal.set(origenId, 0);

    costoEstimado.set(
      origenId,
      this.calcularHeuristica(
        origenId,
        destinoId
      )
    );

    while (abiertos.size > 0) {
      const actual =
        this.obtenerMenorCostoEstimado(
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

      const vecinos = this.obtenerVecinos(
        actual,
        conexionesDisponibles,
        modoAccesible
      );

      for (const vecino of vecinos) {
        const nuevoCosto =
          (
            costoReal.get(actual) ??
            Infinity
          ) + vecino.distancia;

        if (
          nuevoCosto <
          (
            costoReal.get(vecino.id) ??
            Infinity
          )
        ) {
          anteriores.set(
            vecino.id,
            actual
          );

          costoReal.set(
            vecino.id,
            nuevoCosto
          );

          const heuristica =
            this.calcularHeuristica(
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

  calcularDistanciaTotal(
    ruta: Nodo[]
  ): number {
    let distanciaTotal = 0;

    for (
      let i = 0;
      i < ruta.length - 1;
      i++
    ) {
      const conexion =
        this.obtenerConexionEntre(
          ruta[i].id,
          ruta[i + 1].id
        );

      if (!conexion) {
        return Infinity;
      }

      distanciaTotal += conexion.distancia;
    }

    return distanciaTotal;
  }

  generarPasos(
    ruta: Nodo[]
  ): PasoRuta[] {
    if (ruta.length === 0) {
      return [];
    }

    const pasos: PasoRuta[] = [
      {
        orden: 1,
        tipo: 'inicio',
        nodo: ruta[0]
      }
    ];

    for (
      let i = 0;
      i < ruta.length - 1;
      i++
    ) {
      const nodoActual = ruta[i];
      const nodoSiguiente = ruta[i + 1];

      const conexion =
        this.obtenerConexionEntre(
          nodoActual.id,
          nodoSiguiente.id
        );

      const cambioNivel =
        nodoActual.nivel !== undefined &&
        nodoSiguiente.nivel !== undefined &&
        nodoActual.nivel !== nodoSiguiente.nivel;

      if (cambioNivel) {
        pasos.push({
          orden: pasos.length + 1,
          tipo: 'cambio-nivel',
          desde: nodoActual,
          nodo: nodoSiguiente,
          medio: conexion?.tipo,
          direccionNivel:
            nodoSiguiente.nivel! >
            nodoActual.nivel!
              ? 'subir'
              : 'bajar'
        });

        continue;
      }

      pasos.push({
        orden: pasos.length + 1,
        tipo: 'avance',
        desde: nodoActual,
        nodo: nodoSiguiente,
        medio: conexion?.tipo
      });
    }

    pasos.push({
      orden: pasos.length + 1,
      tipo: 'llegada',
      nodo: ruta[ruta.length - 1]
    });

    return pasos;
  }

  private calcularHeuristica(
    origenId: string,
    destinoId: string
  ): number {
    const origen =
      this.obtenerNodo(origenId);

    const destino =
      this.obtenerNodo(destinoId);

    if (!origen || !destino) {
      return Infinity;
    }

    const diferenciaX =
      destino.x - origen.x;

    const diferenciaY =
      destino.y - origen.y;

    return Math.sqrt(
      diferenciaX ** 2 +
      diferenciaY ** 2
    );
  }

  private obtenerMenorCostoEstimado(
    abiertos: Set<string>,
    costos: Map<string, number>
  ): string | null {
    let seleccionado: string | null =
      null;

    let menorCosto = Infinity;

    for (const id of abiertos) {
      const costo =
        costos.get(id) ?? Infinity;

      if (costo < menorCosto) {
        menorCosto = costo;
        seleccionado = id;
      }
    }

    return seleccionado;
  }

  private obtenerVecinos(
    nodoId: string,
    conexionesDisponibles: Conexion[],
    modoAccesible: boolean
  ): {
    id: string;
    distancia: number;
  }[] {
    const vecinos: {
      id: string;
      distancia: number;
    }[] = [];

    for (
      const conexion of
        conexionesDisponibles
    ) {
      let vecinoId: string | null = null;

      if (conexion.origen === nodoId) {
        vecinoId = conexion.destino;
      }

      if (conexion.destino === nodoId) {
        vecinoId = conexion.origen;
      }

      if (!vecinoId) {
        continue;
      }

      const nodoVecino =
        this.obtenerNodo(vecinoId);

      if (!nodoVecino) {
        continue;
      }

      if (nodoVecino.restringido === true) {
        continue;
      }

      if (
        modoAccesible &&
        nodoVecino.accesible === false
      ) {
        continue;
      }

      vecinos.push({
        id: vecinoId,
        distancia: conexion.distancia
      });
    }

    return vecinos;
  }

  private obtenerNodo(
    id: string
  ): Nodo | undefined {
    return this.nodos.find(
      nodo => nodo.id === id
    );
  }

  private obtenerConexionEntre(
    origenId: string,
    destinoId: string
  ): Conexion | undefined {
    return this.conexiones.find(
      conexion =>
        (
          conexion.origen === origenId &&
          conexion.destino === destinoId
        ) ||
        (
          conexion.origen === destinoId &&
          conexion.destino === origenId
        )
    );
  }

  private reconstruirRuta(
    origenId: string,
    destinoId: string,
    anteriores:
      Map<string, string | null>
  ): Nodo[] {
    const idsRuta: string[] = [];

    let actual: string | null =
      destinoId;

    while (actual !== null) {
      idsRuta.unshift(actual);

      if (actual === origenId) {
        break;
      }

      actual =
        anteriores.get(actual) ??
        null;
    }

    if (idsRuta[0] !== origenId) {
      return [];
    }

    return idsRuta
      .map(
        id => this.obtenerNodo(id)
      )
      .filter(
        (nodo): nodo is Nodo =>
          nodo !== undefined
      );
  }
}