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
  perteneceRuta: boolean;
  esOrigen: boolean;
  esDestino: boolean;
  esActual: boolean;
}

interface ConexionVisual {
  origen: NodoVisual;
  destino: NodoVisual;
  perteneceRuta: boolean;
  accesible: boolean;
}

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
  origenId: string | null = null;

  @Input()
  destinoId: string | null = null;

  @Input()
  nodoActualId: string | null = null;

  readonly anchoVista = 1000;
  readonly altoVista = 650;
  readonly margen = 80;

  get nodosVisuales(): NodoVisual[] {
    const nodosNivel =
      this.nodos.filter(
        nodo => nodo.nivel === this.nivel
      );

    if (nodosNivel.length === 0) {
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
      Math.min(...valoresX);

    const maximoX =
      Math.max(...valoresX);

    const minimoY =
      Math.min(...valoresY);

    const maximoY =
      Math.max(...valoresY);

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
      nodo => ({
        nodo,
        xVisual:
          this.margen +
          (
            (nodo.x - minimoX) /
            rangoX
          ) *
            (
              this.anchoVista -
              this.margen * 2
            ),
        yVisual:
          this.margen +
          (
            (nodo.y - minimoY) /
            rangoY
          ) *
            (
              this.altoVista -
              this.margen * 2
            ),
        perteneceRuta:
          idsRuta.has(nodo.id),
        esOrigen:
          nodo.id === this.origenId,
        esDestino:
          nodo.id === this.destinoId,
        esActual:
          nodo.id ===
          this.nodoActualId
      })
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
      .map(conexion => {
        const origen =
          nodosPorId.get(
            conexion.origen
          );

        const destino =
          nodosPorId.get(
            conexion.destino
          );

        if (!origen || !destino) {
          return null;
        }

        return {
          origen,
          destino,
          perteneceRuta:
            this.esConexionDeRuta(
              conexion.origen,
              conexion.destino
            ),
          accesible:
            conexion.accesible === true
        };
      })
      .filter(
        (
          conexion
        ): conexion is ConexionVisual =>
          conexion !== null
      );
  }

  get hayDatosNivel(): boolean {
    return (
      this.nodosVisuales.length > 0
    );
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

  private esConexionDeRuta(
    origenId: string,
    destinoId: string
  ): boolean {
    for (
      let indice = 0;
      indice < this.ruta.length - 1;
      indice++
    ) {
      const actual =
        this.ruta[indice].id;

      const siguiente =
        this.ruta[indice + 1].id;

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
}