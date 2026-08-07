# Manual del Administrador — Veeduría Ciudadana

> **Versión Beta · Demo — 2026-08-07**
> **Plataforma:** https://veeduria-ciudadana.vercel.app
> **Credenciales de administrador:** admin@veeduria.com / admin123

---

## Bienvenido

Usted es el administrador de **Veeduría Ciudadana**, la plataforma que permite a cualquier colombiano fiscalizar obras, contratos y gestión pública en tiempo real.

Como administrador, usted tiene acceso al **Panel de Control**, donde puede ver todas las métricas del negocio, los clientes registrados, los pagos recibidos, y el perfil detallado de cada cliente.

> ⚠️ **Importante:** Esta es una versión DEMO/BETA. Los datos que ve son simulados con fines demostrativos. Los pagos no son reales. Los clientes son ficticios. Esta versión sirve para mostrar el concepto completo antes de construir la versión real.

---

## 1. Cómo ingresar como administrador

1. Abra https://veeduria-ciudadana.vercel.app
2. Aparecerán los Términos y Condiciones — desplácese hasta abajo y haga clic en **"Aceptar y continuar"**
3. En la página principal, haga clic en **"Iniciar sesión"** (esquina superior derecha)
4. Ingrese:
   - Correo: `admin@veeduria.com`
   - Contraseña: `admin123`
5. Será redirigido automáticamente al **Panel de Control**

---

## 2. El Panel de Control (Dashboard)

El panel muestra 4 secciones principales:

### 2.1. Tarjetas de métricas (parte superior)

| Tarjeta | Qué significa |
|---------|--------------|
| 💰 Ingresos totales | Suma de todos los pagos recibidos (simulado: ~$45M COP) |
| 👥 Clientes activos | Cuántos usuarios tiene la plataforma (simulado: 47) |
| 📋 Consultas este mes | Cuántas consultas hicieron los usuarios (simulado: 312) |
| 📈 Tasa de conversión | % de usuarios que pasaron de gratis a pago (simulado: 23%) |

### 2.2. Gráfico de ingresos mensuales

Barras que muestran la evolución de ingresos de enero a agosto 2026. Pase el mouse sobre cada barra para ver el valor exacto.

### 2.3. Actividad reciente

Columna derecha con los últimos eventos de la plataforma: consultas realizadas, nuevos registros, upgrades de plan, pagos recibidos. Cada evento muestra qué pasó y hace cuánto tiempo.

### 2.4. Accesos rápidos

Dos botones grandes:
- **💬 Nueva consulta** — abre el chatbot para hacer una consulta de prueba
- **🚀 Ver planes** — muestra los 3 planes disponibles con sus precios

---

## 3. Tabla de clientes

La tabla **"Últimos clientes registrados"** muestra 10 clientes ficticios con:

| Columna | Descripción |
|---------|-------------|
| Cliente | Nombre y correo del cliente |
| Plan | Ciudadano (gratis), Pro ($89K/mes) o Premium ($199K/mes) |
| Ciudad | Ciudad de registro |
| Registro | Fecha en que se unió |
| Valor | Cuánto paga (si es plan pago) |

### 3.1. Ver perfil de un cliente

**Haga clic en cualquier fila de cliente** para ver su perfil completo. Esta es una de las funciones más importantes del panel. El perfil del cliente muestra:

- **Datos básicos:** nombre, correo, plan, ciudad, fecha de registro, valor pagado
- **Metadatos del dispositivo:** IP simulada, ubicación, navegador, sistema operativo, resolución de pantalla, dispositivo, zona horaria, idioma
- **Cookies del cliente:** tabla con las 6 cookies que la plataforma almacena en su navegador (nombre, valor, duración, tipo)
- **Historial de sesiones:** 8 sesiones de acceso con fecha, IP, ubicación, navegador y dispositivo usado
- **Actividad de la cuenta:** 12 eventos recientes (inicios de sesión, consultas hechas, cambios de plan, etc.)

Esto simula lo que en la versión real será el expediente completo de cada cliente: quién es, desde dónde se conecta, qué hace en la plataforma, y qué cookies tiene activas.

---

## 4. Tabla de pagos

La tabla **"Últimos pagos recibidos"** muestra 10 transacciones ficticias con:

| Columna | Descripción |
|---------|-------------|
| Factura | Número de factura (FAC-2026-XXXX) |
| Cliente | Quién pagó |
| Monto | Cuánto pagó en COP |
| Método | Tarjeta, PSE, transferencia o efectivo |
| Fecha | Cuándo se realizó el pago |

---

## 5. El Chatbot de consultas

Accesible desde el botón "💬 Chat" en el panel, o desde el botón "💬 Nueva consulta". El chatbot:

1. **Responde con leyes colombianas reales:** Ley 80/1993 (contratación), Ley 850/2003 (veedurías), Ley 1712/2014 (transparencia), Ley 1474/2011 (anticorrupción), Ley 1757/2015 (participación).
2. **Siempre ofrece derivar a consultoría:** cada respuesta termina con "¿Querés que un consultor...?"
3. **Si el usuario hace clic en "Sí, quiero consultoría"** → formulario de contacto (nombre, correo, teléfono, ciudad). En la versión real, esto genera un lead que usted gestiona.

