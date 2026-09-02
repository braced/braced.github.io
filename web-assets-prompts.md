> **Nota (revisión pendiente):** este documento se escribió para la paleta cian/violeta y el tono comercial anteriores. La dirección actual es la de `web-industrial.md` (estilo Fundición + Alta Visibilidad, tono descriptivo, cuatro sectores). Los prompts de imagen valen cambiando el bloque de estilo; los guiones de locución hay que reescribirlos sin lenguaje de ventas.

# Braced Engineering — Prompts para contenido visual y audio

Prompts cortos y listos para copiar, para generar los assets de la web industrial (ver `web-industrial.md`). Herramientas: **Canva** (infografías y composición), **generadores de imagen** (Midjourney / DALL·E / Ideogram / Canva AI), **generadores de vídeo** (Runway / Kling / Sora) y **ElevenLabs** (locución).

Los prompts de imagen y vídeo van en inglés (los modelos responden mejor); los guiones de locución, en español.

---

## 0. Bloque de estilo de marca

Añadir **al final de todo prompt de imagen o vídeo** para mantener coherencia:

```
dark background (#0a0a0a), cyan (#00b4d8) and violet (#7b2ff7) accent lighting,
minimal high-end tech aesthetic, cinematic, no text, no logos, no people's faces
```

Reglas:

- **Nunca texto dentro de la imagen** — el texto lo pone la web (y así sirve para ES y EN).
- Generar 3-4 variantes por prompt y elegir; guardar seed/estilo si la herramienta lo permite.
- Exportar imágenes a **WebP** (≤300 KB) y vídeos a **MP4 H.264 sin audio** (≤4 MB para loops).

---

## 1. Imágenes

### Fondos de sección

**Hero (alternativa/complemento al canvas de partículas):**
```
Abstract network of glowing cyan particles and thin connecting lines forming
a large curly brace { symbol, floating in dark space, subtle depth of field
```

**Qué hacemos — el hueco oficina/planta:**
```
Split scene: engineering office with CAD screens on the left, factory floor
with heavy machinery on the right, connected by a single glowing cyan data
stream bridging both worlds
```

**Cómo trabajamos — integración:**
```
Silhouettes of an engineer with a tablet standing on a factory walkway
overlooking automated production lines, thin cyan HUD lines highlighting
machines below
```

**Capacidades — planta conectada:**
```
Dark factory floor at night, CNC machines and robotic arms with faint cyan
light trails connecting them to a floating minimal dashboard hologram
```

**Contacto — cierre:**
```
Single glowing cyan thread of light crossing a dark industrial hall,
leading toward a bright point on the horizon, calm and minimal
```

### Ilustraciones para tarjetas de casos

**Plataforma BIM-a-Fabricación:**
```
Architectural BIM wireframe model morphing into a real fabricated steel
module on a production line, left half wireframe cyan, right half solid metal
```

**CRM de reparación multi-actor:**
```
Industrial gearbox on a workshop bench, glowing route lines on a dark map
connecting client, regional workshop and logistics truck icons
```

**Análisis de licitaciones con IA:**
```
Stack of dense technical documents dissolving into clean structured rows of
glowing data, dark desk scene, cyan highlights
```

### Conceptos de capacidad (para social o futuras secciones)

**Mantenimiento predictivo:**
```
Close-up of an industrial turbine with a translucent holographic overlay of
sensor waveforms, one waveform pulsing violet as an anomaly warning
```

**Trazabilidad:**
```
Factory conveyor belt with metal parts, each part with a small floating
cyan digital tag, long perspective line into the dark
```

**Del plano a la máquina:**
```
Technical blueprint lines lifting off paper and flowing through the air
into a CNC machine that is cutting the exact same part
```

---

## 2. Infografías (Canva)

Briefs cortos; usar fondo #0a0a0a, tipografía Inter, acentos #00b4d8 y #7b2ff7. Textos siempre editables (bilingüe).

**A. Las islas de información → el sistema**
- Izquierda: 4 islas desconectadas: "ERP" · "Excel de planificación" · "Planos" · "Planta".
- Derecha: las mismas piezas conectadas a un nodo central "Tu sistema".
- Título: *"De islas de información a un solo sistema"*.

**B. El proceso en 3 pasos**
- Línea horizontal con 3 hitos: **01 Entendemos → 02 Construimos → 03 Evolucionamos**.
- Una frase de 6-8 palabras bajo cada hito (sacarlas de `web-industrial.md` §4.3).

**C. Mapa de capacidades**
- Grid 3×2 con icono + título de las 6 capacidades (§4.4).
- Estilo iconos: línea fina cian, sin relleno, esquinas redondeadas.

