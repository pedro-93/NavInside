import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { RutaService } from '../services/ruta.service';
import { QrService } from '../services/qr.service';

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
  resultado: string = '';
  distanciaTotal: number | null = null;

  constructor(
    private rutaService: RutaService,
    private qrService: QrService
  ) { }

  simularLecturaQr(): void {
    const contenidoQr = JSON.stringify({
      sistema: 'navinside',
      version: 1,
      nodoId: 'recepcion'
    });

    const nodoDetectado = this.qrService.procesarCodigo(contenidoQr);

    if (!nodoDetectado) {
      this.resultado = 'El código QR no es válido.';
      this.distanciaTotal = null;
      return;
    }

    this.origen = nodoDetectado.nombre;
    this.resultado = `Ubicación detectada: ${nodoDetectado.nombre}`;
    this.distanciaTotal = null;
  }

  calcularRuta(): void {
    this.distanciaTotal = null;
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
      this.resultado = 'No se encontraron los lugares seleccionados.';
      return;
    }

    const ruta = this.rutaService.calcularRuta(
      nodoOrigen.id,
      nodoDestino.id
    );

    if (ruta.length === 0) {
      this.resultado = 'No existe una ruta disponible.';
      return;
    }

    this.resultado = ruta
      .map(nodo => nodo.nombre)
      .join(' → ');
    this.distanciaTotal =
      this.rutaService.calcularDistanciaTotal(ruta);
  }
}