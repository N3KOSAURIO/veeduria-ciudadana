const FLUJOS = {
  "01": {
    triggers: [
      "obra", "construcción", "construccion", "hueco", "calle", "construyendo",
      "arreglando", "pavimento", "edificando", "excavación", "excavacion",
      "zanja", "andamio", "maquinaria"
    ],
    respuesta: `Según la **Ley 80 de 1993 (Art. 66)**, toda obra pública debe garantizar participación comunitaria. Esto significa que:

🔍 **Lo que podés verificar ahora mismo:**
1. ¿Hay un **aviso visible** con el nombre de la entidad, el contratista, el valor y el plazo?
2. ¿La obra aparece en **SECOP**? (https://www.contratos.gov.co)
3. ¿Tiene **interventor o supervisor** designado?
4. ¿Las **pólizas** están vigentes?

⚠️ Si falta cualquiera de estos requisitos, puede haber irregularidades.`,
    jurisprudencia: "C-292/03 (Corte Constitucional — transparencia en la contratación pública, interés general sobre el particular)",
    derivacion: "¿Querés que un consultor especializado revise esta obra? Tenemos profesionales que pueden verificar la legalidad del contrato, las pólizas y el cumplimiento normativo."
  },
  "02": {
    triggers: [
      "no tiene aviso", "sin aviso", "no hay letrero", "no dice nada",
      "no se sabe", "sin información", "sin informacion", "no identificado",
      "anonimo", "anónimo", "quién construye", "quien construye", "no está publicado", "no esta publicado"
    ],
    respuesta: `🚨 **La falta de aviso visible ya es una irregularidad.** La Ley 80/1993 exige transparencia total en la contratación pública.

📌 **Esto es lo que podés hacer:**
1. **Tomá fotos** de la obra (ubicación, fecha, lo que se ve)
2. **Solicitá información** por derecho de petición a la alcaldía local (Ley 1712/2014, Art. 13 — deben responder en 10 días)
3. **Buscá en SECOP** con la dirección o el sector: https://www.contratos.gov.co
4. Si la obra NO aparece en SECOP → **irregularidad GRAVE**

⚖️ La Corte Constitucional (T-596/02) dice que **no necesitás estar inscrito como veedor** para ejercer control social.`,
    jurisprudencia: "T-596/02 (Corte Constitucional — la veeduría no requiere inscripción formal; todo ciudadano puede ejercer control social)",
    derivacion: "¿Querés que un consultor te ayude a presentar el derecho de petición? Te asistimos en la redacción y hacemos seguimiento hasta obtener respuesta."
  },
  "03": {
    triggers: [
      "alcaldía", "alcaldia", "municipio", "normas", "normograma",
      "qué leyes", "que leyes", "rigen", "aplican", "entidad", "gobernación",
      "gobernacion", "normatividad", "regulación", "regulacion"
    ],
    respuesta: `📚 Las alcaldías en Colombia se rigen por múltiples normas. Las **más relevantes para veeduría ciudadana** son:

| Norma | ¿Qué regula? |
|-------|-------------|
| **Ley 80/1993** | Contratación estatal — Art. 66: participación comunitaria obligatoria |
| **Ley 850/2003** | Veedurías ciudadanas — cómo formarlas y qué pueden vigilar |
| **Ley 1712/2014** | Transparencia — toda información pública debe ser accesible |
| **Ley 1474/2011** | Estatuto Anticorrupción — plan anticorrupción obligatorio |
| **Ley 1757/2015** | Control social — derecho y deber de vigilar la gestión pública |

🔍 **Cada alcaldía tiene su propio normograma** (conjunto de normas que la rigen). Podés consultarlo en la página web de tu municipio o solicitarlo por derecho de petición.`,
    jurisprudencia: "C-274/13 (Corte Constitucional — no es necesario justificar la solicitud de información pública); T-595/02 (derecho de petición como derecho fundamental de aplicación inmediata)",
    derivacion: "¿Necesitás que un consultor analice el normograma de tu municipio y te diga exactamente qué podés vigilar? Hacemos el análisis completo y te entregamos una guía personalizada."
  },
  "04": {
    triggers: [
      "soy ciudadano", "derechos", "puedo denunciar", "cómo vigilar", "como vigilar",
      "participación", "participacion", "qué puedo hacer", "que puedo hacer",
      "quiero denunciar", "irregularidad", "corrupción", "corrupcion"
    ],
    respuesta: `Como ciudadano colombiano tenés **derechos constitucionales y legales** para vigilar la gestión pública:

✅ **Derecho de petición** (Art. 23 CP + Ley 1712/2014): solicitá cualquier información pública — deben responder en **10 días hábiles**

✅ **Formar una veeduría ciudadana** (Ley 850/2003): reunite con otros ciudadanos, inscribila en la Personería, y vigilá contratos, obras, programas

✅ **Acceder a SECOP** (https://www.contratos.gov.co): todos los contratos públicos son públicos — sin necesidad de registro

✅ **Denunciar irregularidades** ante:
- **Contraloría** → si hay daño patrimonial (plata perdida)
- **Procuraduría** → si un funcionario incumple sus deberes
- **Fiscalía** → si hay delito (peculado, prevaricato)

⚖️ La Corte Constitucional (T-596/02) dice claramente: **no necesitás estar inscrito como veedor** para ejercer control social.`,
    jurisprudencia: "T-596/02 (control social sin inscripción); SU-111/97 (procedencia de la tutela como mecanismo de protección de derechos fundamentales)",
    derivacion: "¿Querés que un consultor te guíe en tu primer caso? Te orientamos gratis en los primeros pasos y te conectamos con los organismos correctos."
  },
  "05": {
    triggers: [
      "soy estudiante", "universidad", "colegio", "educación", "educacion",
      "matrícula", "matricula", "profesor", "rector", "institución educativa",
      "institucion educativa", "escuela"
    ],
    respuesta: `Como estudiante tenés **derecho a participar en la vigilancia** de tu institución educativa, especialmente si recibe recursos públicos:

🔍 **Podés vigilar:**
- Ejecución del presupuesto educativo
- Contratos de alimentación escolar (PAE), infraestructura, transporte
- Calidad y oportunidad de los servicios educativos
- Cumplimiento de planes de mejoramiento

📌 **Herramientas que podés usar:**
1. **Derecho de petición** a la Secretaría de Educación
2. **Veeduría estudiantil** — podés formarla con compañeros (Ley 850/2003)
3. **Personería municipal** — recibí asesoría gratuita para tu denuncia
4. **Procuraduría** — si hay falta disciplinaria de directivos o funcionarios`,
    jurisprudencia: "T-595/02 (Corte Constitucional — derecho de petición como herramienta de control ciudadano en el ámbito educativo)",
    derivacion: "¿Querés que te ayudemos a formar una veeduría estudiantil? Te damos el paso a paso y los formatos listos para inscribir."
  },
  "06": {
    triggers: [
      "paciente", "salud", "hospital", "eps", "medicamento", "tratamiento",
      "vulnerable", "discapacidad", "adulto mayor", "enfermedad", "cirugía",
      "cirugia", "consulta"
    ],
    respuesta: `Como paciente en Colombia, la salud es un **derecho fundamental autónomo** (Sentencia T-760/08 de la Corte Constitucional). Esto significa:

🛡️ **Tus derechos:**
- Acceso oportuno a servicios de salud
- Información clara sobre tu diagnóstico y tratamiento
- Consentimiento informado (nadie puede hacerte un procedimiento sin explicártelo)
- Segunda opinión médica
- Protección reforzada si sos menor, adulto mayor, persona con discapacidad o víctima

📌 **Si tu EPS o el sistema te están fallando:**
1. **Tutela** — es GRATIS, no necesitás abogado, la resuelven en 10 días
2. **Queja ante la Superintendencia de Salud** — por mala calidad del servicio
3. **Denuncia a la Procuraduría** — si un funcionario de salud incumple sus deberes`,
    jurisprudencia: "T-760/08 (Corte Constitucional — la salud es un derecho fundamental autónomo, exigible por tutela)",
    derivacion: "¿Necesitás ayuda para presentar una tutela por salud? Te asistimos con el formato y te guiamos en el proceso. Es tu derecho."
  },
  "08": {
    triggers: [
      "contrato", "contratación", "contratacion", "auditar", "fiscalizar",
      "pliegos", "adjudicación", "adjudicacion", "contratista", "licitación",
      "licitacion", "concurso", "proponente"
    ],
    respuesta: `Auditar un contrato público es tu derecho. La **Contraloría General** estructura sus auditorías en 8 pasos. Acá te los simplificamos:

📋 **Checklist ciudadano de 8 pasos:**

| # | Paso | Acción |
|---|------|--------|
| 1 | ❓ ¿El contrato está en SECOP? | Buscalo en https://www.contratos.gov.co |
| 2 | 📄 ¿Los pliegos fueron públicos? | Revisá los documentos del proceso |
| 3 | 🏢 ¿El contratista tiene RUP vigente? | Verificá en el Registro Único de Proponentes |
| 4 | 📊 ¿El valor es razonable? | Compará con obras similares en la región |
| 5 | 📅 ¿Se cumplen los plazos? | Revisá informes de avance en SECOP |
| 6 | 💰 ¿Los pagos cuadran con el avance? | Contrastá informes financieros vs. físico |
| 7 | 🛡️ ¿Las pólizas están vigentes? | Verificá garantías en SECOP |
| 8 | ✅ ¿El contrato fue liquidado? | Revisá el acta de liquidación |

⚠️ Si falla cualquiera de estos 8 puntos, hay hallazgos que reportar.`,
    jurisprudencia: "C-292/03 (Corte Constitucional — la contratación pública debe regirse por los principios de transparencia, economía y responsabilidad)",
    derivacion: "¿Querés que un consultor haga esta auditoría por vos? Revisamos el contrato completo, generamos el informe ejecutivo (2 páginas) y el detallado, y te decimos exactamente dónde denunciar."
  },
  "09": {
    triggers: [
      "riesgo", "riesgos", "mapa", "alerta", "peligro", "sobrecosto",
      "retraso", "demanda", "problema", "incumplimiento", "falla"
    ],
    respuesta: `Los entes de control colombianos clasifican los riesgos en **8 dimensiones**. Al analizar un contrato u obra pública, se evalúan todas:

| # | Dimensión | ¿Qué buscar? | Alerta si... |
|---|-----------|-------------|--------------|
| 1 | **Físicos** | Materiales, ubicación, clima | Materiales de menor calidad que la especificada |
| 2 | **Administrativos** | Procesos, permisos, supervisión | No hay interventor designado |
| 3 | **Económicos** | Presupuesto, sobrecostos | El valor final supera 20% del inicial |
| 4 | **Sociales** | Comunidad, desplazamientos, afectaciones | Vecinos no fueron informados |
| 5 | **Financieros** | Pagos, flujo de caja, pólizas | Pagos adelantados sin avance real |
| 6 | **Contables** | Registros, facturación, soportes | Facturas sin soporte de ejecución |
| 7 | **Operativos** | Ejecución, maquinaria, personal | Personal sin certificaciones requeridas |
| 8 | **Laborales** | Contratación, seguridad social, ARL | Trabajadores sin afiliación a seguridad social |`,
    jurisprudencia: "T-595/02 (Corte Constitucional — el derecho de petición permite acceder a información sobre riesgos en la gestión pública)",
    derivacion: "¿Querés que un consultor haga el mapa de riesgos completo de tu caso? Analizamos las 8 dimensiones y te entregamos un informe con las alertas detectadas y las entidades donde denunciar cada una."
  },
  "10": {
    triggers: [
      "denunciar", "denuncia", "cómo reportar", "como reportar",
      "quiero denunciar", "demandar", "quejarme", "reportar",
      "a dónde voy", "a donde voy", "qué hago", "que hago"
    ],
    respuesta: `Depende del TIPO de irregularidad. Acá te orientamos:

| Si encontraste... | Denunciá ante... | ¿Qué hacen? |
|-------------------|------------------|-------------|
| 💸 **Plata perdida o mal gastada** (detrimento patrimonial) | **Contraloría** (Control Fiscal) | Investigan y recuperan el dinero |
| 📋 **Funcionario que incumple sus deberes** | **Procuraduría** / **Personería** | Abren proceso disciplinario → destitución |
| 🔴 **Delito** (peculado, prevaricato, cohecho) | **Fiscalía** | Investigan penalmente → cárcel |
| 📄 **No te entregan información pública** | **Tutela** (juez) | Ordenan entregar la información en 48h |
| 🏗️ **Obra que afecta a la comunidad** | **Acción popular** (juez) | Protegen derechos colectivos |

📝 **En todos los casos necesitás:**
- Datos concretos (fechas, nombres, lugares, valores)
- Evidencias (fotos, videos, documentos, testimonios)
- Relato claro de los hechos`,
    jurisprudencia: "SU-111/97 (Corte Constitucional — requisitos de procedencia de la tutela y mecanismos judiciales de protección de derechos)",
    derivacion: "¿Querés que un consultor prepare tu denuncia? Redactamos el documento, lo radicamos en la entidad correcta y hacemos seguimiento."
  },
  "11": {
    triggers: [
      "derecho de petición", "derecho de peticion", "solicitar información",
      "solicitar informacion", "pedir datos", "no me responden",
      "requiero información", "requiero informacion", "cómo pido", "como pido"
    ],
    respuesta: `El **derecho de petición** es tu herramienta más poderosa como ciudadano. Es GRATIS, no necesitás abogado, y está en la Constitución (Art. 23).

📝 **Pasos para hacerlo:**
1. Escribí un documento corto con:
   - Tus datos (nombre, cédula, dirección, teléfono, correo)
   - Lo que solicitás (sé específico: \"copia del contrato X\", \"informe de avance de la obra Y\")
   - Razón (no es obligatorio, pero ayuda: \"para ejercer control social como ciudadano\")
2. Radicalo en la entidad (presencial o por correo electrónico)
3. **Guardá la constancia de radicación** (sin esto, no hay prueba)
4. Tienen **10 días hábiles** para responder (prorrogables por 5 más)

⚠️ **Si no responden en 10 días:**
- Están violando la Ley 1712/2014 y tu derecho fundamental
- Podés presentar una **tutela** (la resuelven en 10 días)
- La Procuraduría puede abrir proceso disciplinario al funcionario`,
    jurisprudencia: "T-595/02 (derecho de petición como derecho fundamental); C-274/13 (no se requiere justificar la razón de la solicitud de información pública)",
    derivacion: "¿Querés que redactemos y radiquemos el derecho de petición por vos? Nos encargamos de todo: redacción, radicación y seguimiento hasta obtener respuesta."
  },
  "12": {
    triggers: [
      "transparencia", "información pública", "informacion publica",
      "datos abiertos", "no publican", "ocultan", "secreto", "me niegan",
      "no quieren dar", "no aparece"
    ],
    respuesta: `🚨 Negar información pública sin justificación legal es **violación de la Ley 1712/2014** y de tu derecho fundamental de acceso a la información.

📌 **Recordá:**
- **Toda** información en poder del Estado es PÚBLICA (Art. 2, Ley 1712)
- El secreto es la **excepción**, no la regla
- No necesitás justificar por qué la pedís (Sentencia C-274/13)
- Si ya está publicada, deben decirte **exactamente dónde** (URL, enlace)

⚡ **Acciones inmediatas:**
1. **Derecho de petición** — solicitá la información por escrito y guardá constancia
2. Si no responden en 10 días → **Tutela** (gratis, sin abogado)
3. **Queja ante la Procuraduría** — el funcionario que niega información sin justa causa comete falta disciplinaria`,
    jurisprudencia: "C-274/13 (Corte Constitucional — el acceso a la información pública no requiere motivación del solicitante; el secreto es la excepción)",
    derivacion: "¿Querés que un consultor fuerce la entrega de esa información? Presentamos el derecho de petición, y si no responden, la tutela. No pagás hasta obtener resultados."
  },
  "13": {
    triggers: [
      "veeduría", "veeduria", "formar veeduría", "crear veeduría", "cómo vigilar",
      "como vigilar", "grupo de vigilancia", "control ciudadano", "comité de control",
      "comite de control", "ser veedor", "quiero ser veedor", "inscribir veeduría",
      "inscribir veeduria", "personería", "personeria"
    ],
    respuesta: `Formar una veeduría ciudadana es tu derecho. La **Ley 850 de 2003** la define como un mecanismo democrático para vigilar la gestión pública. No necesitás ser abogado ni funcionario.

📝 **Requisitos para crear una veeduría:**

1. **Mínimo 2 personas** (ciudadanos colombianos u organizaciones comunitarias)
2. Elegir un **objeto específico** de vigilancia (un contrato, una obra, un programa, un servicio)
3. Redactar un **acta de constitución** con: nombre de la veeduría, integrantes, objeto a vigilar, duración
4. **Inscribirla** ante la Personería Municipal o la Cámara de Comercio (según la entidad a vigilar)
5. La inscripción es GRATIS

🛡️ **¿Qué pueden vigilar las veedurías?**
- Contratos y obras públicas
- Programas y proyectos con recursos públicos
- Servicios públicos (salud, educación, agua, transporte)
- Procesos de contratación en SECOP
- Ejecución presupuestal de cualquier entidad pública

⚖️ La Corte Constitucional (T-596/02) aclaró: **no necesitás estar inscrito como veedor** para ejercer control social. Pero tener la veeduría formalizada te da acceso a más información y protección legal.

📌 **Derechos de los veedores:**
- Acceder a documentos y contratos (sin restricción)
- Solicitar informes a la entidad vigilada
- Recibir respuesta en 10 días hábiles
- Presentar denuncias ante Contraloría, Procuraduría y Fiscalía
- Protección especial contra represalias`,
    jurisprudencia: "T-596/02 (Corte Constitucional — la veeduría ciudadana no requiere inscripción formal para ejercer control social; es un derecho de todo ciudadano)",
    derivacion: "¿Querés que un consultor te acompañe a crear tu veeduría? Te damos el acta de constitución lista, te orientamos con la inscripción en la Personería y te guiamos en tu primer caso."
  },
  "14": {
    triggers: [
      "servicios públicos", "servicios publicos", "agua", "luz", "energía", "energia",
      "gas", "alcantarillado", "acueducto", "basura", "aseo", "recibo", "factura",
      "cobro excesivo", "tarifa", "corte de servicio", "no tengo agua", "no tengo luz",
      "epm", "empresa de servicios", "servicio público", "servicio publico"
    ],
    respuesta: `Los servicios públicos en Colombia son un **derecho fundamental por conexidad** (cuando su falta afecta la vida, la salud o la dignidad). La Ley 142 de 1994 regula todos los servicios públicos domiciliarios.

⚡ **Tus derechos como usuario:**

1. **Continuidad**: el servicio no puede suspenderse si afecta tu salud o la de personas vulnerables (niños, ancianos, enfermos)
2. **Información clara**: las empresas deben explicar cada cobro en tu factura
3. **Reclamo directo**: podés presentar PQR (Petición, Queja, Reclamo) ante la empresa — deben responder en 15 días hábiles
4. **Doble instancia**: si la empresa no responde, podés apelar ante la **Superintendencia de Servicios Públicos**

📌 **Si tu servicio está fallando:**

1. **Documentá**: guardá facturas, fotos, fechas de interrupciones
2. **Presentá PQR** por escrito a la empresa (con copia, radicado)
3. Si no responden en 15 días → **queja ante la Superintendencia de Servicios Públicos**
4. Si hay afectación a la salud → **Tutela** (gratis, sin abogado)

⚠️ **Situaciones que podés denunciar:**
- Cobros excesivos o no justificados
- Cortes sin aviso previo
- Mala calidad del agua
- Falta de mantenimiento en redes públicas
- Contratos de prestación sin participación ciudadana`,
    jurisprudencia: "T-760/08 (Corte Constitucional — los servicios públicos son derechos fundamentales por conexidad cuando su falta afecta la salud, la vida o la dignidad humana)",
    derivacion: "¿Querés que un consultor revise tu caso con la empresa de servicios? Te ayudamos a redactar el PQR, hacer seguimiento y, si no responden, escalar a la Superintendencia o a tutela."
  },
  "15": {
    triggers: [
      "contaminación", "contaminacion", "río", "rio", "basura", "desechos",
      "tala", "árboles", "arboles", "deforestación", "deforestacion", "minería",
      "mineria", "aire", "humo", "vertedero", "escombro", "escombros",
      "ambiente", "medio ambiente", "ecología", "ecologia", "residuo", "tóxico", "toxico",
      "químico", "quimico", "derrame", "licencia ambiental", "animales"
    ],
    respuesta: `El medio ambiente en Colombia es un **derecho colectivo protegido constitucionalmente** (Art. 79 y 80 de la Constitución). Toda persona tiene derecho a gozar de un ambiente sano.

🌿 **Mecanismos de protección ambiental que podés activar:**

| Mecanismo | ¿Cuándo usarlo? | ¿Ante quién? |
|-----------|-----------------|--------------|
| **Acción popular** | Daño al medio ambiente que afecta a la comunidad | Juez administrativo |
| **Denuncia penal** | Delito ambiental (tala ilegal, minería ilegal, contaminación grave) | Fiscalía |
| **Queja administrativa** | Incumplimiento de licencia ambiental | **Corporación Autónoma Regional (CAR)** o **ANLA** |
| **Derecho de petición** | Solicitar información sobre licencias, permisos, planes de manejo | Entidad que otorgó la licencia |

📌 **¿Qué necesitás para denunciar?**

1. **Evidencia**: fotos, videos, ubicación exacta, fechas
2. **Identificar al responsable** (empresa, persona, entidad)
3. **Consultar si tiene licencia ambiental** (derecho de petición a la CAR)
4. Si no tiene licencia → irregularidad GRAVE

⚖️ **Leyes clave:**
- **Ley 99/1993** — Sistema Nacional Ambiental y CAR
- **Ley 1333/2009** — Procedimiento sancionatorio ambiental
- **Código Penal, Art. 328-339** — Delitos ambientales (hasta 12 años de cárcel)
- **Decreto 1076/2015** — Licencias ambientales y planes de manejo`,
    jurisprudencia: "C-292/03 (Corte Constitucional — el interés general prima sobre el particular; el medio ambiente es un derecho colectivo de protección prevalente)",
    derivacion: "¿Querés que un consultor ambiental revise tu caso? Analizamos si hay violación de licencias, preparamos la denuncia ante la CAR o la Fiscalía y hacemos seguimiento."
  },
  "16": {
    triggers: [
      "tutela", "acción de tutela", "accion de tutela", "interponer tutela",
      "presentar tutela", "cómo hacer una tutela", "como hacer una tutela",
      "formato de tutela", "modelo de tutela", "tutelar", "derecho fundamental",
      "juez de tutela", "fallo de tutela", "impugnar tutela", "amparo",
      "vulneración de derechos", "vulneracion de derechos"
    ],
    respuesta: `⚖️ **Tutela: Guía completa paso a paso**

La acción de tutela está consagrada en el **Artículo 86 de la Constitución Política** y reglamentada por el **Decreto 2591 de 1991**. Es GRATIS, no necesitás abogado, y cualquier persona puede presentarla.

---

## 📋 **Test de procedencia — 7 criterios que DEBÉS verificar:**

Responde SÍ o NO a cada uno. Si respondés SÍ a TODOS, tu tutela es procedente:

| # | Criterio | ¿Se cumple? |
|---|----------|-------------|
| **1** | **Legitimación por activa**: ¿Sos vos el afectado directo o actuás como agente oficioso de alguien que no puede defenderse? | |
| **2** | **Legitimación por pasiva**: ¿La entidad o persona contra quien va la tutela es una autoridad pública o un particular que presta un servicio público? | |
| **3** | **Derecho fundamental violado**: ¿Está en juego un derecho fundamental (vida, salud, dignidad, debido proceso, petición, información, igualdad, educación)? | |
| **4** | **Inmediatez**: ¿Ocurrió hace menos de 6 meses? (Si pasó más tiempo, debés justificar por qué no actuaste antes) | |
| **5** | **Subsidiariedad**: ¿NO existe otro mecanismo judicial para proteger tu derecho, o la tutela es necesaria como mecanismo transitorio para evitar un perjuicio irremediable? | |
| **6** | **Vulneración real**: ¿Hay una acción u omisión concreta que está violando o amenazando tu derecho? | |
| **7** | **No es contra fallos judiciales (salvo vía de hecho)**: ¿La tutela NO es contra una sentencia judicial (excepto que sea una "vía de hecho" — error grosero y evidente del juez)? | |

> ⚠️ **Si respondiste SÍ a los 7 criterios, tu tutela es PROCEDENTE.**

---

## ⏱️ **Plazos (Decreto 2591/91):**

| Etapa | Plazo |
|-------|-------|
| Recepción y reparto | Mismo día (el juez debe recibirla de inmediato) |
| **Fallo de primera instancia** | **10 días hábiles** desde la radicación |
| Impugnación (si alguna parte apela) | Dentro de los 3 días siguientes al fallo |
| **Fallo de segunda instancia** | **20 días hábiles** desde que llega al superior |
| Revisión eventual por la Corte Constitucional | Hasta 3 meses después del fallo |
| **Cumplimiento del fallo** | **48 horas** desde la notificación (si el juez no fija otro plazo) |
| Incidente de desacato (si no cumplen) | El juez puede sancionar con arresto y multa |

---

## 📝 **Formato de tutela — lo que DEBE contener:**

\`\`\`
1. DATOS DEL ACCIONANTE
   - Nombre completo
   - Cédula de ciudadanía
   - Dirección (donde recibirás notificaciones)
   - Teléfono y correo electrónico

2. ENTIDAD O PERSONA ACCIONADA
   - Nombre de la entidad o persona
   - Dirección (si la conocés)
   - Cargo del funcionario (si es autoridad pública)

3. DERECHO(S) FUNDAMENTALES VIOLADOS
   - Enumerá claramente cada derecho (ej.: salud, vida, dignidad)

4. HECHOS (narración cronológica)
   - Fecha de cada hecho
   - Qué pasó, quién, dónde, cómo
   - Adjuntá PRUEBAS (documentos, fotos, correos, constancias)

5. PRETENSIONES (lo que pedís al juez)
   - Qué ordenás concretamente (ej.: "ordenar a la EPS que autorice el medicamento X en 48 horas")

6. MEDIDA PROVISIONAL (opcional pero recomendado)
   - Si el peligro es inminente, pedí que el juez ordene algo mientras decide
   - Ej.: "Solicito medida provisional para que se me practique la cirugía de inmediato"

7. JURAMENTO
   - "Bajo la gravedad de juramento manifiesto que no he interpuesto otra acción de tutela por los mismos hechos"

8. FIRMA Y FECHA

9. ANEXOS (pruebas documentales)
\`\`\`

---

## 🔑 **Tips prácticos:**

- **No necesitás abogado.** La tutela la puede presentar cualquier persona, incluso escrita a mano.
- **Radicala en cualquier juzgado** (civil, penal, laboral, etc.). Todos los jueces son competentes para recibir tutelas.
- **Podés presentarla por correo electrónico** del juzgado (hoy casi todos lo aceptan).
- **Guardá copia con sello de radicación** — es tu constancia.
- **Si el juez la rechaza por improcedente**, tenés 3 días para impugnar.
- **Si no cumplen el fallo**, pedí inmediatamente apertura de **incidente de desacato**. El juez puede imponer arresto (hasta 6 meses) y multa (hasta 20 salarios mínimos).

⚖️ **Jurisprudencia clave:** SU-111/97 (requisitos de procedencia), T-760/08 (salud como derecho fundamental tutelable), Decreto 2591/1991.`,

    jurisprudencia: "SU-111/97 (Corte Constitucional — requisitos de procedencia de la acción de tutela); T-760/08 (salud como derecho fundamental autónomo y tutelable); Decreto 2591/1991 (reglamentación de la tutela)",

    derivacion: "¿Querés que un consultor revise tu caso y te confirme si la tutela es procedente? Hacemos el test de los 7 criterios sin costo, te ayudamos con el formato y te orientamos en la radicación."
  },
  "17": {
    triggers: [
      "acción popular", "accion popular", "derechos colectivos", "interés colectivo",
      "interes colectivo", "medio ambiente", "espacio público", "espacio publico",
      "moralidad administrativa", "patrimonio público", "patrimonio publico",
      "afea a la comunidad", "daño colectivo", "daño masivo", "todos afectados",
      "comunidad afectada", "acción de grupo", "accion de grupo"
    ],
    respuesta: `🏛️ **Acción Popular: Guía completa**

La acción popular está en el **Artículo 88 de la Constitución** y la **Ley 472 de 1998**. Es una herramienta para proteger **derechos e intereses colectivos**, no individuales. Es GRATIS y no necesitás abogado (aunque es recomendable).

---

## ✅ **Legitimación — ¿Quién puede presentar una acción popular?**

| Sujeto | ¿Puede? | Detalle |
|--------|---------|---------|
| **Cualquier persona natural** | ✅ SÍ | Sin necesidad de acreditar interés directo — basta ser ciudadano |
| **Persona jurídica (ONG, asociación, sindicato)** | ✅ SÍ | Debe estar legalmente constituida y su objeto social debe incluir la protección del derecho colectivo |
| **Procuraduría General de la Nación** | ✅ SÍ | Por oficio o por solicitud ciudadana |
| **Defensoría del Pueblo** | ✅ SÍ | En defensa de derechos colectivos |
| **Personerías municipales** | ✅ SÍ | En el ámbito del municipio |
| **Entidades públicas (Contraloría, CAR, etc.)** | ✅ SÍ | En el marco de sus funciones de control |

---

## 🎯 **Contra quién se dirige:**

La acción popular se presenta **contra el particular o la entidad pública** cuya acción u omisión amenaza o viola derechos colectivos:

- ✅ **Entidades públicas**: alcaldías, gobernaciones, ministerios, CAR, empresas de servicios públicos
- ✅ **Particulares**: constructoras, industrias, comercios, propietarios
- ✅ **Ambos**: cuando la violación es conjunta (ej.: alcaldía que autoriza + particular que contamina)

---

## 📋 **Derechos e intereses colectivos protegidos (Art. 4, Ley 472/98):**

| # | Derecho colectivo |
|---|-------------------|
| 1 | Goce de un **ambiente sano** |
| 2 | **Moralidad administrativa** |
| 3 | Existencia del **equilibrio ecológico** |
| 4 | Goce del **espacio público** |
| 5 | **Patrimonio público** |
| 6 | **Patrimonio cultural e histórico** |
| 7 | **Seguridad y salubridad públicas** |
| 8 | Acceso a una **infraestructura de servicios** eficiente |
| 9 | Libre **competencia económica** |
| 10 | **Servicios públicos** eficientes y oportunos |
| 11 | **Derechos de los consumidores** y usuarios |

---

## 📝 **Ejemplos típicos de acciones populares:**

| Caso | Derecho colectivo violado | Contra quién |
|------|--------------------------|--------------|
| Vertimiento de aguas residuales a un río | Ambiente sano / Equilibrio ecológico | Empresa contaminante + CAR que no controla |
| Obra pública que ocupa andenes sin licencia | Espacio público | Alcaldía que autorizó + contratista |
| Hospital sin condiciones sanitarias básicas | Seguridad y salubridad pública | EPS / Secretaría de Salud |
| Sobreprecios en contratos de alimentación escolar | Moralidad administrativa / Patrimonio público | Alcaldía + contratista |
| Cobros excesivos no justificados en servicios públicos | Derechos de los consumidores | Empresa de servicios públicos |
| Construcción ilegal que privatiza una playa o parque | Espacio público | Constructor + entidad que lo permitió |
| Venta irregular de bienes públicos (lotes, inmuebles) | Patrimonio público | Alcaldía + comprador particular |

---

## ⏱️ **Plazos y proceso:**

| Etapa | Plazo |
|-------|-------|
| Presentación de la demanda | Cualquier momento (no prescribe mientras dure la amenaza o violación) |
| **Admisión de la demanda** | 3 días hábiles |
| Traslado al demandado | 10 días para contestar |
| **Audiencia de pacto de cumplimiento** | Dentro de los 30 días siguientes (se busca acuerdo conciliatorio) |
| Período probatorio | Hasta 20 días (prorrogables por 10 más) |
| **Sentencia de primera instancia** | 20 días después del vencimiento del período probatorio |
| Apelación | 3 días para presentarla |
| **Sentencia de segunda instancia** | 10 días siguientes |
| **Cumplimiento del fallo** | El juez fija plazo; si no cumplen → incidente de desacato |

---

## 💰 **Incentivo económico para el demandante:**

La Ley 472/98 (Art. 39-40) establece un **incentivo económico** para quien presenta la acción popular. El juez puede fijar una suma equivalente al **10% al 15% del valor de la condena** o de la recuperación del patrimonio, que se paga con los recursos del Fondo de Defensa de Intereses Colectivos.

---

## ⚡ **Medidas cautelares (urgentes):**

Al presentar la demanda, podés solicitar medidas cautelares inmediatas:
- Suspensión de la obra o actividad que causa el daño
- Decomiso de bienes o productos
- Cierre temporal del establecimiento
- Orden de no innovar (que las cosas sigan como están mientras se decide)

⚖️ **Jurisprudencia clave:** C-292/03 (interés general sobre el particular); Ley 472 de 1998; C-215/99 (procedencia de acciones populares).`,

    jurisprudencia: "C-292/03 (Corte Constitucional — el interés general prima sobre el particular en la contratación y gestión pública); Ley 472 de 1998 (acciones populares y de grupo); C-215/99 (procedencia de acciones populares contra particulares)",

    derivacion: "¿Querés que un consultor evalúe si tu caso amerita una acción popular? Analizamos la situación, identificamos el derecho colectivo violado, redactamos la demanda y te guiamos en todo el proceso."
  },
  "18": {
    triggers: [
      "procuraduría", "procuraduria", "contraloría", "contraloria", "fiscalía", "fiscalia",
      "denunciar funcionario", "proceso disciplinario", "falta disciplinaria",
      "detrimento patrimonial", "peculado", "prevaricato", "cohecho",
      "responsabilidad fiscal", "juicio fiscal", "juicio disciplinario",
      "destitución", "destitucion", "suspensión", "suspension", "inhabilitar",
      "sanción disciplinaria", "sancion disciplinaria", "órgano de control", "organo de control"
    ],
    respuesta: `⚖️ **Proceso Disciplinario y Fiscal: Guía completa para denunciar**

En Colombia existen tres grandes sistemas de control sobre los servidores públicos y quienes manejan recursos del Estado. Saber a cuál acudir es CLAVE:

---

## 🔺 **Mapa rápido: ¿Ante quién denunciar?**

| Si encontraste... | Denunciá ante... | Tipo de responsabilidad | Posible sanción |
|-------------------|------------------|------------------------|-----------------|
| 💸 **Plata perdida, mal gastada o robada** (detrimento patrimonial) | **CONTRALORÍA** | Responsabilidad FISCAL | Multa + reintegro del dinero + inhabilidad |
| 📋 **Funcionario que incumple sus deberes** (negligencia, abuso, falta ética) | **PROCURADURÍA** | Responsabilidad DISCIPLINARIA | Amonestación, suspensión, destitución, inhabilidad |
| 🔴 **Delito penal** (peculado, prevaricato, cohecho, concusión, celebración indebida de contratos) | **FISCALÍA** | Responsabilidad PENAL | Prisión (4 a 20+ años) + multa + inhabilidad |
| 🏛️ **Las tres anteriores a la vez** | **LAS TRES** (simultáneo) | Las tres responsabilidades son independientes | Acumulativas |

---

## 1️⃣ **PROCURADURÍA GENERAL DE LA NACIÓN — Proceso Disciplinario**

### 📌 ¿Qué investiga?
Cualquier falta disciplinaria de un servidor público: negligencia, abuso de poder, incumplimiento de deberes, violación del régimen de inhabilidades, acoso laboral, irregularidades en contratación (sin detrimento probado), omisión en la respuesta a derechos de petición, y en general cualquier conducta que afecte el buen servicio público.

### 📝 ¿Cómo denunciar?
1. **Escribí tu queja** con:
   - Tus datos completos (nombre, cédula, dirección, teléfono, correo)
   - Nombre y cargo del funcionario denunciado
   - Entidad donde trabaja
   - Hechos detallados (qué pasó, cuándo, dónde, cómo)
   - Pruebas (documentos, fotos, videos, correos, testimonios)
2. **Radicala** en la Procuraduría:
   - **Virtual**: https://www.procuraduria.gov.co → "Quejas y Denuncias"
   - **Presencial**: sede central (Bogotá) o Procuradurías Regionales/Provinciales
   - **Correo**: quejas@procuraduria.gov.co
3. **Guardá el número de radicado** (es tu constancia de seguimiento)

### ⏱️ **Tiempos del proceso disciplinario:**

| Etapa | Duración |
|-------|----------|
| Reparto y revisión inicial | 5-15 días hábiles |
| Indagación preliminar (determinar si hay mérito) | 6 meses |
| **Investigación disciplinaria** (formal) | **12 meses** |
| Pliego de cargos (acusación formal) | Dentro de la investigación |
| Descargos del investigado | 10 días hábiles |
| Período probatorio | Hasta 90 días |
| **Fallo de primera instancia** | Dentro de los 12 meses de investigación |
| Apelación | 5 días |
| **Fallo de segunda instancia** | Hasta 12 meses adicionales |

### ⚡ **Sanciones posibles:**
- Amonestación escrita
- Suspensión del cargo (30 días a 12 meses)
- Destitución del cargo
- Inhabilidad general (hasta 20 años para ejercer cargos públicos)

---

## 2️⃣ **CONTRALORÍA GENERAL DE LA REPÚBLICA — Proceso de Responsabilidad Fiscal**

### 📌 ¿Qué investiga?
DAÑO PATRIMONIAL al Estado = cuando por acción u omisión de un servidor público o particular que maneja recursos públicos, se causa una pérdida de dinero o bienes del Estado.

Ejemplos: sobrecostos en contratos, obras inconclusas, bienes públicos perdidos o robados, pagos por servicios no prestados, contratos sin el lleno de requisitos legales que generan pérdida económica.

### 📝 ¿Cómo denunciar?
1. **Prepará tu denuncia** con:
   - Identificación del contrato, obra o programa (número, entidad, contratista)
   - Monto del presunto detrimento (si lo conocés)
   - Hechos narrados cronológicamente
   - Pruebas documentales
2. **Radicala**:
   - **Virtual**: https://www.contraloria.gov.co → "Denuncias ciudadanas"
   - **Presencial**: Contralorías departamentales y municipales
   - **Línea gratuita**: 01-8000-910-678
3. **Seguimiento**: podés consultar el estado de tu denuncia en la página web

### ⏱️ **Tiempos del proceso fiscal:**

| Etapa | Duración |
|-------|----------|
| Reparto y evaluación inicial | 10-30 días hábiles |
| Indagación preliminar | 6 meses (prorrogables por 6 más) |
| **Proceso de responsabilidad fiscal** (formal) | **2 años** |
| Imputación de responsabilidad fiscal | Dentro del proceso |
| Descargos y pruebas | Hasta 30 días |
| **Fallo con o sin responsabilidad fiscal** | 2 años desde la apertura (prorrogable por 1 año más) |
| Recurso de reposición | 5 días |
| Recurso de apelación | 10 días |

### ⚡ **Consecuencias si hay responsabilidad fiscal:**
- **Reintegro del dinero** (devolver hasta el último peso)
- Multa adicional
- **Inhabilidad** para contratar con el Estado
- Reporte en el **Boletín de Responsables Fiscales** (visible públicamente)
- Si no paga → **jurisdicción coactiva** (embargo de bienes, cuentas bancarias)

---

## 3️⃣ **FISCALÍA GENERAL DE LA NACIÓN — Proceso Penal**

### 📌 ¿Qué investiga?
**Delitos** tipificados en el Código Penal cometidos por servidores públicos o contra la administración pública.

Principales delitos contra la administración pública:
- **Peculado** (Art. 397 CP): apropiarse de bienes públicos. Prisión: 8 a 22 años
- **Prevaricato** (Art. 413 CP): dictar resolución o fallo manifiestamente contrario a la ley. Prisión: 4 a 12 años
- **Cohecho** (Art. 405 CP): recibir dinero o dádivas por hacer u omitir un acto propio del cargo. Prisión: 6 a 15 años
- **Concusión** (Art. 404 CP): funcionario que obliga a pagar por un servicio que debe ser gratuito. Prisión: 6 a 12 años
- **Celebración indebida de contratos** (Art. 408 CP): violar el régimen de contratación. Prisión: 6 a 15 años
- **Interés indebido en la celebración de contratos** (Art. 409 CP). Prisión: 6 a 12 años
- **Tráfico de influencias** (Art. 411 CP). Prisión: 5 a 10 años
- **Enriquecimiento ilícito** (Art. 412 CP). Prisión: 8 a 15 años

### 📝 ¿Cómo denunciar?
1. **Escribí la denuncia penal** — debe incluir:
   - Relato detallado de los hechos (qué delito creés que se cometió)
   - Identificación del posible responsable
   - Pruebas (documentos, testimonios, grabaciones, fotos)
   - Tus datos (podés pedir reserva de identidad)
2. **Radicala**:
   - **Virtual**: https://www.fiscalia.gov.co → "Denuncia fácil"
   - **Presencial**: cualquier sede de la Fiscalía o URI (Unidad de Reacción Inmediata)
   - **Línea gratuita nacional**: 122
   - **Aplicación móvil**: "A Denunciar" (descargable en Play Store / App Store)
3. **Guardá el número de noticia criminal** (NUNC) para seguimiento

### ⏱️ **Tiempos del proceso penal:**

| Etapa | Duración |
|-------|----------|
| Noticia criminal y verificación inicial | 5-30 días |
| **Indagación preliminar** (recopilar evidencias) | Hasta 2 años (en casos complejos, hasta 5 años con autorización judicial) |
| Imputación de cargos (audiencia ante juez) | Al terminar la indagación |
| Escritura de acusación | 90 días desde la imputación |
| **Juicio oral** | Variable (meses, incluso más de 1 año) |
| Sentencia condenatoria o absolutoria | Al final del juicio |

---

## ⚠️ **Recomendaciones CRUCIALES para las tres denuncias:**

1. **LAS TRES SON INDEPENDIENTES** — podés y DEBÉS denunciar ante las tres al mismo tiempo si el caso lo amerita (ej.: un funcionario que robó plata = responsabilidad fiscal + disciplinaria + penal).

2. **PRUEBAS PRUEBAS PRUEBAS** — sin evidencia, no hay caso. Guardá TODO.

3. **NO TE LIMITÉS A UNA SOLA ENTIDAD** — muchos ciudadanos denuncian solo en la Fiscalía y no en la Contraloría, dejando la plata sin recuperar.

4. **HACÉ SEGUIMIENTO PERIÓDICO** — las entidades tienen portales de consulta. Si tu denuncia está estancada, insistí o pedí información por derecho de petición.

5. **PEDÍ COPIA DE TODO** — cada radicación, cada respuesta, cada notificación.

6. **PROTECCIÓN AL DENUNCIANTE** — si temés represalias, pedí expresamente reserva de identidad (está en la Ley 1712/2014 y el Estatuto Anticorrupción Ley 1474/2011).

⚖️ **Jurisprudencia clave:** C-292/03 (control fiscal y contratación); Ley 734 de 2002 (Código Disciplinario Único); Ley 610 de 2000 (proceso de responsabilidad fiscal); Código Penal Colombiano (Ley 599/2000) — Títulos XV y XVI.`,

    jurisprudencia: "C-292/03 (Corte Constitucional — control fiscal y transparencia en la gestión pública); Ley 734 de 2002 (Código Disciplinario Único); Ley 610 de 2000 (responsabilidad fiscal); Ley 599 de 2000 (Código Penal — delitos contra la administración pública)",

    derivacion: "¿Querés que un consultor especializado prepare tu denuncia ante la entidad correcta? Analizamos tu caso, determinamos ante quién denunciar (Procuraduría, Contraloría, Fiscalía o las tres), redactamos el documento y hacemos seguimiento hasta obtener resultados."
  },
  "00": {
    triggers: [], // fallback — no triggers
    respuesta: `Gracias por tu consulta. En **Veeduría Ciudadana** te ayudamos a vigilar la gestión pública y proteger tus derechos.

🔍 **Podemos ayudarte con:**
- ✅ Verificar si una obra pública cumple la normativa
- ✅ Revisar contratos en SECOP
- ✅ Asesorarte sobre tus derechos como ciudadano, estudiante, paciente o trabajador
- ✅ Guiarte para presentar derechos de petición, tutelas o denuncias
- ✅ Crear y formalizar una veeduría ciudadana (Ley 850/2003)
- ✅ Reclamar por servicios públicos (agua, luz, gas)
- ✅ Denunciar daños ambientales o contaminación
- ✅ **NUEVO:** Guía completa de Tutela paso a paso (test de 7 criterios, plazos, formato)
- ✅ **NUEVO:** Acción Popular completa (legitimación, contra quién denunciar, ejemplos)
- ✅ **NUEVO:** Proceso Disciplinario y Fiscal (Procuraduría, Contraloría, Fiscalía — tiempos y pasos)
- ✅ Conectarte con los organismos de control (Contraloría, Procuraduría, Fiscalía)

📋 **Contanos más sobre tu caso y un consultor especializado te orientará sin costo.**
¿Qué situación querés revisar?`,
    derivacion: null // fallback no fuerza derivación directa
  }
};

export default FLUJOS;
