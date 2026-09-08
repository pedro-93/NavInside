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
  obtenerNombreNodo
} from '../data/nombres-nodos.data';
import {
  Conexion,
  Nodo
} from '../models/nodo.model';
import {
  Idioma,
  IdiomaService
} from '../services/idioma.service';
import {
  MapaService
} from '../services/mapa.service';
import {
  MapaValidadorService,
  ProblemaMapa,
  ResultadoValidacionMapa
} from '../services/mapa-validador.service';
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
  conexionesMapa: Conexion[] = [];
  lugares: Nodo[] = [];
  nodosMapa: Nodo[] = [];

  erroresMapa: ProblemaMapa[] = [];
  advertenciasMapa: ProblemaMapa[] = [];
  mapaEsValido = true;

  origen = '';
  destino = '';
  modoAccesible = false;
  idiomaSeleccionado: Idioma;
  mensajeUbicacion = '';
  mensajeAcceso = '';
  resultado = '';
  distanciaTotal: number | null = null;
  rutaCalculada: Nodo[] = [];
  pasosRuta: PasoRuta[] = [];
  pasoActualIndice = 0;
  nivelVisualizado = 1;
  accesoRecepcionBanoCerrado = false;

  constructor(
    private rutaService: RutaService,
    private qrService: QrService,
    private idiomaService: IdiomaService,
    private mapaService: MapaService,
    private mapaValidadorService:
      MapaValidadorService
  ) {
    this.idiomaSeleccionado =
      this.idiomaService.idiomaActual;

    this.actualizarDatosMapa();
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

  get textoEstadoAcceso(): string {
    if (this.accesoRecepcionBanoCerrado) {
      return this.texto(
        'Acceso cerrado: Recepción a Baño. La ruta usa una alternativa.',
        'Access closed: Reception to Bathroom. The route uses an alternative.',
        'Acesso fechado: Recepção ao Banheiro. A rota usa uma alternativa.'
      );
    }

    return this.texto(
      'Acceso habilitado: Recepción a Baño.',
      'Access enabled: Reception to Bathroom.',
      'Acesso disponível: Recepção ao Banheiro.'
    );
  }

  get textoBotonAcceso(): string {
    if (this.accesoRecepcionBanoCerrado) {
      return this.texto(
        'Restablecer acceso',
        'Restore access',
        'Restabelecer acesso'
      );
    }

    return this.texto(
      'Simular acceso cerrado',
      'Simulate closed access',
      'Simular acesso fechado'
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

  nombreNodo(nodo: Nodo): string {
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

    this.actualizarDatosMapa();
    this.mensajeUbicacion = '';
    this.mensajeAcceso = '';

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
    this.mensajeUbicacion = '';

    try {
      const lectura =
        await CapacitorBarcodeScanner.scanBarcode({
          hint:
            CapacitorBarcodeScannerTypeHint.QR_CODE,
          cameraDirection:
            CapacitorBarcodeScannerCameraDirection.BACK,
          scanInstructions:
            this.traducir('apuntarCamara'),
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

  alternarAccesoRecepcionBano(): void {
    this.accesoRecepcionBanoCerrado =
      !this.accesoRecepcionBanoCerrado;

    if (this.accesoRecepcionBanoCerrado) {
      this.mapaService.cerrarConexion(
        'recepcion',
        'baño'
      );
    } else {
      this.mapaService.habilitarConexion(
        'recepcion',
        'baño'
      );
    }

    this.actualizarDatosMapa();

    if (this.origen && this.destino) {
      this.calcularRuta();

      this.mensajeAcceso =
        this.texto(
          'El acceso cambió y la ruta fue recalculada.',
          'The access changed and the route was recalculated.',
          'O acesso mudou e a rota foi recalculada.'
        );
      return;
    }

    this.mensajeAcceso =
      this.texto(
        'El estado del acceso fue actualizado. Selecciona origen y destino para calcular una ruta.',
        'The access status was updated. Select origin and destination to calculate a route.',
        'O estado do acesso foi atualizado. Selecione origem e destino para calcular uma rota.'
      );
  }

  calcularRuta(): void {
    this.limpiarRuta();

    if (!this.mapaEsValido) {
      this.resultado =
        this.obtenerMensajeMapaInvalido();
      return;
    }

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
      this.mapaService.obtenerNodoPorId(
        this.origen
      );

    const nodoDestino =
      this.mapaService.obtenerNodoPorId(
        this.destino
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

    this.establecerRutaCalculada(ruta);
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
    if (!this.mapaEsValido) {
      this.mensajeUbicacion =
        this.obtenerMensajeMapaInvalido();
      return;
    }

    const nodoDetectado =
      this.qrService.procesarCodigo(
        contenidoQr
      );

    if (!nodoDetectado) {
      this.mensajeUbicacion =
        this.traducir('qrInvalido');
      return;
    }

    const debeRecalcular =
      this.rutaCalculada.length > 0 &&
      this.destino !== '';

    this.origen = nodoDetectado.id;

    this.nivelVisualizado =
      nodoDetectado.nivel ?? 1;

    if (debeRecalcular) {
      this.recalcularRutaDesdeQr(
        nodoDetectado
      );
      return;
    }

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

  private recalcularRutaDesdeQr(
    nodoDetectado: Nodo
  ): void {
    const nodoDestino =
      this.mapaService.obtenerNodoPorId(
        this.destino
      );

    if (!nodoDestino) {
      this.limpiarRuta();

      this.mensajeUbicacion =
        this.traducir(
          'lugaresNoEncontrados'
        );
      return;
    }

    if (
      nodoDetectado.id ===
      nodoDestino.id
    ) {
      this.rutaCalculada = [
        nodoDetectado
      ];

      this.pasosRuta = [
        {
          orden: 1,
          tipo: 'llegada',
          nodo: nodoDetectado
        }
      ];

      this.pasoActualIndice = 0;
      this.distanciaTotal = 0;

      this.actualizarResultadoRuta();
      this.sincronizarPasoActual();

      this.mensajeUbicacion =
        this.traducir(
          'destinoAlcanzadoQr',
          {
            nombre:
              this.nombreNodo(
                nodoDetectado
              )
          }
        );

      return;
    }

    const nuevaRuta =
      this.rutaService.calcularRuta(
        nodoDetectado.id,
        nodoDestino.id,
        this.modoAccesible
      );

    if (nuevaRuta.length === 0) {
      this.limpiarRuta();

      this.nivelVisualizado =
        nodoDetectado.nivel ?? 1;

      this.mensajeUbicacion =
        this.modoAccesible
          ? this.traducir(
            'rutaAccesibleNoDisponible'
          )
          : this.traducir(
            'rutaNoDisponible'
          );

      return;
    }

    this.establecerRutaCalculada(nuevaRuta);

    this.mensajeUbicacion =
      this.traducir(
        'rutaRecalculada',
        {
          nombre:
            this.nombreNodo(
              nodoDetectado
            )
        }
      );
  }

  private establecerRutaCalculada(
    ruta: Nodo[]
  ): void {
    this.rutaCalculada = ruta;

    this.pasosRuta =
      this.rutaService.generarPasos(ruta);

    this.pasoActualIndice = 0;

    this.distanciaTotal =
      this.rutaService
        .calcularDistanciaTotal(ruta);

    this.sincronizarPasoActual();
    this.actualizarResultadoRuta();
  }

  private actualizarDatosMapa(): void {
    const mapaActivo =
      this.mapaService.obtenerMapaActivo();

    const conexionesNavegables =
      this.mapaService
        .obtenerConexionesNavegables();

    const validacion:
      ResultadoValidacionMapa =
      this.mapaValidadorService.validarMapa(
        mapaActivo.nodos,
        conexionesNavegables
      );

    this.mapaEsValido =
      validacion.valido;

    this.erroresMapa =
      validacion.errores;

    this.advertenciasMapa =
      validacion.advertencias;

    this.lugares =
      mapaActivo.nodos
        .filter(
          nodo =>
            nodo.restringido !== true
        );

    this.conexionesMapa =
      conexionesNavegables;

    this.nodosMapa =
      this.lugares.map(
        nodo => ({
          ...nodo,
          nombre:
            this.nombreNodo(nodo)
        })
      );
  }

  private obtenerMensajeMapaInvalido(): string {
    const cantidadErrores =
      this.erroresMapa.length;

    return this.texto(
      `No se pueden calcular rutas: el mapa tiene ${cantidadErrores} error(es) de configuración.`,
      `Routes cannot be calculated: the map has ${cantidadErrores} configuration error(s).`,
      `Não é possível calcular rotas: o mapa possui ${cantidadErrores} erro(s) de configuração.`
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

  private texto(
    espanol: string,
    ingles: string,
    portugues: string
  ): string {
    if (this.idiomaSeleccionado === 'en') {
      return ingles;
    }

    if (this.idiomaSeleccionado === 'pt') {
      return portugues;
    }

    return espanol;
  }

  private limpiarRuta(): void {
    this.resultado = '';
    this.distanciaTotal = null;
    this.rutaCalculada = [];
    this.pasosRuta = [];
    this.pasoActualIndice = 0;
  }
}