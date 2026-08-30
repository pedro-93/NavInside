import { Injectable } from '@angular/core';

export type Idioma =
  | 'es'
  | 'en'
  | 'pt';

const IDIOMA_PREDETERMINADO: Idioma = 'es';

const CLAVE_ALMACENAMIENTO =
  'navinside-idioma';

const TRADUCCIONES: Record<
  Idioma,
  Record<string, string>
> = {
  es: {
    idioma: 'Idioma',
    espanol: 'Español',
    ingles: 'Inglés',
    portugues: 'Portugués',

    tituloAplicacion: 'NavInside',
    tituloPagina: 'Navegación interior',
    instrucciones:
      'Selecciona tu punto de origen y destino.',

    origen: 'Origen',
    seleccionarOrigen:
      'Seleccionar origen',
    destino: 'Destino',
    seleccionarDestino:
      'Seleccionar destino',

    rutaAccesible: 'Ruta accesible',
    descripcionRutaAccesible:
      'Evita escaleras y utiliza conexiones aptas.',

    leerQr: 'Leer QR con cámara',
    simularQr: 'Simular lectura QR',
    calcularRuta: 'Calcular ruta',

    estadoUbicacion:
      'Estado de ubicación',
    resultadoRuta:
      'Resultado de la ruta',
    tipoRuta: 'Tipo de ruta',
    rutaNormal: 'Normal',
    rutaAccesibleSinEscaleras:
      'Accesible, sin escaleras',
    distanciaSimulada:
      'Distancia simulada',
    unidades: 'unidades',

    guiaRuta: 'Guía paso a paso',
    pasoDe:
      'Paso {actual} de {total}',
    progresoRuta:
      'Progreso del recorrido',
    pasoAnterior: 'Anterior',
    pasoSiguiente: 'Siguiente',
    reiniciarRuta: 'Reiniciar',

    inicioRuta:
      'Comienza en {nombre}.',
    continuarHacia:
      'Continúa hacia {nombre}.',
    subirAscensor:
      'Utiliza el ascensor para subir al nivel {nivel}.',
    bajarAscensor:
      'Utiliza el ascensor para bajar al nivel {nivel}.',
    subirEscalera:
      'Utiliza la escalera para subir al nivel {nivel}.',
    bajarEscalera:
      'Utiliza la escalera para bajar al nivel {nivel}.',
    subirRampa:
      'Utiliza la rampa para subir al nivel {nivel}.',
    bajarRampa:
      'Utiliza la rampa para bajar al nivel {nivel}.',
    cambiarNivelSubir:
      'Sube al nivel {nivel} y continúa hacia {nombre}.',
    cambiarNivelBajar:
      'Baja al nivel {nivel} y continúa hacia {nombre}.',
    llegadaRuta:
      'Has llegado a {nombre}.',

    apuntarCamara:
      'Apunta la cámara al código QR',
    escanear: 'Escanear',

    lecturaCancelada:
      'La lectura fue cancelada o no se detectó un código QR.',
    errorCamara:
      'No fue posible abrir o utilizar la cámara.',
    qrInvalido:
      'El código QR no pertenece a NavInside o la ubicación no existe.',
    ubicacionDetectada:
      'Ubicación detectada: {nombre}',
    rutaRecalculada:
      'Ubicación detectada: {nombre}. La ruta fue recalculada.',
    destinoAlcanzadoQr:
      'Ubicación detectada: {nombre}. Has llegado a tu destino.',

    seleccionarOrigenDestino:
      'Debes seleccionar un origen y un destino.',
    origenDestinoIguales:
      'El origen y el destino deben ser diferentes.',
    lugaresNoEncontrados:
      'No se encontraron los lugares seleccionados.',
    rutaNoDisponible:
      'No existe una ruta disponible.',
    rutaAccesibleNoDisponible:
      'No existe una ruta accesible disponible.'
  },

  en: {
    idioma: 'Language',
    espanol: 'Spanish',
    ingles: 'English',
    portugues: 'Portuguese',

    tituloAplicacion: 'NavInside',
    tituloPagina: 'Indoor navigation',
    instrucciones:
      'Select your starting point and destination.',

    origen: 'Starting point',
    seleccionarOrigen:
      'Select starting point',
    destino: 'Destination',
    seleccionarDestino:
      'Select destination',

    rutaAccesible: 'Accessible route',
    descripcionRutaAccesible:
      'Avoids stairs and uses accessible connections.',

    leerQr: 'Scan QR with camera',
    simularQr: 'Simulate QR scan',
    calcularRuta: 'Calculate route',

    estadoUbicacion:
      'Location status',
    resultadoRuta:
      'Route result',
    tipoRuta: 'Route type',
    rutaNormal: 'Normal',
    rutaAccesibleSinEscaleras:
      'Accessible, without stairs',
    distanciaSimulada:
      'Simulated distance',
    unidades: 'units',

    guiaRuta: 'Step-by-step guidance',
    pasoDe:
      'Step {actual} of {total}',
    progresoRuta:
      'Route progress',
    pasoAnterior: 'Previous',
    pasoSiguiente: 'Next',
    reiniciarRuta: 'Restart',

    inicioRuta:
      'Start at {nombre}.',
    continuarHacia:
      'Continue towards {nombre}.',
    subirAscensor:
      'Use the elevator to go up to level {nivel}.',
    bajarAscensor:
      'Use the elevator to go down to level {nivel}.',
    subirEscalera:
      'Use the stairs to go up to level {nivel}.',
    bajarEscalera:
      'Use the stairs to go down to level {nivel}.',
    subirRampa:
      'Use the ramp to go up to level {nivel}.',
    bajarRampa:
      'Use the ramp to go down to level {nivel}.',
    cambiarNivelSubir:
      'Go up to level {nivel} and continue towards {nombre}.',
    cambiarNivelBajar:
      'Go down to level {nivel} and continue towards {nombre}.',
    llegadaRuta:
      'You have arrived at {nombre}.',

    apuntarCamara:
      'Point the camera at the QR code',
    escanear: 'Scan',

    lecturaCancelada:
      'The scan was cancelled or no QR code was detected.',
    errorCamara:
      'The camera could not be opened or used.',
    qrInvalido:
      'The QR code does not belong to NavInside or the location does not exist.',
    ubicacionDetectada:
      'Location detected: {nombre}',
    rutaRecalculada:
      'Location detected: {nombre}. The route was recalculated.',
    destinoAlcanzadoQr:
      'Location detected: {nombre}. You have reached your destination.',

    seleccionarOrigenDestino:
      'You must select a starting point and a destination.',
    origenDestinoIguales:
      'The starting point and destination must be different.',
    lugaresNoEncontrados:
      'The selected locations could not be found.',
    rutaNoDisponible:
      'No route is available.',
    rutaAccesibleNoDisponible:
      'No accessible route is available.'
  },

  pt: {
    idioma: 'Idioma',
    espanol: 'Espanhol',
    ingles: 'Inglês',
    portugues: 'Português',

    tituloAplicacion: 'NavInside',
    tituloPagina: 'Navegação interna',
    instrucciones:
      'Selecione o ponto de origem e o destino.',

    origen: 'Origem',
    seleccionarOrigen:
      'Selecionar origem',
    destino: 'Destino',
    seleccionarDestino:
      'Selecionar destino',

    rutaAccesible: 'Rota acessível',
    descripcionRutaAccesible:
      'Evita escadas e utiliza conexões acessíveis.',

    leerQr: 'Ler QR com a câmera',
    simularQr: 'Simular leitura de QR',
    calcularRuta: 'Calcular rota',

    estadoUbicacion:
      'Estado da localização',
    resultadoRuta:
      'Resultado da rota',
    tipoRuta: 'Tipo de rota',
    rutaNormal: 'Normal',
    rutaAccesibleSinEscaleras:
      'Acessível, sem escadas',
    distanciaSimulada:
      'Distância simulada',
    unidades: 'unidades',

    guiaRuta: 'Guia passo a passo',
    pasoDe:
      'Passo {actual} de {total}',
    progresoRuta:
      'Progresso da rota',
    pasoAnterior: 'Anterior',
    pasoSiguiente: 'Próximo',
    reiniciarRuta: 'Reiniciar',

    inicioRuta:
      'Comece em {nombre}.',
    continuarHacia:
      'Continue até {nombre}.',
    subirAscensor:
      'Use o elevador para subir ao nível {nivel}.',
    bajarAscensor:
      'Use o elevador para descer ao nível {nivel}.',
    subirEscalera:
      'Use a escada para subir ao nível {nivel}.',
    bajarEscalera:
      'Use a escada para descer ao nível {nivel}.',
    subirRampa:
      'Use a rampa para subir ao nível {nivel}.',
    bajarRampa:
      'Use a rampa para descer ao nível {nivel}.',
    cambiarNivelSubir:
      'Suba ao nível {nivel} e continue até {nombre}.',
    cambiarNivelBajar:
      'Desça ao nível {nivel} e continue até {nombre}.',
    llegadaRuta:
      'Você chegou a {nombre}.',

    apuntarCamara:
      'Aponte a câmera para o código QR',
    escanear: 'Escanear',

    lecturaCancelada:
      'A leitura foi cancelada ou nenhum código QR foi detectado.',
    errorCamara:
      'Não foi possível abrir ou utilizar a câmera.',
    qrInvalido:
      'O código QR não pertence ao NavInside ou a localização não existe.',
    ubicacionDetectada:
      'Localização detectada: {nombre}',
    rutaRecalculada:
      'Localização detectada: {nombre}. A rota foi recalculada.',
    destinoAlcanzadoQr:
      'Localização detectada: {nombre}. Você chegou ao seu destino.',

    seleccionarOrigenDestino:
      'Selecione uma origem e um destino.',
    origenDestinoIguales:
      'A origem e o destino devem ser diferentes.',
    lugaresNoEncontrados:
      'Os locais selecionados não foram encontrados.',
    rutaNoDisponible:
      'Não existe uma rota disponível.',
    rutaAccesibleNoDisponible:
      'Não existe uma rota acessível disponível.'
  }
};

