import Header from '../../components/Header.jsx';

export default function Cookies({ onNavigate }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      <Header showClose onClose={() => onNavigate && onNavigate('landing')} />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 md:py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Encabezado */}
          <div className="bg-azul-oscuro px-6 py-6 md:px-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Política de Cookies
            </h1>
            <p className="text-blue-200 text-sm">
              Última actualización: 1 de agosto de 2026
            </p>
          </div>

          {/* Contenido scrolleable */}
          <div className="px-6 py-8 md:px-8 max-h-[60vh] overflow-y-auto space-y-8 text-gray-700 leading-relaxed text-sm md:text-base">
            {/* ¿Qué son las cookies? */}
            <section>
              <h2 className="text-xl font-bold text-azul-oscuro mb-3">1. ¿Qué son las Cookies?</h2>
              <p>
                Las cookies son pequeños archivos de texto que los sitios web almacenan en el dispositivo del 
                usuario (computador, tableta, teléfono móvil) cuando este navega por internet. Las cookies 
                permiten al sitio web recordar información sobre la visita del usuario, como sus preferencias 
                de navegación, el idioma seleccionado, los productos agregados al carrito de compras y, en 
                general, facilitar una experiencia de navegación más eficiente y personalizada.
              </p>
              <p className="mt-2">
                Las cookies pueden ser "de sesión" (se eliminan automáticamente cuando el usuario cierra el 
                navegador) o "persistentes" (permanecen en el dispositivo hasta que expiran o son eliminadas 
                manualmente). También pueden ser "propias" (instaladas por el sitio web que el usuario visita) 
                o "de terceros" (instaladas por servicios externos integrados en el sitio, como herramientas 
                de analítica o plugins de redes sociales).
              </p>
            </section>

            {/* ¿Para qué las usamos? */}
            <section>
              <h2 className="text-xl font-bold text-azul-oscuro mb-3">2. ¿Para qué utiliza Cookies Veeduría Ciudadana?</h2>
              <p>
                Veeduría Ciudadana utiliza cookies —tanto propias como de terceros— con las siguientes 
                finalidades:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Funcionamiento esencial:</strong> Garantizar el correcto funcionamiento técnico de la 
                  Plataforma, incluyendo la gestión de sesiones de usuario, la autenticación y la navegación 
                  entre páginas. Sin estas cookies, la Plataforma no puede operar correctamente.
                </li>
                <li>
                  <strong>Análisis y rendimiento:</strong> Recopilar información estadística anónima sobre el 
                  uso de la Plataforma (páginas visitadas, tiempo de navegación, dispositivo utilizado) para 
                  mejorar su rendimiento, funcionalidades y experiencia de usuario.
                </li>
                <li>
                  <strong>Preferencias del usuario:</strong> Recordar las elecciones del usuario, como el idioma, 
                  la región, las preferencias de visualización y la aceptación de cookies.
                </li>
                <li>
                  <strong>Simulación publicitaria:</strong> En un entorno simulado de pruebas, registrar 
                  preferencias para mostrar contenido relacionado con servicios de control social ciudadano. 
                  En el entorno de producción, estas cookies no se activan sin consentimiento explícito adicional.
                </li>
              </ul>
              <p className="mt-2 text-sm text-gray-500 italic">
                Nota: La Plataforma opera actualmente en fase de desarrollo y pruebas. Las cookies de terceros 
                para publicidad y analítica descritas en esta política son simuladas y no transmiten datos a 
                proveedores externos reales en esta fase.
              </p>
            </section>

            {/* Tabla de cookies */}
            <section>
              <h2 className="text-xl font-bold text-azul-oscuro mb-3">3. Cookies Utilizadas en la Plataforma</h2>
              <p>
                A continuación se detallan las cookies que pueden instalarse en el dispositivo del usuario al 
                navegar por la Plataforma:
              </p>

              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-azul-claro">
                      <th className="border border-gray-200 px-3 py-2 text-left text-azul-oscuro font-semibold">Nombre</th>
                      <th className="border border-gray-200 px-3 py-2 text-left text-azul-oscuro font-semibold">Tipo</th>
                      <th className="border border-gray-200 px-3 py-2 text-left text-azul-oscuro font-semibold">Duración</th>
                      <th className="border border-gray-200 px-3 py-2 text-left text-azul-oscuro font-semibold">Propósito</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-3 py-2 font-mono text-xs text-gray-800">veeduria_session</td>
                      <td className="border border-gray-200 px-3 py-2">Esencial (propia)</td>
                      <td className="border border-gray-200 px-3 py-2">Sesión</td>
                      <td className="border border-gray-200 px-3 py-2">Gestiona la sesión del usuario autenticado y mantiene el estado de navegación.</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-3 py-2 font-mono text-xs text-gray-800">veeduria_cookies_accepted</td>
                      <td className="border border-gray-200 px-3 py-2">Preferencia (propia)</td>
                      <td className="border border-gray-200 px-3 py-2">1 año</td>
                      <td className="border border-gray-200 px-3 py-2">Registra la aceptación del usuario al banner de cookies y sus preferencias de configuración.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-3 py-2 font-mono text-xs text-gray-800">veeduria_tos_accepted</td>
                      <td className="border border-gray-200 px-3 py-2">Preferencia (propia)</td>
                      <td className="border border-gray-200 px-3 py-2">1 año</td>
                      <td className="border border-gray-200 px-3 py-2">Registra la aceptación de los Términos y Condiciones de uso de la Plataforma.</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-3 py-2 font-mono text-xs text-gray-800">_ga</td>
                      <td className="border border-gray-200 px-3 py-2">Analítica (tercero)</td>
                      <td className="border border-gray-200 px-3 py-2">2 años</td>
                      <td className="border border-gray-200 px-3 py-2">(Simulada) Cookie de Google Analytics para distinguir usuarios únicos de forma anónima.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-3 py-2 font-mono text-xs text-gray-800">_ga_XXXXXXXXXX</td>
                      <td className="border border-gray-200 px-3 py-2">Analítica (tercero)</td>
                      <td className="border border-gray-200 px-3 py-2">2 años</td>
                      <td className="border border-gray-200 px-3 py-2">(Simulada) Cookie de Google Analytics para mantener el estado de la sesión analítica.</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-3 py-2 font-mono text-xs text-gray-800">veeduria_theme</td>
                      <td className="border border-gray-200 px-3 py-2">Preferencia (propia)</td>
                      <td className="border border-gray-200 px-3 py-2">1 año</td>
                      <td className="border border-gray-200 px-3 py-2">Almacena las preferencias de visualización del usuario (tema claro/oscuro).</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ¿Cómo deshabilitar? */}
            <section>
              <h2 className="text-xl font-bold text-azul-oscuro mb-3">4. ¿Cómo Deshabilitar o Eliminar las Cookies?</h2>
              <p>
                El usuario puede, en cualquier momento, deshabilitar, bloquear o eliminar las cookies instaladas 
                en su dispositivo mediante la configuración de su navegador. A continuación, se indican los 
                enlaces a las instrucciones de los navegadores más comunes:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Google Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios.
                </li>
                <li>
                  <strong>Mozilla Firefox:</strong> Opciones → Privacidad y seguridad → Cookies y datos del sitio.
                </li>
                <li>
                  <strong>Microsoft Edge:</strong> Configuración → Privacidad, búsqueda y servicios → Cookies.
                </li>
                <li>
                  <strong>Safari:</strong> Preferencias → Privacidad → Cookies y datos de sitios web.
                </li>
              </ul>
              <p className="mt-3">
                <strong className="text-azul-medio">Importante:</strong> La desactivación de las cookies 
                esenciales puede afectar negativamente la funcionalidad de la Plataforma, impidiendo el acceso 
                a áreas restringidas, la autenticación de usuarios y el correcto funcionamiento de determinadas 
                características. Las cookies de preferencia y analítica pueden desactivarse sin perjuicio 
                significativo para la experiencia de navegación básica.
              </p>
            </section>

            {/* Cookies de terceros */}
            <section>
              <h2 className="text-xl font-bold text-azul-oscuro mb-3">5. Cookies de Terceros</h2>
              <p>
                La Plataforma puede utilizar servicios de terceros que instalan sus propias cookies. Estos 
                terceros tienen sus propias políticas de privacidad y cookies, sobre las cuales Veeduría 
                Ciudadana no tiene control. El usuario puede consultar las políticas de privacidad de dichos 
                terceros para obtener información detallada sobre el tratamiento de sus datos:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Google Analytics:</strong> Servicio de análisis web prestado por Google LLC. 
                  Política de privacidad:{' '}
                  <span className="text-azul-medio break-all">https://policies.google.com/privacy</span>
                </li>
              </ul>
              <p className="mt-2">
                En la fase actual de desarrollo, estas integraciones son simuladas y no se realiza una 
                transferencia efectiva de datos a terceros.
              </p>
            </section>

            {/* Cambios a la política */}
            <section>
              <h2 className="text-xl font-bold text-azul-oscuro mb-3">6. Cambios en la Política de Cookies</h2>
              <p>
                Veeduría Ciudadana se reserva el derecho de modificar la presente Política de Cookies en 
                cualquier momento. Cualquier cambio sustancial será notificado a los usuarios mediante un aviso 
                destacado en la Plataforma o a través del correo electrónico de contacto registrado. La fecha 
                de la última actualización se indicará al inicio del documento.
              </p>
              <p className="mt-2">
                Se recomienda al usuario revisar periódicamente esta Política para mantenerse informado sobre 
                el uso de cookies en la Plataforma. El uso continuado de la Plataforma tras la publicación 
                de cambios constituirá la aceptación tácita de los mismos.
              </p>
            </section>

            {/* Contacto */}
            <section>
              <h2 className="text-xl font-bold text-azul-oscuro mb-3">7. Contacto</h2>
              <p>
                Si el usuario tiene preguntas, inquietudes o comentarios sobre esta Política de Cookies, puede 
                contactar a Veeduría Ciudadana a través de:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Correo electrónico:</strong>{' '}
                  <span className="text-azul-medio">privacidad@veeduriaciudadana.co</span>
                </li>
                <li>
                  <strong>Dirección:</strong> Carrera 15 # 88-64, Oficina 401, Bogotá D.C., Colombia
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
