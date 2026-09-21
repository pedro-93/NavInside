begin;

insert into public.mapas (
  id,
  nombre,
  descripcion,
  estado
) values (
  'hippocampus-resort',
  'Hippocampus Resort & Club',
  'Mapa de referencia construido con mediciones realizadas en terreno.',
  'referencia'
)
on conflict (id) do update set
  nombre = excluded.nombre,
  descripcion = excluded.descripcion,
  estado = excluded.estado;

insert into public.nodos (
  id,
  mapa_id,
  nombre,
  x,
  y,
  tipo,
  nivel,
  sector,
  accesible,
  restringido,
  activo
) values
  ('entrada-nivel-4', 'hippocampus-resort', 'Entrada', 0, 0, 'entrada', 4, 'Acceso principal', true, false, true),
  ('recepcion-turismo-vina-nivel-4', 'hippocampus-resort', 'Recepción Turismo Viña', 2, -2, 'recepcion', 4, 'Recepciones', true, false, true),
  ('recepcion-resort-nivel-4', 'hippocampus-resort', 'Recepción Resort', 2, 2, 'recepcion', 4, 'Recepciones', true, false, true),
  ('ascensor-central-nivel-4', 'hippocampus-resort', 'Ascensor Central - Nivel 4', 4, 0, 'ascensor', 4, 'Edificio central', true, false, true),
  ('puerta-exterior-derecha-nivel-4', 'hippocampus-resort', 'Puerta Exterior Derecha', 4, -3, 'entrada', 4, 'Acceso exterior', null, false, true),
  ('puerta-exterior-izquierda-nivel-4', 'hippocampus-resort', 'Puerta Exterior Izquierda', 4, 3, 'entrada', 4, 'Acceso exterior', null, false, true),

  ('acceso-escalera-derecha-nivel-3', 'hippocampus-resort', 'Acceso Nivel 3 - Escalera Derecha', 1, -3, 'escalera', 3, 'Acceso exterior', false, false, true),
  ('acceso-escalera-izquierda-nivel-3', 'hippocampus-resort', 'Acceso Nivel 3 - Escalera Izquierda', 1, 3, 'escalera', 3, 'Acceso exterior', false, false, true),
  ('ascensor-central-nivel-3', 'hippocampus-resort', 'Salida Ascensor Central - Nivel 3', 4, 0, 'ascensor', 3, 'Edificio central', true, false, true),
  ('piscina-acceso-escalones-nivel-3', 'hippocampus-resort', 'Piscina - Acceso por Escalones', 7, -3, 'piscina', 3, 'Piscinas', false, false, true),
  ('piscina-acceso-accesible-nivel-3', 'hippocampus-resort', 'Piscina - Acceso Accesible', 7, -1, 'piscina', 3, 'Piscinas', true, false, true),
  ('piscina-temperada-nivel-3', 'hippocampus-resort', 'Piscina Temperada', 7, 1, 'piscina', 3, 'Piscinas', null, false, true),
  ('restaurant-faro-nivel-3', 'hippocampus-resort', 'Restaurant Faro', 7, 3, 'restaurante', 3, 'Exterior', null, false, true),
  ('canchas-tenis-nivel-3', 'hippocampus-resort', 'Canchas de Tenis', 7, 5, 'cancha', 3, 'Exterior', false, false, true),

  ('ascensor-central-nivel-1', 'hippocampus-resort', 'Salida Ascensor Central - Nivel 1', 0, 0, 'ascensor', 1, 'Edificio central', true, false, true),
  ('zona-kid-nivel-1', 'hippocampus-resort', 'Zona Kid', 2, -4, 'servicio', 1, 'Entretención', null, false, true),
  ('zona-juego-adulto-nivel-1', 'hippocampus-resort', 'Zona Juego Adulto', 2, -2, 'servicio', 1, 'Entretención', null, false, true),
  ('zona-play-nivel-1', 'hippocampus-resort', 'Zona Play', 2, 0, 'servicio', 1, 'Entretención', null, false, true),
  ('hall-nivel-1', 'hippocampus-resort', 'Hall', 4, 0, 'pasillo', 1, 'Edificio central', null, false, true),
  ('mini-market-proa-nivel-1', 'hippocampus-resort', 'Mini Market Proa', 7, -4, 'servicio', 1, 'Servicios', null, false, true),
  ('gimnasio-nivel-1', 'hippocampus-resort', 'Gimnasio', 7, -2, 'gimnasio', 1, 'Servicios', null, false, true),
  ('salon-eventos-montemar-nivel-1', 'hippocampus-resort', 'Salón Eventos Montemar', 7, 0, 'salon', 1, 'Salones', null, false, true),
  ('salon-eventos-terramar-nivel-1', 'hippocampus-resort', 'Salón Eventos Terramar', 7, 2, 'salon', 1, 'Salones', null, false, true),
  ('alma-spa-nivel-1', 'hippocampus-resort', 'Alma Spa', 7, 4, 'spa', 1, 'Spa', null, false, true),
  ('ascensor-habitaciones-nivel-1', 'hippocampus-resort', 'Ascensor Edificio Habitaciones - Nivel 1', 10, 0, 'ascensor', 1, 'Edificio habitaciones', true, false, true),

  ('ascensor-habitaciones-piso-6', 'hippocampus-resort', 'Salida Ascensor Edificio Habitaciones - Piso 6', 0, 0, 'ascensor', 6, 'Edificio habitaciones', true, false, true),
  ('puerta-acceso-tinajas-piso-6', 'hippocampus-resort', 'Tinajas / Puerta de Acceso', 6, 0, 'spa', 6, 'Exterior piso 6', null, false, true),
  ('alma-spa-tinaja-piso-6', 'hippocampus-resort', 'Alma Spa Tinaja', 8, 0, 'spa', 6, 'Exterior piso 6', null, false, true)
