# Veeduría Ciudadana

Plataforma digital de control social ciudadano para Colombia.

**URL:** https://app-alpha-six-23.vercel.app
**Stack:** React 19 + Vite 8 + Tailwind CSS 4 + React Router 7

## ¿Qué es?

Herramienta que permite a cualquier ciudadano colombiano fiscalizar obras públicas, auditar contratos y ejercer sus derechos de veeduría. Responde consultas con base en leyes colombianas reales (Ley 80/1993, Ley 850/2003, Ley 1712/2014, Ley 1474/2011, Ley 1757/2015).

## Estado actual

**Beta (demo funcional).** El frontend está completo con datos simulados. No hay backend real — la autenticación y los datos se almacenan en localStorage del navegador. El plan de migración a producción está documentado en `MIGRATION.md`.

## Funcionalidades

- Chat con 16 flujos temáticos (obras, contratos, tutelas, veedurías, derechos)
- Generación de derechos de petición (documento formal listo para radicar)
- Análisis de archivos (OCR de imágenes, PDFs)
- 3 planes (Ciudadano gratis, Pro $89K, Premium $199K)
- Panel de administración con métricas
- Tema claro/oscuro
- Cookie consent granular
- Términos, Privacidad, Cookies, Información, PQR

## Estructura

```
src/
├── main.jsx              # Providers: User → TOS → Theme → App
├── App.jsx               # Router + PageWrapper
├── config/               # google.js, emailjs.js
├── context/              # UserContext, ThemeContext, TOSContext
├── services/             # auth, citizen, admin, pdf, excel, email
├── utils/                # chatEngine, petitionGenerator, fileAnalyzer
├── data/                 # flujos, planes, entidades, datos fake
├── components/           # Header, Footer, CookieBanner, ChatBubble...
├── layouts/              # PublicLayout, CitizenLayout, AdminLayout
├── pages/
│   ├── public/           # Landing, Login, Registro, Terminos, Privacidad, Cookies, Informacion
│   ├── citizen/          # Chat, Perfil, MisPeticiones, Derivacion, Planes, Checkout, PQR, Ajustes
│   └── admin/            # Dashboard, ClientProfile, Ajustes
└── assets/               # logo.svg, favicon, hero.png
```

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # producción → dist/
npm run lint     # oxlint
```

## Demo

- **Admin:** admin@veeduria.com / admin123
- **Registro:** cualquier email + contraseña (datos locales)

## Documentación

- `MIGRATION.md` — Plan de migración a backend real (PostgreSQL, JWT, pagos)
- `MANUAL-ADMIN.md` — Guía del panel de administración
- `Veeduria-Boseto-v0.1.md` — Visión arquitectónica original

## Licencia

MIT
