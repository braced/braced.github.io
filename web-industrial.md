# Braced Engineering — Web: propuesta definitiva de contenidos

Estado de la propuesta tras tres rondas de exploración:

- **Estructura:** S1 — "Índice" (perfil de empresa con índice fijo y contenido en prosa y listas). La empresa va primero.
- **Tono:** descriptivo. La web describe qué empresa es Braced, en qué está especializada, qué hace, para quién y cómo. No vende nada.
- **Alcance:** construcción, ingeniería, fabricación, maquinaria y activos — cuatro sectores al mismo nivel.
- **Estilo visual:** Fundición con toques de Alta Visibilidad, aplicado con contención (ver §5).

Las exploraciones (rondas 1–3 y la propuesta visual anterior) siguen en el canvas de diseño "Concepto Web Braced" como referencia.

---

## 1. Principios

1. **Describir, no vender.** Sin eslóganes, sin titulares de "dolor", sin llamadas a la acción imperativas, sin superlativos ni adjetivos de valor. Los verbos de acción que quedan son etiquetas de navegación ("Ver ficha", "reservar en la agenda").
2. **Especialización y actividad explícitas en la primera frase.** Quien llegue a la web tiene que saber en un párrafo qué tipo de empresa es, en qué está especializada y qué hace exactamente.
3. **Ningún sector domina.** El vocabulario cambia según el sector (mediciones y certificaciones, versiones de proyecto, órdenes y trazabilidad, mantenimiento y flotas); "planta" no es la palabra por defecto.
4. **Solo trabajos 100 % Braced.** El conocimiento procedente de proyectos privativos (optimización de parámetros de maquinaria, mantenimiento predictivo) se describe como capacidad en "Qué hacemos" (02), sin sector ni contexto identificable.
5. **Nada inventado.** Donde falte un dato real (equipo, sede, cliente, cifras) va un marcador `[pendiente]`, nunca un relleno.

## 2. Estructura

Página única con **scroll natural** (se abandona la navegación por pantallas completas con fundidos). Dos columnas en escritorio: índice fijo a la izquierda que marca la sección visible, contenido a la derecha. En móvil, el índice se convierte en menú y el contenido va a una columna. Bilingüe ES/EN (`data-es` / `data-en`).

| # | Apartado | Contenido |
|---|---|---|
| 01 | La empresa | Párrafo descriptivo (qué empresa es, especialización) + ficha Actividad / Especialización / Sectores + equipo y trayectoria `[pendiente]` |
| 02 | Qué hacemos | Introducción + cinco áreas de trabajo |
| 03 | Sectores | Cuatro sectores, descritos en paralelo |
| 04 | Cómo trabajamos | Un párrafo + tres fases |
| 05 | Trabajos | Tres fichas de proyecto con datos |
| 06 | Contacto | Email, agenda, acceso de clientes |

Navegación superior: los seis apartados, selector de idioma, "Acceso clientes" (portal `console.bracedeng.com`). Sin botón de contacto destacado: Contacto es un apartado más.

## 3. Textos (ES)

### 01 — La empresa

> Braced Engineering es una empresa de ingeniería de software especializada en los sectores industrial y de la construcción. Desarrollamos los sistemas internos con los que operan empresas de construcción, ingeniería, fabricación y maquinaria, los integramos con su oficina técnica, sus equipos y sus datos, y los mantenemos en producción.

| | |
|---|---|
| **Actividad** | Desarrollo, integración y mantenimiento de software a medida. |
| **Especialización** | Sistemas de operación internos para empresas industriales y de construcción; integración con CAD/BIM, ERP y maquinaria; datos e IA aplicada a la operación. |
| **Sectores** | Construcción · Ingeniería · Fabricación · Maquinaria y activos |

> Braced Engineering está formada por ingenieros de software con experiencia en entornos de ingeniería e industria. `[pendiente: equipo, trayectoria, sede — redactar con datos reales, en el mismo tono descriptivo]`

Opcional: fotografía del equipo u oficina. Si no la hay, el apartado va solo con texto.

### 02 — Qué hacemos

> Desarrollamos y mantenemos el software que una empresa utiliza para operar. Nuestro trabajo se concentra en cinco áreas:

| Área | Descripción |
|---|---|
| **Sistemas de gestión internos** | Plataformas que centralizan la operación de una empresa: proyectos, órdenes, activos y documentación. Sustituyen hojas de cálculo y herramientas desconectadas. |
| **Integración** | Conexión entre ERP, oficina técnica (CAD, BIM), maquinaria y sistemas de terceros. |
| **Datos e indicadores** | Cuadros de mando e informes sobre los datos de operación. |
| **Análisis e IA aplicada** | Modelos sobre datos de equipos y documentación: mantenimiento predictivo, optimización de parámetros de operación, extracción de datos de documentos. |
| **Infraestructura y mantenimiento** | Despliegue, monitorización y evolución continua de los sistemas que desarrollamos. |

### 03 — Sectores