@Injectable({
  providedIn: 'root'
})
export class IdiomaService {
  idiomaActual: Idioma;

  constructor() {
    this.idiomaActual =
      this.obtenerIdiomaInicial();
  }

  establecerIdioma(
    idioma: Idioma
  ): void {
    this.idiomaActual = idioma;

    if (
      typeof localStorage !==
      'undefined'
    ) {
      localStorage.setItem(
        CLAVE_ALMACENAMIENTO,
        idioma
      );
    }
  }

  traducir(
    clave: string,
    parametros: Record<
      string,
      string | number
    > = {}
  ): string {
    let texto =
      TRADUCCIONES[this.idiomaActual][
        clave
      ] ??
      TRADUCCIONES[
        IDIOMA_PREDETERMINADO
      ][clave] ??
      clave;

    for (
      const [nombre, valor] of
        Object.entries(parametros)
    ) {
      texto = texto.replaceAll(
        `{${nombre}}`,
        String(valor)
      );
    }

    return texto;
  }

  private obtenerIdiomaInicial(): Idioma {
    const idiomaGuardado =
      this.obtenerIdiomaGuardado();

    if (idiomaGuardado) {
      return idiomaGuardado;
    }

    if (typeof navigator === 'undefined') {
      return IDIOMA_PREDETERMINADO;
    }

    const codigoIdioma =
      navigator.language
        .toLowerCase()
        .split('-')[0];

    if (
      codigoIdioma === 'en' ||
      codigoIdioma === 'pt'
    ) {
      return codigoIdioma;
    }

    return IDIOMA_PREDETERMINADO;
  }

  private obtenerIdiomaGuardado():
    Idioma | null {
    if (
      typeof localStorage ===
      'undefined'
    ) {
      return null;
    }

    const idioma =
      localStorage.getItem(
        CLAVE_ALMACENAMIENTO
      );

    if (
      idioma === 'es' ||
      idioma === 'en' ||
      idioma === 'pt'
    ) {
      return idioma;
    }

    return null;
  }
}