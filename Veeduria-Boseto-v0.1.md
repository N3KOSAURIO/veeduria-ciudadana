---
tags: [veeduria, boseto, arquitectura, v0.1]
created: 2026-08-09
updated: 2026-08-09
status: active
priority: urgente
type: arquitectura
owner: Ney
review: 2026-08-16
---

# Veeduría — Boseto v0.1: Arquitectura y Diseño

> Documento de validación con el cliente. NO es la herramienta final — es el primer esquema funcional.

---

## 1. ARQUITECTURA: Qué entra, qué procesa, qué sale

### ENTRADA (INPUT)

| Canal | Qué recibe | Formato |
|-------|-----------|---------|
| **Ciudadano** | Reporte de situación ("hueco en la calle", obra sospechosa, contrato dudoso) | Formulario guiado + geolocalización + fotos |
| **SECOP II** | Datos de contratación pública (8.92M procesos) | API Socrata JSON/CSV |
| **Contraloría** | Guías de auditoría, normativa de control fiscal | PDF/Markdown procesado |
| **Normogramas** | Marco legal por entidad (alcaldías, gobernaciones) | Datos estructurados |
| **Jurisprudencia** | Sentencias Consejo de Estado, Corte Constitucional | Texto indexado |

### PROCESO (ENGINE)

```
[INPUT] → [CLASIFICADOR] → [CRUCE NORMATIVO] → [MOTOR DE ALERTAS] → [GENERADOR DE INFORMES]
                ↓                    ↓                  ↓                    ↓
         Identifica tipo      Cruza contra:      Detecta omisiones    Produce:
         (obra/contrato/      - Ley aplicable     - Requisitos        - Informe Ejecutivo
          servicio/gasto)     - Guía contraloría   - Riesgos           - Informe Detallado
                              - Sentencias        - Responsables      - Derecho de Petición
                              - Checklist         - Plazos vencidos   - Checklist diligenciada
```

#### Módulos del motor:

| Módulo | Función | Fuente de datos |
|--------|---------|-----------------|
| **Clasificador** | Determina tipo de caso: obra pública, contrato, servicio, gasto | Input del ciudadano + taxonomía SECOP |
| **Selector normativo** | Carga el marco legal aplicable según tipo y entidad | Normogramas + leyes indexadas |
| **Cruce** | Compara lo reportado vs lo exigido por la norma | Checklist + guías contraloría |
| **Motor de alertas** | Genera hallazgos: omisiones, riesgos, incumplimientos | Reglas parametrizadas |
| **Trazador de responsables** | Identifica entidad/contratista/supervisor según el hallazgo | Datos del contrato (SECOP) + roles normativos |
| **Generador de informes** | Produce los 2 formatos de salida | Plantillas + datos del cruce |

### SALIDA (OUTPUT)

| Producto | Descripción | Público |
|----------|-------------|---------|
| **Informe Ejecutivo** | Máx 2 páginas. Resumen del hallazgo, entidad responsable, norma violada, acción sugerida. | Ciudadano, medios, redes |
| **Informe Detallado** | Completo. Incluye: contrato/obra analizado, marco legal, cruce norma vs realidad, responsables (nombre y cargo), omisiones detectadas, recomendaciones, fuentes. | Entes de control, abogados, periodistas |
| **Derecho de Petición** | PDF automático con datos del ciudadano + hallazgo + normas. Listo para radicar. | Entidad pública destinataria |
| **Checklist diligenciada** | La plantilla de contraloría con los hallazgos marcados. Anexo del informe. | Auditores, contraloría |

---

## 2. FLUJO "HUECO EN LA CALLE" — Extremo a extremo

### Paso a paso

