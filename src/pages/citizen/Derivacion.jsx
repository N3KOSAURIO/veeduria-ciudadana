import { useState } from 'react';
import { useUser } from '../../context/UserContext.jsx';
import Header from '../../components/Header.jsx';
import { descargarPDF, sugerirAsunto } from '../../services/pdf.service.js';
import { generarDocumento } from '../../utils/petitionGenerator.js';
import {
  enviarDerechoPeticion,
  isEmailJSConfigured,
} from '../../services/email.service.js';

export default function Derivacion({ onNavigate, onBack, flowId }) {
  const { user } = useUser();

  const [form, setForm] = useState({
    entidad: '',
    nombre: user?.nombre || '',
    cc: '',
    email: user?.email || '',
    telefono: user?.telefono || '',
    ciudad: user?.ciudad || '',
    direccion: '',
    descripcion: '',
    peticion: '',
    anexos: '',
  });

  const [generado, setGenerado] = useState(false);
  const [descargado, setDescargado] = useState(false);
  const [archivoGenerado, setArchivoGenerado] = useState('');
  const [error, setError] = useState('');

  // Estados de envío por correo
  const [showEnvio, setShowEnvio] = useState(false);
  const [emailEntidad, setEmailEntidad] = useState('');
  const [emailCC, setEmailCC] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [emailResult, setEmailResult] = useState(null);

  const asuntoSugerido = form.descripcion ? sugerirAsunto(form.descripcion) : '';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleGenerar = async (e) => {
    e.preventDefault();

    if (!form.entidad || !form.cc || !form.descripcion || !form.peticion) {
      setError('Los campos Entidad, Cédula, Descripción y Petición son obligatorios.');
      return;
    }

    try {
      const nombreArchivo = await descargarPDF({
        entidad: form.entidad,
        ciudad: form.ciudad || 'Colombia',
        nombre: form.nombre || 'Ciudadano',
        cc: form.cc,
        email: form.email,
        telefono: form.telefono,
        direccion: form.direccion,
        asunto: asuntoSugerido,
        descripcion: form.descripcion,
        peticion: form.peticion,
        anexos: form.anexos,
      });
      setArchivoGenerado(nombreArchivo);
      setGenerado(true);
      setDescargado(true);
    } catch (err) {
      setError('Error al generar el PDF: ' + err.message);
    }
  };

  const handleDescargarOtraVez = async () => {
    try {
      await descargarPDF({
        entidad: form.entidad,
        ciudad: form.ciudad || 'Colombia',
        nombre: form.nombre || 'Ciudadano',
        cc: form.cc,
        email: form.email,
        telefono: form.telefono,
        direccion: form.direccion,
        asunto: asuntoSugerido,
        descripcion: form.descripcion,
        peticion: form.peticion,
        anexos: form.anexos,
      });
    } catch (err) {
      setError('Error al generar el PDF: ' + err.message);
    }
  };

  const handleEnviar = async () => {
    if (!emailEntidad.trim()) {
      setEmailResult({ success: false, message: 'Ingresá el correo de la entidad destinataria.' });
      return;
    }
    setEnviando(true);
    setEmailResult(null);

    const cuerpo = generarDocumento({
      entidad: form.entidad,
      ciudad: form.ciudad || 'Colombia',
      nombre: form.nombre || 'Ciudadano',
      cc: form.cc,
      email: form.email,
      telefono: form.telefono,
      direccion: form.direccion,
      asunto: asuntoSugerido,
      descripcion: form.descripcion,
      peticion: form.peticion,
      anexos: form.anexos,
    });

    const result = await enviarDerechoPeticion({
      toEmail: emailEntidad.trim(),
      toName: form.entidad,
      subject: `Derecho de Petición — ${asuntoSugerido}`,
      body: cuerpo,
      userName: form.nombre || 'Ciudadano',
      userEmail: emailCC ? form.email : '',
      userCC: form.cc,
    });

    setEmailResult(result);
    setEnviando(false);
  };

  // === PANTALLA DE ÉXITO ===
  if (generado) {
    const emailOk = isEmailJSConfigured();
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
        <Header showClose onClose={() => onBack()}>
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('perfil')} className="text-sm text-blue-200 hover:text-white px-1" title="Perfil">
              👤
            </button>
            <button onClick={() => onNavigate('mis-peticiones')} className="text-sm text-yellow-200 hover:text-white px-1" title="Mis Peticiones">
              📋
            </button>
          </div>
        </Header>
        <main className="flex-1 flex flex-col items-center justify-center px-4 text-center max-w-md mx-auto py-8">
          <span className="text-6xl mb-4">📄</span>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">¡PDF generado!</h2>
          <p className="text-gray-600 mb-2">
            Tu derecho de petición fue generado como documento PDF.
          </p>
          <p className="text-xs text-gray-400 mb-6 font-mono break-all">
            {archivoGenerado}
          </p>

          <div className="w-full space-y-3">
            <button
              onClick={handleDescargarOtraVez}
              className="w-full py-3 bg-dorado hover:bg-dorado-hover text-white font-bold rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <span>📥</span> Descargar PDF
            </button>

            {/* Envío por correo */}
            {!showEnvio ? (
              <button
                onClick={() => setShowEnvio(true)}
                className="w-full py-3 bg-azul-oscuro hover:bg-azul-medio text-white font-bold rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <span>📧</span> Enviar por correo
              </button>
            ) : (
              <div className="bg-white rounded-xl p-4 border border-gray-200 text-left space-y-3">
                <p className="text-sm font-semibold text-gray-700">
                  Enviar derecho de petición por correo
                </p>
                {!emailOk && (
                  <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded-lg">
                    ⚠️ EmailJS no está configurado. El envío real requiere credenciales en
                    src/config/emailjs.js. Por ahora es simulación.
                  </p>
                )}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Correo de la entidad *
                  </label>
                  <input
                    type="email"
                    value={emailEntidad}
                    onChange={(e) => setEmailEntidad(e.target.value)}
                    placeholder="contacto@alcaldia.gov.co"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailCC}
                    onChange={(e) => setEmailCC(e.target.checked)}
                    className="w-4 h-4 text-azul-oscuro rounded"
                  />
                  <span className="text-xs text-gray-500">
                    Enviar copia a mi correo ({form.email})
                  </span>
                </label>

                {emailResult && (
                  <div className={`p-3 rounded-lg text-xs ${
                    emailResult.success
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    <p className="font-semibold mb-0.5">
                      {emailResult.success ? '✅ Enviado' : '⚠️ Aviso'}
                    </p>
                    <p className="whitespace-pre-line">{emailResult.message}</p>
                    {emailResult.radicado && (
                      <p className="mt-1 font-mono text-[10px] opacity-70">
                        Radicado: {emailResult.radicado}
                      </p>
                    )}
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={handleEnviar}
                    disabled={enviando || !emailEntidad.trim()}
                    className="flex-1 py-2.5 bg-azul-oscuro hover:bg-azul-medio text-white font-semibold rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                  >
                    {enviando ? (
                      <><span className="animate-spin">⏳</span> Enviando...</>
                    ) : (
                      <><span>📧</span> Enviar</>
                    )}
                  </button>
                  <button
                    onClick={() => { setShowEnvio(false); setEmailResult(null); }}
                    className="px-3 py-2.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl p-4 border border-gray-200 text-left">
              <p className="text-sm font-semibold text-gray-700 mb-2">¿Qué sigue?</p>
              <ol className="text-xs text-gray-600 space-y-1.5 list-decimal list-inside">
                <li>Descargá el PDF o envialo por correo</li>
                <li>La entidad tiene <strong>15 días hábiles</strong> para responder</li>
                <li>Guardá el radicado como comprobante</li>
              </ol>
            </div>

            <button
              onClick={() => onBack()}
              className="w-full py-2.5 bg-white border border-gray-300 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors"
            >
              ← Volver al chat
            </button>
          </div>
        </main>
      </div>
    );
  }

  // === FORMULARIO DE GENERACIÓN ===
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      <Header showClose onClose={() => onBack()}>
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('perfil')} className="text-sm text-blue-200 hover:text-white px-1" title="Perfil">
            👤
          </button>
          <button onClick={() => onNavigate('mis-peticiones')} className="text-sm text-yellow-200 hover:text-white px-1" title="Mis Peticiones">
            📋
          </button>
        </div>
      </Header>
      <main className="flex-1 flex items-start justify-center px-4 py-6">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="text-center mb-6">
            <span className="text-4xl block mb-3">📄</span>
            <h2 className="text-xl font-bold text-azul-oscuro mb-1">
              Generar Derecho de Petición
            </h2>
            <p className="text-sm text-gray-500">
              Completa los datos y genera un PDF listo para radicar.
              Basado en la Ley 1755 de 2015.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleGenerar} className="space-y-4">
            {/* ENTIDAD */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Entidad destinataria *
              </label>
              <input
                type="text"
                name="entidad"
                value={form.entidad}
                onChange={handleChange}
                required
                placeholder="Ej: Alcaldía Municipal de Bogotá"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
              />
            </div>

            {/* DATOS PERSONALES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Cédula de ciudadanía *
                </label>
                <input
                  type="text"
                  name="cc"
                  value={form.cc}
                  onChange={handleChange}
                  required
                  placeholder="Ej: 1234567890"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="tu@correo.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  placeholder="3XX XXX XXXX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Ciudad
                </label>
                <input
                  type="text"
                  name="ciudad"
                  value={form.ciudad}
                  onChange={handleChange}
                  placeholder="Bogotá, Medellín..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Dirección
                </label>
                <input
                  type="text"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                  placeholder="Calle 123 #45-67"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
                />
              </div>
            </div>

            {/* DESCRIPCIÓN DE HECHOS */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Descripción de los hechos *
              </label>
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Describí qué pasó: ¿qué obra, contrato o situación querés vigilar? Incluí fechas, lugares y nombres si los tenés."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio resize-y"
              />
              {asuntoSugerido && asuntoSugerido !== 'Derecho de Petición' && (
                <p className="text-[11px] text-azul-medio mt-1">
                  ✨ Asunto sugerido: {asuntoSugerido}
                </p>
              )}
            </div>

            {/* QUÉ SOLICITA */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                ¿Qué solicita concretamente? *
              </label>
              <textarea
                name="peticion"
                value={form.peticion}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Ej: Solicito copia del contrato de obra No. XXX, informe de avance de obra, y acta de interventoría del último trimestre."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio resize-y"
              />
            </div>

            {/* ANEXOS */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Anexos (opcional)
              </label>
              <textarea
                name="anexos"
                value={form.anexos}
                onChange={handleChange}
                rows={2}
                placeholder="Lista de documentos que adjuntas: fotos, facturas, contratos previos..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio resize-y"
              />
            </div>

            {/* LEGAL */}
            <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-800">
              <p className="font-semibold mb-1">📜 Marco legal</p>
              <p>
                Art. 23 de la Constitución Política + Ley 1755 de 2015.
                La entidad tiene <strong>15 días hábiles</strong> para responder.
                Este documento tiene validez legal como derecho de petición.
              </p>
            </div>

            {/* BOTÓN */}
            <button
              type="submit"
              className="w-full py-3.5 bg-azul-oscuro hover:bg-azul-medio text-white font-bold rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <span>📄</span> GENERAR PDF
            </button>

            <p className="text-[10px] text-gray-400 text-center">
              El PDF se descarga automáticamente. No almacenamos tus datos.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
