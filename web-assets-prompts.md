# Braced Engineering — Prompts para contenido visual y audio

Prompts cortos, listos para copiar, alineados con la web nueva (`index-nuevo.html`, contenidos en `web-industrial.md`): estilo Fundición con toques de Alta Visibilidad, tono descriptivo, cuatro sectores al mismo nivel.

Herramientas: **Canva** (infografías y composición), **generadores de imagen** (Midjourney / DALL·E / Ideogram / Canva AI), **generadores de vídeo** (Runway / Kling / Sora) y **ElevenLabs** (locución). Los prompts de imagen y vídeo van en inglés (los modelos responden mejor); los guiones de locución, en español.

**Punto de partida importante:** la web nueva es una página de texto. No necesita imágenes para funcionar. Lo único que pide de verdad son dos cosas reales, no generadas: una fotografía del equipo u oficina (apartado 01) y, si se quiere, capturas o diagramas de los sistemas en las fichas de Trabajos (apartado 05). Casi todo lo que sigue es material para LinkedIn, propuestas y presentaciones.

---

## 0. Bloque de estilo de marca

Añadir **al final de todo prompt de imagen o vídeo**:

```
warm dark background (#141110), single ember-orange accent (#ff6a00) used sparingly,
sober documentary look, natural light, no neon, no holograms, no HUD overlays,
no text, no logos, no people
```

Paleta y tipografía de referencia (para Canva y composición):

| | |
|---|---|
| Fondo | #141110 · bloques #1a1614 · pie #0b0908 |
| Texto | #ece5dc · secundario #b8b0a6 · atenuado #7d766d |
| Acento | #ff6a00 (marcas) · #ff9f1c (texto sobre oscuro) |
| Gradiente brasa | #ffb347 → #ff4d00, **solo** en la llave del logotipo |
| Titulares | Space Grotesk 500/600 |
| Texto | IBM Plex Sans 400/500 |
| Etiquetas y numerales | Barlow Condensed 600/700, mayúsculas |
| Detalle Alta Visibilidad | Franja naranja/negro a 45° (solo como remate, nunca como fondo) |

Reglas:

- **Nunca texto dentro de la imagen generada** — el texto lo pone Canva o la web (y así sirve para ES y EN).
- **Nunca personas generadas por IA.** Ni para la web ni para redes: una foto de "equipo" falsa es un problema de credibilidad y de honestidad. La foto del equipo es real o no hay foto.
- Documental, no cinematográfico: la imagen describe un entorno de trabajo, no dramatiza un problema.
- El naranja aparece en un solo punto de la imagen o en ninguno; nunca baña la escena.
- Generar 3-4 variantes por prompt y elegir; guardar seed/estilo si la herramienta lo permite.
- Exportar imágenes a **WebP** (≤300 KB) y vídeos a **MP4 H.264 sin audio** (≤4 MB para loops).

---

## 1. Imágenes

### Logotipo (avatar, favicon grande, cabeceras de redes)

**Llave en metal incandescente:**
```
A single curly brace { symbol forged in dark steel, edges glowing ember orange
as if just out of the furnace, centered on a warm charcoal background, studio
macro shot, shallow depth of field
```

**Llave mecanizada (versión fría):**
```
A curly brace { symbol machined from dark anodised aluminium, fine tool marks
visible, one thin ember-orange edge highlight, centered, warm charcoal background
```

### Sectores (cabeceras de posts o de futuras páginas por sector)

Cuatro escenas al mismo nivel, mismo encuadre y misma luz, para que se lean como una serie.

**Construcción:**
```
Site office desk with printed drawings, a measuring tape and a tablet showing a
building model, construction site out of focus through the window, late afternoon
```

**Ingeniería:**
```
Technical office at dusk, two large monitors with CAD drawings, a printed plan
set with revision stamps on the desk, quiet and orderly
```