### 5.1. Temas que cubre el chatbot

| Tema | Qué responde |
|------|-------------|
| 🏗️ Obra en la calle | Checklist de verificación: ¿tiene aviso? ¿está en SECOP? ¿tiene interventor? |
| 🚨 Obra sin avisos | Qué hacer: fotos, derecho de petición, buscar en SECOP, denunciar |
| 📚 Normograma alcaldía | Leyes que rigen a las alcaldías colombianas |
| ⚖️ Derechos del ciudadano | Cómo vigilar, denunciar, formar veeduría, acceder a SECOP |
| 🎓 Estudiante | Derechos como estudiante para vigilar instituciones educativas |
| 🏥 Paciente | Derechos en salud, cómo presentar tutela |
| 📋 Auditar contrato | Checklist de 8 pasos basado en metodología de la Contraloría |
| ⚠️ Mapa de riesgos | 8 dimensiones de riesgo: físicos, administrativos, económicos, etc. |
| 🚔 Cómo denunciar | A quién acudir según el tipo de irregularidad |
| 📝 Derecho de petición | Cómo hacerlo, plazos, qué hacer si no responden |
| 🔍 Transparencia | Ley 1712/2014, acceso a información pública |

---

## 6. Planes y precios

Accesibles desde **🚀 Ver planes**. La plataforma ofrece 3 planes:

| Plan | Precio COP | Qué incluye |
|------|-----------|-------------|
| 🆓 **Ciudadano** | Gratis | 5 consultas/mes, respuestas básicas, acceso al checklist de obra pública |
| ⭐ **Pro** | $89.000/mes | Consultas ilimitadas, informes ejecutivos (2 págs), checklist de auditoría, mapa de riesgos, soporte WhatsApp |
| 👑 **Premium** | $199.000/mes | Todo lo de Pro + informes detallados con señalamiento de responsables, acompañamiento en derechos de petición y tutelas, asesoría legal 1h/mes, consultor dedicado, reportes PDF |

> En la versión beta, los pagos son **simulados**. El checkout muestra la interfaz de pago (tarjeta, efectivo, transferencia) pero no cobra nada real.

---

## 7. Documentos legales de la plataforma

Accesibles desde el footer (pie de página) en cualquier pantalla:

- **Términos y Condiciones** — 12 secciones: aceptación, descripción del servicio, registro, obligaciones del usuario, propiedad intelectual, pagos, limitación de responsabilidad, legislación colombiana, suspensión, datos personales, disposiciones generales, contacto.
- **Política de Privacidad** — basada en Ley 1581/2012 de Colombia. Detalla qué datos se recopilan, finalidad, derechos del titular, transferencia, retención (5 años).
- **Política de Cookies** — tabla con 6 cookies usadas por la plataforma (esenciales, analíticas, de preferencia).

---

## 8. Perfil de usuario

Cada usuario (incluido usted como admin) tiene un perfil accesible desde **👤 Perfil** en el panel. Contiene:

- Datos personales editables
- Plan actual con opción de cambiar
- Metadatos del dispositivo (IP, navegador, SO, resolución — reales en la versión beta)
- Historial de sesiones
- Visor de cookies activas
- Actividad de cuenta
- Opción de exportar datos (genera un archivo JSON descargable)
- Opción de eliminar cuenta (limpia datos locales)

---

## 9. Lo que esta versión NO hace (aún)

- ❌ No envía correos reales
- ❌ No procesa pagos reales
- ❌ No almacena datos en un servidor (todo queda en el navegador)
- ❌ No tiene IA generativa (el chatbot usa respuestas predefinidas)
- ❌ No tiene app móvil
- ❌ No se conecta a SECOP automáticamente
- ❌ No genera PDFs reales

Todo esto se implementará en la versión de producción. Consulte el documento **MIGRATION.md** para el plan completo de migración.

---

## 10. Próximos pasos (lo que usted debe decidir)

1. **Revisar el demo** — explore todas las pantallas. Haga clic en clientes, vea perfiles, pruebe el chatbot.
2. **Validar los precios** — ¿$89K y $199K son los precios correctos? ¿Hay que ajustar?
3. **Elegir pasarela de pago** — recomendamos Wompi (Bancolombia) para Colombia.
4. **Comprar dominio** — `veeduria.co`, `veeduría.com.co` o el que prefiera.
5. **Aprobar la migración** — cuando esté listo, pasamos del demo a la plataforma real (backend + base de datos + pagos reales).
6. **Definir el equipo de consultores** — ¿quiénes atenderán los leads que lleguen por derivación?

---

## Contacto y soporte

- **Desarrollador:** N3KOSAURIO
- **Repositorio:** https://github.com/N3KOSAURIO/veeduria-ciudadana
- **Documentación técnica:** archivo `MIGRATION.md` en el repositorio

---

> **Veeduría Ciudadana — Herramienta digital de control social ciudadano. República de Colombia.**
> Documento generado el 2026-08-07 por Hermes Agent.
