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
    return NODOS_SIMULADOS.find(
      nodo => nodo.id === id
    );
  }

  obtenerLugarPreliminarPorId(
    id: string
  ): LugarPlano | undefined {
    return LUGARES_HIPPOCAMPUS_PRELIMINARES.find(
      lugar => lugar.id === id
    );
  }

  esNodoNavegable(id: string): boolean {
    return NODOS_SIMULADOS.some(
      nodo => nodo.id === id
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