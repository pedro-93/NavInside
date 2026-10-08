import {
  Injectable
} from '@angular/core';

import {
  Idioma
} from './idioma.service';

@Injectable({
  providedIn: 'root'
})
export class VozGuiaService {
  private sintetizador:
    SpeechSynthesis | null = null;

  private habilitada = true;

  constructor() {
    if (
      typeof window !== 'undefined' &&
      'speechSynthesis' in window
    ) {
      this.sintetizador =
        window.speechSynthesis;
    }
  }

  get estaDisponible():
    boolean {
    return (
      this.sintetizador !== null
    );
  }

  get estaHabilitada():
    boolean {
    return (
      this.habilitada &&
      this.estaDisponible
    );
  }

  alternar():
    boolean {
    this.habilitada =
      !this.habilitada;

    if (!this.habilitada) {
      this.detener();
    }

    return this.habilitada;
  }

  hablar(
    texto: string,
    idioma: Idioma
  ): boolean {
    const textoLimpio =
      texto.trim();

    if (
      !this.estaHabilitada ||
      !textoLimpio ||
      !this.sintetizador
    ) {
      return false;
    }

    this.detener();

    const mensaje =
      new SpeechSynthesisUtterance(
        textoLimpio
      );

    mensaje.lang =
      this.obtenerCodigoIdioma(
        idioma
      );

    mensaje.rate = 0.92;
    mensaje.pitch = 1;
    mensaje.volume = 1;

    const voz =
      this.buscarVoz(
        mensaje.lang
      );

    if (voz) {
      mensaje.voice = voz;
    }

    this.sintetizador.speak(
      mensaje
    );

    return true;
  }

  detener():
    void {
    this.sintetizador
      ?.cancel();
  }

  private buscarVoz(
    codigoIdioma: string
  ): SpeechSynthesisVoice | null {
    const voces =
      this.sintetizador
        ?.getVoices() ?? [];

    const idiomaBase =
      codigoIdioma
        .split('-')[0];

    return (
      voces.find(
        voz =>
          voz.lang ===
          codigoIdioma
      ) ??
      voces.find(
        voz =>
          voz.lang.startsWith(
            idiomaBase
          )
      ) ??
      null
    );
  }

  private obtenerCodigoIdioma(
    idioma: Idioma
  ): string {
    const codigos:
      Record<Idioma, string> = {
        es: 'es-CL',
        en: 'en-US',
        pt: 'pt-BR'
      };

    return codigos[idioma];
  }
}