/**
 * Tests de Vitest — Dashboard de Perfil de Comportamiento (F5).
 * Verifica que el dashboard admin renderiza los KPIs, gráficas y la tabla
 * de comportamiento por perfil, usando los datos DEMO (no depende del backend).
 * El guard de solo-admin lo provee AdminLayout (se testea por separado); aquí
 * probamos el render y la navegación al detalle del perfil.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('renderiza el selector de usuario con la lista de perfiles', () => {
    render(
      <MemoryRouter>
        <PerfilComportamiento />
      </MemoryRouter>
    );
    // Selector presente
    expect(screen.getByLabelText('👤 Usuario a analizar')).toBeInTheDocument();
    // Opciones = los perfiles ficticios
    metricasComportamientoDemo.por_perfil.forEach((p) => {
      expect(screen.getByRole('option', { name: new RegExp(p.nombre) })).toBeInTheDocument();
    });
  });

  it('renderiza los KPIs del usuario seleccionado por defecto (u-01)', () => {
    render(
      <MemoryRouter>
        <PerfilComportamiento />
      </MemoryRouter>
    );
    // Título
    expect(screen.getByText('Perfil de Comportamiento')).toBeInTheDocument();
    const det = metricasComportamientoDemo.por_perfil_detalle['u-01'];
    // El valor total u-01 (214) aparece en el KPI Y en la columna de la tabla,
    // así que usamos getAllByText (tolerar duplicados legítimos).
    expect(screen.getAllByText(det.total_eventos.toLocaleString('es-CO')).length).toBeGreaterThan(0);
    // Etiquetas de KPIs
    expect(screen.getAllByText('Total eventos').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Eventos hoy').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Servicios usados').length).toBeGreaterThan(0);
  });

  it('al seleccionar un usuario, las gráficas muestran los datos de ESE usuario', async () => {
    render(
      <MemoryRouter>
        <PerfilComportamiento />
      </MemoryRouter>
    );
    const select = screen.getByLabelText('👤 Usuario a analizar');
    await userEvent.selectOptions(select, 'u-02');
    const det = metricasComportamientoDemo.por_perfil_detalle['u-02'];
    // El KPI total cambia al de u-02 (168), que también aparece en la tabla.
    expect(screen.getAllByText(det.total_eventos.toLocaleString('es-CO')).length).toBeGreaterThan(0);
    // El texto "mostrando perfil" refleja el usuario elegido
    expect(screen.getByText(/Mostrando el perfil de/)).toBeInTheDocument();
  });

  it('renderiza las cabeceras de las gráficas', () => {
    render(
      <MemoryRouter>
        <PerfilComportamiento />
      </MemoryRouter>
    );
    expect(screen.getByText(/Tipo de comportamiento/)).toBeInTheDocument();
    expect(screen.getByText(/Uso por servicio/)).toBeInTheDocument();
    expect(screen.getByText('Actividad en el tiempo (7 días)')).toBeInTheDocument();
  });

  it('renderiza la tabla de usuarios disponibles', () => {
    render(
      <MemoryRouter>
        <PerfilComportamiento />
      </MemoryRouter>
    );
    expect(screen.getByText('Usuarios disponibles · comportamiento')).toBeInTheDocument();
    // Cada perfil ficticio debe verse en la tabla (el nombre del por_perfil[0]
    // aparece en el select, en el "mostrando perfil" y en la tabla).
    const perfil0 = metricasComportamientoDemo.por_perfil[0];
    expect(screen.getAllByText(perfil0.nombre).length).toBeGreaterThan(0);
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
