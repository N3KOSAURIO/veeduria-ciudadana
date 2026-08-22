/**
 * Tests de Vitest — Dashboard de Perfil de Comportamiento (F5).
 * Verifica que el dashboard admin renderiza los KPIs, gráficas y la tabla
 * de comportamiento por perfil, usando los datos DEMO (no depende del backend).
 * El guard de solo-admin lo provee AdminLayout (se testea por separado); aquí
 * probamos el render y la navegación al detalle del perfil.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PerfilComportamiento from './PerfilComportamiento.jsx';
import PerfilUsuario from './PerfilUsuario.jsx';
import { metricasComportamientoDemo } from '../../services/admin/metricasComportamiento.js';

// Mock de useUser (el guard real es AdminLayout; aquí solo aporta user por si se usa).
vi.mock('../../context/UserContext.jsx', () => ({
  useUser: () => ({ user: { role: 'admin' }, isAuthenticated: true, isAdmin: true }),
}));

// Mock de Header para no arrastrar dependencias de navegación del layout.
vi.mock('../../components/Header.jsx', () => ({
  default: () => <header data-testid="header-mock" />,
}));

describe('Dashboard Perfil de Comportamiento (F5)', () => {
  beforeEach(() => {});

  it('renderiza los KPIs con valores de los datos DEMO', () => {
    render(
      <MemoryRouter>
        <PerfilComportamiento />
      </MemoryRouter>
    );
    // Título
    expect(screen.getByText('Perfil de Comportamiento')).toBeInTheDocument();
    // Valor único del KPI total (1.248 formateado, no colisiona)
    expect(screen.getByText(metricasComportamientoDemo.total_eventos.toLocaleString('es-CO'))).toBeInTheDocument();
    // Etiquetas de KPIs (los valores numéricos y algunas etiquetas colisionan,
    // así que usamos getAllByText que tolera la duplicación del texto).
    expect(screen.getAllByText('Total eventos').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Usuarios activos').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Eventos hoy').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Servicios usados').length).toBeGreaterThan(0);
  });

  it('renderiza las cabeceras de las gráficas', () => {
    render(
      <MemoryRouter>
        <PerfilComportamiento />
      </MemoryRouter>
    );
    expect(screen.getByText('Tipo de comportamiento')).toBeInTheDocument();
    expect(screen.getByText('Uso por servicio')).toBeInTheDocument();
    expect(screen.getByText('Actividad en el tiempo (7 días)')).toBeInTheDocument();
  });

  it('renderiza la tabla de comportamiento por perfil de usuario', () => {
    render(
      <MemoryRouter>
        <PerfilComportamiento />
      </MemoryRouter>
    );
    expect(screen.getByText('Comportamiento por perfil de usuario')).toBeInTheDocument();
    // Cada perfil ficticio debe verse en la tabla
    const perfil0 = metricasComportamientoDemo.por_perfil[0];
    expect(screen.getByText(perfil0.nombre)).toBeInTheDocument();
  });

  it('marca claramente los datos como DEMO/ficticios', () => {
    render(
      <MemoryRouter>
        <PerfilComportamiento />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/DEMO.*ficticios|ficticio/i).length).toBeGreaterThan(0);
  });
});

describe('Detalle de Perfil de Usuario (F5)', () => {
  it('muestra el perfil de un usuario y su historial desde la ruta', () => {
    const perfil = metricasComportamientoDemo.por_perfil[0];
    render(
      <MemoryRouter initialEntries={['/admin/perfil-comportamiento/usuarios/u-01']}>
        <Routes>
          <Route path="/admin/perfil-comportamiento/usuarios/:userId" element={<PerfilUsuario />} />
        </Routes>
      </MemoryRouter>
    );
    // Nombre + datos del perfil (email concatena con la ciudad en un solo nodo)
    expect(screen.getByText(perfil.nombre)).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes(perfil.email))).toBeInTheDocument();
    expect(screen.getByText('Historial de comportamiento (activity_log)')).toBeInTheDocument();
    // Un evento del historial ficticio de u-01
    expect(screen.getByText(/Consulta sobre contratación estatal/)).toBeInTheDocument();
  });

  it('muestra "perfil no encontrado" para un id inexistente', () => {
    render(
      <MemoryRouter initialEntries={['/admin/perfil-comportamiento/usuarios/no-existe']}>
        <Routes>
          <Route path="/admin/perfil-comportamiento/usuarios/:userId" element={<PerfilUsuario />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/perfil no encontrado/i)).toBeInTheDocument();
  });
});
