import {
  CommonModule
} from '@angular/common';

import {
  Component,
  Input
} from '@angular/core';

import {
  Conexion,
  Nodo
} from '../../models/nodo.model';

interface NodoVisual {
  nodo: Nodo;
  xVisual: number;
  yVisual: number;
  xEtiqueta: number;
  yEtiqueta: number;
  lineasNombre: string[];
  perteneceRuta: boolean;
  esOrigen: boolean;
  esDestino: boolean;
  esActual: boolean;
}

interface ConexionVisual {
  origen: NodoVisual;
  destino: NodoVisual;
  distancia: number;
  xEtiqueta: number;
  yEtiqueta: number;
  perteneceRuta: boolean;
  accesible: boolean;
  habilitada: boolean;
}

interface PosicionVisual {
  x: number;
  y: number;
}

interface PosicionEtiqueta {
  x: number;
  y: number;
}

interface CursorVisual {
  x: number;
  y: number;
  angulo: number;
}

const POSICIONES_NIVEL_UNO:
  Record<string, PosicionVisual> = {
    'ascensor-central-nivel-1': {
      x: 150,
      y: 330
    },

    'zona-kid-nivel-1': {
      x: 150,
      y: 145
    },

    'zona-juego-adulto-nivel-1': {
      x: 150,
      y: 555
    },

    'zona-play-nivel-1': {
      x: 335,
      y: 180
    },

    'hall-nivel-1': {
      x: 545,
      y: 330
    },

    'mini-market-proa-nivel-1': {
      x: 545,
      y: 145
    },

    'salon-eventos-altamar-nivel-1': {
      x: 900,
      y: 145
    },

    'salon-eventos-terramar-nivel-1': {
      x: 670,
      y: 555
    },

    'gimnasio-nivel-1': {
      x: 850,
      y: 555
    },

    'alma-spa-nivel-1': {
      x: 1030,
      y: 555
    },

    'salon-eventos-montemar-nivel-1': {
      x: 1210,
      y: 555
    },

    'ascensor-habitaciones-nivel-1': {
      x: 1370,
      y: 555
    }
  };

const ETIQUETAS_NIVEL_UNO:
  Record<string, PosicionEtiqueta> = {
    'ascensor-central-nivel-1': {
      x: 0,
      y: -48
    },

    'zona-kid-nivel-1': {
      x: 0,
      y: -43
    },

    'zona-juego-adulto-nivel-1': {
      x: 0,
      y: -43
    },

    'zona-play-nivel-1': {
      x: 0,
      y: -43
    },

    'hall-nivel-1': {
      x: 0,
      y: -43
    },

    'mini-market-proa-nivel-1': {
      x: 0,
      y: -43
    },

    'salon-eventos-altamar-nivel-1': {
      x: 0,
      y: -43
    },

    'salon-eventos-terramar-nivel-1': {
      x: 0,
      y: -43
    },

    'gimnasio-nivel-1': {
      x: 0,
      y: -43
    },

    'alma-spa-nivel-1': {
      x: 0,
      y: -43
    },

    'salon-eventos-montemar-nivel-1': {
      x: 0,
      y: -43
    },

    'ascensor-habitaciones-nivel-1': {
      x: 0,
      y: -43
    }
  };

@Component({
  selector: 'app-mapa-ruta',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl:
    './mapa-ruta.component.html',
  styleUrl:
    './mapa-ruta.component.scss'
})
export class MapaRutaComponent {
  @Input()
  nodos: Nodo[] = [];

  @Input()
  conexiones: Conexion[] = [];

  @Input()
  ruta: Nodo[] = [];

  @Input()
  nivel = 1;

  @Input()
  origenId:
    string | null = null;

  @Input()
  destinoId:
    string | null = null;

  @Input()
  nodoActualId:
    string | null = null;

  @Input()
  textoEtiqueta =
    'Mapa navegable preliminar';

  @Input()
  textoNivel =
    'Nivel';

  @Input()
  textoEstado =
    'Mediciones de referencia';

  @Input()
  textoAriaMapa =
    'Grafo navegable';

  @Input()
  textoSinDatos =
    'No existen nodos disponibles.';

  @Input()
  textoNodo =
    'Nodo';

