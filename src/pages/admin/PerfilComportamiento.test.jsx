/**
 * Tests de Vitest — Dashboard de Perfil de Comportamiento (F5 real, B1).
 * Verifica que el dashboard admin renderiza KPIs, gráficas y tabla de
 * comportamiento usando datos REALES de GET /api/admin/metricas (mockeado).
 * El guard de solo-admin lo provee AdminLayout; aquí probamos el render async
 * + selección de usuario + estados de error.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PerfilComportamiento from './PerfilComportamiento.jsx';
import PerfilUsuario from './PerfilUsuario.jsx';

// Mock del cliente del endpoint real (datos análogos a /api/admin/metricas).
const metricasReal = {
  total_eventos: 22,
  usuarios_activos: 2,
  eventos_hoy: 22,
  servicios_usados: 2,
  por_tipo: [
    { tipo: 'consulta', eventos: 486 },
    { tipo: 'trámite', eventos: 214 },
  ],
  por_servicio: [
    { servicio: 'veeduria', eventos: 742 },
    { servicio: 'comunidad', eventos: 506 },
  ],
  por_dia: [
    { dia: 'Sáb', eventos: 168 },
    { dia: 'Dom', eventos: 87 },
  ],
  por_perfil: [
    {
      usuario_id: 'dc32c459',
      nombre: 'María Test',
      email: 'maria@test.co',
      ciudad: 'Medellín',
      plan: 'gratis',
      eventos: 9,
      servicios_uso: ['veeduria', 'comunidad'],
      ultima_actividad: '2026-08-22T12:19:29Z',
    },
    {
      usuario_id: '7cd11314',
      nombre: 'IA Verify',
      email: 'ia@test.local',
      ciudad: '',
      plan: 'gratis',
      eventos: 13,
      servicios_uso: ['veeduria'],
      ultima_actividad: '2026-08-22T12:19:29Z',
    },
  ],
  por_perfil_detalle: {
    dc32c459: {
      total_eventos: 9,
      eventos_hoy: 9,
      servicios_usados: 2,
      por_tipo: [
        { tipo: 'consulta', eventos: 6 },
        { tipo: 'comentario', eventos: 1 },
        { tipo: 'voto', eventos: 1 },
        { tipo: 'trámite', eventos: 1 },
      ],
      por_servicio: [{ servicio: 'veeduria', eventos: 7 }, { servicio: 'comunidad', eventos: 2 }],
      por_dia: [{ dia: 'Sáb', eventos: 9 }],
    },
    '7cd11314': {
      total_eventos: 13,
      eventos_hoy: 13,
      servicios_usados: 1,
      por_tipo: [{ tipo: 'reporte', eventos: 1 }, { tipo: 'consulta', eventos: 12 }],
      por_servicio: [{ servicio: 'veeduria', eventos: 13 }],
      por_dia: [{ dia: 'Sáb', eventos: 13 }],
    },
  },
};

vi.mock('../../services/admin/adminMetrics.api.js', () => ({
  obtenerMetricasAdmin: vi.fn(() => Promise.resolve(metricasReal)),
}));

// Mock de useUser (el guard real es AdminLayout; aquí solo aporta user por si se usa).
vi.mock('../../context/UserContext.jsx', () => ({
  useUser: () => ({ user: { role: 'admin' }, isAuthenticated: true, isAdmin: true }),
}));

// Mock de Header para no arrastrar dependencias de navegación del layout.
vi.mock('../../components/Header.jsx', () => ({
  default: () => <header data-testid="header-mock" />,
}));

describe('Dashboard Perfil de Comportamiento (F5 real, B1)', () => {
  beforeEach(() => {
    // Reset del mock para cada test (cada render vuelve a prometer los datos).
    import('../../services/admin/adminMetrics.api.js').then((m) => m.obtenerMetricasAdmin.mockClear());
  });

  it('renderiza el selector de usuario con la lista de perfiles reales', async () => {
    render(
      <MemoryRouter>
        <PerfilComportamiento />
      </MemoryRouter>
    );
    // Carga inicial
    await screen.findByText('Perfil de Comportamiento');
    // Selector presente
    const select = await screen.findByLabelText('👤 Usuario a analizar');
    expect(select).toBeInTheDocument();
    // Opciones = los perfiles reales
    metricasReal.por_perfil.forEach((p) => {
      expect(screen.getByRole('option', { name: new RegExp(p.nombre) })).toBeInTheDocument();
    });
  });

  it('renderiza los KPIs del usuario seleccionado por defecto (primero)', async () => {
    render(
      <MemoryRouter>
        <PerfilComportamiento />
      </MemoryRouter>
    );
    await screen.findByText('Perfil de Comportamiento');
    const det = metricasReal.por_perfil_detalle[metricasReal.por_perfil[0].usuario_id]; // dc32c459 = 9
    // El valor total (9) aparece en el KPI y en la columna de la tabla.
    await waitFor(() => {
      expect(screen.getAllByText(det.total_eventos.toLocaleString('es-CO')).length).toBeGreaterThan(0);
    });
    expect(screen.getAllByText('Total eventos').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Eventos hoy').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Servicios usados').length).toBeGreaterThan(0);
  });

  it('al seleccionar un usuario, el KPI total cambia al de ESE usuario', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <PerfilComportamiento />
      </MemoryRouter>
    );
    await screen.findByText('Perfil de Comportamiento');
    const select = await screen.findByLabelText('👤 Usuario a analizar');
    await user.selectOptions(select, '7cd11314');
    const det = metricasReal.por_perfil_detalle['7cd11314']; // total = 13
    await waitFor(() => {
      expect(screen.getAllByText(det.total_eventos.toLocaleString('es-CO')).length).toBeGreaterThan(0);
    });
    expect(screen.getByText(/Mostrando el perfil de/)).toBeInTheDocument();
  });

  it('renderiza las cabeceras de las gráficas', async () => {
    render(
      <MemoryRouter>
        <PerfilComportamiento />
      </MemoryRouter>
    );
    await screen.findByText('Perfil de Comportamiento');
    expect(screen.getByText(/Tipo de comportamiento/)).toBeInTheDocument();
    expect(screen.getByText(/Uso por servicio/)).toBeInTheDocument();
    expect(screen.getByText('Actividad en el tiempo (7 días)')).toBeInTheDocument();
  });

  it('renderiza la tabla de usuarios con actividad real', async () => {
    render(
      <MemoryRouter>
        <PerfilComportamiento />
      </MemoryRouter>
    );
    await screen.findByText('Perfil de Comportamiento');
    expect(screen.getByText('Usuarios con actividad · comportamiento')).toBeInTheDocument();
    const perfil0 = metricasReal.por_perfil[0];
    expect(screen.getAllByText(perfil0.nombre).length).toBeGreaterThan(0);
  });

  it('muestra estado de error si la API falla', async () => {
    const { obtenerMetricasAdmin } = await import('../../services/admin/adminMetrics.api.js');
    obtenerMetricasAdmin.mockRejectedValueOnce(new Error('error_interno'));
    render(
      <MemoryRouter>
        <PerfilComportamiento />
      </MemoryRouter>
    );
    expect(await screen.findByText(/No se pudieron cargar las métricas/)).toBeInTheDocument();
  });
});

describe('Detalle de Perfil de Usuario (F5 real, B1)', () => {
  it('muestra el perfil de un usuario y sus métricas desde la ruta', async () => {
    const perfil = metricasReal.por_perfil[0];
    render(
      <MemoryRouter initialEntries={['/admin/perfil-comportamiento/usuarios/dc32c459']}>
        <Routes>
          <Route path="/admin/perfil-comportamiento/usuarios/:userId" element={<PerfilUsuario />} />
        </Routes>
      </MemoryRouter>
    );
    // Nombre + email del perfil real
    expect(await screen.findByText(perfil.nombre)).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes(perfil.email))).toBeInTheDocument();
    // KPIs
    expect(screen.getByText(/Tipo de comportamiento/)).toBeInTheDocument();
    expect(screen.getByText(/Uso por servicio/)).toBeInTheDocument();
    expect(screen.getByText(/Actividad en el tiempo/)).toBeInTheDocument();
  });

  it('muestra "perfil no encontrado" para un id sin datos', async () => {
    render(
      <MemoryRouter initialEntries={['/admin/perfil-comportamiento/usuarios/no-existe']}>
        <Routes>
          <Route path="/admin/perfil-comportamiento/usuarios/:userId" element={<PerfilUsuario />} />
        </Routes>
      </MemoryRouter>
    );
    expect(await screen.findByText(/Perfil no encontrado o sin actividad registrada/)).toBeInTheDocument();
  });
});
