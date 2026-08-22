/**
 * Marco jurídico colombiano para veeduría ciudadana
 *
 * Datos verificados con fuentes oficiales colombianas:
 * - Constitución Política de Colombia (Art. 86, 88, 89)
 * - Decreto 2591 de 1991 (Acción de Tutela)
 * - Ley 472 de 1998 (Acciones Populares y de Grupo)
 * - Ley 610 de 2000 (Proceso de Responsabilidad Fiscal)
 * - Ley 850 de 2003 (Veedurías Ciudadanas)
 * - Ley 1952 de 2019 (Código General Disciplinario)
 * - Corte Constitucional (corteconstitucional.gov.co)
 * - Función Pública (funcionpublica.gov.co)
 */

const jurisprudencia = {
  // ============================================================
  // ACCIÓN DE TUTELA (Art. 86 Constitución, Decreto 2591/1991)
  // ============================================================
  tutela: {
    titulo: "Acción de Tutela",
    baseLegal: "Artículo 86 de la Constitución Política y Decreto 2591 de 1991",
    descripcion:
      "Mecanismo constitucional de protección inmediata de derechos fundamentales, preferente y sumario, que toda persona puede ejercer ante cualquier juez cuando sus derechos resulten vulnerados o amenazados por acción u omisión de cualquier autoridad pública o de particulares en casos específicos.",

    requisitos: [
      {
        id: 1,
        nombre: "Legitimación por activa",
        descripcion:
          "Puede ser ejercida por toda persona cuyos derechos fundamentales estén vulnerados o amenazados, por sí misma o mediante representante, apoderado, agente oficioso, Defensor del Pueblo o personeros municipales.",
        baseLegal: "Art. 86 C.P., Art. 10 Decreto 2591/1991",
      },
      {
        id: 2,
        nombre: "Legitimación por pasiva",
        descripcion:
          "Procede contra autoridades públicas (acciones u omisiones) y contra particulares cuando: presten servicios públicos, afecten grave y directamente el interés colectivo, o exista relación de subordinación o indefensión.",
        baseLegal: "Arts. 5, 13 y 42 Decreto 2591/1991",
      },
      {
        id: 3,
        nombre: "Inmediatez",
        descripcion:
          "Debe presentarse en un plazo razonable desde la vulneración. No existe término legal fijo, pero la Corte Constitucional ha fijado como criterio orientador 6 meses desde el hecho vulnerador, salvo que persista la amenaza o exista justificación válida para la demora.",
        baseLegal: "Jurisprudencia Corte Constitucional (SU-961/1999, T-328/2010)",
      },
      {
        id: 4,
        nombre: "Subsidiariedad",
        descripcion:
          "Procede cuando no existen otros mecanismos de defensa judicial, cuando los disponibles no son eficaces, o como mecanismo transitorio para evitar un perjuicio irremediable.",
        baseLegal: "Art. 86 C.P., Arts. 6 y 8 Decreto 2591/1991",
      },
      {
        id: 5,
        nombre: "No existencia de otra tutela (no temeridad)",
        descripcion:
          "El accionante debe manifestar bajo juramento que no ha presentado otra acción de tutela por los mismos hechos y derechos. La actuación temeraria genera sanciones.",
        baseLegal: "Arts. 37 y 38 Decreto 2591/1991",
      },
      {
        id: 6,
        nombre: "Relevancia constitucional",
        descripcion:
          "El asunto debe revestir relevancia constitucional, es decir, involucrar la protección efectiva de derechos fundamentales y no tratar asuntos de mera legalidad o conveniencia.",
        baseLegal: "Sentencia C-590/2005, T-298/2023",
      },
      {
        id: 7,
        nombre: "Requisitos especiales contra providencias judiciales",
        descripcion:
          "Cuando se dirige contra decisiones judiciales deben cumplirse además: (i) relevancia constitucional, (ii) agotamiento de recursos ordinarios y extraordinarios, (iii) inmediatez, (iv) irregularidad procesal con efecto decisivo, (v) identificación de los hechos vulneradores, (vi) que no sea contra sentencias de tutela, y (vii) que no sea contra fallos de control abstracto de constitucionalidad.",
        baseLegal: "Sentencia C-590/2005 (reiterada en T-066/2024)",
      },
    ],

    plazos: {
      falloPrimeraInstancia:
        "10 días hábiles desde la radicación de la solicitud (Art. 29 Decreto 2591/1991)",
      impugnacion:
        "3 días hábiles desde la notificación del fallo para presentar impugnación (Art. 31 Decreto 2591/1991)",
      falloSegundaInstancia:
        "20 días hábiles desde la recepción del expediente para resolver la impugnación (Art. 32 Decreto 2591/1991)",
      revisionCorte:
        "La Corte Constitucional selecciona discrecionalmente los fallos para revisión (Art. 33 Decreto 2591/1991). No hay plazo fijo.",
      caducidad:
        "La acción de tutela NO tiene término de caducidad; puede ejercerse en todo tiempo. La regla de caducidad de 2 meses para tutela contra providencias judiciales (Art. 11 Decreto 2591/1991) fue declarada INEXEQUIBLE.",
      perjuicioIrremediable:
        "Si se utiliza como mecanismo transitorio, el juez fija el plazo para acudir a la vía ordinaria, normalmente 4 meses (Art. 8 Decreto 2591/1991).",
    },

    formato: {
      descripcion:
        "La acción de tutela NO requiere formalidades especiales. Puede presentarse por escrito, verbalmente o por cualquier medio.",
      contenidoMinimo: [
        "Identificación del accionante y del accionado",
        "Relación clara de los hechos que originan la vulneración o amenaza",
        "Señalamiento de los derechos fundamentales que se consideran violados o amenazados",
        "Manifestación bajo juramento de no haber presentado otra tutela por los mismos hechos",
        "Solicitud de las pruebas que se pretendan hacer valer (opcional)",
        "Dirección para notificaciones",
        "Firma del solicitante (si es escrito)",
      ],
      procedimiento: [
        "Se radica ante cualquier juez de la República (reparto)",
        "El juez puede solicitar informes y practicar pruebas de oficio",
        "La sentencia de primera instancia es de cumplimiento inmediato",
        "Contra el fallo procede impugnación ante el superior jerárquico",
        "El expediente se remite a la Corte Constitucional para eventual revisión",
      ],
    },

    proteccionDerechos:
      "Protege derechos constitucionales fundamentales (vida, salud, debido proceso, petición, igualdad, trabajo, seguridad social, educación, libertad, habeas data, etc.). Para derechos no expresamente señalados como fundamentales, la Corte Constitucional da prelación en revisión.",
  },

  // ============================================================
  // ACCIÓN POPULAR (Art. 88 Constitución, Ley 472/1998)
  // ============================================================
  accionPopular: {
    titulo: "Acción Popular",
    baseLegal: "Artículo 88 de la Constitución Política y Ley 472 de 1998",
    descripcion:
      "Medio procesal para la protección de los derechos e intereses colectivos. Se ejerce para evitar el daño contingente, hacer cesar el peligro, la amenaza, la vulneración o agravio sobre los derechos e intereses colectivos, o restituir las cosas a su estado anterior cuando fuere posible.",

    requisitos: {
      demanda: [
        "Indicación del derecho o interés colectivo amenazado o vulnerado (Art. 18 Ley 472/1998)",
        "Indicación de los hechos, actos, acciones u omisiones que motivan la acción",
        "Señalamiento de la persona natural o jurídica presuntamente responsable",
        "Cuando se desconozca al responsable, se indicará la entidad a la cual pertenece o en la cual labora",
        "La demanda debe cumplir los requisitos del Código General del Proceso o del CPACA según el juez competente",
      ],
      procedencia: {
        contra: "Toda acción u omisión de autoridades públicas o particulares que violen o amenacen violar derechos e intereses colectivos (Art. 9)",
        noAgotamiento:
          "No es necesario agotar previamente la vía gubernativa o los recursos administrativos (Art. 10)",
        caducidad:
          "NO existe término de caducidad. La acción puede promoverse durante el tiempo que subsista la amenaza o peligro al derecho e interés colectivo (Art. 11)",
        preferencia:
          "Las acciones populares preventivas tienen trámite preferencial, excepto frente a Habeas Corpus, Tutela y Acción de Cumplimiento (Art. 6)",
      },
      derechosColectivosProtegidos: [
        "Goce de un ambiente sano",
        "Moralidad administrativa",
        "Existencia del equilibrio ecológico y manejo de recursos naturales",
        "Goce del espacio público y defensa de bienes de uso público",
        "Defensa del patrimonio público",
        "Defensa del patrimonio cultural de la Nación",
        "Seguridad y salubridad públicas",
        "Acceso a infraestructura de servicios que garantice salubridad",
        "Libre competencia económica",
        "Acceso a servicios públicos y su prestación eficiente y oportuna",
        "Prohibición de armas químicas, biológicas y nucleares",
        "Derecho a la seguridad y prevención de desastres",
        "Realización de construcciones respetando disposiciones jurídicas",
        "Derechos de los consumidores y usuarios",
      ],
    },

    legitimacion: {
      activa: [
        "Toda persona natural o jurídica (Art. 12)",
        "Organizaciones no gubernamentales y organizaciones populares, cívicas y similares",
        "Entidades públicas que cumplan funciones de control (Procuraduría, Defensoría, Contraloría — cuando el sujeto pasivo sea una entidad pública de cualquier orden)",
        "El Defensor del Pueblo y sus delegados",
        "Los Personeros Distritales o Municipales",
        "Los contralores departamentales, distritales y municipales",
      ],
      coadyuvancia: [
        "Organizaciones populares, cívicas y similares",
        "Defensor del Pueblo o sus delegados",
        "Personeros Distritales o Municipales",
        "Demás autoridades que por razón de sus funciones deban proteger o defender derechos colectivos",
      ],
    },

    competencia: {
      primeraInstancia:
        "Jueces administrativos (cuando la entidad accionada es pública) o jueces civiles del circuito (cuando es particular o hay concurrencia). En casos de competencia de la Contraloría, jueces civiles del circuito o administrativos.",
      segundaInstancia: "Tribunal Administrativo (según jurisdicción)",
      pactoCumplimiento:
        "El juez, dentro de los 3 días siguientes al vencimiento del traslado de la demanda, cita a las partes a audiencia de pacto de cumplimiento (Art. 27).",
    },

    ejemplos: [
      {
        caso: "Protección de espacio público",
        descripcion:
          "Acción popular para recuperar zonas de uso público ocupadas indebidamente. Se busca restituir el goce colectivo del espacio público.",
      },
      {
        caso: "Moralidad administrativa en contratación",
        descripcion:
          "Acción popular contra irregularidades en procesos de contratación estatal que afectan el patrimonio público y la moralidad administrativa.",
      },
      {
        caso: "Medio ambiente sano",
        descripcion:
          "Acción popular para cesar vertimientos contaminantes que afectan fuentes hídricas y el derecho colectivo al ambiente sano.",
      },
      {
        caso: "Servicios públicos",
        descripcion:
          "Acción popular cuando la prestación ineficiente de un servicio público domiciliario afecta a una comunidad.",
      },
    ],
  },

  // ============================================================
  // ACCIÓN DE GRUPO (Art. 88 Constitución, Ley 472/1998)
  // ============================================================
  accionGrupo: {
    titulo: "Acción de Grupo",
    baseLegal: "Artículo 88 de la Constitución Política y Ley 472 de 1998",
    descripcion:
      "Acción interpuesta por un número plural de personas (mínimo 20) que reúnen condiciones uniformes respecto de una misma causa que originó perjuicios individuales. Se ejerce EXCLUSIVAMENTE para obtener reconocimiento y pago de indemnización de perjuicios.",

    requisitos: {
      grupoMinimo: "Mínimo 20 personas que hayan sufrido perjuicio individual por la misma causa",
      condiciones: "Las personas deben reunir condiciones uniformes respecto de la causa que origina los perjuicios",
      demanda: [
        "Descripción de los hechos que generaron los daños",
        "Estimativo en dinero de los daños causados",
        "Identificación de las 20 personas (mínimo) afectadas que desean la reparación",
        "Identificación del demandado",
        "Pruebas que permitan verificar la relación causal",
        "Cumplir los requisitos del Código General del Proceso o CPACA según el caso (Art. 52)",
      ],
      representante:
        "El grupo elige a un representante que actúa como demandante en nombre de todos los afectados, sin necesidad de que cada uno otorgue poder (Art. 48)",
      caducidad:
        "2 años siguientes a la ocurrencia de los hechos generadores del daño, o 2 años siguientes a la terminación de los hechos generadores del daño cuando estos sean de tracto sucesivo",
      conciliacionPrevia:
        "Se debe intentar un acuerdo conciliatorio antes de la demanda o en audiencia dentro del proceso",
      finalidad:
        "Exclusivamente indemnizatoria. Si se quiere prevenir un daño o proteger derechos colectivos debe acudirse a la acción popular, tutela u otro mecanismo.",
    },

    procedimiento: [
      "1. Intento de conciliación extrajudicial (ante Centro de Conciliación, Notaría, Defensoría o Personería)",
      "2. Presentación de la demanda ante juez civil o administrativo según la naturaleza del demandado",
      "3. El juez valora la procedencia en el auto admisorio",
      "4. Audiencia de conciliación dentro del proceso",
      "5. Período probatorio",
      "6. Alegatos y sentencia (fallo estimando perjuicios individuales o por subgrupos)",
      "7. Publicación de la sentencia para convocar a otros afectados no incluidos inicialmente",
    ],

    competencia:
      "Jueces civiles del circuito (cuando el demandado es particular) o jueces administrativos (cuando el demandado es entidad pública o particular prestando servicios públicos).",
  },

  // ============================================================
  // PROCESO DISCIPLINARIO (Ley 1952/2019 - Código General Disciplinario)
  // ============================================================
  procesoDisciplinario: {
    titulo: "Proceso Disciplinario",
    baseLegal:
      "Ley 1952 de 2019 (Código General Disciplinario), modificada por Ley 2094 de 2021",
    descripcion:
      "Conjunto de actuaciones administrativas orientadas a investigar y sancionar las faltas disciplinarias cometidas por servidores públicos y particulares que ejercen funciones públicas. Busca la prevalencia de la justicia, la efectividad del derecho sustantivo y la sanción de conductas que atenten contra el deber funcional.",

    entidades: {
      procuraduria: {
        nombre: "Procuraduría General de la Nación",
        competencia:
          "Competencia privativa para conocer de procesos disciplinarios contra servidores públicos de elección popular y altos funcionarios del Estado. También ejerce poder disciplinario preferente, pudiendo desplazar a otras autoridades disciplinarias en cualquier etapa del proceso.",
        baseLegal: "Arts. 277-278 Constitución, Art. 3 Ley 1952/2019",
      },
      personerias: {
        nombre: "Personerías Municipales y Distritales",
        competencia:
          "Conocen en primera instancia de procesos disciplinarios contra servidores públicos del orden municipal y distrital (excepto los de elección popular).",
        baseLegal: "Ley 1952/2019, Ley 136/1994",
      },
      oficinasControlInterno: {
        nombre: "Oficinas de Control Interno Disciplinario",
        competencia:
          "Cada entidad pública tiene su propia oficina de control disciplinario interno para conocer faltas de sus servidores en primera instancia, excepto cuando la Procuraduría ejerce poder preferente.",
        baseLegal: "Ley 1952/2019",
      },
      cnajd: {
        nombre: "Comisión Nacional de Disciplina Judicial",
        competencia:
          "Ejerce la función jurisdiccional disciplinaria sobre los funcionarios y empleados de la Rama Judicial y sobre los abogados en ejercicio de la profesión.",
        baseLegal: "Art. 257A Constitución, Ley 1952/2019",
      },
    },

    pasos: [
      {
        paso: 1,
        nombre: "Recepción de queja o inicio oficioso",
        descripcion:
          "Cualquier persona puede presentar queja ante la autoridad disciplinaria. También puede iniciarse de oficio, por informe de otra autoridad, por denuncia anónima con soporte probatorio, o por noticia de medios de comunicación.",
        plazo: "Inmediato",
      },
      {
        paso: 2,
        nombre: "Decisión inhibitoria o inicio de indagación previa",
        descripcion:
          "Si la queja es manifiestamente temeraria, se refiere a hechos irrelevantes, de imposible ocurrencia o absolutamente inconcreta, el funcionario se inhibe de plano de iniciar actuación (sin recurso). De lo contrario, si hay duda sobre la identificación del presunto autor, se abre indagación previa.",
        plazo: "Indagación previa: 6 meses (prorrogables por otros 6 meses si se investigan violaciones a DDHH o DIH)",
        baseLegal: "Arts. 208-209 Ley 1952/2019",
      },
      {
        paso: 3,
        nombre: "Apertura de investigación disciplinaria",
        descripcion:
          "Cuando se identifique al posible autor de la falta, se abre investigación formal mediante auto motivado. Se notifica al investigado quien adquiere derecho a defensa material y designación de abogado.",
        plazo: "El término de investigación es racional y proporcionado. La ley fija que las decisiones motivadas se toman en 10 días y las de impulso procesal en 3 días, salvo disposición en contrario.",
        baseLegal: "Art. 211-212 Ley 1952/2019",
      },
      {
        paso: 4,
        nombre: "Formulación de pliego de cargos",
        descripcion:
          "Cuando esté demostrada objetivamente la falta y exista prueba que comprometa la responsabilidad del investigado, se formula pliego de cargos precisando: la conducta, la calificación jurídica (gravísima, grave, leve), el grado de culpabilidad, y las sanciones posibles.",
        plazo: "5 días para presentar descargos desde la notificación",
      },
      {
        paso: 5,
        nombre: "Etapa de juzgamiento y práctica de pruebas",
        descripcion:
          "Se recaudan y practican las pruebas solicitadas por las partes y las decretadas de oficio. Se garantizan los principios de contradicción, publicidad y debido proceso.",
        plazo: "Variable según complejidad del caso",
      },
      {
        paso: 6,
        nombre: "Fallo de primera instancia",
        descripcion:
          "El funcionario competente dicta fallo absolutorio (sin responsabilidad) o sancionatorio (con responsabilidad). Las sanciones incluyen: destitución e inhabilidad general (para faltas gravísimas dolosas o con culpa gravísima), suspensión en el cargo, multa, o amonestación escrita.",
        plazo: "No tiene término fijo en días. Se rige por la razonabilidad del proceso.",
      },
      {
        paso: 7,
        nombre: "Recurso de apelación y fallo de segunda instancia",
        descripcion:
          "Contra el fallo de primera instancia procede recurso de apelación ante el superior jerárquico. El fallo de segunda instancia agota la vía administrativa y puede ser demandado ante la jurisdicción contencioso-administrativa.",
        plazo: "Término para resolver apelación: razonable y proporcionado.",
      },
    ],

    plazos: {
      indagacionPrevia: "6 meses (prorrogables por 6 meses más para violaciones DDHH/DIH)",
      investigacion: "Razonable y proporcionado; no hay término fijo en la Ley 1952/2019",
      prescripcionAccion: "5 años contados desde la ocurrencia de la falta para faltas gravísimas y graves; 3 años para faltas leves. Se interrumpe con la notificación del pliego de cargos o equivalente.",
      prescripcionSancion: "5 años desde la ejecutoria del fallo sancionatorio",
      decisionesMotivadas: "10 días",
      impulsoProcesal: "3 días",
    },

    sanciones: [
      "Destitución e inhabilidad general (10 a 20 años) — para faltas gravísimas dolosas o con culpa gravísima",
      "Suspensión en el cargo e inhabilidad especial (1 a 12 meses)",
      "Multa (hasta 180 salarios diarios mínimos legales vigentes)",
      "Amonestación escrita",
    ],
  },

  // ============================================================
  // PROCESO FISCAL / RESPONSABILIDAD FISCAL (Ley 610/2000)
  // ============================================================
  procesoFiscal: {
    titulo: "Proceso de Responsabilidad Fiscal",
    baseLegal: "Ley 610 de 2000 (modificada por Decreto 403 de 2020)",
    descripcion:
      "Conjunto de actuaciones administrativas adelantadas por las Contralorías para determinar y establecer la responsabilidad de los servidores públicos y particulares que, en ejercicio de la gestión fiscal o con ocasión de ésta, causen por acción u omisión y en forma dolosa o culposa un daño al patrimonio del Estado. Busca el resarcimiento de los daños al patrimonio público.",

    entidades: {
      contraloriaGeneral: {
        nombre: "Contraloría General de la República",
        competencia:
          "Órgano de control fiscal máximo. Vigilancia de la gestión fiscal de la administración y de los particulares que manejen fondos o bienes de la Nación. Competencia prevalente para procesos de responsabilidad fiscal originados en la facultad excepcional de control (Art. 267 Constitución).",
        baseLegal: "Arts. 267-268 Constitución, Ley 610/2000",
      },
      contraloriasTerritoriales: {
        nombre: "Contralorías Departamentales, Distritales y Municipales",
        competencia:
          "Ejercen vigilancia fiscal en su respectiva jurisdicción territorial sobre los recursos del departamento, distrito o municipio.",
        baseLegal: "Ley 610/2000, Decreto 403/2020",
      },
      auditoriaGeneral: {
        nombre: "Auditoría General de la República",
        competencia:
          "Ejerce control fiscal sobre las Contralorías. También adelanta procesos de responsabilidad fiscal aplicando el mismo procedimiento de la Ley 610/2000.",
        baseLegal: "Art. 274 Constitución, Art. 68 Ley 610/2000",
      },
    },

    elementos: [
      "Conducta dolosa o culposa atribuible a una persona que realiza gestión fiscal",
      "Daño patrimonial al Estado (lesión del patrimonio público: menoscabo, disminución, perjuicio, detrimento, pérdida, uso indebido o deterioro de bienes o recursos públicos)",
      "Nexo causal entre la conducta y el daño patrimonial",
    ],

    pasos: [
      {
        paso: 1,
        nombre: "Iniciación del proceso",
        descripcion:
          "Puede iniciarse de oficio, como consecuencia del ejercicio de los sistemas de control fiscal, por solicitud de las entidades vigiladas, o por denuncias o quejas de cualquier persona u organización ciudadana. Las veedurías ciudadanas están especialmente facultadas para presentar denuncias (Art. 8 Ley 610/2000 y Ley 563/2000).",
        plazo: "No hay plazo fijo para el inicio; la acción fiscal caduca a los 5 años de ocurrido el hecho generador del daño.",
        baseLegal: "Art. 8 Ley 610/2000",
      },
      {
        paso: 2,
        nombre: "Indagación preliminar",
        descripcion:
          "Cuando no existe certeza sobre la ocurrencia del hecho, la causación del daño, la entidad afectada o los presuntos responsables. Tiene por objeto verificar la competencia del órgano fiscalizador, la ocurrencia de la conducta y su afectación al patrimonio estatal, determinar la entidad afectada e identificar a los presuntos responsables.",
        plazo: "Máximo 6 meses. Al cabo de este término solo procede archivo o apertura del proceso formal.",
        baseLegal: "Art. 39 Ley 610/2000",
      },
      {
        paso: 3,
        nombre: "Apertura del proceso de responsabilidad fiscal",
        descripcion:
          "Cuando esté establecida la existencia de un daño patrimonial al Estado e indicios serios sobre los posibles autores, se ordena mediante auto la apertura formal del proceso. El auto debe identificar la entidad estatal afectada y los presuntos responsables fiscales. Se notifica a los implicados.",
        plazo: "Se debe proferir auto de apertura o de archivo al terminar la indagación preliminar.",
        baseLegal: "Arts. 40-41 Ley 610/2000",
      },
      {
        paso: 4,
        nombre: "Auto de imputación de responsabilidad fiscal",
        descripcion:
          "Se profiere cuando esté demostrado objetivamente el daño al patrimonio económico del Estado y existan pruebas que comprometan la responsabilidad fiscal de los implicados (testimonios con serios motivos de credibilidad, indicios graves, documentos, peritación o cualquier medio probatorio). El auto debe contener la acreditación de los elementos constitutivos de la responsabilidad fiscal y la cuantía del daño.",
        requisitoPrevio:
          "No puede dictarse auto de imputación si el presunto responsable no ha sido escuchado en exposición libre y espontánea o no está representado por apoderado.",
        baseLegal: "Arts. 47-48 Ley 610/2000",
      },
      {
        paso: 5,
        nombre: "Traslado para defensa",
        descripcion:
          "Los presuntos responsables disponen de un término para presentar argumentos de defensa frente a las imputaciones y solicitar y aportar pruebas. Si existe póliza de seguro, se vincula a la compañía aseguradora como tercero civilmente responsable.",
        plazo: "10 días contados desde el día siguiente a la notificación personal del auto de imputación o de la desfijación del edicto.",
        baseLegal: "Art. 50 Ley 610/2000",
      },
      {
        paso: 6,
        nombre: "Período probatorio",
        descripcion:
          "Se practican las pruebas solicitadas por las partes y las decretadas de oficio. Todas las pruebas deben ser legalmente producidas y allegadas al proceso.",
        plazo: "Variable. Vencido el término probatorio se procede a dictar fallo en 30 días.",
        baseLegal: "Arts. 22-32 Ley 610/2000",
      },
      {
        paso: 7,
        nombre: "Fallo (con o sin responsabilidad fiscal)",
        descripcion:
          "Fallo con responsabilidad fiscal: cuando obre prueba que conduzca a la certeza del daño, su cuantificación, la identificación del gestor fiscal, y la relación de causalidad. Debe determinar en forma precisa la cuantía del daño actualizada. || Fallo sin responsabilidad fiscal: cuando se desvirtúen las imputaciones o no exista prueba que conduzca a la certeza de los elementos de la responsabilidad fiscal.",
        plazo: "30 días después de practicadas las pruebas y vencido el término de traslado.",
        baseLegal: "Arts. 51-54 Ley 610/2000",
      },
      {
        paso: 8,
        nombre: "Consulta, impugnación y cobro coactivo",
        descripcion:
          "Procede consulta ante el superior jerárquico cuando el fallo es con responsabilidad fiscal y el investigado estuvo representado por apoderado de oficio, o cuando es sin responsabilidad o archivo. En firme el fallo con responsabilidad fiscal, presta mérito ejecutivo y se hace efectivo a través de la jurisdicción coactiva de las Contralorías. Solo es demandable ante la jurisdicción contencioso-administrativa el acto que termina el proceso.",
        baseLegal: "Arts. 56-62 Ley 610/2000",
      },
    ],

    plazos: {
      caducidadAccion:
        "5 años desde la ocurrencia del hecho generador del daño al patrimonio público, si no se ha proferido auto de apertura (Art. 9 Ley 610/2000)",
      prescripcionResponsabilidad:
        "5 años contados a partir del auto de apertura del proceso, si no se ha dictado providencia en firme que la declare (Art. 9 Ley 610/2000)",
      indagacionPreliminar: "6 meses máximo (Art. 39 Ley 610/2000)",
      trasladoDefensa: "10 días desde notificación del auto de imputación (Art. 50 Ley 610/2000)",
      terminoFallo: "30 días después de practicadas las pruebas (Art. 53 Ley 610/2000)",
      consultaSuperior: "1 mes para resolver consulta; si transcurrido este término no se ha proferido providencia, queda en firme el fallo o auto materia de consulta (Art. 18 Ley 610/2000)",
    },
  },

  // ============================================================
  // VEEDURÍAS CIUDADANAS (Ley 850/2003)
  // ============================================================
  veeduriaCiudadana: {
    titulo: "Veeduría Ciudadana",
    baseLegal: "Ley 850 de 2003, Ley 1757 de 2015",
    descripcion:
      "Mecanismo democrático de representación que permite a los ciudadanos o a las diferentes organizaciones comunitarias ejercer vigilancia sobre la gestión pública, respecto a las autoridades administrativas, políticas, judiciales, electorales, legislativas y órganos de control, así como de entidades públicas o privadas encargadas de la ejecución de programas, proyectos o contratos con recursos públicos.",

    constitucion: {
      requisitos: [
        "Puede ser constituida por todos los ciudadanos en forma plural (varias personas) o a través de organizaciones civiles",
        "Elaborar acta de constitución con: nombre de la veeduría, objeto de vigilancia, integrantes, domicilio, duración",
        "Elegir democráticamente a los veedores y sus directivos",
        "Inscribirse en el registro público de las personerías municipales o distritales, o ante las Cámaras de Comercio",
        "No requiere personería jurídica propia; basta la inscripción en el registro",
      ],
      impedimentos: [
        "Quienes sean contratistas, o tengan vínculo contractual con la entidad vigilada",
        "Quienes hayan sido condenados por delitos contra la administración pública",
        "Quienes estén vinculados laboralmente con la entidad vigilada",
        "Quienes tengan parentesco hasta cuarto grado de consanguinidad o segundo de afinidad con los directivos de la entidad vigilada",
      ],
    },

    funciones: [
      "Vigilar los procesos de planeación, presupuestación, ejecución y control de la gestión pública",
      "Solicitar informes, documentos y antecedentes a las autoridades administrativas",
      "Conocer y evaluar las políticas, proyectos, contratos y programas de la entidad vigilada",
      "Comunicar a las autoridades competentes los hechos que configuren posibles irregularidades",
      "Presentar denuncias ante los órganos de control (Procuraduría, Contraloría, Fiscalía)",
      "Ejercer control social y fiscalización sobre la gestión pública",
    ],

    derechos: [
      "Obtener información, salvo reserva legal",
      "Recibir respuesta oportuna de las autoridades",
      "Ser protegidos en su integridad física y moral como veedores",
      "Participar en los comités de control social cuando existan",
    ],
  },

  // ============================================================
  // JURISPRUDENCIA CLAVE DE LA CORTE CONSTITUCIONAL
  // ============================================================
  jurisprudencia: [
    {
      sentencia: "C-180 de 1994",
      tema: "Participación ciudadana y reserva de ley estatutaria",
      ratio:
        "La regulación sistemática de las veedurías ciudadanas y los mecanismos de participación ciudadana tiene reserva de ley estatutaria. Las veedurías son una expresión del principio de democracia participativa consagrado en la Constitución de 1991 y su reglamentación debe hacerse bajo los requisitos de trámite legislativo reforzado propios de las leyes estatutarias.",
      fecha: "14 de abril de 1994",
      magistradoPonente: "Hernando Herrera Vergara",
      fuente: "corteconstitucional.gov.co",
      relevanciaParaVeeduria:
        "Fija el rango normativo que debe tener la legislación sobre veedurías (ley estatutaria), lo que otorga mayor protección constitucional a la institución.",
    },
    {
      sentencia: "C-1338 de 2000",
      tema: "Veedurías ciudadanas y aplicación directa de la Constitución",
      ratio:
        "Las veedurías ciudadanas tienen fundamento constitucional directo en los artículos 1, 2, 40, 103 y 270 de la Constitución. No solo existe autorización constitucional expresa para ejercer veeduría ciudadana, lo que permite una aplicación directa de la Carta, sino que la ley (Ley 563 de 2000, luego reemplazada por la Ley 850 de 2003) desarrolla esta figura como mecanismo democrático de representación que permite a los ciudadanos ejercer vigilancia sobre la gestión pública.",
      fecha: "4 de octubre de 2000",
      magistradoPonente: "Carlos Gaviria Díaz",
      fuente: "corteconstitucional.gov.co",
      relevanciaParaVeeduria:
        "Reconoce que las veedurías no necesitan desarrollo legal pleno para existir: su fundamento es directamente constitucional. Esto fortalece la posición jurídica de los veedores.",
    },
    {
      sentencia: "C-292 de 2003",
      tema: "Naturaleza jurídica y principios de las veedurías ciudadanas",
      ratio:
        "La veeduría ciudadana es un mecanismo democrático de representación con una doble dimensión: (i) como derecho de participación ciudadana y (ii) como instrumento de control social sobre la gestión pública. Las veedurías no suplen las funciones de los órganos de control del Estado, ni pueden asimilarse a ellos. Sus funciones son de fiscalización, crítica y denuncia, pero no de decisión. Las listas de funciones deben ser taxativas para respetar el principio de legalidad. Las veedurías no pueden ser sujetos procesales por vía general sino solo cuando la ley lo prevea para casos particulares.",
      fecha: "8 de abril de 2003",
      magistradoPonente: "Eduardo Montealegre Lynett",
      fuente: "corteconstitucional.gov.co",
      relevanciaParaVeeduria:
        "Define con precisión qué PUEDE y qué NO PUEDE hacer una veeduría ciudadana: fiscalizar y denunciar, pero no reemplazar a los órganos de control ni ser parte procesal automática en todos los procesos.",
    },
    {
      sentencia: "T-596 de 2002",
      tema: "Derecho de petición de información de las veedurías ciudadanas",
      ratio:
        "Las veedurías ciudadanas tienen derecho a obtener información de las entidades públicas para el ejercicio de su labor de vigilancia. La negativa a suministrar información sobre ejecución presupuestal a una veeduría vulnera el derecho fundamental de petición de información y obstaculiza ilegítimamente el control social. La información presupuestal solicitada por una veeduría no está amparada por reserva legal, pues el artículo 51 de la Ley 190 de 1995 (Estatuto Anticorrupción) ordena su publicación.",
      fecha: "31 de julio de 2002",
      magistradoPonente: "Manuel José Cepeda Espinosa",
      fuente: "corteconstitucional.gov.co",
      relevanciaParaVeeduria:
        "Precedente clave que protege el acceso a la información como herramienta esencial de las veedurías. Las entidades públicas no pueden escudarse en supuestas reservas para negar información a los veedores.",
    },
    {
      sentencia: "C-590 de 2005",
      tema: "Procedencia excepcional de la tutela contra providencias judiciales",
      ratio:
        "La acción de tutela procede excepcionalmente contra decisiones judiciales cuando se cumplan los requisitos generales de: (i) relevancia constitucional, (ii) agotamiento de todos los medios de defensa judicial, (iii) inmediatez, (iv) que la irregularidad procesal tenga efecto decisivo, (v) identificación razonable de los hechos, (vi) que no se trate de sentencias de tutela, y (vii) que no sea contra fallos de control abstracto de constitucionalidad. Además, deben configurarse causales específicas como defecto fáctico, sustantivo, orgánico, procedimental, desconocimiento del precedente, violación directa de la Constitución, etc.",
      fecha: "8 de junio de 2005",
      magistradoPonente: "Jaime Córdoba Triviño",
      fuente: "corteconstitucional.gov.co",
      relevanciaParaVeeduria:
        "Marco de referencia para que las veedurías evalúen si una tutela contra una decisión judicial que afecte su labor de control social es procedente.",
    },
    {
      sentencia: "T-760 de 2008",
      tema: "Derecho a la salud como derecho fundamental autónomo y tutela",
      ratio:
        "La Corte Constitucional reconoce el derecho a la salud como un derecho fundamental autónomo, no simplemente prestacional ni conexo. Ordena al gobierno unificar los planes de beneficios (POS) y garantizar el acceso efectivo a servicios de salud. La tutela es procedente para proteger el derecho a la salud cuando existe amenaza o vulneración.",
      fecha: "31 de julio de 2008",
      magistradoPonente: "Manuel José Cepeda Espinosa",
      fuente: "corteconstitucional.gov.co",
      relevanciaParaVeeduria:
        "Sentencia emblemática que amplió la protección del derecho a la salud. Útil para veedurías que vigilan la prestación de servicios de salud con recursos públicos.",
    },
    {
      sentencia: "C-644 de 2011",
      tema: "Acción popular como medio principal de defensa de derechos colectivos",
      ratio:
        "La acción popular es el medio procesal principal para la protección de los derechos e intereses colectivos. No interfiere ni excluye las acciones disciplinarias, penales o contencioso-administrativas que procedan por los mismos hechos. La acción popular permite al juez adoptar medidas para hacer cesar la amenaza o vulneración de derechos colectivos, incluyendo la inaplicación, interpretación condicionada o suspensión de actos administrativos —sin poder anularlos—, mientras se supera la vulneración.",
      fecha: "31 de agosto de 2011",
      magistradoPonente: "Jorge Iván Palacio Palacio",
      fuente: "corteconstitucional.gov.co",
      relevanciaParaVeeduria:
        "Define los límites y alcances de la acción popular como herramienta principal para veedurías que buscan proteger derechos colectivos (ambiente, moralidad, patrimonio público, etc.) frente a actos administrativos lesivos.",
    },
    {
      sentencia: "C-088 de 2000",
      tema: "Proceso de responsabilidad fiscal y debido proceso",
      ratio:
        "La Corte declaró inexequibles varias disposiciones de la Ley 610 de 2000 que vulneraban el debido proceso en el juicio fiscal. Se establece que el proceso de responsabilidad fiscal, aunque es de naturaleza administrativa y no judicial, debe garantizar plenamente el derecho de defensa, contradicción y debido proceso de los investigados. La responsabilidad fiscal es autónoma e independiente de otras responsabilidades (penal, disciplinaria).",
      fecha: "2 de febrero de 2000",
      magistradoPonente: "Fabio Morón Díaz",
      fuente: "corteconstitucional.gov.co",
      relevanciaParaVeeduria:
        "Importante para que las veedurías entiendan los límites constitucionales del proceso fiscal y las garantías de los investigados, evitando expectativas desmedidas o denuncias infundadas.",
    },
    {
      sentencia: "SU-067 de 2022",
      tema: "Acción de tutela y subsidiariedad en concursos de méritos",
      ratio:
        "La Corte unificó criterios sobre la procedencia de la acción de tutela en el marco de concursos de méritos, estableciendo que, si bien el mecanismo ordinario es la acción contencioso-administrativa, la tutela procede de manera excepcional cuando el afectado enfrenta un perjuicio irremediable o cuando los mecanismos ordinarios no son idóneos ni eficaces para la protección inmediata de los derechos fundamentales en juego.",
      fecha: "24 de febrero de 2022",
      magistradoPonente: "Paola Andrea Meneses Mosquera",
      fuente: "corteconstitucional.gov.co",
      relevanciaParaVeeduria:
        "Refuerza la doctrina de subsidiariedad de la tutela, criterio esencial para que las veedurías sepan cuándo procede o no este mecanismo frente a actuaciones administrativas relacionadas con la gestión pública.",
    },
    {
      sentencia: "C-083 de 1995",
      tema: "Moralidad administrativa como derecho colectivo",
      ratio:
        "La moralidad administrativa es un derecho colectivo protegible mediante acción popular. No se limita a la legalidad formal de los actos administrativos, sino que exige que la conducta de los servidores públicos se ajuste a principios éticos y de probidad en el manejo de los recursos públicos. La moralidad administrativa es un concepto jurídico indeterminado que se concreta en cada caso por el juez.",
      fecha: "1 de marzo de 1995",
      magistradoPonente: "Carlos Gaviria Díaz",
      fuente: "corteconstitucional.gov.co",
      relevanciaParaVeeduria:
        "Precedente fundacional que permite a las veedurías ciudadanas invocar la moralidad administrativa como derecho colectivo para cuestionar actuaciones que, aunque formalmente legales, sean éticamente reprochables.",
    },
  ],

  // ============================================================
  // ENTIDADES DE CONTROL: COMPETENCIAS COMPARADAS
  // ============================================================
  competenciasEntidades: {
    procuraduria: {
      nombre: "Procuraduría General de la Nación",
      tipo: "Control disciplinario y defensa del orden jurídico",
      baseLegal: "Arts. 275-284 Constitución",
      funcionesClave: [
        "Vigilar el cumplimiento de la Constitución, las leyes y las decisiones judiciales",
        "Proteger los derechos humanos y asegurar su efectividad",
        "Defender el patrimonio público y los intereses colectivos",
        "Ejercer vigilancia superior de la conducta oficial de los servidores públicos",
        "Adelantar procesos disciplinarios contra servidores públicos",
        "Intervenir en procesos judiciales como Ministerio Público",
        "Ejercer poder disciplinario preferente sobre todas las autoridades disciplinarias",
      ],
      interaccionVeedurias:
        "Las veedurías pueden presentar quejas disciplinarias ante la Procuraduría y esta debe darles trámite. La Procuraduría coordina con las veedurías ciudadanas la vigilancia de la gestión pública.",
    },
    contraloria: {
      nombre: "Contraloría General de la República",
      tipo: "Control fiscal",
      baseLegal: "Arts. 267-274 Constitución, Ley 610/2000, Decreto 403/2020",
      funcionesClave: [
        "Ejercer vigilancia de la gestión fiscal de la administración y de los particulares que manejen fondos públicos",
        "Adelantar procesos de responsabilidad fiscal para resarcir el patrimonio público",
        "Llevar el Boletín de Responsables Fiscales",
        "Ejercer control concomitante y preventivo sobre el gasto público",
        "Realizar auditorías fiscales y evaluar resultados de la gestión fiscal",
        "Ejercer jurisdicción coactiva para cobrar los fallos con responsabilidad fiscal",
      ],
      interaccionVeedurias:
        "La Ley 610/2000 (Art. 8) reconoce expresamente que los procesos fiscales pueden iniciarse por denuncias de veedurías ciudadanas. Las veedurías pueden aportar pruebas, solicitar auditorías y hacer seguimiento a los procesos fiscales.",
    },
    fiscalia: {
      nombre: "Fiscalía General de la Nación",
      tipo: "Investigación penal",
      baseLegal: "Arts. 249-253 Constitución",
      funcionesClave: [
        "Investigar delitos y acusar a los presuntos infractores ante los juzgados y tribunales",
        "Dirigir y coordinar las funciones de policía judicial",
        "Proteger a las víctimas y testigos",
        "Adelantar investigaciones penales por delitos contra la administración pública",
      ],
      interaccionVeedurias:
        "Las veedurías pueden denunciar hechos con posible connotación penal ante la Fiscalía. Esta debe recibir las denuncias y darles el trámite correspondiente.",
    },
    defensorPueblo: {
      nombre: "Defensoría del Pueblo",
      tipo: "Protección de derechos humanos y defensa de derechos",
      baseLegal: "Arts. 281-284 Constitución",
      funcionesClave: [
        "Orientar e instruir a los habitantes en el ejercicio de sus derechos",
        "Divulgar los derechos humanos y recomendar políticas para su enseñanza",
        "Interponer acciones de tutela, populares, de grupo y de cumplimiento",
        "Apoyar y asesorar a las veedurías ciudadanas",
        "Presentar proyectos de ley sobre derechos humanos",
      ],
      interaccionVeedurias:
        "Es la entidad más cercana a las veedurías: las apoya, asesora y puede interponer acciones constitucionales en representación de veedores o comunidades afectadas.",
    },
    personerias: {
      nombre: "Personerías Municipales y Distritales",
      tipo: "Control local y defensa de derechos ciudadanos",
      baseLegal: "Art. 118 Constitución, Ley 136/1994",
      funcionesClave: [
        "Vigilar la conducta de los servidores públicos municipales",
        "Recibir quejas y denuncias de la ciudadanía",
        "Interponer acciones constitucionales en defensa del interés público",
        "Llevar el registro de veedurías ciudadanas",
        "Velar por la efectividad de los derechos e intereses de los ciudadanos",
      ],
      interaccionVeedurias:
        "Son el primer punto de contacto para las veedurías a nivel local. Allí se inscriben, reciben orientación y pueden canalizar sus denuncias y solicitudes.",
    },
  },

  // ============================================================
  // RESUMEN DE MECANISMOS
  // ============================================================
  resumenMecanismos: {
    tutelaVsPopularVsGrupo: [
      {
        mecanismo: "Tutela",
        protege: "Derechos fundamentales individuales",
        caducidad: "No tiene; se aplica criterio de inmediatez (≈6 meses orientador)",
        instancia: "Cualquier juez de la República",
        agotarViaPrevia: "No",
        finalidad: "Protección inmediata, preferente y sumaria",
        abogadoRequerido: "No",
      },
      {
        mecanismo: "Popular",
        protege: "Derechos e intereses colectivos",
        caducidad: "No tiene; mientras subsista la amenaza",
        instancia: "Jueces civiles del circuito o administrativos",
        agotarViaPrevia: "No, ni siquiera recursos administrativos",
        finalidad: "Prevenir daño, hacer cesar amenaza, restituir",
        abogadoRequerido: "No, pero se recomienda",
      },
      {
        mecanismo: "Grupo",
        protege: "Perjuicios individuales de un grupo (≥20 personas)",
        caducidad: "2 años desde los hechos o su terminación",
        instancia: "Jueces civiles del circuito o administrativos",
        agotarViaPrevia: "Conciliación extrajudicial (intentada)",
        finalidad: "Indemnización de perjuicios",
        abogadoRequerido: "Sí, por la complejidad procesal",
      },
    ],
  },
};

export default jurisprudencia;
