import { useState } from 'react';
import ChatBubble from './ChatBubble.jsx';
import { buscarEntidad, getEntidadById } from '../data/entidades.js';
import { generarDocumento, generarPreview, sugerirAsunto } from '../utils/petitionGenerator.js';
import { generarRadicado, generarADN, guardarPeticion } from '../utils/radicadoSystem.js';
import { enviarDerechoPeticion, isEmailJSConfigured } from '../utils/emailService.js';

const PASOS = {
  ENTIDAD: 'entidad',
  DESCRIPCION: 'descripcion',
  PETICION: 'peticion',
  DATOS: 'datos',
  PREVIEW: 'preview',
  ENVIANDO: 'enviando',
  RESULTADO: 'resultado',
};

export default function PetitionFlow({ onDone, user, onAddMessages, city }) {
  const [paso, setPaso] = useState(PASOS.ENTIDAD);
  const [form, setForm] = useState({
    entidadId: '',
    entidadNombre: '',
    entidadCorreo: '',
    descripcion: '',
    peticion: '',
    nombre: user?.nombre || '',
    cc: user?.cc || '',
    email: user?.email || '',
    telefono: user?.telefono || '',
    direccion: user?.ciudad || '',
    ciudad: city || 'Colombia',
  });
  const [entidadesSugeridas, setEntidadesSugeridas] = useState([]);
  const [resultado, setResultado] = useState(null);

  const addSystemMsg = (text) => {
    onAddMessages([
      { sender: 'bot', text, isSystem: true },
    ]);
  };

  const handleSearchEntidad = (query) => {
    const sugerencias = buscarEntidad(query);
    setEntidadesSugeridas(sugerencias.slice(0, 5));
  };

  const handleSelectEntidad = (entidad) => {
    const copy = entidad.correo.includes('[municipio]')
      ? entidad.correo
      : entidad.correo;

    setForm(prev => ({
      ...prev,
      entidadId: entidad.id,
      entidadNombre: entidad.nombre,
      entidadCorreo: copy,
    }));
    setPaso(PASOS.DESCRIPCION);

    const msg = `Entidad seleccionada: **${entidad.nombre}**\nCorreo: ${copy || '(ingresar manualmente)'}`;
    onAddMessages([
      { sender: 'bot', text: msg },
    ]);
  };

  const handleNext = () => {
    if (paso === PASOS.DESCRIPCION && form.descripcion) {
      const asuntoSugerido = sugerirAsunto(form.descripcion);
      setForm(prev => ({ ...prev, asunto: asuntoSugerido }));
      setPaso(PASOS.PETICION);

      if (!form.entidadId && form.descripcion) {
        handleSearchEntidad(form.descripcion);
      }
    } else if (paso === PASOS.PETICION && form.peticion) {
      setPaso(PASOS.DATOS);
    } else if (paso === PASOS.DATOS && form.nombre && form.email && form.cc) {
      setPaso(PASOS.PREVIEW);
      const preview = generarPreview({
        entidad: form.entidadNombre,
        asunto: form.asunto || sugerirAsunto(form.descripcion),
        descripcion: form.descripcion,
        peticion: form.peticion,
      });
      addSystemMsg(preview);
    }
  };

  const handleConfirmarEnvio = async () => {
    setPaso(PASOS.ENVIANDO);

    const documento = generarDocumento({
      entidad: form.entidadNombre,
      ciudad: form.ciudad,
      nombre: form.nombre,
      cc: form.cc,
      email: form.email,
      telefono: form.telefono,
      direccion: form.direccion,
      asunto: form.asunto || sugerirAsunto(form.descripcion),
      descripcion: form.descripcion,
      peticion: form.peticion,
    });

    const radicado = generarRadicado();
    const adn = generarADN({
      entidad: form.entidadNombre,
      tipo: 'DERECHO_PETICION',
      resumen: form.descripcion,
      ciudadano: form.cc,
    });

    // Intentar envío por EmailJS
    const envioResult = await enviarDerechoPeticion({
      toEmail: form.entidadCorreo,
      toName: form.entidadNombre,
      subject: `Derecho de Petición — ${form.asunto || 'Solicitud'} — Rad. ${radicado}`,
      body: documento,
      radicado,
      userName: form.nombre,
      userEmail: form.email,
      userCC: form.cc,
    });

    // Guardar en localStorage
    const peticion = {
      radicado,
      adn,
      entidad: form.entidadNombre,
      entidadCorreo: form.entidadCorreo,
      entidadId: form.entidadId,
      asunto: form.asunto || sugerirAsunto(form.descripcion),
      descripcion: form.descripcion,
      peticion: form.peticion,
      documento,
      nombre: form.nombre,
      cc: form.cc,
      email: form.email,
      telefono: form.telefono,
      direccion: form.direccion,
      ciudad: form.ciudad,
      fecha: new Date().toISOString(),
      enviado: envioResult.success,
      emailJsEnabled: isEmailJSConfigured(),
      respuestaCargada: false,
      respuestaTexto: '',
      respuestaAnalizada: false,
      respuestaAnalisis: null,
    };

    guardarPeticion(peticion);
    setResultado({ ...envioResult, radicado, adn });
    setPaso(PASOS.RESULTADO);
  };

  // ===== RENDER: Paso ENTIDAD =====
  if (paso === PASOS.ENTIDAD) {
    return (
      <div className="space-y-3 mt-2">
        <ChatBubble sender="bot">
          Para generar tu derecho de petición, necesito saber a qué entidad va dirigido. Escribí el nombre o el tipo de entidad:
        </ChatBubble>

        <div className="flex gap-2 ml-0 mb-2">
          <input
            type="text"
            placeholder="Ej: alcaldía, contraloría, salud..."
            onChange={(e) => handleSearchEntidad(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
            autoFocus
          />
        </div>

        {entidadesSugeridas.length > 0 && (
          <div className="space-y-1 ml-0">
            {entidadesSugeridas.map((ent) => (
              <button
                key={ent.id}
                onClick={() => handleSelectEntidad(ent)}
                className="w-full text-left px-3 py-2 bg-azul-claro hover:bg-blue-100 border border-blue-200 rounded-lg text-sm transition-colors"
              >
                <span className="font-medium text-azul-oscuro">{ent.nombre}</span>
                <span className="text-gray-500 ml-2">({ent.tipo})</span>
                {ent.jurisdiccion !== 'Nacional' && (
                  <span className="text-gray-400 ml-1">— {ent.jurisdiccion}</span>
                )}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => handleSelectEntidad(getEntidadById('otra'))}
          className="text-sm text-azul-medio hover:underline ml-0 mt-1 block"
        >
          No encuentro la entidad — ingresar manualmente →
        </button>
      </div>
    );
  }

  // ===== RENDER: Paso DESCRIPCION (si no se seleccionó entidad, mostrar sugerencias) =====
  if (paso === PASOS.DESCRIPCION) {
    return (
      <div className="space-y-3 mt-2">
        <ChatBubble sender="bot">
          Describí los hechos: ¿qué pasó, dónde, cuándo? Cuantos más detalles, mejor será el derecho de petición.
        </ChatBubble>

        <textarea
          placeholder="Ej: El 5 de agosto de 2026, en la Carrera 7 con Calle 45, observé una obra en construcción sin avisos visibles ni señalización. No hay información pública sobre el contrato ni la empresa responsable..."
          value={form.descripcion}
          onChange={(e) => setForm(prev => ({ ...prev, descripcion: e.target.value }))}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio resize-none"
          autoFocus
        />
        <button
          onClick={handleNext}
          disabled={!form.descripcion.trim()}
          className="px-4 py-2 bg-azul-oscuro hover:bg-azul-medio text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
        >
          Continuar →
        </button>
      </div>
    );
  }

  // ===== RENDER: Paso PETICION =====
  if (paso === PASOS.PETICION) {
    return (
      <div className="space-y-3 mt-2">
        <ChatBubble sender="bot">
          ¿Qué pedís concretamente? (Información, documentos, copias, acciones, explicaciones...)
        </ChatBubble>

        <textarea
          placeholder="Ej: Solicito copia del contrato de obra pública, el nombre de la empresa contratista, el presupuesto asignado, el cronograma de ejecución, y los permisos de cierre vial correspondientes."
          value={form.peticion}
          onChange={(e) => setForm(prev => ({ ...prev, peticion: e.target.value }))}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio resize-none"
          autoFocus
        />
        <button
          onClick={handleNext}
          disabled={!form.peticion.trim()}
          className="px-4 py-2 bg-azul-oscuro hover:bg-azul-medio text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
        >
          Continuar →
        </button>
      </div>
    );
  }

  // ===== RENDER: Paso DATOS =====
  if (paso === PASOS.DATOS) {
    return (
      <div className="space-y-3 mt-2">
        <ChatBubble sender="bot">
          Necesito tus datos para completar el derecho de petición (Ley 1755/2015, Art. 16):
        </ChatBubble>

        <div className="space-y-2">
          <input
            type="text"
            placeholder="Nombre completo *"
            value={form.nombre}
            onChange={(e) => setForm(prev => ({ ...prev, nombre: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
          />
          <input
            type="text"
            placeholder="Cédula de ciudadanía *"
            value={form.cc}
            onChange={(e) => setForm(prev => ({ ...prev, cc: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
          />
          <input
            type="email"
            placeholder="Correo electrónico *"
            value={form.email}
            onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
          />
          <input
            type="tel"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={(e) => setForm(prev => ({ ...prev, telefono: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
          />
          <input
            type="text"
            placeholder="Dirección"
            value={form.direccion}
            onChange={(e) => setForm(prev => ({ ...prev, direccion: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
          />
        </div>
        <button
          onClick={handleNext}
          disabled={!form.nombre.trim() || !form.cc.trim() || !form.email.trim()}
          className="px-4 py-2 bg-azul-oscuro hover:bg-azul-medio text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
        >
          Generar documento →
        </button>
      </div>
    );
  }

  // ===== RENDER: Paso PREVIEW (confirmación) =====
  if (paso === PASOS.PREVIEW) {
    return (
      <div className="flex gap-2 mt-2 ml-0">
        <button
          onClick={handleConfirmarEnvio}
          className="px-4 py-2 bg-dorado hover:bg-dorado-hover text-white text-sm font-semibold rounded-xl shadow transition-colors"
        >
          ✅ Confirmar y enviar →
        </button>
        <button
          onClick={() => setPaso(PASOS.DATOS)}
          className="px-4 py-2 border border-gray-300 hover:bg-gray-100 text-gray-600 text-sm rounded-xl transition-colors"
        >
          ✏️ Editar
        </button>
      </div>
    );
  }

  // ===== RENDER: ENVIANDO =====
  if (paso === PASOS.ENVIANDO) {
    return (
      <ChatBubble sender="bot">
        ⏳ Generando documento y enviando a {form.entidadNombre}...
      </ChatBubble>
    );
  }

  // ===== RENDER: RESULTADO =====
  if (paso === PASOS.RESULTADO && resultado) {
    const emailJsOk = isEmailJSConfigured();

    return (
      <div className="space-y-3 mt-2">
        <ChatBubble sender="bot">
          {resultado.success
            ? `✅ **¡Derecho de petición enviado!**\n\n📨 **Radicado:** ${resultado.radicado}\n🔬 **ADN:** ${resultado.adn}\n📬 **Enviado a:** ${form.entidadCorreo}\n\n📋 **Entidad:** ${form.entidadNombre}\n⏳ **Plazo legal:** 15 días hábiles (Ley 1755/2015)\n\nEl documento queda guardado en **Mis Peticiones** para hacer seguimiento.`
            : `📄 **Documento generado**\n\n📨 **Radicado:** ${resultado.radicado}\n🔬 **ADN:** ${resultado.adn}\n\n${resultado.message}\n\n📋 El documento queda guardado en **Mis Peticiones** para seguimiento.${!emailJsOk ? '\n\n💡 **Tip:** Configura EmailJS en src/config/emailjs.js para activar el envío automático por correo.' : ''}`
          }
        </ChatBubble>
        <div className="flex gap-2 ml-0">
          <button
            onClick={() => onDone('mis-peticiones')}
            className="px-4 py-2 bg-dorado hover:bg-dorado-hover text-white text-sm font-semibold rounded-xl shadow transition-colors"
          >
            Ver Mis Peticiones →
          </button>
          <button
            onClick={() => onDone('chat')}
            className="px-4 py-2 border border-gray-300 hover:bg-gray-100 text-gray-600 text-sm rounded-xl transition-colors"
          >
            Volver al chat
          </button>
        </div>
      </div>
    );
  }

  return null;
}
