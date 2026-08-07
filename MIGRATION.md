# Veeduría Ciudadana — Plan de Migración a Producción

> **Versión:** 1.0 — 2026-08-07
> **Estado actual:** Beta funcional (demo) en Vercel
> **Objetivo:** Migrar de simulacro a plataforma real con datos reales, pagos reales, y backend propio

---

## Arquitectura actual (Beta)

```
[Usuario] → [Vercel - React SPA]
               ├── Login/Registro (localStorage, simulado)
               ├── Chatbot (12 flujos, keyword matching, sin IA)
               ├── Dashboard Admin (datos ficticios)
               ├── Planes/Pagos (simulados, 3 métodos falsos)
               └── Perfiles (metadatos simulados)

Todo frontend. Cero backend. Datos en localStorage del navegador.
```

---

## Arquitectura objetivo (Producción)

```
[Usuario] → [Frontend - Next.js/React]
               │
               ▼
[Backend API - FastAPI / Express]
               │
               ├── PostgreSQL (usuarios, consultas, pagos, planes)
               ├── Redis (sesiones, caché)
               ├── Pasarela de pagos real (Wompi / MercadoPago / Stripe)
               ├── Email (SendGrid / Resend)
               └── File storage (S3 / Cloudinary para facturas)
```

---

## Fase 1: Base de datos (semana 1-2)

### 1.1. Schema PostgreSQL

Reemplazar localStorage con tablas reales:

```sql
-- Usuarios reales
CREATE TABLE usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(200) NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  ciudad VARCHAR(100),
  plan VARCHAR(20) DEFAULT 'gratis',       -- gratis, pro, premium
  is_admin BOOLEAN DEFAULT false,
  consultas_realizadas INTEGER DEFAULT 0,
  tos_accepted_at TIMESTAMP,
  tos_version VARCHAR(10),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Sesiones reales (JWT tokens en vez de localStorage)
CREATE TABLE sesiones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  token_hash VARCHAR(255) NOT NULL,
  ip VARCHAR(45),
  user_agent TEXT,
  dispositivo VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL
);

-- Consultas del chatbot
CREATE TABLE consultas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  consulta_texto TEXT NOT NULL,
  flujo_id VARCHAR(5),                      -- 01-12
  respuesta_texto TEXT NOT NULL,
  derivado_consultoria BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Pagos reales
CREATE TABLE pagos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  plan VARCHAR(20) NOT NULL,                -- pro, premium
  monto INTEGER NOT NULL,                   -- en COP
  metodo VARCHAR(20),                       -- tarjeta, pse, efectivo, transferencia
  estado VARCHAR(20) DEFAULT 'pendiente',   -- pendiente, completado, fallido, reembolsado
  factura_numero VARCHAR(50) UNIQUE,
  pasarela_id VARCHAR(200),                 -- ID de Wompi/MercadoPago
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Formularios de derivación a consultoría
CREATE TABLE derivaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consulta_id UUID REFERENCES consultas(id),
  usuario_id UUID REFERENCES usuarios(id),
  nombre VARCHAR(200),
  correo VARCHAR(200),
  telefono VARCHAR(20),
  ciudad VARCHAR(100),
  flujo_id VARCHAR(5),
  estado VARCHAR(20) DEFAULT 'pendiente',   -- pendiente, contactado, cerrado
  created_at TIMESTAMP DEFAULT NOW()
);

-- Cookies consentimiento (GDPR-like)
CREATE TABLE consentimientos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  tipo VARCHAR(50),                          -- cookies, tos, privacidad
  aceptado BOOLEAN,
  version VARCHAR(10),
  ip VARCHAR(45),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 1.2. Migrar datos ficticios a seed data

Los 15 clientes de `fakeClients.js` se convierten en `INSERT INTO usuarios` con `password_hash` dummy. Los 20 pagos de `fakePayments.js` se convierten en `INSERT INTO pagos`.

### 1.3. Hosting de BD

- **Desarrollo:** Neon PostgreSQL (gratis, serverless)
- **Producción:** AWS RDS o Railway PostgreSQL

---

## Fase 2: Backend API (semana 2-3)

### 2.1. Endpoints a implementar

| Método | Ruta | Función | Prioridad |
|--------|------|---------|-----------|
| POST | `/api/auth/register` | Registro con hash bcrypt | Crítico |
| POST | `/api/auth/login` | Login → JWT token | Crítico |
| POST | `/api/auth/logout` | Invalidar sesión | Crítico |
| GET | `/api/user/me` | Datos del usuario autenticado | Crítico |
| PUT | `/api/user/me` | Actualizar perfil | Crítico |
| GET | `/api/chat/query` | Procesar consulta → respuesta | Crítico |
| POST | `/api/chat/query` | Guardar consulta en BD | Crítico |
| GET | `/api/planes` | Listar planes disponibles | Alta |
| POST | `/api/pagos/crear` | Iniciar pago (Wompi/MercadoPago) | Alta |
| POST | `/api/pagos/webhook` | Recibir confirmación de pasarela | Alta |
| POST | `/api/derivaciones` | Guardar formulario de consultoría | Alta |
| GET | `/api/admin/dashboard` | Métricas del panel admin | Alta |
| GET | `/api/admin/clientes` | Lista de clientes (admin) | Media |
| GET | `/api/admin/cliente/:id` | Perfil detallado de cliente (admin) | Media |

### 2.2. Stack backend sugerido

```
FastAPI (Python) o Express (Node.js)
  + SQLAlchemy / Prisma ORM
  + JWT (PyJWT / jsonwebtoken)
  + bcrypt (passlib / bcryptjs)
  + CORS configurado para el dominio del frontend
