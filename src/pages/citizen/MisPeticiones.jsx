import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext.jsx';
import Header from '../../components/Header.jsx';
import {
  obtenerPeticiones,
  actualizarPeticion,
  diasTranscurridos,
  calcularEstado,
  getEstadoInfo,
} from '../../utils/radicadoSystem.js';
import { analizarRespuesta, analizarPlazos } from '../../utils/responseAnalyzer.js';

export default function MisPeticiones() {
  const { user } = useUser();
  const navigate = useNavigate();

  // Routing directo con React Router (reemplaza el onNavigate del PageWrapper)
  const onNavigate = (target) => {
    const routes = {
      landing: '/',
      inicio: '/inicio',
      dashboard: '/admin',
      chat: '/chat',
      perfil: '/perfil',
      planes: '/planes',
      'mis-peticiones': '/mis-peticiones',
      login: '/login',
      registro: '/registro',
      terminos: '/terminos',
      privacidad: '/privacidad',
      cookies: '/cookies',
      ajustes: '/ajustes',
      informacion: '/informacion',
      pqr: '/pqr',
    };
    navigate(routes[target] || '/');
  };

  const [peticiones, setPeticiones] = useState([]);
  const [selected, setSelected] = useState(null);
  const [respuestaText, setRespuestaText] = useState('');
  const [cargandoRespuesta, setCargandoRespuesta] = useState(false);

  useEffect(() => {
    setPeticiones(obtenerPeticiones());
  }, []);

  const handleCargarRespuesta = (peticion) => {
    setSelected(peticion);
    setRespuestaText(peticion.respuestaTexto || '');
  };

  const handleAnalizar = () => {
    if (!selected || !respuestaText.trim()) return;

    setCargandoRespuesta(true);

    setTimeout(() => {
      const analisis = analizarRespuesta({
        peticionOriginal: selected.peticion,
        respuestaEntidad: respuestaText,
      });

      const plazos = analizarPlazos(selected.fecha);

      actualizarPeticion(selected.radicado, {
        respuestaCargada: true,
        respuestaTexto: respuestaText,
        respuestaAnalizada: true,
        respuestaAnalisis: { ...analisis, plazos },
      });

      setPeticiones(obtenerPeticiones());
      setCargandoRespuesta(false);
      setSelected(null);
      setRespuestaText('');
    }, 500);
  };

  const handleVerDocumento = (peticion) => {
    // Abrir en nueva ventana el documento generado
    const blob = new Blob([peticion.documento], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const handleEliminar = (radicado) => {
    if (!confirm('¿Eliminar esta petición?')) return;
    const nuevas = peticiones.filter(p => p.radicado !== radicado);
    localStorage.setItem('veeduria_peticiones', JSON.stringify(nuevas));
    setPeticiones(nuevas);
    setSelected(null);
  };

  if (selected && !cargandoRespuesta) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header showClose onClose={() => setSelected(null)}>
          <span className="text-xs text-blue-200">Cargar respuesta</span>
        </Header>

        <div className="flex-1 p-4 max-w-2xl mx-auto w-full space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <h2 className="font-semibold text-azul-oscuro">
              📋 {selected.asunto}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Radicado: {selected.radicado} • {selected.entidad}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Radicada: {new Date(selected.fecha).toLocaleDateString('es-CO')} ({diasTranscurridos(selected.fecha)} días)
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Pegá el texto de la respuesta de la entidad:
            </label>
            <textarea
              value={respuestaText}
              onChange={(e) => setRespuestaText(e.target.value)}
              placeholder="Pegá acá el contenido del oficio, correo o documento que te respondió la entidad..."
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio resize-none"
              autoFocus
            />
            <p className="text-xs text-gray-400 mt-1">
              También podés volver al chat, adjuntar el PDF/imagen de la respuesta y pegar el análisis acá.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAnalizar}
              disabled={!respuestaText.trim()}
              className="flex-1 px-4 py-2 bg-azul-oscuro hover:bg-azul-medio text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
            >
              🔍 Analizar respuesta
            </button>
            <button
              onClick={() => setSelected(null)}
              className="px-4 py-2 border border-gray-300 hover:bg-gray-100 text-gray-600 rounded-xl transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header showClose onClose={() => onNavigate(user?.isAdmin ? 'dashboard' : 'chat')}>
        <button
          onClick={() => onNavigate(user?.isAdmin ? 'dashboard' : 'chat')}
          className="text-xs text-blue-200 hover:text-white"
        >
          ← {user?.isAdmin ? 'Panel' : 'Chat'}
        </button>
      </Header>

      <div className="flex-1 p-4 max-w-3xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-azul-oscuro">📋 Mis Peticiones</h1>
          <button
            onClick={() => onNavigate('chat')}
            className="px-3 py-1.5 bg-dorado hover:bg-dorado-hover text-white text-sm font-semibold rounded-xl transition-colors"
          >
            + Nueva petición
          </button>
        </div>

        {peticiones.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-5xl">📭</span>
            <p className="text-gray-400 mt-4">No tenés peticiones todavía.</p>
            <p className="text-sm text-gray-500 mt-1">
              Volvé al chat y seleccioná "Radicar derecho de petición" para crear la primera.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {peticiones.map((p) => {
              const estado = calcularEstado(p);
              const estadoInfo = getEstadoInfo(estado);
              const dias = diasTranscurridos(p.fecha);

              return (
                <div
                  key={p.radicado}
                  className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow transition-shadow"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm">{estadoInfo.icon}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${estadoInfo.color}`}>
                          {estadoInfo.label}
                        </span>
                        <span className="text-xs text-gray-400">
                          {dias} día{dias !== 1 ? 's' : ''}
                        </span>
                      </div>

                      <h3 className="font-semibold text-azul-oscuro mt-1 truncate">
                        {p.asunto}
                      </h3>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {p.entidad} • Rad. {p.radicado}
                      </p>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                        {p.descripcion}
                      </p>
                    </div>
                  </div>

                  {/* Análisis de respuesta */}
                  {p.respuestaAnalizada && p.respuestaAnalisis && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm font-semibold">{p.respuestaAnalisis.titulo}</p>
                      <p className="text-xs text-gray-600 mt-1 whitespace-pre-line">
                        {p.respuestaAnalisis.resumen}
                      </p>
                      {p.respuestaAnalisis.plazos && (
                        <p className="text-xs text-gray-500 mt-2">{p.respuestaAnalisis.plazos.mensaje}</p>
                      )}
                      {p.respuestaAnalisis.siguientesPasos && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <p className="text-xs font-medium text-gray-700 mb-1">Siguientes pasos:</p>
                          {p.respuestaAnalisis.siguientesPasos.map((paso, i) => (
                            <p key={i} className="text-xs text-gray-600 leading-relaxed">{paso}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Acciones */}
                  <div className="flex gap-2 mt-3 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => handleVerDocumento(p)}
                      className="text-xs text-azul-medio hover:underline"
                    >
                      📄 Ver documento
                    </button>
                    {!p.respuestaCargada && (
                      <button
                        onClick={() => handleCargarRespuesta(p)}
                        className="text-xs text-dorado hover:underline"
                      >
                        📬 Cargar respuesta
                      </button>
                    )}
                    {p.respuestaCargada && !p.respuestaAnalizada && (
                      <button
                        onClick={() => handleCargarRespuesta(p)}
                        className="text-xs text-purple-600 hover:underline"
                      >
                        🔍 Analizar respuesta
                      </button>
                    )}
                    <button
                      onClick={() => handleEliminar(p.radicado)}
                      className="text-xs text-red-400 hover:underline ml-auto"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
