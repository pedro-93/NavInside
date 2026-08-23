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
  IonToolbar
} from '@ionic/angular';

import { NODOS_SIMULADOS } from '../data/mapa-simulado.data';
import { QrService } from '../services/qr.service';
import { RutaService } from '../services/ruta.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
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
    IonToolbar
  ]
})
export class HomePage {
  lugares: string[] = NODOS_SIMULADOS.map(
    nodo => nodo.nombre
  );

  origen: string = '';
  destino: string = '';
  mensajeUbicacion: string = '';
  resultado: string = '';
  distanciaTotal: number | null = null;

  constructor(
    private rutaService: RutaService,
    private qrService: QrService
  ) {}

  async leerQrReal(): Promise<void> {
    this.limpiarRuta();
    this.mensajeUbicacion = '';

    try {
      const lectura =
        await CapacitorBarcodeScanner.scanBarcode({
          hint: CapacitorBarcodeScannerTypeHint.QR_CODE,
          cameraDirection:
            CapacitorBarcodeScannerCameraDirection.BACK,
          scanInstructions:
            'Apunta la cámara al código QR',
          scanButton: true,
          scanText: 'Escanear'
        });

      if (!lectura.ScanResult) {
        this.mensajeUbicacion =
          'La lectura fue cancelada o no se detectó un código QR.';
        return;
      }

      this.procesarLecturaQr(lectura.ScanResult);
    } catch (error) {
      console.error(
        'Error al leer el código QR:',
        error
      );

      this.mensajeUbicacion =
        'No fue posible abrir o utilizar la cámara.';
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

    this.procesarLecturaQr(contenidoQr);
  }

  calcularRuta(): void {
    this.resultado = '';
    this.distanciaTotal = null;

    if (!this.origen || !this.destino) {
      this.resultado =
        'Debes seleccionar un origen y un destino.';
      return;
    }

    if (this.origen === this.destino) {
      this.resultado =
        'El origen y el destino deben ser diferentes.';
      return;
    }

    const nodoOrigen = NODOS_SIMULADOS.find(
      nodo => nodo.nombre === this.origen
    );

    const nodoDestino = NODOS_SIMULADOS.find(
      nodo => nodo.nombre === this.destino
    );

    if (!nodoOrigen || !nodoDestino) {
      this.resultado =
        'No se encontraron los lugares seleccionados.';
      return;
    }

    const ruta = this.rutaService.calcularRuta(
      nodoOrigen.id,
      nodoDestino.id
    );

    if (ruta.length === 0) {
      this.resultado =
        'No existe una ruta disponible.';
      return;
    }

    this.resultado = ruta
      .map(nodo => nodo.nombre)
      .join(' → ');

    this.distanciaTotal =
      this.rutaService.calcularDistanciaTotal(ruta);
  }

  private procesarLecturaQr(
    contenidoQr: string
  ): void {
    const nodoDetectado =
      this.qrService.procesarCodigo(contenidoQr);

    if (!nodoDetectado) {
      this.mensajeUbicacion =
        'El código QR no pertenece a NavInside o la ubicación no existe.';
      return;
    }

    this.origen = nodoDetectado.nombre;
    this.mensajeUbicacion =
      `Ubicación detectada: ${nodoDetectado.nombre}`;
  }

  private limpiarRuta(): void {
    this.resultado = '';
    this.distanciaTotal = null;
  }
}