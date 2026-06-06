# Changelog — Lima APK

## Build 52 — 2026-06-06
### Fix: Botón Ver en Vivo no visible en Android
- cam-overlay: z-index:10 para quedar sobre el elemento video nativo.
- Video template: eliminado atributo autoplay (se activaba sin fuente y creaba surface hardware en WebView que tapaba el overlay).
- El botón Ver en Vivo ahora es visible al cargar la lista de camaras.
- Compatible con Dahua P2P directo (Novello cam1) y DoLynk (Fiorini 8 cams).


## Build 51 - 2026-05-31
### Feature: Modulo Camaras (DoLynk HLS)
- Boton Camaras reemplaza Mi Edificio en la barra lateral derecha.
- abrirModuloCamara(): lista camaras del cliente via GET /api/camaras.
- playCamera(): solicita URL HLS via POST /api/camaras/:id/hls (DoLynk cloud).
- Player con HLS.js (CDN); fallback nativo para Safari/iOS.
- destroyHls() al cerrar el modulo para liberar recursos.
- limen-ai/server.js: reemplazado go2rtc por dolynk.js.

## Build 50 — 2026-05-23
### Feature: VoIP — Comunicación Directa con el Receptor
- socket.io client (CDN 4.7.5) cargado en `<head>`.
- `voipConectar()`: al hacer login, conecta socket.io a `limaguard.ldtp.com/voip` con JWT.
- `voipAtender(data)`: al recibir `voip_llamada` del receptor, auto-responde:
  - getUserMedia(audio) + RTCPeerConnection (STUN Google)
  - Crea answer → emit `voip_answer`
  - ICE candidates enviados vía `voip_ice_apk`
- `voipColgar()`: cierra PC, stream y overlay. Emite `voip_colgar_apk` al receptor.
- Overlay flotante durante llamada activa: "Comunicación Directa — Operador conectado" + botón COLGAR.
- GPS polling: 30s → 15s para mapa más reactivo.
- `usuario_email` enviado al servidor en `POST /api/asistencia`.

## Build 49 — 2026-05-23
### Fix: regresión visual + Pedido de Ayuda (correcto)
- **REGRESIÓN REVERTIDA**: el build 48 había introducido una copia vieja de index.html
  que restauró el matrix rain, texto "LIMA" en la esfera, diamante de circuito y
  elipses orbitales — todos eliminados desde el build 23.
- Base correcta restaurada desde build 46 (V3 Shield, diseño limpio).
- Feature Pedido de Ayuda portado correctamente sobre la base limpia:
  - Botón "Pedir Ayuda" en el modal de pánico → `accionAyuda()` (flujo propio)
  - `confirmarAyuda()`: obtiene GPS, POST `/api/asistencia`, guarda `_asistenciaId`
  - Polling GPS cada 30s mientras asistencia activa
  - Pantalla "AYUDA ENVIADA" con botón "Estoy bien — Cancelar ayuda"
  - `cancelarAyuda()`: POST `/api/asistencia/:id/cancelar`, limpia interval

## Build 48 — 2026-05-22 ⚠ REGRESIÓN
- Pedido de Ayuda agregado sobre copia OLD del index.html → restauró efectos
  eliminados (matrix, LIMA text, diamante, elipses). Revertido en build 49.

## Build 47 — 2026-05-22
- Retry de build 46 por falla de infraestructura GitHub Actions.

## Build 46 — 2026-05-22
- Fix splash screen negro en Android.
- Fix mic NotReadableError en Android.

## Build 45 — 2026-05-22
- Fix botón HABLAR: feedback visual inmediato antes del await getUserMedia.

## Build 44 — 2026-05-21
- Fix LimaVoiceActivity: envía campo 'texto' al servidor (antes enviaba 'mensaje').

## Build 43 — 2026-05-21
- Fix widget Ayuda cold-start: guarda acción pendiente en SharedPreferences.

## Build 42 — 2026-05-21
- Widget Ayuda: salta opciones de pánico, va directo a confirmar.

## Build 41 — 2026-05-21
- Fix YAML: merge de patch LimaVoiceActivity en un solo comando.

## Build 40 — 2026-05-20
- Reemplaza vozContinua por botón PTT (push-to-talk).
- Agrega widget LimaVoiceActivity.

## Build 39 — 2026-05-20
- Widgets separados: SOS Ayuda (2×2) + Mic Lima (2×1).

## Build 29 — 2026-05-04
- Rediseño V3 Shield: data-lima-state, shield SVG, bg glow, colores por estado.
- **Elimina matrix rain** (caracteres cayendo en el fondo).

## Build 23 — 2026-05-01
- **Elimina**: texto LIMA dentro de la esfera, diamante de circuito, elipses
  orbitales animadas, anillos neon extra.
- Saludo LIMA solo en primer login (localStorage key por usuario).
- Botón cerrar sesión movido a la sección de configuración.

## Build 2 — 2026-04-23
- Rediseño: añade diamante de circuito, texto LIMA, botones neon, matrix rings.
  (Todo eliminado progresivamente entre builds 10 y 29.)

## Build 1 — 2026-04-23
- Versión inicial: Lima APK con Capacitor + GitHub Actions.
