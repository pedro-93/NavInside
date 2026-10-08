import {
  CommonModule
} from '@angular/common';

import {
  Component,
  inject
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

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
  IonSelect,
  IonSelectOption,
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
  LugarPlano,
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

import {
  VozGuiaService
} from '../services/voz-guia.service';

@Component({
  selector: 'app-home',
  templateUrl:
    'home.page.html',
  styleUrls: [
    'home.page.scss'
  ],
  standalone: true,
  imports: [
    CommonModule,
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
    IonSelect,
    IonSelectOption,
    IonToggle,
    IonToolbar
  ]
})
export class HomePage {
  private readonly rutaService =
    inject(RutaService);

  private readonly qrService =
    inject(QrService);

  private readonly idiomaService =
    inject(IdiomaService);

  private readonly mapaService =
    inject(MapaService);

  private readonly mapaValidadorService =
    inject(
      MapaValidadorService
    );

  private readonly vozGuiaService =
    inject(VozGuiaService);

  conexionesMapa:
    Conexion[] = [];

  lugares:
    Nodo[] = [];

  nodosMapa:
    Nodo[] = [];

  lugaresReferencia:
    LugarPlano[] = [];

  erroresMapa:
    ProblemaMapa[] = [];

  advertenciasMapa:
    ProblemaMapa[] = [];

  mapaEsValido = true;
  origen = '';
  destino = '';
  modoAccesible = false;

  idiomaSeleccionado:
    Idioma;

  mensajeUbicacion = '';
  resultado = '';

  distanciaTotal:
    number | null = null;

  rutaCalculada:
    Nodo[] = [];

  pasosRuta:
    PasoRuta[] = [];

  pasoActualIndice = 0;
  nivelVisualizado = 1;

  selectorPuntosAbierto =
    false;

  selectorPuntosTipo:
    'origen' |
    'destino' |
    null = null;

  nivelPuntosSeleccionado:
    number | null = null;

  guiaVozHabilitada = true;

  constructor() {
    this.idiomaSeleccionado =
      this.idiomaService
        .idiomaActual;

    this.actualizarDatosMapa();

    void this.cargarMapaInicial();
  }

  get origenId():
    string | null {
    return this.origen || null;
  }

  get destinoId():
    string | null {
    return this.destino || null;
  }

  get pasoActual():
    PasoRuta | null {
    return (
      this.pasosRuta[
        this.pasoActualIndice
      ] ?? null
    );
  }

  get instruccionActual():
    string {
    if (!this.pasoActual) {
      return '';
    }

    return this.traducirPaso(
      this.pasoActual
    );
  }

  get nodoActualId():
    string | null {
    return (
      this.pasoActual?.nodo.id ??
      null
    );
  }

  get numeroPasoActual():
    number {
    if (
      this.pasosRuta.length === 0
    ) {
      return 0;
    }

    return (
      this.pasoActualIndice + 1
    );
  }

  get totalPasos():
    number {
    return this.pasosRuta.length;
  }

  get progresoRuta():
    number {
    if (
      this.totalPasos === 0
    ) {
      return 0;
    }

    return Math.round(
      (
        this.numeroPasoActual /
        this.totalPasos
      ) * 100
    );
  }

  get esPrimerPaso():
    boolean {
    return (
      this.pasoActualIndice === 0
    );
  }

  get esUltimoPaso():
    boolean {
    return (
      this.totalPasos > 0 &&
      this.pasoActualIndice ===
        this.totalPasos - 1
    );
  }

  get instruccionesRuta():
    string[] {
    return this.pasosRuta.map(
      paso =>
        this.traducirPaso(
          paso
        )
    );
  }

  get vozGuiaDisponible():
    boolean {
    return (
      this.vozGuiaService
        .estaDisponible
    );
  }

  get distanciaRestante():
    number {
    return (
      this.distanciaTotal ?? 0
    );
  }

  get tiempoRestanteMinutos():
    number {
    if (
      this.distanciaRestante <= 0
    ) {
      return 0;
    }

    const metrosPorSegundo =
      1.2;

    return Math.max(
      1,
      Math.ceil(
        this.distanciaRestante /
        metrosPorSegundo /
        60
      )
    );
  }

  get distanciaSiguienteTramo():
    number {
    if (
      this.rutaCalculada.length <
      2
    ) {
      return 0;
    }

    const origen =
      this.rutaCalculada[0].id;

    const destino =
      this.rutaCalculada[1].id;

    const conexion =
      this.conexionesMapa.find(
        tramo =>
          (
            tramo.origen ===
              origen &&
            tramo.destino ===
              destino
          ) ||
          (
            tramo.origen ===
              destino &&
            tramo.destino ===
              origen
          )
      );

    return (
      conexion?.distancia ?? 0
    );
  }

  get nivelesPuntos():
    number[] {
    const niveles:
      number[] = [];

    for (
      const lugar of
        this.lugares
    ) {
      if (
        lugar.nivel !==
          undefined &&
        !niveles.includes(
          lugar.nivel
        )
      ) {
        niveles.push(
          lugar.nivel
        );
      }
    }

    return niveles;
  }

  get lugaresNivelSeleccionado():
    Nodo[] {
    if (
      this.nivelPuntosSeleccionado ===
      null
    ) {
      return [];
    }

    return this.lugares.filter(
      lugar => {
        if (
          lugar.nivel !==
          this.nivelPuntosSeleccionado
        ) {
          return false;
        }

        if (
          this.selectorPuntosTipo ===
          'origen'
        ) {
          return (
            lugar.id !==
            this.destino
          );
        }

        if (
          this.selectorPuntosTipo ===
          'destino'
        ) {
          return (
            lugar.id !==
            this.origen
          );
        }

        return true;
      }
    );
  }

  get origenSeleccionado():
    Nodo | null {
    return (
      this.lugares.find(
        lugar =>
          lugar.id ===
          this.origen
      ) ?? null
    );
  }

  get destinoSeleccionado():
    Nodo | null {
    return (
      this.lugares.find(
        lugar =>
          lugar.id ===
          this.destino
      ) ?? null
    );
  }

  traducir(
    clave: string,
    parametros: Record<
      string,
      string | number
    > = {}
  ): string {
    return (
      this.idiomaService.traducir(
        clave,
        parametros
      )
    );
  }

  nombreNodo(
    nodo: Nodo | null
  ): string {
    if (!nodo) {
      return '';
    }

    return obtenerNombreNodo(
      nodo.id,
      this.idiomaSeleccionado,
      nodo.nombre
    );
  }

  nombreLugarReferencia(
    lugar: LugarPlano
  ): string {
    return obtenerNombreNodo(
      lugar.id,
      this.idiomaSeleccionado,
      lugar.nombre
    );
  }

  cambiarIdioma(): void {
    this.vozGuiaService.detener();

    this.idiomaService
      .establecerIdioma(
        this.idiomaSeleccionado
      );

    this.actualizarDatosMapa();
    this.mensajeUbicacion = '';

    if (
      this.rutaCalculada.length >
      0
    ) {
      this.actualizarResultadoRuta();
      this.anunciarPasoActual();
      return;
    }

    this.resultado = '';
    this.distanciaTotal = null;
  }

  alternarGuiaVoz(): void {
    this.guiaVozHabilitada =
      this.vozGuiaService
        .alternar();

    if (
      this.guiaVozHabilitada &&
      this.instruccionActual
    ) {
      this.anunciarPasoActual();
    }
  }

  repetirInstruccion(): void {
    this.anunciarPasoActual();
  }

  cambiarSeleccionRuta(): void {
    this.limpiarRuta();
  }

  alternarSelectorPuntos(
    tipo:
      'origen' |
      'destino'
  ): void {
    if (
      this.selectorPuntosAbierto &&
      this.selectorPuntosTipo ===
        tipo
    ) {
      this.selectorPuntosAbierto =
        false;

      this.selectorPuntosTipo =
        null;

      return;
    }

    this.selectorPuntosTipo =
      tipo;

    this.selectorPuntosAbierto =
      true;

    if (
      this.nivelPuntosSeleccionado ===
      null
    ) {
      this.nivelPuntosSeleccionado =
        this.nivelesPuntos[0] ??
        null;
    }
  }

  seleccionarNivelPuntos(
    nivel: number
  ): void {
    this.nivelPuntosSeleccionado =
      nivel;
  }

  seleccionarPunto(
    lugar: Nodo
  ): void {
    if (
      this.selectorPuntosTipo ===
      'origen'
    ) {
      this.origen = lugar.id;

      this.nivelVisualizado =
        lugar.nivel ?? 1;
    } else if (
      this.selectorPuntosTipo ===
      'destino'
    ) {
      this.destino = lugar.id;
    } else {
      return;
    }

    this.selectorPuntosAbierto =
      false;

    this.selectorPuntosTipo =
      null;

    this.nivelPuntosSeleccionado =
      lugar.nivel ?? null;

    this.limpiarRuta();
  }

  etiquetaNivel(
    nivel: number
  ): string {
    return nivel === 6
      ? this.traducir(
          'pisoNumero',
          {
            numero: nivel
          }
        )
      : this.traducir(
          'nivelNumero',
          {
            numero: nivel
          }
        );
  }

  async leerQrReal():
    Promise<void> {
    this.mensajeUbicacion = '';

    try {
      const lectura =
        await CapacitorBarcodeScanner
          .scanBarcode({
            hint:
              CapacitorBarcodeScannerTypeHint
                .QR_CODE,

            cameraDirection:
              CapacitorBarcodeScannerCameraDirection
                .BACK,

            scanInstructions:
              this.traducir(
                'apuntarCamara'
              ),

            scanButton: true,

            scanText:
              this.traducir(
                'escanear'
              )
          });

      if (
        !lectura.ScanResult
      ) {
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
        this.traducir(
          'errorCamara'
        );
    }
  }

  simularLecturaQr(): void {
    this.mensajeUbicacion = '';

    const contenidoQr =
      JSON.stringify({
        sistema: 'navinside',
        version: 1,
        nodoId:
          'entrada-nivel-4'
      });

    this.procesarLecturaQr(
      contenidoQr
    );
  }

  simularSiguientePunto(): void {
    if (
      this.rutaCalculada.length <
        2 ||
      this.esUltimoPaso
    ) {
      return;
    }

    const siguienteNodo =
      this.rutaCalculada[1];

    const contenidoQr =
      JSON.stringify({
        sistema: 'navinside',
        version: 1,
        nodoId:
          siguienteNodo.id
      });

    this.procesarLecturaQr(
      contenidoQr
    );
  }

  calcularRuta(): void {
    this.limpiarRuta();

    if (!this.mapaEsValido) {
      this.resultado =
        this.obtenerMensajeMapaInvalido();

      return;
    }

    if (
      !this.origen ||
      !this.destino
    ) {
      this.resultado =
        this.traducir(
          'seleccionarOrigenDestino'
        );

      return;
    }

    if (
      this.origen ===
      this.destino
    ) {
      this.resultado =
        this.traducir(
          'origenDestinoIguales'
        );

      return;
    }

    const nodoOrigen =
      this.mapaService
        .obtenerNodoPorId(
          this.origen
        );

    const nodoDestino =
      this.mapaService
        .obtenerNodoPorId(
          this.destino
        );

    if (
      !nodoOrigen ||
      !nodoDestino
    ) {
      this.resultado =
        this.traducir(
          'lugaresNoEncontrados'
        );

      return;
    }

    const ruta =
      this.rutaService
        .calcularRuta(
          nodoOrigen.id,
          nodoDestino.id,
          this.modoAccesible
        );

    if (
      ruta.length === 0
    ) {
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

    this.establecerRutaCalculada(
      ruta
    );
  }

  cambiarModoAccesible(): void {
    this.limpiarRuta();
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
      this.qrService
        .procesarCodigo(
          contenidoQr
        );

    if (!nodoDetectado) {
      this.mensajeUbicacion =
        this.traducir(
          'qrInvalido'
        );

      return;
    }

    const debeRecalcular =
      this.rutaCalculada.length >
        0 &&
      this.destino !== '';

    this.origen =
      nodoDetectado.id;

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
      this.mapaService
        .obtenerNodoPorId(
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
      this.rutaService
        .calcularRuta(
          nodoDetectado.id,
          nodoDestino.id,
          this.modoAccesible
        );

    if (
      nuevaRuta.length === 0
    ) {
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

    this.establecerRutaCalculada(
      nuevaRuta
    );

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
    this.rutaCalculada =
      ruta;

    this.pasosRuta =
      this.rutaService
        .generarPasos(
          ruta
        );

    this.pasoActualIndice =
      this.pasosRuta.length > 1
        ? 1
        : 0;

    this.distanciaTotal =
      this.rutaService
        .calcularDistanciaTotal(
          ruta
        );

    this.sincronizarPasoActual();
    this.actualizarResultadoRuta();
  }

  private sincronizarPasoActual():
    void {
    const paso =
      this.pasoActual;

    if (!paso) {
      return;
    }

    this.nivelVisualizado =
      paso.nodo.nivel ?? 1;

    this.anunciarPasoActual();
  }

  private anunciarPasoActual():
    void {
    if (
      !this.guiaVozHabilitada ||
      !this.instruccionActual
    ) {
      return;
    }

    const distancia =
      this.distanciaRestante
        .toLocaleString(
          'es-CL',
          {
            maximumFractionDigits:
              1
          }
        );

    const anuncio =
      this.texto(
        `${this.instruccionActual}. Distancia restante ${distancia} metros. Escanea el código QR al llegar al siguiente punto.`,
        `${this.instruccionActual}. Remaining distance ${distancia} meters. Scan the QR code when you reach the next point.`,
        `${this.instruccionActual}. Distância restante ${distancia} metros. Leia o código QR ao chegar ao próximo ponto.`
      );

    this.vozGuiaService.hablar(
      anuncio,
      this.idiomaSeleccionado
    );
  }

  private async cargarMapaInicial():
    Promise<void> {
    const mapaCargado =
      await this.mapaService
        .cargarMapaDesdeSupabase();

    if (mapaCargado) {
      this.actualizarDatosMapa();
    }
  }

  private actualizarDatosMapa():
    void {
    const mapaActivo =
      this.mapaService
        .obtenerMapaActivo();

    const conexionesNavegables =
      this.mapaService
        .obtenerConexionesNavegables();

    const validacion:
      ResultadoValidacionMapa =
      this.mapaValidadorService
        .validarMapa(
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
      mapaActivo.nodos.filter(
        nodo =>
          nodo.restringido !==
          true
      );

    this.conexionesMapa =
      conexionesNavegables;

    this.nodosMapa =
      this.lugares.map(
        nodo => ({
          ...nodo,
          nombre:
            this.nombreNodo(
              nodo
            )
        })
      );

    this.lugaresReferencia =
      this.mapaService
        .obtenerLugaresPreliminares();

    if (
      this.nivelPuntosSeleccionado ===
        null ||
      !this.nivelesPuntos.includes(
        this.nivelPuntosSeleccionado
      )
    ) {
      this.nivelPuntosSeleccionado =
        this.nivelesPuntos[0] ??
        null;
    }
  }

  private obtenerMensajeMapaInvalido():
    string {
    const cantidadErrores =
      this.erroresMapa.length;

    return this.texto(
      `No se pueden calcular rutas: el mapa tiene ${cantidadErrores} error(es) de configuración.`,
      `Routes cannot be calculated: the map has ${cantidadErrores} configuration error(s).`,
      `Não é possível calcular rotas: o mapa possui ${cantidadErrores} erro(s) de configuração.`
    );
  }

  private actualizarResultadoRuta():
    void {
    this.resultado =
      this.rutaCalculada
        .map(
          nodo =>
            this.nombreNodo(
              nodo
            )
        )
        .join(' → ');
  }

  private traducirPaso(
    paso: PasoRuta
  ): string {
    const nombre =
      this.nombreNodo(
        paso.nodo
      );

    if (
      paso.tipo === 'inicio'
    ) {
      return this.traducir(
        'inicioRuta',
        {
          nombre
        }
      );
    }

    if (
      paso.tipo === 'llegada'
    ) {
      return this.traducir(
        'llegadaRuta',
        {
          nombre
        }
      );
    }

    if (
      paso.tipo === 'avance'
    ) {
      if (
        paso.direccionHorizontal ===
        'izquierda'
      ) {
        return this.traducir(
          'girarIzquierdaHacia',
          {
            nombre
          }
        );
      }

      if (
        paso.direccionHorizontal ===
        'derecha'
      ) {
        return this.traducir(
          'girarDerechaHacia',
          {
            nombre
          }
        );
      }

      return this.traducir(
        'continuarHacia',
        {
          nombre
        }
      );
    }

    const nivel =
      paso.nodo.nivel ?? '';

    if (
      paso.medio === 'ascensor'
    ) {
      if (
        paso.destinoEsPiso
      ) {
        return this.traducir(
          paso.direccionNivel ===
          'subir'
            ? 'subirAscensorPiso'
            : 'bajarAscensorPiso',
          {
            nivel
          }
        );
      }

      return this.traducir(
        paso.direccionNivel ===
        'subir'
          ? 'subirAscensor'
          : 'bajarAscensor',
        {
          nivel
        }
      );
    }

    if (
      paso.medio ===
      'escalera'
    ) {
      return this.traducir(
        paso.direccionNivel ===
        'subir'
          ? 'subirEscalera'
          : 'bajarEscalera',
        {
          nivel
        }
      );
    }

    if (
      paso.medio === 'rampa'
    ) {
      return this.traducir(
        paso.direccionNivel ===
        'subir'
          ? 'subirRampa'
          : 'bajarRampa',
        {
          nivel
        }
      );
    }

    return this.traducir(
      paso.direccionNivel ===
      'subir'
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
    if (
      this.idiomaSeleccionado ===
      'en'
    ) {
      return ingles;
    }

    if (
      this.idiomaSeleccionado ===
      'pt'
    ) {
      return portugues;
    }

    return espanol;
  }

  private limpiarRuta():
    void {
    this.vozGuiaService.detener();

    this.resultado = '';
    this.distanciaTotal = null;
    this.rutaCalculada = [];
    this.pasosRuta = [];
    this.pasoActualIndice = 0;
  }
}