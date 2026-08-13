import Header from '../../components/Header.jsx';
import { useUser } from '../../context/UserContext.jsx';
import logo from '../../assets/logo.svg';

const DUDH_URL = 'https://www.un.org/es/about-us/universal-declaration-of-human-rights';

const DUDH_GROUPS = [
  {
    icon: '🌍',
    title: 'Dignidad e igualdad',
    articles: 'Artículos 1-2',
    summary: 'Todas las personas nacen libres e iguales en dignidad y derechos, sin distinción alguna.',
  },
  {
    icon: '🕊️',
    title: 'Vida, libertad y seguridad',
    articles: 'Artículos 3-5',
    summary: 'Derecho a la vida, a la libertad personal y a no ser sometido a esclavitud ni a torturas.',
  },
  {
    icon: '⚖️',
    title: 'Justicia y protección legal',
    articles: 'Artículos 6-11',
    summary: 'Reconocimiento ante la ley, igualdad de protección, juicio justo y presunción de inocencia.',
  },
  {
    icon: '🗣️',
    title: 'Libertades individuales',
    articles: 'Artículos 12-20',
    summary: 'Protección de la vida privada, libre circulación, nacionalidad y libertad de expresión, reunión y asociación.',
  },
  {
    icon: '🗳️',
    title: 'Participación política',
    articles: 'Artículo 21',
    summary: 'Toda persona puede participar en el gobierno de su país y acceder, en igualdad de condiciones, a la función pública.',
  },
  {
    icon: '🏘️',
    title: 'Bienestar social y económico',
    articles: 'Artículos 22-26',
    summary: 'Seguridad social, trabajo digno, descanso, educación y un nivel de vida adecuado para toda persona y su familia.',
  },
  {
    icon: '📜',
    title: 'Cultura y límites',
    articles: 'Artículos 27-30',
    summary: 'Derecho a participar de la vida cultural y a un orden que haga efectivos estos derechos; nadie puede suprimirlos.',
  },
];

const PASOS = [
  {
    numero: '1',
    title: 'Describe tu caso',
    text: 'Cuéntanos qué te genera dudas: una obra, un contrato o un servicio público.',
  },
  {
    numero: '2',
    title: 'El sistema lo contrasta',
    text: 'Comparamos tu caso con la normativa colombiana vigente (contratación, veedurías, transparencia).',
  },
  {
    numero: '3',
    title: 'Recibes orientación',
    text: 'Te damos orientación inicial y te derivamos a la entidad correcta para que actúes con fundamento.',
  },
];

const LEYES = [
  { ley: 'Ley 80 de 1993', tema: 'Contratación estatal' },
  { ley: 'Ley 850 de 2003', tema: 'Veedurías ciudadanas' },
  { ley: 'Ley 1474 de 2011', tema: 'Estatuto Anticorrupción' },
  { ley: 'Ley 1712 de 2014', tema: 'Transparencia y acceso a la información' },
  { ley: 'Ley 1757 de 2015', tema: 'Participación democrática' },
];

