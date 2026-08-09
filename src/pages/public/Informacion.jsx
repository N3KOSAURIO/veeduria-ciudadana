import Header from '../../components/Header.jsx';

export default function Informacion({ onNavigate }) {
  const planesInfo = [
    {
      nombre: 'Ciudadano (Gratis)',
      emoji: '🆓',
      color: 'from-gray-400 to-gray-500',
      beneficios: [
        '5 consultas al mes',
        'Respuestas basadas en leyes colombianas',
        'Acceso al checklist de obra pública',
        'Derivación a consultoría básica',
      ],
    },
    {
      nombre: 'Pro',
      emoji: '⭐',
      color: 'from-dorado to-yellow-600',
      beneficios: [
        'Consultas ILIMITADAS',
        'Informe ejecutivo de 2 páginas por caso',
        'Historial completo de tus consultas',
        'Checklist de auditoría personalizado',
        'Mapa de riesgos (8 dimensiones)',
        'Derivación prioritaria a consultoría',
        'Soporte por WhatsApp',
      ],
    },
    {
      nombre: 'Premium',
      emoji: '👑',
      color: 'from-azul-medio to-azul-oscuro',
      beneficios: [
        'TODO lo de Pro',
        'Informe detallado con señalamiento de responsables',
        'Análisis de competencias y funciones omitidas',
        'Acompañamiento en derechos de petición',
        'Acompañamiento en tutelas',
        'Asesoría legal personalizada (1 hora/mes)',
        'Consultor dedicado',
        'Reportes exportables en PDF',
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50 dark:from-dark-bg dark:to-dark-surface">
      <Header showClose onClose={() => onNavigate && onNavigate('landing')} onNavigate={onNavigate} />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 md:py-12 space-y-10">
        {/* ========== HERO / QUÉ ES ========== */}
        <section className="text-center">
          <span className="text-4xl md:text-5xl block mb-4">🏛️</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-azul-oscuro dark:text-dark-text mb-4">
            ¿Qué es Veeduría Ciudadana?
          </h1>
          <p className="text-lg text-gray-600 dark:text-dark-text-secondary max-w-2xl mx-auto leading-relaxed">
            Veeduría Ciudadana es una <strong className="text-azul-medio dark:text-blue-400">herramienta digital de control social</strong> que empodera a los ciudadanos colombianos para fiscalizar obras públicas, auditar contratos estatales y conocer sus derechos. Utilizamos inteligencia artificial y bases de datos jurídicas para brindar orientación clara, accesible y fundamentada en la legislación colombiana.
          </p>
        </section>

        {/* ========== QUÉ PUEDE HACER (3 cards) ========== */}
        <section>
          <h2 className="text-2xl font-bold text-azul-oscuro dark:text-dark-text text-center mb-8">
            ¿Qué podés hacer?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Fiscalizar */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-md border border-gray-100 dark:border-dark-border p-6 hover:shadow-lg transition-shadow">
              <span className="text-4xl block mb-4 text-center">🔍</span>
              <h3 className="font-bold text-lg text-azul-oscuro dark:text-dark-text text-center mb-3">
                Fiscalizar Obras
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-dark-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Verificá si una obra tiene licencia y contratos vigentes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Consultá el SECOP y otras fuentes oficiales
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Identificá irregularidades con nuestro checklist
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Compará lo contratado contra lo ejecutado
                </li>
              </ul>
            </div>

            {/* Auditar */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-md border border-gray-100 dark:border-dark-border p-6 hover:shadow-lg transition-shadow">
              <span className="text-4xl block mb-4 text-center">📋</span>
              <h3 className="font-bold text-lg text-azul-oscuro dark:text-dark-text text-center mb-3">
                Auditar Contratos
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-dark-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Analizá procesos de contratación pública
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Revisá pliegos, adjudicaciones y ejecución
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Detectá posibles sobrecostos y anomalías
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Generá informes con hallazgos documentados
                </li>
              </ul>
            </div>

            {/* Conocer derechos */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-md border border-gray-100 dark:border-dark-border p-6 hover:shadow-lg transition-shadow">
              <span className="text-4xl block mb-4 text-center">⚖️</span>
              <h3 className="font-bold text-lg text-azul-oscuro dark:text-dark-text text-center mb-3">
                Conocer Derechos
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-dark-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Informate sobre la Ley 850 de 2003 (veedurías)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Conocé cómo interponer derechos de petición
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Entendé el régimen de contratación pública
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Accedé a jurisprudencia y normativa relevante
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========== CÓMO USARLA ========== */}
        <section>
          <h2 className="text-2xl font-bold text-azul-oscuro dark:text-dark-text text-center mb-8">
            ¿Cómo usar la plataforma?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                paso: '1',
                icono: '💬',
                titulo: 'Chat inteligente',
                desc: 'Conversá con nuestro asistente legal. Preguntale sobre cualquier obra, contrato o norma.',
              },
              {
                paso: '2',
                icono: '📎',
                titulo: 'Subí archivos',
                desc: 'Adjuntá documentos, fotos o PDFs. Nuestro sistema los analiza y extrae información clave.',
              },
              {
                paso: '3',
                icono: '📝',
                titulo: 'Radicá peticiones',
                desc: 'Generá derechos de petición formales listos para radicar ante entidades públicas.',
              },
              {
                paso: '4',
                icono: '📊',
                titulo: 'Recibí informes',
                desc: 'Obtené reportes detallados con hallazgos, riesgos y recomendaciones accionables.',
              },
            ].map((item) => (
              <div
                key={item.paso}
                className="bg-white dark:bg-dark-surface rounded-2xl shadow-md border border-gray-100 dark:border-dark-border p-6 text-center hover:shadow-lg transition-shadow"
              >
                <span className="text-3xl block mb-3">{item.icono}</span>
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-azul-oscuro dark:bg-azul-medio text-white text-xs font-bold mb-3">
                  {item.paso}
                </div>
                <h3 className="font-bold text-azul-oscuro dark:text-dark-text mb-2">{item.titulo}</h3>
                <p className="text-sm text-gray-500 dark:text-dark-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========== FUNCIONES POR PLAN ========== */}
        <section>
          <h2 className="text-2xl font-bold text-azul-oscuro dark:text-dark-text text-center mb-8">
            Funciones disponibles por plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {planesInfo.map((plan) => (
              <div
                key={plan.nombre}
                className="bg-white dark:bg-dark-surface rounded-2xl shadow-md border border-gray-100 dark:border-dark-border overflow-hidden"
              >
                {/* Cabecera */}
                <div className={`bg-gradient-to-r ${plan.color} px-6 py-4`}>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{plan.emoji}</span>
                    <h3 className="font-bold text-white">{plan.nombre}</h3>
                  </div>
                </div>
                {/* Beneficios */}
                <ul className="px-6 py-4 space-y-2">
                  {plan.beneficios.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-dark-text-secondary">
                      <span className="text-green-500 mt-0.5 font-bold">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <button
              onClick={() => onNavigate && onNavigate('planes')}
              className="px-6 py-3 bg-dorado hover:bg-dorado-hover text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all text-sm"
            >
              Ver todos los planes
            </button>
          </div>
        </section>

        {/* ========== LIMITACIONES ACTUALES ========== */}
        <section>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <span className="text-3xl shrink-0">🚧</span>
              <div>
                <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-200 mb-3">
                  Demo Beta — Limitaciones actuales
                </h2>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-4 leading-relaxed">
                  Esta es una versión de demostración. Algunas funcionalidades están simuladas y no representan el producto final. Estamos trabajando para ofrecer una experiencia completa.
                </p>
                <ul className="space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">⚠️</span>
                    <span><strong>Datos de prueba:</strong> Las consultas sobre obras y contratos usan datos simulados, no información real del SECOP.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">⚠️</span>
                    <span><strong>Almacenamiento local:</strong> Toda la información se guarda en tu navegador (localStorage). No hay servidor real aún.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">⚠️</span>
                    <span><strong>Pagos simulados:</strong> El checkout de planes es demostrativo. No se realizan cobros reales.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">⚠️</span>
                    <span><strong>Notificaciones no funcionales:</strong> Los emails y notificaciones push son placeholders.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">⚠️</span>
                    <span><strong>Radicación simulada:</strong> Los derechos de petición se generan como texto, pero no se radican ante entidades reales.</span>
                  </li>
                </ul>
                <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-4 italic">
                  ¿Tenés sugerencias o querés colaborar? Escribinos a <span className="font-semibold">info@veeduriaciudadana.co</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========== CTA FINAL ========== */}
        <section className="text-center pb-6">
          <p className="text-gray-500 dark:text-dark-text-secondary mb-4">
            ¿Listo para empezar a fiscalizar?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate && onNavigate('chat')}
              className="px-8 py-3 bg-dorado hover:bg-dorado-hover text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all text-sm"
            >
              🟢 Consultar gratis
            </button>
            <button
              onClick={() => onNavigate && onNavigate('registro')}
              className="px-8 py-3 bg-white dark:bg-dark-surface border-2 border-azul-oscuro dark:border-azul-medio hover:bg-azul-claro dark:hover:bg-dark-border text-azul-oscuro dark:text-dark-text font-bold rounded-xl transition-all text-sm"
            >
              📝 Crear cuenta
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