```

### 2.3. Seguridad

- ✅ HTTPS en todo (Vercel + backend)
- ✅ CORS solo para el dominio de la app
- ✅ Rate limiting en `/api/auth/login` (5 intentos por IP por minuto)
- ✅ Validación de input en todos los endpoints
- ✅ Sanitización de consultas SQL (usar ORM, no queries crudas)
- ✅ Secrets en variables de entorno (NUNCA en código)
- ✅ JWT con expiración (24h) + refresh token (7 días)

---

## Fase 3: Pagos reales (semana 3)

### 3.1. Pasarela recomendada para Colombia

**Wompi** (de Bancolombia) — mejor integración para mercado colombiano:
- Acepta tarjetas, PSE, Nequi, efectivo (Baloto/Efecty)
- Comisión: ~3.5% + $1.000 COP por transacción
- Documentación: https://docs.wompi.co
- Sandbox gratuito para pruebas

Alternativa: **MercadoPago** — también excelente en Colombia, comisiones similares.

### 3.2. Flujo de pago real

```
1. Usuario elige plan → frontend manda POST /api/pagos/crear
2. Backend crea referencia de pago en Wompi → devuelve URL de checkout
3. Usuario paga en Wompi → Wompi manda webhook a /api/pagos/webhook
4. Backend verifica firma del webhook → actualiza usuario.plan → responde 200
5. Frontend detecta cambio de plan → muestra pantalla de éxito
```

### 3.3. Planes y precios reales

Confirmar con el cliente los precios finales. Sugerencia:

| Plan | Precio COP/mes | Qué incluye |
|------|---------------|-------------|
| Ciudadano | Gratis | 5 consultas/mes, respuestas básicas |
| Pro | $89.000 | Consultas ilimitadas, informes ejecutivos, historial |
| Premium | $199.000 | Todo Pro + informes detallados, asesoría 1h/mes, consultor dedicado |

---

## Fase 4: Chatbot con IA real (semana 4, opcional)

Cuando el volumen de consultas supere los 12 flujos predefinidos:

### 4.1. Arquitectura híbrida sugerida

```
Input usuario
    │
    ▼