export default function Landing({ onNavigate }) {
  const { isAuthenticated, user } = useUser();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      {/* Header con nav */}
      <Header>
        {isAuthenticated ? (
          <>
            <span className="text-xs text-blue-200 hidden sm:inline">
              {user?.nombre?.split(' ')[0]}
            </span>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-3 py-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Mi Panel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onNavigate('informacion')}
              className="px-2 sm:px-3 py-1.5 text-white/70 hover:text-white text-xs font-semibold hover:underline"
            >
              Información
            </button>
            <button
              onClick={() => onNavigate('login')}
              className="px-2 sm:px-3 py-1.5 text-white text-xs font-semibold hover:underline"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => onNavigate('registro')}
              className="px-2 sm:px-3 py-1.5 bg-dorado hover:bg-dorado-hover text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Registrarse
            </button>
          </>
        )}
      </Header>

      <main className="flex-1">
        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="px-6 py-16 md:py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <img
              src={logo}
              alt="Veeduría Ciudadana"
              className="inline-block w-20 h-20 md:w-24 md:h-24 mb-6"
            />
            <h2 className="text-3xl md:text-5xl font-extrabold text-azul-oscuro mb-4 leading-tight">
              Veeduría Ciudadana
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-2">
              Tu herramienta de control social
            </p>
            <p className="text-base md:text-lg text-gray-500 mb-10 max-w-xl mx-auto">
              ¿Ves una obra pública sospechosa? Verifica si es legal.
            </p>

            {isAuthenticated ? (
              <button
                onClick={() => onNavigate('dashboard')}
                className="inline-flex items-center gap-2 px-8 py-4 bg-dorado hover:bg-dorado-hover text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                <span className="text-xl" aria-hidden="true">📋</span>
                IR AL PANEL
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => onNavigate('chat')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-dorado hover:bg-dorado-hover text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                  <span className="text-xl" aria-hidden="true">🟢</span>
                  CONSULTA GRATIS
                </button>
                <button
                  onClick={() => onNavigate('registro')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-azul-oscuro hover:bg-azul-claro text-azul-oscuro font-bold text-lg rounded-xl transition-all"
                >
                  <span className="text-xl" aria-hidden="true">📝</span>
                  CREAR CUENTA
                </button>
              </div>
            )}

            {/* ¿Qué puedes hacer? (3 cards originales) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-14">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <span className="text-3xl block mb-3" aria-hidden="true">🔍</span>
                <h3 className="font-bold text-azul-oscuro mb-1">Fiscaliza</h3>
                <p className="text-sm text-gray-500">obras públicas</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <span className="text-3xl block mb-3" aria-hidden="true">📋</span>
                <h3 className="font-bold text-azul-oscuro mb-1">Audita</h3>
                <p className="text-sm text-gray-500">contratos públicos</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <span className="text-3xl block mb-3" aria-hidden="true">⚖️</span>
                <h3 className="font-bold text-azul-oscuro mb-1">Conoce</h3>
                <p className="text-sm text-gray-500">tus derechos</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONOCE TUS DERECHOS (DUDH) ───────────────────── */}
        <section className="bg-white px-6 py-14 md:py-20">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-extrabold text-azul-oscuro text-center mb-3">
              Conoce tus derechos
            </h3>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
              La Declaración Universal de los Derechos Humanos (DUDH) respalda tu labor de control
              social. Conócela agrupada por temas:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DUDH_GROUPS.map((grupo) => (
                <article
                  key={grupo.title}
                  className="bg-slate-50 border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  <span className="text-3xl mb-3" aria-hidden="true">{grupo.icon}</span>
                  <h4 className="font-bold text-azul-oscuro mb-1">{grupo.title}</h4>
                  <p className="text-xs font-bold text-azul-medio uppercase tracking-wide mb-2">
                    {grupo.articles}
                  </p>
                  <p className="text-sm text-gray-600 flex-1">{grupo.summary}</p>
                  <a
                    href={DUDH_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-azul-medio hover:text-azul-oscuro hover:underline"
                  >
                    Ver los 30 artículos
                    <span aria-hidden="true">↗</span>
                  </a>
                </article>
              ))}
            </div>

            <p className="mt-8 text-center text-sm text-gray-500 max-w-2xl mx-auto">
              Nota: En Colombia, la DUDH se aplica a través del bloque de constitucionalidad
              (Art. 93 de la Constitución Política).
            </p>
          </div>
        </section>

        {/* ── CÓMO FUNCIONA ────────────────────────────────── */}
        <section className="px-6 py-14 md:py-20">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-extrabold text-azul-oscuro text-center mb-3">
              ¿Cómo funciona?
            </h3>
            <p className="text-center text-gray-600 mb-12">
              Tres pasos para pasar de la duda a la acción.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PASOS.map((paso) => (
                <div
                  key={paso.numero}
                  className="relative bg-white rounded-xl p-6 pt-8 shadow-md border border-gray-100 text-center"
                >
                  <span
                    className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-dorado text-white font-bold flex items-center justify-center shadow"
                    aria-hidden="true"
                  >
                    {paso.numero}
                  </span>
                  <h4 className="font-bold text-azul-oscuro mb-2">{paso.title}</h4>
                  <p className="text-sm text-gray-500">{paso.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MARCO LEGAL ──────────────────────────────────── */}
        <section className="bg-azul-oscuro px-6 py-14 md:py-16 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-3">Marco legal</h3>
            <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
              El sistema contrasta tus consultas con la normativa colombiana que te protege como
              ciudadano y veedor:
            </p>

            <ul className="flex flex-wrap justify-center gap-3">
              {LEYES.map((item) => (
                <li
                  key={item.ley}
                  className="bg-white/10 border border-blue-300/20 hover:bg-white/15 rounded-full px-5 py-2.5 transition-colors"
                >
                  <span className="font-bold text-white">{item.ley}</span>
                  <span className="text-blue-200 text-sm"> · {item.tema}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── CTA FINAL ────────────────────────────────────── */}
        {!isAuthenticated && (
          <section className="px-6 py-14 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-extrabold text-azul-oscuro mb-3">
                Empieza a vigilar lo público
              </h3>
              <p className="text-gray-600 mb-6">
                Una consulta informada puede frenar una obra irregular. Tu primera consulta es gratis.
              </p>
              <button
                onClick={() => onNavigate('chat')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-dorado hover:bg-dorado-hover text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                <span className="text-xl" aria-hidden="true">🟢</span>
                CONSULTA GRATIS
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