  @Input()
  textoRuta =
    'Ruta calculada';

  @Input()
  textoOrigen =
    'Origen';

  @Input()
  textoDestino =
    'Destino';

  @Input()
  textoUbicacionActual =
    'Ubicación actual';

  @Input()
  textoAccesoCerrado =
    'Acceso cerrado';

  get anchoVista(): number {
    return this.nivel === 1
      ? 1520
      : 1000;
  }

  get altoVista(): number {
    return this.nivel === 1
      ? 740
      : 650;
  }

  readonly margen = 140;

  get nodosVisuales():
    NodoVisual[] {
    const nodosNivel =
      this.nodos.filter(
        nodo =>
          nodo.nivel ===
          this.nivel
      );

    if (
      nodosNivel.length === 0
    ) {
      return [];
    }

    const valoresX =
      nodosNivel.map(
        nodo => nodo.x
      );

    const valoresY =
      nodosNivel.map(
        nodo => nodo.y
      );

    const minimoX =
      Math.min(
        ...valoresX
      );

    const maximoX =
      Math.max(
        ...valoresX
      );

    const minimoY =
      Math.min(
        ...valoresY
      );

    const maximoY =
      Math.max(
        ...valoresY
      );

    const rangoX =
      Math.max(
        maximoX - minimoX,
        1
      );

    const rangoY =
      Math.max(
        maximoY - minimoY,
        1
      );

    const idsRuta =
      new Set(
        this.ruta.map(
          nodo => nodo.id
        )
      );

    return nodosNivel.map(
      nodo => {
        const posicion =
          this.obtenerPosicionVisual(
            nodo,
            minimoX,
            minimoY,
            rangoX,
            rangoY
          );

        const posicionEtiqueta =
          this.obtenerPosicionEtiqueta(
            nodo
          );

        return {
          nodo,

          lineasNombre:
            this.dividirNombreNodo(
              nodo.nombre
            ),

          xVisual:
            posicion.x,

          yVisual:
            posicion.y,

          xEtiqueta:
            posicionEtiqueta.x,

          yEtiqueta:
            posicionEtiqueta.y,

          perteneceRuta:
            idsRuta.has(
              nodo.id
            ),

          esOrigen:
            nodo.id ===
            this.origenId,

          esDestino:
            nodo.id ===
            this.destinoId,

          esActual:
            nodo.id ===
            this.nodoActualId
        };
      }
    );
  }

  get conexionesVisuales():
    ConexionVisual[] {
    const nodosPorId =
      new Map(
        this.nodosVisuales.map(
          nodoVisual => [
            nodoVisual.nodo.id,
            nodoVisual
          ]
        )
      );

    return this.conexiones
      .map(
        conexion => {
          const origen =
            nodosPorId.get(
              conexion.origen
            );

          const destino =
            nodosPorId.get(
              conexion.destino
            );

          if (
            !origen ||
            !destino
          ) {
            return null;
          }

          return {
            origen,
            destino,

            distancia:
              conexion.distancia,

            xEtiqueta:
              (
                origen.xVisual +
                destino.xVisual
              ) / 2,

            yEtiqueta:
              (
                origen.yVisual +
                destino.yVisual
              ) / 2,

            perteneceRuta:
              this.esConexionDeRuta(
                conexion.origen,
                conexion.destino
              ),

            accesible:
              conexion.accesible ===
              true,

            habilitada:
              conexion.habilitada !==
              false
          };
        }
      )
      .filter(
        (
          conexion
        ): conexion is ConexionVisual =>
          conexion !== null
      );
  }

