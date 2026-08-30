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
  obtenerNombreNodo
} from '../data/nombres-nodos.data';
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
  PasoRuta,
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
  readonly conexionesMapa =
    CONEXIONES_SIMULADAS;

  readonly lugares: Nodo[] =
    NODOS_SIMULADOS.filter(
      nodo =>
        nodo.restringido !== true
    );

  nodosMapa: Nodo[] = [];

  origen: string = '';
  destino: string = '';
  modoAccesible: boolean = false;
  idiomaSeleccionado: Idioma;
  mensajeUbicacion: string = '';
  resultado: string = '';
  distanciaTotal: number | null = null;
  rutaCalculada: Nodo[] = [];
  pasosRuta: PasoRuta[] = [];
  pasoActualIndice = 0;
  nivelVisualizado = 1;

  constructor(
    private rutaService: RutaService,
    private qrService: QrService,
    private idiomaService: IdiomaService
  ) {
    this.idiomaSeleccionado =
      this.idiomaService.idiomaActual;

    this.actualizarNodosMapa();
  }

  get origenId(): string | null {
    return this.origen || null;
  }

  get destinoId(): string | null {
    return this.destino || null;
  }

  get pasoActual(): PasoRuta | null {
    return (
      this.pasosRuta[
        this.pasoActualIndice
      ] ?? null
    );
  }

  get instruccionActual(): string {
    if (!this.pasoActual) {
      return '';
    }

    return this.traducirPaso(
      this.pasoActual
    );
  }

  get nodoActualId(): string | null {
    return (
      this.pasoActual?.nodo.id ??
      null
    );
  }

  get numeroPasoActual(): number {
    if (this.pasosRuta.length === 0) {
      return 0;
    }

    return this.pasoActualIndice + 1;
  }

  get totalPasos(): number {
    return this.pasosRuta.length;
  }

  get progresoRuta(): number {
    if (this.totalPasos === 0) {
      return 0;
    }

    return Math.round(
      (
        this.numeroPasoActual /
        this.totalPasos
      ) * 100
    );
  }

  get esPrimerPaso(): boolean {
    return this.pasoActualIndice === 0;
  }

  get esUltimoPaso(): boolean {
    return (
      this.totalPasos > 0 &&
      this.pasoActualIndice ===
        this.totalPasos - 1
    );
  }

  get instruccionesRuta(): string[] {
    return this.pasosRuta.map(
      paso =>
        this.traducirPaso(paso)
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

  nombreNodo(
    nodo: Nodo
  ): string {
    return obtenerNombreNodo(
      nodo.id,
      this.idiomaSeleccionado,
      nodo.nombre
    );
  }

  cambiarIdioma(): void {
    this.idiomaService.establecerIdioma(
      this.idiomaSeleccionado
    );

    this.actualizarNodosMapa();
    this.mensajeUbicacion = '';

    if (this.rutaCalculada.length > 0) {
      this.actualizarResultadoRuta();
      return;
    }

    this.resultado = '';
    this.distanciaTotal = null;
  }

  cambiarSeleccionRuta(): void {
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
          nodo.id === this.origen
      );

    const nodoDestino =
      NODOS_SIMULADOS.find(
        nodo =>
          nodo.id === this.destino
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

    this.pasosRuta =
      this.rutaService.generarPasos(
        ruta
      );

    this.pasoActualIndice = 0;

    this.distanciaTotal =
      this.rutaService
        .calcularDistanciaTotal(ruta);

    this.sincronizarPasoActual();
    this.actualizarResultadoRuta();
  }

  avanzarPaso(): void {
    if (
      this.pasosRuta.length === 0 ||
      this.esUltimoPaso
    ) {
      return;
    }

    this.pasoActualIndice++;
    this.sincronizarPasoActual();
  }

  retrocederPaso(): void {
    if (
      this.pasosRuta.length === 0 ||
      this.esPrimerPaso
    ) {
      return;
    }

    this.pasoActualIndice--;
    this.sincronizarPasoActual();
  }

  reiniciarRecorrido(): void {
    if (this.pasosRuta.length === 0) {
      return;
    }

    this.pasoActualIndice = 0;
    this.sincronizarPasoActual();
  }

  cambiarModoAccesible(): void {
    this.limpiarRuta();
  }

  private sincronizarPasoActual(): void {
    const paso = this.pasoActual;

    if (!paso) {
      return;
    }

    this.nivelVisualizado =
      paso.nodo.nivel ?? 1;
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

    this.origen = nodoDetectado.id;

    this.nivelVisualizado =
      nodoDetectado.nivel ?? 1;

    this.mensajeUbicacion =
      this.traducir(
        'ubicacionDetectada',
        {
          nombre:
            this.nombreNodo(
              nodoDetectado
            )
        }
      );
  }

  private actualizarNodosMapa(): void {
    this.nodosMapa =
      NODOS_SIMULADOS.map(
        nodo => ({
          ...nodo,
          nombre:
            this.nombreNodo(nodo)
        })
      );
  }

  private actualizarResultadoRuta(): void {
    this.resultado =
      this.rutaCalculada
        .map(
          nodo =>
            this.nombreNodo(nodo)
        )
        .join(' → ');
  }

  private traducirPaso(
    paso: PasoRuta
  ): string {
    const nombre =
      this.nombreNodo(paso.nodo);

    if (paso.tipo === 'inicio') {
      return this.traducir(
        'inicioRuta',
        { nombre }
      );
    }

    if (paso.tipo === 'llegada') {
      return this.traducir(
        'llegadaRuta',
        { nombre }
      );
    }

    if (paso.tipo === 'avance') {
      return this.traducir(
        'continuarHacia',
        { nombre }
      );
    }

    const nivel =
      paso.nodo.nivel ?? '';

    if (paso.medio === 'ascensor') {
      return this.traducir(
        paso.direccionNivel === 'subir'
          ? 'subirAscensor'
          : 'bajarAscensor',
        { nivel }
      );
    }

    if (paso.medio === 'escalera') {
      return this.traducir(
        paso.direccionNivel === 'subir'
          ? 'subirEscalera'
          : 'bajarEscalera',
        { nivel }
      );
    }

    if (paso.medio === 'rampa') {
      return this.traducir(
        paso.direccionNivel === 'subir'
          ? 'subirRampa'
          : 'bajarRampa',
        { nivel }
      );
    }

    return this.traducir(
      paso.direccionNivel === 'subir'
        ? 'cambiarNivelSubir'
        : 'cambiarNivelBajar',
      {
        nivel,
        nombre
      }
    );
  }

  private limpiarRuta(): void {
    this.resultado = '';
    this.distanciaTotal = null;
    this.rutaCalculada = [];
    this.pasosRuta = [];
    this.pasoActualIndice = 0;
  }
}