on conflict (id) do update set
  mapa_id = excluded.mapa_id,
  nombre = excluded.nombre,
  x = excluded.x,
  y = excluded.y,
  tipo = excluded.tipo,
  nivel = excluded.nivel,
  sector = excluded.sector,
  accesible = excluded.accesible,
  restringido = excluded.restringido,
  activo = excluded.activo;

insert into public.conexiones (
  mapa_id,
  origen_id,
  destino_id,
  distancia,
  tipo,
  accesible,
  restringida,
  habilitada
) values
  ('hippocampus-resort', 'entrada-nivel-4', 'recepcion-turismo-vina-nivel-4', 6.387, 'pasillo', true, false, true),
  ('hippocampus-resort', 'entrada-nivel-4', 'recepcion-resort-nivel-4', 6.751, 'pasillo', true, false, true),
  ('hippocampus-resort', 'entrada-nivel-4', 'ascensor-central-nivel-4', 6.877, 'pasillo', true, false, true),
  ('hippocampus-resort', 'entrada-nivel-4', 'puerta-exterior-derecha-nivel-4', 8.530, 'pasillo', false, false, true),
  ('hippocampus-resort', 'entrada-nivel-4', 'puerta-exterior-izquierda-nivel-4', 9.008, 'pasillo', false, false, true),
  ('hippocampus-resort', 'puerta-exterior-derecha-nivel-4', 'acceso-escalera-derecha-nivel-3', 2.577, 'escalera', false, false, true),
  ('hippocampus-resort', 'puerta-exterior-izquierda-nivel-4', 'acceso-escalera-izquierda-nivel-3', 2.577, 'escalera', false, false, true),

  ('hippocampus-resort', 'ascensor-central-nivel-4', 'ascensor-central-nivel-3', 0, 'ascensor', true, false, true),
  ('hippocampus-resort', 'ascensor-central-nivel-3', 'ascensor-central-nivel-1', 0, 'ascensor', true, false, true),
  ('hippocampus-resort', 'ascensor-habitaciones-nivel-1', 'ascensor-habitaciones-piso-6', 0, 'ascensor', true, false, true),

  ('hippocampus-resort', 'ascensor-central-nivel-3', 'piscina-acceso-escalones-nivel-3', 8.600, 'escalera', false, false, true),
  ('hippocampus-resort', 'ascensor-central-nivel-3', 'piscina-acceso-accesible-nivel-3', 12.000, 'rampa', true, false, true),
  ('hippocampus-resort', 'ascensor-central-nivel-3', 'piscina-temperada-nivel-3', 12.000, 'pasillo', false, false, true),
  ('hippocampus-resort', 'ascensor-central-nivel-3', 'restaurant-faro-nivel-3', 16.000, 'pasillo', false, false, true),
  ('hippocampus-resort', 'ascensor-central-nivel-3', 'canchas-tenis-nivel-3', 36.000, 'pasillo', false, false, true),

  ('hippocampus-resort', 'ascensor-central-nivel-1', 'zona-kid-nivel-1', 4.411, 'pasillo', false, false, true),
  ('hippocampus-resort', 'ascensor-central-nivel-1', 'zona-juego-adulto-nivel-1', 2.054, 'pasillo', false, false, true),
  ('hippocampus-resort', 'ascensor-central-nivel-1', 'zona-play-nivel-1', 6.255, 'pasillo', false, false, true),
  ('hippocampus-resort', 'ascensor-central-nivel-1', 'hall-nivel-1', 10.336, 'pasillo', false, false, true),
  ('hippocampus-resort', 'hall-nivel-1', 'mini-market-proa-nivel-1', 10.171, 'pasillo', false, false, true),
  ('hippocampus-resort', 'hall-nivel-1', 'gimnasio-nivel-1', 15.272, 'pasillo', false, false, true),
  ('hippocampus-resort', 'hall-nivel-1', 'salon-eventos-montemar-nivel-1', 32.184, 'pasillo', false, false, true),
  ('hippocampus-resort', 'hall-nivel-1', 'salon-eventos-terramar-nivel-1', 13.586, 'pasillo', false, false, true),
  ('hippocampus-resort', 'hall-nivel-1', 'alma-spa-nivel-1', 26.521, 'pasillo', false, false, true),
  ('hippocampus-resort', 'salon-eventos-montemar-nivel-1', 'ascensor-habitaciones-nivel-1', 5.143, 'pasillo', false, false, true),

  ('hippocampus-resort', 'ascensor-habitaciones-piso-6', 'puerta-acceso-tinajas-piso-6', 48.293, 'pasillo', false, false, true),
  ('hippocampus-resort', 'puerta-acceso-tinajas-piso-6', 'alma-spa-tinaja-piso-6', 4.800, 'pasillo', false, false, true)