  get cursorVisual():
    CursorVisual | null {
    if (!this.nodoActualId) {
      return null;
    }

    const nodoActual =
      this.nodosVisuales.find(
        nodoVisual =>
          nodoVisual.nodo.id ===
          this.nodoActualId
      );

    if (!nodoActual) {
      return null;
    }

    const indiceRuta =
      this.ruta.findIndex(
        nodo =>
          nodo.id ===
          this.nodoActualId
      );

    let siguienteId:
      string | null = null;

    if (
      indiceRuta >= 0 &&
      indiceRuta <
        this.ruta.length - 1
    ) {
      siguienteId =
        this.ruta[
          indiceRuta + 1
        ].id;
    } else if (
      this.ruta.length > 1
    ) {
      siguienteId =
        this.ruta[1].id;
    }

    const siguiente =
      siguienteId
        ? this.nodosVisuales.find(
            nodoVisual =>
              nodoVisual.nodo.id ===
              siguienteId
          )
        : null;

    let angulo = 0;

    if (siguiente) {
      const diferenciaX =
        siguiente.xVisual -
        nodoActual.xVisual;

      const diferenciaY =
        siguiente.yVisual -
        nodoActual.yVisual;

      angulo =
        Math.atan2(
          diferenciaY,
          diferenciaX
        ) *
        (
          180 /
          Math.PI
        ) +
        90;
    }

    return {
      x: nodoActual.xVisual,
      y: nodoActual.yVisual,
      angulo
    };
  }

  get hayDatosNivel():
    boolean {
    return (
      this.nodosVisuales.length >
      0
    );
  }

  get mostrarOrientacionNivelUno():
    boolean {
    return this.nivel === 1;
  }

  formatearDistancia(
    distancia: number
  ): string {
    return `${
      distancia.toLocaleString(
        'es-CL',
        {
          minimumFractionDigits:
            0,

          maximumFractionDigits:
            3
        }
      )
    } m`;
  }

  identificarNodo(
    _indice: number,
    nodoVisual: NodoVisual
  ): string {
    return nodoVisual.nodo.id;
  }

  identificarConexion(
    indice: number,
    conexion: ConexionVisual
  ): string {
    return [
      conexion.origen.nodo.id,
      conexion.destino.nodo.id,
      indice
    ].join('-');
  }

  dividirNombreNodo(
    nombre: string
  ): string[] {
    const limite = 18;

    const palabras =
      nombre
        .trim()
        .split(/\s+/);

    const lineas:
      string[] = [];

    let lineaActual = '';

    for (
      const palabra of palabras
    ) {
      const lineaPropuesta =
        lineaActual
          ? `${lineaActual} ${palabra}`
          : palabra;

      if (
        lineaPropuesta.length <=
        limite
      ) {
        lineaActual =
          lineaPropuesta;

        continue;
      }

      if (lineaActual) {
        lineas.push(
          lineaActual
        );
      }

      lineaActual =
        palabra;
    }

    if (lineaActual) {
      lineas.push(
        lineaActual
      );
    }

    return lineas.length > 0
      ? lineas
      : [nombre];
  }

  private esConexionDeRuta(
    origenId: string,
    destinoId: string
  ): boolean {
    for (
      let indice = 0;
      indice <
        this.ruta.length - 1;
      indice++
    ) {
      const actual =
        this.ruta[
          indice
        ].id;

      const siguiente =
        this.ruta[
          indice + 1
        ].id;

      const coincideDirectamente =
        actual === origenId &&
        siguiente === destinoId;

      const coincideInversamente =
        actual === destinoId &&
        siguiente === origenId;

      if (
        coincideDirectamente ||
        coincideInversamente
      ) {
        return true;
      }
    }

    return false;
  }

  private obtenerPosicionVisual(
    nodo: Nodo,
    minimoX: number,
    minimoY: number,
    rangoX: number,
    rangoY: number
  ): PosicionVisual {
    const posicionNivelUno =
      POSICIONES_NIVEL_UNO[
        nodo.id
      ];

    if (
      this.nivel === 1 &&
      posicionNivelUno
    ) {
      return posicionNivelUno;
    }

    return {
      x:
        this.margen +
        (
          (
            nodo.x -
            minimoX
          ) /
          rangoX
        ) *
        (
          this.anchoVista -
          this.margen * 2
        ),

      y:
        this.margen +
        (
          (
            nodo.y -
            minimoY
          ) /
          rangoY
        ) *
        (
          this.altoVista -
          this.margen * 2
        )
    };
  }

  private obtenerPosicionEtiqueta(
    nodo: Nodo
  ): PosicionEtiqueta {
    if (
      this.nivel === 1
    ) {
      return (
        ETIQUETAS_NIVEL_UNO[
          nodo.id
        ] ?? {
          x: 0,
          y: -43
        }
      );
    }

    return {
      x: 0,
      y: -34
    };
  }
}