**D. Flujo plano → máquina**
- Diagrama de flujo: "Modelo BIM/CAD → Sistema Braced → Órdenes de fabricación → CNC/PLC → Pieza fabricada".
- Debajo, una capa transversal: "Trazabilidad e indicadores en tiempo real".

**E. Antes / Después**
- Dos columnas: "Hoy" (Excel, correos, dobles introducciones, datos a mes vencido) vs "Con Braced" (una fuente de verdad, flujo automático, datos en vivo).
- Máximo 4 filas, texto corto.

---

## 3. Vídeos

### Loops de fondo (5-10 s, sin audio, para hero o secciones)

```
Seamless loop: cyan particles drifting in dark space slowly assembling into
a glowing curly brace symbol, then gently dispersing
```

```
Seamless loop: slow dolly across a dark automated factory line, robotic arms
moving, faint cyan light pulses traveling along the machines
```

```
Seamless loop: minimal dashboard hologram with live charts floating above a
dark factory floor, numbers ticking, subtle violet glow
```

### Vídeo de presentación (30-45 s, para web o LinkedIn)

Escenas de 6-8 s cada una (generar por separado y montar):

1. ```
   Dark screen, a single cyan line draws a curly brace symbol
   ```
2. ```
   Engineering office at night, CAD screens glowing, papers and
   spreadsheets piling up, slight tension in the atmosphere
   ```
3. ```
   The same data flowing as light through cables into factory machines
   that start moving in sync, relief and order
   ```
4. ```
   Wide shot of a calm, synchronized smart factory with a minimal
   floating dashboard, cyan and violet accents, confident tone
   ```

Cierre: logo Braced sobre negro (usar `img/brand/logo.svg`, no generarlo).

---

## 4. Locuciones (ElevenLabs)

**Configuración sugerida:** voz es-ES adulta, tono sobrio y seguro (perfil "narración corporativa", no comercial agresivo). Stability ~50 %, similarity ~75 %, style bajo. Generar también versión EN con la voz equivalente en inglés.

**Guión 1 — Presentación de marca (~20 s):**
> En la mayoría de empresas industriales, la información vive en islas. El ERP no sabe qué pasa en planta. Los planos se traducen a mano. Y la planificación depende de un Excel. En Braced construimos el sistema que lo une. Software a la altura de tu ingeniería.

**Guión 2 — Voz en off del vídeo de presentación (~35 s):**
> Tu maquinaria ya es digital. Tus procesos, todavía no. *(pausa)* En Braced nos integramos en tu organización: empezamos pisando la planta, construimos el sistema que conecta tu oficina técnica con tus máquinas, y lo mantenemos vivo mientras tu negocio crece. *(pausa)* Del plano a la máquina, sin fricción. Braced Engineering. Veinte minutos para ver si encajamos.

**Guión 3 — Caso bandera BIM-a-Fabricación (~20 s):**
> Del modelo arquitectónico a la máquina en planta, sin pasos manuales. Nuestra plataforma BIM-a-fabricación gestiona todo el ciclo de la construcción industrializada: planos, órdenes, logística y automatización de maquinaria. Un solo sistema, trazabilidad total.

**Guión 1 EN (para redes / versión inglesa):**
> In most industrial companies, information lives on islands. The ERP doesn't know what happens on the floor. Drawings are translated by hand. Planning lives in a spreadsheet. At Braced, we build the system that brings it together. Software that matches your engineering.

---

## 5. Dónde va cada asset

| Asset | Ubicación | Formato |
|---|---|---|
| Fondos de sección | Detrás de cada pantalla (sustituyen/complementan orbes) | WebP 1920×1080, ≤300 KB |
| Ilustraciones de casos | Tarjetas de la sección Casos | WebP 800×600 |
| Infografías A y E | Sección Qué hacemos / material comercial y LinkedIn | PNG/WebP; en web, mejor rehacer como SVG |
| Infografías B, C, D | Refuerzo de Cómo/Capacidades y propuestas comerciales | ídem |
| Loops de vídeo | Fondo del hero (desktop; en móvil, imagen estática) | MP4 H.264 sin audio, ≤4 MB, con póster WebP |
| Vídeo presentación + Guión 2 | LinkedIn, propuestas, y opcionalmente sección Cómo | MP4 1080p con subtítulos |
| Guiones 1 y 3 | Audio para vídeos sociales / demos | MP3 |

## 6. Notas rápidas

- La web ya tiene una identidad fuerte (canvas de partículas + orbes): cualquier imagen debe **sumarse a ese lenguaje**, no competir con él. Ante la duda: más oscuro, más simple.
- Los loops de vídeo de fondo solo en desktop y comprimidos; en móvil se sirve imagen (misma regla que ya sigue el canvas actual).
- Las infografías con texto: mantener siempre el archivo editable en Canva para poder sacar la versión EN.
- Si una imagen generada muestra maquinaria de una marca reconocible, descartarla.