**Fabricación:**
```
Metal fabrication workshop, a CNC machine mid-cut with a small orange coolant
glow, finished parts stacked on a pallet with paper tags, overhead work lights
```

**Maquinaria y activos:**
```
Maintenance bay with a heavy industrial gearbox on a stand, tool trolley and a
laptop open on a bench, one work lamp lighting the component
```

### Fichas de Trabajos (solo si no hay capturas reales)

Prefiere siempre una captura del sistema o un diagrama propio. Si no se pueden publicar, una imagen abstracta que describa el sistema, sin inventar pantallas:

**Plataforma BIM-a-fabricación:**
```
Close-up of a prefabricated building element on a factory trolley with a paper
routing tag, its BIM wireframe shown faintly on a monitor in the background
```

**Gestión de reparación de componentes:**
```
Repair workshop shelving with tagged industrial components awaiting dispatch,
a printed job card clipped to the front of each crate
```

**Análisis de licitaciones públicas:**
```
A desk with a thick stack of public tender documents beside a monitor showing
a plain structured table, reading lamp, neutral office
```

### Equipo y oficina (apartado 01)

**No generar.** Fotografía real del equipo o del espacio de trabajo, en luz natural, sin retoque de estilo. Si de momento no la hay, el apartado va solo con texto: la web ya está preparada para eso.

---

## 2. Infografías (Canva)

Briefs cortos, en el tono de la web: describen, no venden. Fondo #141110, Space Grotesk para títulos, IBM Plex Sans para texto, Barlow Condensed para etiquetas y numerales. Textos siempre editables (bilingüe). Formato base 1080×1350 para LinkedIn y 1920×1080 para presentaciones.

**A. La empresa en una ficha**
- Título: *Braced Engineering*.
- Tres filas etiqueta/valor, exactamente las de la web: **Actividad** · **Especialización** · **Sectores** (textos en `web-industrial.md` §3, apartado 01).
- Sin imagen. La llave del logotipo arriba a la izquierda.

**B. Cinco áreas de trabajo**
- Lista numerada 01–05 con título y una línea de descripción: Sistemas de gestión internos · Integración · Datos e indicadores · Análisis e IA aplicada · Infraestructura y mantenimiento.
- Numerales en Barlow Condensed naranja; el resto en crema.

**C. Cuatro sectores**
- Cuadrícula 2×2 con borde grueso (2 px, crema al 22 %), como en la web: nombre del sector, línea "a quién" en condensada atenuada, tres o cuatro líneas de "qué hacemos".
- Los cuatro con el mismo peso visual: ni tamaño ni color distinguen a ninguno.

**D. Cómo trabajamos**
- Un párrafo (el de la web, §3 apartado 04) y debajo tres columnas con línea superior naranja: **Análisis** · **Desarrollo** · **Mantenimiento y evolución**.

**E. Plantilla de ficha de trabajo**
- Cabecera: nombre del sistema. Cuerpo: descripción de tres o cuatro líneas. Pie: cuatro campos con etiqueta condensada — Sector · Alcance · Integraciones · Cliente.
- Una plantilla, tres instancias (las fichas de la web). Si el cliente no se puede nombrar, el campo se omite; nunca "confidencial" ni "gran empresa del sector".

---

## 3. Vídeos

### Loop de fondo (5-10 s, sin audio; para cabecera de redes, no para la web)

```
Seamless loop: a dark steel curly brace symbol slowly rotating a few degrees,
its edges glowing ember orange, warm charcoal background, no other elements
```

### Vídeo de presentación (30-40 s, LinkedIn y propuestas)

Cuatro escenas documentales de 6-8 s, misma luz y ritmo, sin tensión ni "antes/después". Generar por separado y montar sobre el Guión 2.

1. ```
   Slow push-in on a technical office desk: printed drawings, a monitor with a
   CAD model, morning light
   ```
2. ```
   Handheld walk along a fabrication line, parts with paper tags moving on a
   conveyor, one CNC machine working
   ```
