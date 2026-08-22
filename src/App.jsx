import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout.jsx';
import CitizenLayout from './layouts/CitizenLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import Landing from './pages/public/Landing.jsx';
import Inicio from './shell/pages/Inicio.jsx';
import ServiceRouter from './shell/pages/ServiceRouter.jsx';
import Login from './pages/public/Login.jsx';
import Registro from './pages/public/Registro.jsx';
import Terminos from './pages/public/Terminos.jsx';
import Privacidad from './pages/public/Privacidad.jsx';
import Cookies from './pages/public/Cookies.jsx';
import Chat from './pages/citizen/Chat.jsx';
import Perfil from './pages/citizen/Perfil.jsx';
import MisPeticiones from './pages/citizen/MisPeticiones.jsx';
import Derivacion from './pages/citizen/Derivacion.jsx';
import Planes from './pages/citizen/Planes.jsx';
import Checkout from './pages/citizen/Checkout.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import ClientProfile from './pages/admin/ClientProfile.jsx';
import AdminAjustes from './pages/admin/Ajustes.jsx';
import Informacion from './pages/public/Informacion.jsx';
import PQR from './pages/citizen/PQR.jsx';
import CitizenAjustes from './pages/citizen/Ajustes.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas — Landing central comunitaria (lee services.json) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/informacion" element={<Informacion />} />
        </Route>

        {/* Shell — Inicio (hogar post-login) y router de servicios */}
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/servicios/:id" element={<ServiceRouter />} />

        {/* Ciudadano */}
        <Route element={<CitizenLayout />}>
          <Route path="/chat" element={<Chat />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/mis-peticiones" element={<MisPeticiones />} />
          <Route path="/derivacion/:flowId?" element={<Derivacion />} />
          <Route path="/planes" element={<Planes />} />
          <Route path="/checkout/:planId?" element={<Checkout />} />
          <Route path="/pqr" element={<PQR />} />
          <Route path="/ajustes" element={<CitizenAjustes />} />
        </Route>

        {/* Admin */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/clients/:clientId" element={<ClientProfile />} />
          <Route path="/admin/ajustes" element={<AdminAjustes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
