import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerCameraDirection,
  CapacitorBarcodeScannerTypeHint
} from '@capacitor/barcode-scanner';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar
} from '@ionic/angular';

import {
  MapaRutaComponent
} from '../components/mapa-ruta/mapa-ruta.component';
import {
  CONEXIONES_SIMULADAS,
  NODOS_SIMULADOS
} from '../data/mapa-simulado.data';
import {
  Nodo
} from '../models/nodo.model';
import {
  Idioma,
  IdiomaService
} from '../services/idioma.service';
import {
  QrService
} from '../services/qr.service';
import {
  RutaService
} from '../services/ruta.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MapaRutaComponent,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToggle,
    IonToolbar
  ]
})
export class HomePage {
  readonly nodosMapa =
    NODOS_SIMULADOS;

  readonly conexionesMapa =
    CONEXIONES_SIMULADAS;

  lugares: string[] = NODOS_SIMULADOS
    .filter(
      nodo =>
        nodo.restringido !== true
    )
    .map(
      nodo => nodo.nombre
    );

  origen: string = '';
  destino: string = '';
  modoAccesible: boolean = false;
  idiomaSeleccionado: Idioma;
  mensajeUbicacion: string = '';
  resultado: string = '';
  distanciaTotal: number | null = null;
  rutaCalculada: Nodo[] = [];
  nivelVisualizado = 1;

  constructor(
    private rutaService: RutaService,
    private qrService: QrService,
    private idiomaService: IdiomaService
  ) {
    this.idiomaSeleccionado =
      this.idiomaService.idiomaActual;
  }

  get origenId(): string | null {
    return (
      NODOS_SIMULADOS.find(
        nodo =>
          nodo.nombre === this.origen
      )?.id ?? null
    );
  }

  get destinoId(): string | null {
    return (
      NODOS_SIMULADOS.find(
        nodo =>
          nodo.nombre === this.destino
      )?.id ?? null
    );
  }

  traducir(
    clave: string,
    parametros: Record<
      string,
      string | number
    > = {}
  ): string {
    return this.idiomaService.traducir(
      clave,
      parametros
    );
  }

  cambiarIdioma(): void {
    this.idiomaService.establecerIdioma(
      this.idiomaSeleccionado
    );

    this.mensajeUbicacion = '';
    this.limpiarRuta();
  }

  async leerQrReal(): Promise<void> {
    this.limpiarRuta();
    this.mensajeUbicacion = '';

    try {
      const lectura =
        await CapacitorBarcodeScanner.scanBarcode({
          hint:
            CapacitorBarcodeScannerTypeHint.QR_CODE,
          cameraDirection:
            CapacitorBarcodeScannerCameraDirection.BACK,
          scanInstructions:
            this.traducir(
              'apuntarCamara'
            ),
          scanButton: true,
          scanText:
            this.traducir('escanear')
        });

      if (!lectura.ScanResult) {
        this.mensajeUbicacion =
          this.traducir(
            'lecturaCancelada'
          );
        return;
      }

      this.procesarLecturaQr(
        lectura.ScanResult
      );
    } catch (error) {
      console.error(
        'Error al leer el código QR:',
        error
      );

      this.mensajeUbicacion =
        this.traducir('errorCamara');
    }
  }

  simularLecturaQr(): void {
    this.limpiarRuta();
    this.mensajeUbicacion = '';

    const contenidoQr = JSON.stringify({
      sistema: 'navinside',
      version: 1,
      nodoId: 'recepcion'
    });

    this.procesarLecturaQr(
      contenidoQr
    );
  }

  calcularRuta(): void {
    this.limpiarRuta();

    if (!this.origen || !this.destino) {
      this.resultado =
        this.traducir(
          'seleccionarOrigenDestino'
        );
      return;
    }

    if (this.origen === this.destino) {
      this.resultado =
        this.traducir(
          'origenDestinoIguales'
        );
      return;
    }

    const nodoOrigen =
      NODOS_SIMULADOS.find(
        nodo =>
          nodo.nombre === this.origen
      );

    const nodoDestino =
      NODOS_SIMULADOS.find(
        nodo =>
          nodo.nombre === this.destino
      );

    if (!nodoOrigen || !nodoDestino) {
      this.resultado =
        this.traducir(
          'lugaresNoEncontrados'
        );
      return;
    }

    const ruta =
      this.rutaService.calcularRuta(
        nodoOrigen.id,
        nodoDestino.id,
        this.modoAccesible
      );

    if (ruta.length === 0) {
      this.resultado =
        this.modoAccesible
          ? this.traducir(
            'rutaAccesibleNoDisponible'
          )
          : this.traducir(
            'rutaNoDisponible'
          );
      return;
    }

    this.rutaCalculada = ruta;
    this.nivelVisualizado =
      nodoOrigen.nivel ?? 1;

    this.resultado = ruta
      .map(nodo => nodo.nombre)
      .join(' → ');

    this.distanciaTotal =
      this.rutaService
        .calcularDistanciaTotal(ruta);
  }

  cambiarModoAccesible(): void {
    this.limpiarRuta();
  }

  private procesarLecturaQr(
    contenidoQr: string
  ): void {
    const nodoDetectado =
      this.qrService.procesarCodigo(
        contenidoQr
      );

    if (!nodoDetectado) {
      this.mensajeUbicacion =
        this.traducir('qrInvalido');
      return;
    }

    this.origen = nodoDetectado.nombre;
    this.nivelVisualizado =
      nodoDetectado.nivel ?? 1;

    this.mensajeUbicacion =
      this.traducir(
        'ubicacionDetectada',
        {
          nombre: nodoDetectado.nombre
        }
      );
  }

  private limpiarRuta(): void {
    this.resultado = '';
    this.distanciaTotal = null;
    this.rutaCalculada = [];
  }
}