import {
  beforeEach,
  describe,
  expect,
  it
} from 'vitest';

import { QrService } from './qr.service';

describe('QrService', () => {
  let service: QrService;

  beforeEach(() => {
    service = new QrService();
  });

  it('debe reconocer un QR válido', () => {
    const contenido = JSON.stringify({
      sistema: 'navinside',
      version: 1,
      nodoId: 'recepcion'
    });

    const resultado = service.procesarCodigo(contenido);

    expect(resultado?.id).toBe('recepcion');
    expect(resultado?.nombre).toBe('Recepción');
  });

  it('debe rechazar un QR de otro sistema', () => {
    const contenido = JSON.stringify({
      sistema: 'otro-sistema',
      version: 1,
      nodoId: 'recepcion'
    });

    expect(service.procesarCodigo(contenido)).toBeNull();
  });

  it('debe rechazar un nodo inexistente', () => {
    const contenido = JSON.stringify({
      sistema: 'navinside',
      version: 1,
      nodoId: 'lugar-inexistente'
    });

    expect(service.procesarCodigo(contenido)).toBeNull();
  });

  it('debe rechazar contenido que no sea JSON', () => {
    expect(service.procesarCodigo('codigo-invalido')).toBeNull();
  });
});