[Motor de reglas] — rápido, gratuito, sin IA
    │
    ├── ¿Match > 80%? → Respuesta predefinida (flujos existentes)
    │
    └── ¿Sin match? → Consulta a LLM (OpenAI / Claude / Llama)
                        con RAG sobre la BD de leyes colombianas
```

### 4.2. RAG sobre leyes colombianas

- Indexar las 5 leyes + 4 sentencias + 3 guías en una vector DB (Pinecone / pgvector)
- Cada consulta → embedding search → top-3 fragmentos relevantes → LLM genera respuesta
- Costo estimado: ~$0.01 USD por consulta con GPT-4o-mini (~$50/mes para 5000 consultas)

---

## Fase 5: Dominio, hosting, producción (semana 4)

### 5.1. Dominio

Comprar dominio propio (ej: `veeduria.co` o `veeduría.com.co`). Proveedores:
- GoDaddy Colombia
- Namecheap
- Mi.com.co (Neubox)

### 5.2. Hosting

| Componente | Beta | Producción |
|-----------|------|-----------|
| Frontend | Vercel (gratis) | Vercel Pro ($20/mes) o mismo Vercel gratis |
| Backend | No existe | Railway / Fly.io / Render ($25/mes) |
| BD | localStorage | Neon / Railway PostgreSQL ($0-25/mes) |
| Pasarela | Simulada | Wompi (comisión por transacción) |

### 5.3. SSL y DNS

- Vercel provee SSL automático
- Backend necesita HTTPS (Railway/Fly.io lo dan gratis)
- Configurar DNS: `veeduria.co` → Vercel, `api.veeduria.co` → Backend

---

## Checklist de migración

### Previo a migración
- [ ] Cliente aprueba precios finales
- [ ] Cliente elige pasarela de pago (Wompi recomendado)
- [ ] Cliente compra dominio
- [ ] Cliente crea cuenta en Vercel, Railway/Neon
- [ ] Cliente configura variables de entorno (API keys, DB URL, JWT secret)

### Durante migración
- [ ] Crear schema PostgreSQL (script SQL arriba)
- [ ] Implementar backend (FastAPI o Express)
- [ ] Implementar endpoints críticos (auth, chat, planes)
- [ ] Integrar pasarela de pago en sandbox
- [ ] Probar flujo completo con tarjeta de prueba
- [ ] Adaptar frontend: cambiar localStorage → API calls
- [ ] Activar auth real (JWT, bcrypt)
- [ ] Migrar datos de seed a PostgreSQL
- [ ] Desplegar backend
- [ ] Configurar DNS y SSL
- [ ] Probar en producción con pago real

### Post-migración
- [ ] Monitorear errores (Sentry / Logtail)
- [ ] Configurar backups automáticos de BD (cada 24h)
- [ ] Activar emails transaccionales (bienvenida, factura, recuperar contraseña)
- [ ] Eliminar datos simulados de producción
- [ ] Desactivar modo demo
- [ ] Entregar credenciales al cliente

---

## Costos estimados mensuales (producción)

| Servicio | Plan | Costo/mes |
|----------|------|-----------|
| Frontend (Vercel) | Pro | $20 USD |
| Backend (Railway) | Starter | $5 USD |
| BD (Neon PostgreSQL) | Scale | $0-25 USD |
| Pasarela (Wompi) | Por transacción | ~3.5% |
| Email (Resend) | Free (100/día) | $0 |
| Dominio | Anual | ~$15 USD/año |
| **Total** | | **~$25-50 USD/mes** |

---

## Repositorios

- **Frontend:** https://github.com/N3KOSAURIO/veeduria-ciudadana
- **Backend:** (por crear)
- **BD Schema:** (este documento, sección 1.1)

---

> **Documento generado por Hermes Agent el 2026-08-07.**
> Entregar al equipo de desarrollo cuando se apruebe la migración.