```
🏠 CIUDADANO: Ve un hueco en la calle frente a su casa
│
├─ 📱 PASO 1 — CAPTURA INICIAL
│   ├─ Saca foto del hueco
│   ├─ La app geolocaliza automáticamente (GPS)
│   └─ Responde 3 preguntas guiadas:
│       Q1: ¿Esto es una calle/andén/parque? → [calle]
│       Q2: ¿Hay señales de obra reciente? → [no, lleva meses así]
│       Q3: ¿Sabe quién está a cargo? → [no sé]
│
├─ 🔍 PASO 2 — IDENTIFICACIÓN AUTOMÁTICA
│   ├─ Geolocalización → determina municipio/localidad
│   ├─ Consulta SECOP II: ¿hay contratos de obra pública en esa zona?
│   │   → API: https://www.datos.gov.co/resource/p6dx-8zbt.json?$where=...
│   ├─ Si encuentra contrato: extrae contratista, valor, fecha, supervisor
│   └─ Si NO encuentra: "No se halló contrato registrado en SECOP — posible obra no declarada"
│
├─ ⚖️ PASO 3 — CRUCE NORMATIVO
│   ├─ Carga normograma de la alcaldía correspondiente
│   ├─ Aplica checklist de obra pública municipal:
│   │   ☐ Licencia de construcción vigente
│   │   ☐ Acta de inicio firmada
│   │   ☐ Interventoría designada
│   │   ☐ Pólizas al día (estabilidad, cumplimiento, responsabilidad civil)
│   │   ☐ Plan de manejo de tráfico (PMT) aprobado
│   │   ☐ Señalización de obra reglamentaria
│   │   ☐ Cerramiento perimetral
│   │   ☐ Publicación en SECOP actualizada
│   │   ☐ Informes de supervisión al día
│   │   ☐ Cumplimiento de especificaciones técnicas (INVIAS/IDU)
│   └─ Genera mapa de riesgos en 8 dimensiones
│
├─ 🚨 PASO 4 — ALERTAS
│   ├─ 🔴 CRÍTICA: No hay contrato registrado en SECOP
│   ├─ 🟠 ALTA: Si hay contrato pero sin interventoría visible
│   ├─ 🟡 MEDIA: Obra abandonada >30 días sin acta de suspensión
│   └─ 🔵 INFO: Contactar Personería Municipal para verificación
│
├─ 📄 PASO 5 — ENTREGABLES
│   ├─ Informe Ejecutivo (2 págs): "Posible irregularidad en obra pública — Calle 45 #12-34, Municipio X"
│   ├─ Informe Detallado: contrato(s) encontrados, normas aplicables, hallazgos, responsables
│   ├─ Derecho de Petición pre-llenado dirigido a la Alcaldía
│   └─ Checklist de contraloría con hallazgos marcados
│
└─ 📤 PASO 6 — ACCIÓN CIUDADANA
    ├─ Descargar PDFs
    ├─ Enviar Derecho de Petición por correo a la entidad (con CC al ciudadano)
    ├─ Compartir Informe Ejecutivo en redes sociales
    └─ Guardar en "Mis Peticiones" para seguimiento
```

### Mockup visual del flujo

