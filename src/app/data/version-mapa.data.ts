import {
  VersionMapa
} from '../models/version-mapa.model';

export const VERSION_MAPA_ACTUAL:
  VersionMapa = {
    id: 'hippocampus-simulado',
    version: '0.1.0',
    fechaActualizacion: '2026-08-25',
    estado: 'simulado',
    nivelesDisponibles: [
      1,
      3
    ],
    origenDatos:
      'Plano de orientación preliminar y datos simulados',
    requiereInternet: false
  };