3. ```
   A maintenance bay: an engineer's hands (no face) placing a tagged component
   on a bench next to an open laptop
   ```
4. ```
   Static shot of a plain dashboard on a monitor in a site office, out of
   focus, a window with a construction site behind
   ```

Cierre: logotipo Braced sobre #141110 (usar `img/brand/logo.svg`, no generarlo) y, debajo, en condensada: *Construcción · Ingeniería · Fabricación · Maquinaria y activos*.

---

## 4. Locuciones (ElevenLabs)

**Configuración sugerida:** voz es-ES adulta, registro de narración informativa (documental, no publicitario). Stability ~55 %, similarity ~75 %, style mínimo, sin énfasis. Versión EN con una voz equivalente en inglés británico o neutro.

Los guiones son el texto de la web leído en voz alta. No se añade nada que la web no diga.

**Guión 1 — La empresa (~25 s):**
> Braced Engineering es una empresa de ingeniería de software especializada en los sectores industrial y de la construcción. Desarrollamos los sistemas internos con los que operan empresas de construcción, ingeniería, fabricación y maquinaria; los integramos con su oficina técnica, sus equipos y sus datos, y los mantenemos en producción.

**Guión 2 — Voz en off del vídeo de presentación (~35 s):**
> Braced Engineering es una empresa de ingeniería de software especializada en los sectores industrial y de la construcción. *(pausa)* Desarrollamos sistemas de gestión internos, integramos ERP, oficina técnica y maquinaria, y trabajamos con los datos de operación. *(pausa)* Trabajamos integrados en la organización del cliente: análisis sobre el terreno, desarrollo iterativo con entregas periódicas, y mantenimiento del sistema en producción. *(pausa)* Construcción, ingeniería, fabricación, maquinaria y activos.

**Guión 3 — Cómo trabajamos (~20 s):**
> Trabajamos integrados en la organización del cliente. Un proyecto empieza con un análisis de la operación sobre el terreno. A partir de ahí se define el sistema y se desarrolla de forma iterativa, con entregas periódicas. Una vez en producción, nos ocupamos de su mantenimiento y de su evolución.

**Guión 1 EN:**
> Braced Engineering is a software engineering company specialised in the industrial and construction sectors. We develop the internal systems that construction, engineering, manufacturing and machinery companies run on; we integrate them with their technical office, their equipment and their data, and keep them in production.

---

## 5. Dónde va cada asset

| Asset | Destino | Formato |
|---|---|---|
| Foto real de equipo u oficina | Web, apartado 01 (sustituye al recuadro "pendiente") | WebP 900×600, ≤200 KB |
| Capturas o diagramas de los sistemas | Web, fichas del apartado 05 (opcional) | WebP 1200×800 |
| Llave en metal | Avatar y cabecera de LinkedIn, favicon grande | PNG 1024×1024 |
| Imágenes de sector | Posts de LinkedIn; futuras páginas por sector si las hubiera | WebP 1600×1000 |
| Infografías A–E | LinkedIn, propuestas, presentaciones | PNG/PDF; editables en Canva |
| Loop de la llave | Cabecera de vídeo en redes | MP4 sin audio, ≤4 MB |
| Vídeo de presentación + Guión 2 | LinkedIn, propuestas | MP4 1080p con subtítulos ES/EN |
| Guiones 1 y 3 | Audio para vídeos cortos o presentaciones | MP3 |

## 6. Notas

- La web no lleva vídeo de fondo ni imágenes decorativas: el estilo se sostiene con tipografía, retícula y el naranja bien dosificado. Añadir imágenes "para llenar" iría contra el diseño.
- Cualquier imagen generada que muestre maquinaria de una marca reconocible, se descarta.
- Las infografías con texto se mantienen editables en Canva para sacar la versión EN sin regenerar.
- Todo texto que aparezca en un asset sale de `web-industrial.md`; si hace falta una frase nueva, se escribe en el mismo registro: describe, no vende.
