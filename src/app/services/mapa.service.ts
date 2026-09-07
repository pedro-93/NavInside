import { Injectable } from '@angular/core';

import {
  LUGARES_HIPPOCAMPUS_PRELIMINARES,
  MAPA_ACTIVO
} from '../data/mapa-simulado.data';

import {
  Conexion,
  LugarPlano,
  MapaNavegacion,
  Nodo
} from '../models/nodo.model';

@Injectable({
  providedIn: 'root'
})
export class MapaService {
  private conexionesCerradas =
    new Set<string>();

  obtenerMapaActivo(): MapaNavegacion {
    return {
      ...MAPA_ACTIVO,
      nodos: MAPA_ACTIVO.nodos.map(
        nodo => ({ ...nodo })
      ),
      conexiones: MAPA_ACTIVO.conexiones.map(
        conexion => ({ ...conexion })
      )
    };
  }

  obtenerNodosNavegables(): Nodo[] {
    return MAPA_ACTIVO.nodos.map(
      nodo => ({ ...nodo })
    );
  }

  obtenerConexionesNavegables(): Conexion[] {
    return MAPA_ACTIVO.conexiones.map(
      conexion => ({
        ...conexion,
        habilitada:
          conexion.habilitada !== false &&
          !this.estaConexionCerrada(
            conexion.origen,
            conexion.destino
          )
      })
    );
  }

  obtenerLugaresPreliminares(): LugarPlano[] {
    return LUGARES_HIPPOCAMPUS_PRELIMINARES.map(
      lugar => ({ ...lugar })
    );
  }

  obtenerNodoPorId(id: string): Nodo | undefined {
    const nodo = MAPA_ACTIVO.nodos.find(
      nodoActual => nodoActual.id === id
    );

    return nodo
      ? { ...nodo }
      : undefined;
  }

  obtenerLugarPreliminarPorId(
    id: string
  ): LugarPlano | undefined {
    const lugar =
      LUGARES_HIPPOCAMPUS_PRELIMINARES.find(
        lugarActual => lugarActual.id === id
      );

    return lugar
      ? { ...lugar }
      : undefined;
  }

  esNodoNavegable(id: string): boolean {
    return MAPA_ACTIVO.nodos.some(
      nodo => nodo.id === id
    );
  }

  obtenerNiveles(): number[] {
    const niveles = MAPA_ACTIVO.nodos
      .map(nodo => nodo.nivel)
      .filter(
        (nivel): nivel is number =>
          nivel !== undefined
      );

    return [...new Set(niveles)]
      .sort((nivelA, nivelB) => nivelA - nivelB);
  }

  obtenerNodosPorNivel(nivel: number): Nodo[] {
    return MAPA_ACTIVO.nodos
      .filter(nodo => nodo.nivel === nivel)
      .map(nodo => ({ ...nodo }));
  }

  obtenerLugaresPorNivel(
    nivel: number
  ): LugarPlano[] {
    return LUGARES_HIPPOCAMPUS_PRELIMINARES
      .filter(lugar => lugar.nivel === nivel)
      .map(lugar => ({ ...lugar }));
  }

  cerrarConexion(
    origenId: string,
    destinoId: string
  ): void {
    this.conexionesCerradas.add(
      this.crearClaveConexion(
        origenId,
        destinoId
      )
    );
  }

  habilitarConexion(
    origenId: string,
    destinoId: string
  ): void {
    this.conexionesCerradas.delete(
      this.crearClaveConexion(
        origenId,
        destinoId
      )
    );
  }

  estaConexionCerrada(
    origenId: string,
    destinoId: string
  ): boolean {
    return this.conexionesCerradas.has(
      this.crearClaveConexion(
        origenId,
        destinoId
      )
    );
  }

  obtenerConexionesHabilitadas(
    modoAccesible: boolean = false
  ): Conexion[] {
    return this.obtenerConexionesNavegables()
      .filter(conexion => {
        const estaHabilitada =
          conexion.habilitada !== false;

        const noEstaRestringida =
          conexion.restringida !== true;

        const esAptaParaAccesibilidad =
          !modoAccesible ||
          (
            conexion.accesible !== false &&
            conexion.tipo !== 'escalera'
          );

        return (
          estaHabilitada &&
          noEstaRestringida &&
          esAptaParaAccesibilidad
        );
      });
  }

  obtenerConexionesPorNodo(
    nodoId: string,
    modoAccesible: boolean = false
  ): Conexion[] {
    return this
      .obtenerConexionesHabilitadas(
        modoAccesible
      )
      .filter(
        conexion =>
          conexion.origen === nodoId ||
          conexion.destino === nodoId
      );
  }

  obtenerLugaresPendientes(): LugarPlano[] {
    return LUGARES_HIPPOCAMPUS_PRELIMINARES
      .filter(
        lugar =>
          lugar.x === null ||
          lugar.y === null ||
          lugar.nivel === null
      )
      .map(lugar => ({ ...lugar }));
  }

  private crearClaveConexion(
    origenId: string,
    destinoId: string
  ): string {
    return [origenId, destinoId]
      .sort()
      .join('|');
  }
}