| Sector | A quién | Qué hacemos |
|---|---|---|
| **Construcción** | Constructoras, promotoras, construcción industrializada | Gestión de proyectos y obra: mediciones y certificaciones, control de costes, documentación y versiones de planos. Análisis de licitaciones públicas. En construcción industrializada, sistemas que conectan el modelo BIM con la fabricación. |
| **Ingeniería** | Ingenierías, oficinas técnicas, consultoras técnicas | Gestión documental y de versiones de proyectos, automatización de cálculos y entregables, integración con CAD y BIM. Herramientas internas que sustituyen a hojas de cálculo compartidas y a procesos manuales de revisión. |
| **Fabricación** | Fabricantes, talleres, plantas de producción | Órdenes de fabricación, trazabilidad de piezas y lotes, control de producción e indicadores. Integración con máquinas (CNC, PLC) y con el ERP existente. |
| **Maquinaria y activos** | Fabricantes de maquinaria, mantenedores, gestores de flotas | Gestión de mantenimiento, reparaciones y componentes; datos de sensores y de operación; modelos de mantenimiento predictivo y de optimización de parámetros. |

### 04 — Cómo trabajamos

> Trabajamos integrados en la organización del cliente. Un proyecto empieza con un análisis de la operación sobre el terreno. A partir de ahí se define el sistema y se desarrolla de forma iterativa, con entregas periódicas. Una vez en producción, nos ocupamos de su mantenimiento y de su evolución.

| Fase | |
|---|---|
| **Análisis** | Procesos, datos y sistemas existentes. |
| **Desarrollo** | Iterativo, con entregas periódicas. |
| **Mantenimiento y evolución** | Soporte continuo del sistema en producción. |

### 05 — Trabajos

Fichas de proyecto: qué es el sistema, sector, alcance, integraciones. Sin adjetivos. El cliente se nombra solo si se puede.

**Plataforma BIM-a-fabricación**
Sistema de gestión de la fabricación industrializada de edificios. A partir del modelo BIM genera las órdenes de fabricación, gestiona la logística de los elementos y automatiza la maquinaria de planta. Incluye el tratamiento de la geometría 3D de los elementos.
Sector: Construcción industrializada · Alcance: Sistema completo · Integraciones: BIM, maquinaria de planta · Cliente: `[pendiente]`

**Gestión de reparación de componentes**
Sistema que gestiona el ciclo de reparación de componentes entre los clientes, los talleres regionales y la logística: recepción, diagnóstico, reparación, envío y trazabilidad de cada componente a lo largo del proceso.
Sector: Maquinaria y activos · Alcance: CRM a medida · Integraciones: Logística · Cliente: `[pendiente]`

**Análisis de licitaciones públicas**
Herramienta que extrae y estructura los datos de licitaciones públicas anteriores (importes, adjudicatarios, condiciones) a partir de la documentación original, para el análisis de nuevas oportunidades.
Sector: Construcción · Contratación pública · Alcance: Herramienta de análisis · Integraciones: Documentación, OCR · Cliente: `[pendiente]`

Fuera de la web: trading cuantitativo y agentes conversacionales (fuera de foco); optimización de perforación y mantenimiento predictivo de turbinas (privativos; descritos como capacidad en 02).

### 06 — Contacto

- team@bracedeng.com
- Para una primera conversación se puede reservar un hueco directamente en la agenda. *(enlace actual de Google Calendar)*
- Clientes: console.bracedeng.com

### Pie

© 2026 Braced Engineering · Aviso legal · Privacidad · Cookies

## 4. Traducción EN

Se hace al implementar, apartado por apartado, manteniendo el mismo registro descriptivo. Un punto de atención: "ingeniería" como sector se traduce como *engineering firms / technical offices*, no como *engineering* a secas, para que no se confunda con la actividad de Braced.

## 5. Estilo visual (referencia para la implementación)

Base **Fundición** con toques de **Alta Visibilidad**, aplicado con contención: el tono descriptivo manda y el estilo acompaña.

| Elemento | Decisión |
|---|---|
| Fondo | Oscuro cálido (#141110) con un segundo tono para bloques (#1a1614) |
| Texto | Crema (#ece5dc); secundario (#b8b0a6); atenuado (#7d766d) |
| Acento | Naranja brasa (#ff6a00) en sólido para índice activo, marcas y enlaces; gradiente ámbar→rojo solo en la llave del logotipo |
| Titulares | Space Grotesk 600/700 |
| Texto corrido | IBM Plex Sans 400/500 |
| Etiquetas, numerales del índice, pie | Barlow Condensed 600/700, mayúsculas |
| Elementos de Alta Visibilidad | Una franja naranja/negro sobre el pie; paneles de borde grueso en Sectores; numerales del índice. Nada más. |
| Logotipo | La llave `{` en gradiente brasa; se mantiene como única continuidad con la web actual |
| Movimiento | Ninguno más allá de transiciones suaves; sin partículas, sin fundidos entre pantallas |

## 6. Qué desaparece respecto a la web actual

- Navegación por pantallas completas con fundidos y rueda capturada; canvas de partículas; orbes.
- "Las empresas que ganan…", "Tu maquinaria ya es digital…", "20 minutos para ver si encajamos", botones con brillo.
- Tarjetas de beneficios y la duplicidad "Qué hacemos / Capacidades".
- Casos de trading cuantitativo y agentes conversacionales.
- Paleta cian/violeta y tipografía Inter.

## 7. Pendientes

- [ ] Texto real de "La empresa" (equipo, trayectoria, sede).
- [ ] Un trabajo propio del sector Ingeniería, si existe.
- [ ] Nombrar clientes en las fichas, si es posible.
- [ ] Capturas o diagramas de los sistemas (opcional en esta estructura).
- [ ] Confirmar que se mantiene el enlace de agenda en Contacto.
- [ ] Traducción EN.
- [x] `web-assets-prompts.md` actualizado a la paleta, la tipografía y el tono actuales.
