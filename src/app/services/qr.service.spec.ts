import {
  describe,
  expect,
  it
} from 'vitest';
import {
  TestBed
} from '@angular/core/testing';

import {
  QrService
} from './qr.service';

describe('QrService', () => {
  const service = TestBed.inject(QrService);

  it('reconoce un QR válido de Hippocampus', () => {
    const resultado =
      service.procesarCodigo(
        JSON.stringify({
          sistema: 'navinside',
          version: 1,
          nodoId: 'entrada-nivel-4'
        })
      );

    expect(resultado?.id)
      .toBe('entrada-nivel-4');

    expect(resultado?.nombre)
      .toBe('Entrada');
  });

  it('reconoce el formato simple guardado en Supabase', () => {
    const resultado =
      service.procesarCodigo(
        'NAVINSIDE:entrada-nivel-4'
      );

    expect(resultado?.id)
      .toBe('entrada-nivel-4');
  });

  it('rechaza un nodo inexistente', () => {
    const resultado =
      service.procesarCodigo(
        JSON.stringify({
          sistema: 'navinside',
          version: 1,
          nodoId: 'nodo-inexistente'
        })
      );

    expect(resultado).toBeNull();
  });

  it('rechaza contenido inválido', () => {
    expect(
      service.procesarCodigo(
        'inválido'
      )
    ).toBeNull();
  });
});
