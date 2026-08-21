import {
  beforeEach,
  describe,
  expect,
  it
} from 'vitest';
import { RutaService } from './ruta.service';

describe('RutaService', () => {
  let servicio: RutaService;

  beforeEach(() => {
    servicio = new RutaService();
  });

  it('debe calcular la ruta más corta desde Entrada hasta Baño', () => {
    const ruta = servicio.calcularRuta('entrada', 'baño');

    const ids = ruta.map(nodo => nodo.id);

    expect(ids).toEqual([
      'entrada',
      'recepcion',
      'baño'
    ]);
  });

  it('debe calcular una ruta en sentido inverso', () => {
    const ruta = servicio.calcularRuta('baño', 'entrada');

    const ids = ruta.map(nodo => nodo.id);

    expect(ids).toEqual([
      'baño',
      'recepcion',
      'entrada'
    ]);
  });

  it('debe calcular la distancia total', () => {
    const ruta = servicio.calcularRuta(
      'entrada',
      'ascensor'
    );

    const distancia =
      servicio.calcularDistanciaTotal(ruta);

    expect(distancia).toBe(10);
  });

  it('debe devolver una ruta vacía para un nodo inexistente', () => {
    const ruta = servicio.calcularRuta(
      'entrada',
      'nodo-inexistente'
    );

    expect(ruta).toEqual([]);
  });
});