```
┌─────────────────────────────────────────────────────────┐
│  📸 Veeduría Ciudadana                    [⚙️] [👤]    │
│─────────────────────────────────────────────────────────│
│                                                         │
│   ¿Qué encontraste?                                     │
│                                                         │
│   ┌─────────────────────────────────────────────────┐   │
│   │  🏗️  Obra pública     📝  Contrato              │   │
│   │  🛒  Compra/Suministro 💰  Gasto público       │   │
│   │  🚧  Servicio público  ⚠️   Irregularidad       │   │
│   └─────────────────────────────────────────────────┘   │
│                                                         │
│   📍 Ubicación:  Calle 45 #12-34, Bogotá  [GPS ✓]     │
│                                                         │
│   📸 Evidencia:                                         │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐               │
│   │  📷      │  │  📷  +   │  │  📎 Adjuntar │               │
│   └─────────┘  └─────────┘  └─────────┘               │
│                                                         │
│   ┌─────────────────────────────────────────────────┐   │
│   │          🔍  ANALIZAR  ▶                         │   │
│   └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘

         ↓  (3-5 segundos de procesamiento)

┌─────────────────────────────────────────────────────────┐
│  📊 Resultados del análisis                 [📤 Compartir]│
│─────────────────────────────────────────────────────────│
│                                                         │
│  🔍 Contratos encontrados en la zona:                    │
│  ┌─────────────────────────────────────────────────┐   │
│  │ LP-2025-089 | Pavimentación vías locales        │   │
│  │ Contratista: Pavimentos S.A. | $1,200M COP      │   │
│  │ Supervisor: Juan Pérez | Inicio: 15-03-2026     │   │
│  │ Estado SECOP: EN EJECUCIÓN                      │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  🚨 ALERTAS:                                            │
│  🔴 Contrato sin interventoría registrada               │
│  🟡 Último informe de supervisión: hace 45 días         │
│  🟠 No se encontró PMT aprobado                         │
│                                                         │
│  ⚖️ Normas aplicables:                                  │
│  • Ley 80/1993 — Estatuto de Contratación               │
│  • Ley 1474/2011 — Estatuto Anticorrupción              │
│  • Guía de Auditoría Territorial GAT v4                 │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  📄 DESCARGAR INFORME EJECUTIVO                 │   │
│  │  📋 DESCARGAR INFORME DETALLADO                 │   │
│  │  ✉️  ENVIAR DERECHO DE PETICIÓN                  │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 3. FUENTES DE DATOS OFICIALES

### APIs consultables en tiempo real

| Fuente | URL/Endpoint | Formato | Frecuencia | Campos clave |
|--------|-------------|---------|------------|--------------|
| **SECOP II - Procesos** | `https://www.datos.gov.co/resource/p6dx-8zbt.json` | JSON (Socrata) | Diario | Entidad, contratista, valor, fecha, estado, objeto |
| **SECOP II - Contratos** | `https://www.datos.gov.co/resource/jbjy-vk9h.json` | JSON (Socrata) | Diario | ID contrato, modificaciones, pagos, actas |
| **Contraloría - Datos Abiertos** | `https://datosabiertos.contraloria.gov.co` | CKAN/CSV | Variable | Hallazgos fiscales, planes de mejoramiento |
| **Contraloría - Geoportal** | `https://geoportal.contraloria.gov.co` | GeoJSON | Variable | Contratos georreferenciados, capas de riesgo |

### Guías de auditoría y control fiscal

