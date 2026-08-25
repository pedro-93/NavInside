import { Injectable } from '@angular/core';

import {
  Conexion,
  Nodo,
  TipoConexion
} from '../models/nodo.model';

export type SeveridadValidacion =
  | 'error'
  | 'advertencia';

export interface ProblemaMapa {
  codigo: string;
  severidad: SeveridadValidacion;
  mensaje: string;
}

export interface ResultadoValidacionMapa {
  valido: boolean;
  errores: ProblemaMapa[];
  advertencias: ProblemaMapa[];
}

@Injectable({
  providedIn: 'root'
})
export class MapaValidadorService {
  validarMapa(
    nodos: Nodo[],
    conexiones: Conexion[]
  ): ResultadoValidacionMapa {
    const problemas: ProblemaMapa[] = [];

    this.validarNodos(
      nodos,
      problemas
    );

    this.validarConexiones(
      nodos,
      conexiones,
      problemas
    );

    this.validarNodosAislados(
      nodos,
      conexiones,
      problemas
    );

    const errores = problemas.filter(
      problema =>
        problema.severidad === 'error'
    );

    const advertencias = problemas.filter(
      problema =>
        problema.severidad ===
        'advertencia'
    );

    return {
      valido: errores.length === 0,
      errores,
      advertencias
    };
  }

  private validarNodos(
    nodos: Nodo[],
    problemas: ProblemaMapa[]
  ): void {
    const idsEncontrados =
      new Set<string>();

    for (const nodo of nodos) {
      if (!nodo.id.trim()) {
        this.agregarProblema(
          problemas,
          'NODO_ID_VACIO',
          'error',
          'Existe un nodo sin identificador.'
        );

        continue;
      }

      if (idsEncontrados.has(nodo.id)) {
        this.agregarProblema(
          problemas,
          'NODO_ID_DUPLICADO',
          'error',
          `El identificador "${nodo.id}" está duplicado.`
        );
      }

      idsEncontrados.add(nodo.id);

      if (!nodo.nombre.trim()) {
        this.agregarProblema(
          problemas,
          'NODO_NOMBRE_VACIO',
          'error',
          `El nodo "${nodo.id}" no tiene nombre.`
        );
      }

      if (
        !Number.isFinite(nodo.x) ||
        !Number.isFinite(nodo.y)
      ) {
        this.agregarProblema(
          problemas,
          'NODO_COORDENADAS_INVALIDAS',
          'error',
          `El nodo "${nodo.id}" tiene coordenadas inválidas.`
        );
      }

      if (
        nodo.nivel === undefined ||
        !Number.isFinite(nodo.nivel)
      ) {
        this.agregarProblema(
          problemas,
          'NODO_NIVEL_PENDIENTE',
          'advertencia',
          `El nodo "${nodo.id}" no tiene un nivel válido.`
        );
      }

      if (nodo.accesible === undefined) {
        this.agregarProblema(
          problemas,
          'NODO_ACCESIBILIDAD_PENDIENTE',
          'advertencia',
          `El nodo "${nodo.id}" no define si es accesible.`
        );
      }

      if (nodo.restringido === undefined) {
        this.agregarProblema(
          problemas,
          'NODO_RESTRICCION_PENDIENTE',
          'advertencia',
          `El nodo "${nodo.id}" no define si es restringido.`
        );
      }
    }
  }

