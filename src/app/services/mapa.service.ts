import { Injectable } from '@angular/core';

import {
  CONEXIONES_SIMULADAS,
  LUGARES_HIPPOCAMPUS_PRELIMINARES,
  NODOS_SIMULADOS
} from '../data/mapa-simulado.data';

import {
  Conexion,
  LugarPlano,
  Nodo
} from '../models/nodo.model';

@Injectable({
  providedIn: 'root'
})
export class MapaService {
  obtenerNodosNavegables(): Nodo[] {
    return NODOS_SIMULADOS.map(
      nodo => ({ ...nodo })
    );
  }

  obtenerConexionesNavegables(): Conexion[] {
    return CONEXIONES_SIMULADAS.map(
      conexion => ({ ...conexion })
    );
  }

  obtenerLugaresPreliminares(): LugarPlano[] {
    return LUGARES_HIPPOCAMPUS_PRELIMINARES.map(
      lugar => ({ ...lugar })
    );
  }

  obtenerNodoPorId(id: string): Nodo | undefined {
    const nodo = NODOS_SIMULADOS.find(
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
    return NODOS_SIMULADOS.some(
      nodo => nodo.id === id
    );
  }

  obtenerNiveles(): number[] {
    const niveles = NODOS_SIMULADOS
      .map(nodo => nodo.nivel)
      .filter(
        (nivel): nivel is number =>
          nivel !== undefined
      );

    return [...new Set(niveles)]
      .sort((nivelA, nivelB) => nivelA - nivelB);
  }

  obtenerNodosPorNivel(nivel: number): Nodo[] {
    return NODOS_SIMULADOS
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

  obtenerConexionesHabilitadas(
    modoAccesible: boolean = false
  ): Conexion[] {
    return CONEXIONES_SIMULADAS
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
      })
      .map(conexion => ({ ...conexion }));
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
}