| Guía | Entidad | Enlace |
|------|---------|--------|
| **GAT v4** (Guía de Auditoría Territorial) | Contraloría | [cdm.gov.co/.../GAT_V4.pdf](https://www.cdm.gov.co/cgm/Paginaweb/Documentos%20compartidos/Guía%20de%20Auditoria%20Territorial-%20GAT_V4.pdf) |
| **PVCF-15** (Guía para Bogotá D.C.) | Contraloría Bogotá | contraloriabogota.gov.co |
| **ISSAI 4000** | INTOSAI (internacional) | Normas internacionales de auditoría |
| **Guía datos abiertos 2025** | MinTIC | herramientas.datos.gov.co |

### Marco legal indexado (ya en el proyecto)

| Ley/Norma | Tema | Archivo |
|-----------|------|---------|
| Ley 850/2003 | Veedurías ciudadanas | `data/normas/` |
| Ley 1755/2015 | Derecho de petición | `utils/petitionGenerator.js` |
| Ley 1712/2014 | Transparencia y acceso | `data/normas/` |
| Ley 80/1993 | Contratación estatal | `data/normas/` |
| Ley 1474/2011 | Estatuto Anticorrupción | `data/normas/` |
| Ley 610/2000 | Responsabilidad fiscal | `data/normas/` |

### SECOP II — Consulta típica (Socrata API)

```bash
# Buscar contratos de obra pública en un municipio específico
curl "https://www.datos.gov.co/resource/p6dx-8zbt.json?\
\$where=municipio='BOGOTÁ D.C.' \
AND tipo_contrato='Obra Pública' \
AND estado='En Ejecución'&\
\$order=fecha_inicio DESC&\
\$limit=20"
```

---

## 4. FORMATO DE INFORME EJECUTIVO (máx 2 páginas)

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│   INFORME EJECUTIVO DE VEEDURÍA CIUDADANA               │
│   No. VEE-20260809-0001                                  │
│                                                          │
│   📅 Fecha: 09/08/2026                                   │
│   📍 Municipio: Bogotá D.C.                              │
│   🏗️ Tipo: Obra pública — Pavimentación                  │
│                                                          │
│━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│                                                          │
│   1. RESUMEN DEL HALLAZGO                                │
│                                                          │
│   Se identificó la obra "Pavimentación vías locales"     │
│   (LP-2025-089) a cargo de Pavimentos S.A. por           │
│   $1,200M COP. La obra NO cuenta con:                    │
│   • Interventoría registrada en SECOP                    │
│   • PMT (Plan de Manejo de Tráfico) aprobado             │
│   • Informes de supervisión al día (>45 días)            │
│                                                          │
│   2. ENTIDAD RESPONSABLE                                 │
│   Alcaldía Municipal — Secretaría de Obras Públicas      │
│   Contratista: Pavimentos S.A. (NIT 900.123.456-7)      │
│                                                          │
│   3. NORMAS POSIBLEMENTE VIOLADAS                        │
│   • Ley 80/1993, Art. 32 — Deber de interventoría        │
│   • Ley 1474/2011, Art. 83 — Supervisión obligatoria     │
│   • Decreto 1082/2015 — Publicación en SECOP             │
│                                                          │
│   4. RIESGOS DETECTADOS                                  │
│   🔴 Crítico: Sin interventoría — posible detrimento     │
│   🟠 Alto: Supervisión desactualizada                    │
│   🟡 Medio: Obra sin PMT — riesgo para peatones          │
│                                                          │
│   5. ACCIÓN SUGERIDA                                     │
│   Radicar derecho de petición ante la Alcaldía           │
│   solicitando: (a) designación de interventor,           │
│   (b) publicación de informes atrasados,                 │
│   (c) copia del PMT aprobado.                            │
│                                                          │
│   📄 Este informe se generó automáticamente con datos    │
│   del SECOP II y guías de la Contraloría General.        │
│   Generado por Veeduría Ciudadana — app.trabajou.com     │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 5. FORMATO DE INFORME DETALLADO (5-10 páginas)

```
┌──────────────────────────────────────────────────────────┐
│   INFORME DETALLADO DE VEEDURÍA CIUDADANA                │
│   No. VEE-20260809-0001-D                                │
│   (Anexo al Informe Ejecutivo VEE-20260809-0001)         │
│━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│                                                          │
│   SECCIÓN A — DATOS DEL CASO                             │
│   A.1 Identificación del reportante                      │
│   A.2 Ubicación precisa (coordenadas, dirección)         │
│   A.3 Fecha del reporte y de la observación              │
│   A.4 Evidencia fotográfica (máx 4 imágenes)             │
│                                                          │
│   SECCIÓN B — DATOS DEL CONTRATO (fuente: SECOP II)      │
│   B.1 Número de proceso y año                            │
│   B.2 Objeto contractual completo                        │
│   B.3 Entidad contratante (nombre, NIT, secretaría)      │
│   B.4 Contratista (nombre, NIT, representante legal)     │
│   B.5 Valor total y adiciones (si las hay)               │
│   B.6 Fecha de inicio, plazo, fecha de terminación       │
│   B.7 Estado actual en SECOP                             │
│                                                          │
│   SECCIÓN C — ANÁLISIS NORMATIVO                         │
│   C.1 Normas aplicables por tipo de obra                 │
│   C.2 Guías de contraloría pertinentes                   │
│   C.3 Sentencias relacionadas (si existen)               │
│                                                          │
│   SECCIÓN D — CRUCE: NORMA vs REALIDAD                   │
│   ┌──────────┬──────────────┬──────────────┬──────────┐  │
│   │ Requisito│ Exigido por   │ Observado     │ Cumple?  │  │
│   ├──────────┼──────────────┼──────────────┼──────────┤  │
│   │Intervent.│ Ley 80/93     │ No registrado │ ❌ NO    │  │
│   │PMT       │ Res. 123/15   │ No encontrado │ ❌ NO    │  │
│   │Supervis. │ Ley 1474/11   │ >45 días      │ ⚠️ PARCIAL│  │
│   │Pólizas   │ Dec. 1082/15  │ Sin verificar │ ? NO INFO│  │
│   └──────────┴──────────────┴──────────────┴──────────┘  │
│                                                          │
│   SECCIÓN E — SEÑALAMIENTO DE RESPONSABLES               │
│   ┌──────────────────┬─────────────────────────────────┐ │
│   │ Actor             │ Responsabilidad concreta         │ │
│   ├──────────────────┼─────────────────────────────────┤ │
│   │ Alcalde Municipal │ Ordenador del gasto (Ley 80)    │ │
│   │ Secretario Obras  │ Supervisor del contrato          │ │
│   │ Pavimentos S.A.   │ Ejecutor sin interventoría       │ │
│   │ Interventor (vac.)│ Cargo vacante o no designado     │ │
│   └──────────────────┴─────────────────────────────────┘ │
│                                                          │
│   SECCIÓN F — MAPA DE RIESGOS (8 dimensiones)           │
│   F.1 Físicos — mala calidad de obra                     │
│   F.2 Administrativos — falta de supervisión             │
│   F.3 Económicos — posible sobrecosto                    │
│   F.4 Sociales — riesgo peatonal sin PMT                 │
│   F.5 Financieros — pólizas sin verificar                │
│   F.6 Contables — registros desactualizados              │
│   F.7 Operativos — sin interventoría                     │
│   F.8 Laborales — sin verificar                         │
│                                                          │
│   SECCIÓN G — RECOMENDACIONES Y ACCIONES                │
│   G.1 Acciones urgentes (<7 días)                        │
│   G.2 Acciones mediano plazo (<30 días)                  │
│   G.3 Entidades a notificar (Personería, Contraloría)   │
│                                                          │
│   SECCIÓN H — FUENTES Y METODOLOGÍA                     │
│   H.1 Fuentes de datos consultadas                       │
│   H.2 Normas y guías aplicadas                           │
│   H.3 Herramienta utilizada (Veeduría Ciudadana v0.1)   │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 6. CHECKLIST DE OBRA PÚBLICA MUNICIPAL

> Basado en: GAT v4 (Contraloría General), Ley 80/1993, Decreto 1082/2015

| # | Requisito | Norma base | ¿Cumple? | Evidencia |
|---|-----------|-----------|-----------|-----------|
| **FASE PRE-CONTRACTUAL** ||||
| 1 | Plan de Desarrollo Municipal incluye la obra | Ley 152/94 | ☐ | |
| 2 | Estudio previo / de factibilidad publicado | Ley 80/93 Art. 25 | ☐ | |
| 3 | Presupuesto oficial estimado y aprobado | Dec. 111/96 | ☐ | |
| 4 | Proceso licitatorio publicado en SECOP | Ley 1150/07 | ☐ | |
| 5 | Pliegos definitivos con especificaciones técnicas | Ley 80/93 | ☐ | |
| 6 | Evaluación de ofertas documentada y pública | Ley 1150/07 | ☐ | |
| **FASE CONTRACTUAL** ||||
| 7 | Contrato firmado y publicado en SECOP | Dec. 1082/15 | ☐ | |
| 8 | Acta de inicio firmada (contratista + supervisor + interventor) | Ley 80/93 | ☐ | |
| 9 | Interventoría designada (interna o externa) | Ley 80/93 Art. 32 | ☐ | |
| 10 | Póliza de cumplimiento vigente | Dec. 1082/15 | ☐ | |
| 11 | Póliza de estabilidad de obra vigente | Dec. 1082/15 | ☐ | |
| 12 | Póliza de responsabilidad civil extracontractual | Dec. 1082/15 | ☐ | |
| 13 | Plan de Manejo de Tráfico (PMT) aprobado | Res. Movilidad local | ☐ | |
| 14 | Licencia de construcción vigente | Dec. 1077/15 | ☐ | |
| 15 | Permiso de ocupación de vía (si aplica) | Código de Policía | ☐ | |
| **FASE DE EJECUCIÓN** ||||
| 16 | Señalización reglamentaria instalada | Norma técnica | ☐ | |
| 17 | Cerramiento perimetral completo | Norma seguridad | ☐ | |
| 18 | Informes de supervisión mensuales publicados | Ley 1474/11 | ☐ | |
| 19 | Informes de interventoría publicados | Ley 1474/11 | ☐ | |
| 20 | Modificaciones contractuales (adiciones, prórrogas) en SECOP | Dec. 1082/15 | ☐ | |
| 21 | Avance físico vs programado documentado | Contrato | ☐ | |
| 22 | Pagos realizados vs avance certificado | Contrato | ☐ | |
| 23 | Especificaciones técnicas cumplidas (INVIAS/IDU) | Pliegos | ☐ | |
| **FASE DE CIERRE** ||||
| 24 | Acta de terminación / recibo final firmada | Ley 80/93 | ☐ | |
| 25 | Acta de liquidación del contrato | Ley 80/93 | ☐ | |
| 26 | Garantías post-entrega vigentes | Contrato | ☐ | |

### Leyenda de marcación automática:
- ✅ **Cumple** — Evidencia encontrada y verificada en SECOP
- ❌ **No cumple** — Requisito ausente o evidencia no encontrada
- ⚠️ **Parcial** — Evidencia existe pero incompleta o desactualizada
- ? **No verificable** — Sin acceso a la información

---

## 7. MAPA DE RIESGOS — 8 Dimensiones

| Dimensión | Qué evalúa | Señales de alerta |
|-----------|-----------|-------------------|
| **Físicos** | Calidad, seguridad estructural | Sin interventoría técnica, materiales no certificados |
| **Administrativos** | Procesos, documentación | Contrato sin acta de inicio, informes atrasados |
| **Económicos** | Costo-beneficio, precios | Valor muy por encima del presupuesto oficial, adiciones frecuentes |
| **Sociales** | Impacto comunidad | Sin PMT, sin socialización, afecta población vulnerable |
| **Financieros** | Flujo de pagos, garantías | Pagos sin avance certificado, pólizas vencidas |
| **Contables** | Registros, trazabilidad | Estados financieros no publicados, inconsistencia en valores |
| **Operativos** | Ejecución, logística | Equipos insuficientes, personal no calificado |
| **Laborales** | Trabajadores, seguridad | Sin ARL, sin dotación, jornadas excesivas |

---

## 8. PLAN DE MIGRACIÓN A BD EXTERNA

> **Principio**: La herramienta final NO dependerá de nuestra infraestructura. El vault solo conservará documentación de arquitectura.

### Ruta de migración

```
FASE 1 — Ahora (boseto v0.1)
  ├─ Todo en este vault + código local
  ├─ Checklist, fuentes y lógica: archivos estáticos
  └─ Mockups y flujos: documentación

FASE 2 — Tras validación con cliente
  ├─ Migrar checklist → tabla PostgreSQL `checklist_items`
  ├─ Migrar normograma → tabla `normas` (código, ley, artículos, texto)
  ├─ Migrar flujos → tabla `workflows` (tipo_caso, pasos, normas_aplicables)
  └─ Migrar jurisprudencia → tabla `sentencias` (corte, fecha, resumen, texto)

FASE 3 — BD productiva (fuera de nuestro sistema)
  ├─ PostgreSQL en Neon/Supabase/Railway (cliente elige)
  ├─ Schema completo con migraciones versionadas
  ├─ API REST para consultas (Next.js API routes o Express)
  └─ Sistema de autenticación propio (Auth.js / Clerk / Lucia)

DATOS QUE VAN A BD EXTERNA:
  ✅ Checklist, normas, flujos, sentencias
  ✅ Usuarios, casos, informes generados
  ✅ Historial de consultas y peticiones
  ❌ Documentación de arquitectura → vault (máx 10 archivos)
  ❌ Código fuente → GitHub del cliente
```

---

## 9. PRÓXIMOS PASOS — Para validar con cliente

- [ ] Cliente revisa el flujo "hueco en la calle" — ¿refleja la visión?
- [ ] Cliente revisa los 2 formatos de informe — ¿suficiente detalle?
- [ ] Cliente revisa el checklist (26 ítems) — ¿faltan requisitos?
- [ ] Cliente indica cuál es la PRIMERA entidad (alcaldía) con la que quiere probar
- [ ] Definir alcance del prototipo funcional (¿1 sola alcaldía? ¿1 tipo de obra?)
- [ ] Cliente proporciona contactos de entidades para obtener normogramas
- [ ] Definir stack final: ¿Next.js + PostgreSQL? ¿React Native para app móvil?
- [ ] Estimar tiempo de desarrollo de la fase 2 (post-boseto)