  private validarConexiones(
    nodos: Nodo[],
    conexiones: Conexion[],
    problemas: ProblemaMapa[]
  ): void {
    const nodosPorId = new Map(
      nodos.map(
        nodo => [nodo.id, nodo]
      )
    );

    const conexionesEncontradas =
      new Set<string>();

    for (const conexion of conexiones) {
      const nodoOrigen =
        nodosPorId.get(conexion.origen);

      const nodoDestino =
        nodosPorId.get(conexion.destino);

      if (!nodoOrigen) {
        this.agregarProblema(
          problemas,
          'CONEXION_ORIGEN_INEXISTENTE',
          'error',
          `La conexión utiliza el origen inexistente "${conexion.origen}".`
        );
      }

      if (!nodoDestino) {
        this.agregarProblema(
          problemas,
          'CONEXION_DESTINO_INEXISTENTE',
          'error',
          `La conexión utiliza el destino inexistente "${conexion.destino}".`
        );
      }

      if (
        conexion.origen ===
        conexion.destino
      ) {
        this.agregarProblema(
          problemas,
          'CONEXION_MISMO_NODO',
          'error',
          `La conexión "${conexion.origen}" apunta al mismo nodo.`
        );
      }

      if (
        !Number.isFinite(
          conexion.distancia
        ) ||
        conexion.distancia <= 0
      ) {
        this.agregarProblema(
          problemas,
          'CONEXION_DISTANCIA_INVALIDA',
          'error',
          `La conexión "${conexion.origen}" → "${conexion.destino}" tiene una distancia inválida.`
        );
      }

      const claveConexion =
        this.crearClaveConexion(
          conexion.origen,
          conexion.destino
        );

      if (
        conexionesEncontradas.has(
          claveConexion
        )
      ) {
        this.agregarProblema(
          problemas,
          'CONEXION_DUPLICADA',
          'error',
          `La conexión entre "${conexion.origen}" y "${conexion.destino}" está duplicada.`
        );
      }

      conexionesEncontradas.add(
        claveConexion
      );

      if (
        nodoOrigen &&
        nodoDestino
      ) {
        this.validarCambioDeNivel(
          nodoOrigen,
          nodoDestino,
          conexion,
          problemas
        );

        this.validarAccesibilidad(
          nodoOrigen,
          nodoDestino,
          conexion,
          problemas
        );
      }

      if (
        conexion.habilitada ===
        undefined
      ) {
        this.agregarProblema(
          problemas,
          'CONEXION_ESTADO_PENDIENTE',
          'advertencia',
          `La conexión "${conexion.origen}" → "${conexion.destino}" no define si está habilitada.`
        );
      }
    }
  }

  private validarCambioDeNivel(
    origen: Nodo,
    destino: Nodo,
    conexion: Conexion,
    problemas: ProblemaMapa[]
  ): void {
    if (
      origen.nivel === undefined ||
      destino.nivel === undefined ||
      origen.nivel === destino.nivel
    ) {
      return;
    }

    const tiposMultinivel:
      TipoConexion[] = [
        'ascensor',
        'escalera',
        'rampa'
      ];

    if (
      !conexion.tipo ||
      !tiposMultinivel.includes(
        conexion.tipo
      )
    ) {
      this.agregarProblema(
        problemas,
        'CONEXION_MULTINIVEL_INVALIDA',
        'error',
        `La conexión entre "${origen.id}" y "${destino.id}" cambia de nivel sin utilizar ascensor, escalera o rampa.`
      );
    }
  }

  private validarAccesibilidad(
    origen: Nodo,
    destino: Nodo,
    conexion: Conexion,
    problemas: ProblemaMapa[]
  ): void {
    if (conexion.accesible !== true) {
      return;
    }

    if (
      origen.accesible === false ||
      destino.accesible === false
    ) {
      this.agregarProblema(
        problemas,
        'CONEXION_ACCESIBILIDAD_INCONSISTENTE',
        'error',
        `La conexión "${origen.id}" → "${destino.id}" está marcada como accesible, pero uno de sus nodos no lo es.`
      );
    }

    if (conexion.tipo === 'escalera') {
      this.agregarProblema(
        problemas,
        'ESCALERA_MARCADA_ACCESIBLE',
        'error',
        `La conexión de escalera "${origen.id}" → "${destino.id}" no puede marcarse como accesible.`
      );
    }
  }

  private validarNodosAislados(
    nodos: Nodo[],
    conexiones: Conexion[],
    problemas: ProblemaMapa[]
  ): void {
    const nodosConectados =
      new Set<string>();

    for (const conexion of conexiones) {
      if (
        conexion.habilitada !== false
      ) {
        nodosConectados.add(
          conexion.origen
        );

        nodosConectados.add(
          conexion.destino
        );
      }
    }

    for (const nodo of nodos) {
      if (
        nodo.restringido !== true &&
        !nodosConectados.has(nodo.id)
      ) {
        this.agregarProblema(
          problemas,
          'NODO_AISLADO',
          'advertencia',
          `El nodo "${nodo.id}" no tiene conexiones habilitadas.`
        );
      }
    }
  }

  private crearClaveConexion(
    origen: string,
    destino: string
  ): string {
    return [origen, destino]
      .sort()
      .join('|');
  }

  private agregarProblema(
    problemas: ProblemaMapa[],
    codigo: string,
    severidad: SeveridadValidacion,
    mensaje: string
  ): void {
    problemas.push({
      codigo,
      severidad,
      mensaje
    });
  }
}