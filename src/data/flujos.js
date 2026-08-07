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
    derivacion: "¿Querés que un consultor fuerce la entrega de esa información? Presentamos el derecho de petición, y si no responden, la tutela. No pagás hasta obtener resultados."
  },
  "00": {
    triggers: [], // fallback — no triggers
    respuesta: `Gracias por tu consulta. En **Veeduría Ciudadana** te ayudamos a vigilar la gestión pública y proteger tus derechos.

🔍 **Podemos ayudarte con:**
- ✅ Verificar si una obra pública cumple la normativa
- ✅ Revisar contratos en SECOP
- ✅ Asesorarte sobre tus derechos como ciudadano, estudiante, paciente o trabajador
- ✅ Guiarte para presentar derechos de petición, tutelas o denuncias
- ✅ Conectarte con los organismos de control (Contraloría, Procuraduría, Fiscalía)

📋 **Contanos más sobre tu caso y un consultor especializado te orientará sin costo.**
¿Qué situación querés revisar?`,
    derivacion: null // fallback no fuerza derivación directa
  }
};

export default FLUJOS;