on conflict (
  mapa_id,
  origen_id,
  destino_id
) do update set
  distancia = excluded.distancia,
  tipo = excluded.tipo,
  accesible = excluded.accesible,
  restringida = excluded.restringida,
  habilitada = excluded.habilitada;

insert into public.codigos_qr (
  codigo,
  nodo_id,
  activo
) values
  ('NAVINSIDE:entrada-nivel-4', 'entrada-nivel-4', true),
  ('NAVINSIDE:recepcion-resort-nivel-4', 'recepcion-resort-nivel-4', true),
  ('NAVINSIDE:ascensor-central-nivel-4', 'ascensor-central-nivel-4', true),
  ('NAVINSIDE:ascensor-central-nivel-3', 'ascensor-central-nivel-3', true),
  ('NAVINSIDE:ascensor-central-nivel-1', 'ascensor-central-nivel-1', true),
  ('NAVINSIDE:hall-nivel-1', 'hall-nivel-1', true),
  ('NAVINSIDE:salon-eventos-montemar-nivel-1', 'salon-eventos-montemar-nivel-1', true),
  ('NAVINSIDE:ascensor-habitaciones-nivel-1', 'ascensor-habitaciones-nivel-1', true),
  ('NAVINSIDE:ascensor-habitaciones-piso-6', 'ascensor-habitaciones-piso-6', true),
  ('NAVINSIDE:puerta-acceso-tinajas-piso-6', 'puerta-acceso-tinajas-piso-6', true)
on conflict (codigo) do update set
  nodo_id = excluded.nodo_id,
  activo = excluded.activo;

commit;