import Header from '../components/Header.jsx';

export default function Privacidad({ onNavigate }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      <Header showClose onClose={() => onNavigate && onNavigate('landing')} />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 md:py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Encabezado */}
          <div className="bg-azul-oscuro px-6 py-6 md:px-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Política de Privacidad y Tratamiento de Datos Personales
            </h1>
            <p className="text-blue-200 text-sm">
              Ley 1581 de 2012 — República de Colombia · Última actualización: 1 de agosto de 2026
            </p>
          </div>

          {/* Contenido scrolleable */}
          <div className="px-6 py-8 md:px-8 max-h-[60vh] overflow-y-auto space-y-8 text-gray-700 leading-relaxed text-sm md:text-base">
            {/* Introducción */}
            <section>
              <h2 className="text-xl font-bold text-azul-oscuro mb-3">1. Identificación del Responsable</h2>
              <p>
                <strong className="text-azul-medio">Veeduría Ciudadana</strong>, plataforma digital de control 
                social y participación ciudadana, con domicilio en la ciudad de Bogotá D.C., República de Colombia, 
                es el Responsable del Tratamiento de los datos personales que los usuarios (en adelante, "los 
                Titulares") suministran a través de la Plataforma, en cumplimiento de lo dispuesto por la Ley 
                Estatutaria 1581 de 2012, el Decreto Reglamentario 1377 de 2013 y demás normas que las modifiquen, 
                adicionen o complementen.
              </p>
              <p className="mt-2">
                Correo electrónico para ejercicio de derechos:{' '}
                <span className="text-azul-medio">privacidad@veeduriaciudadana.co</span>
              </p>
            </section>

            {/* Datos recopilados */}
            <section>
              <h2 className="text-xl font-bold text-azul-oscuro mb-3">2. Datos Personales Recopilados</h2>
              <p>
                Para el cumplimiento de las finalidades descritas en esta Política, Veeduría Ciudadana recolecta 
                las siguientes categorías de datos personales:
              </p>

              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-azul-claro">
                      <th className="border border-gray-200 px-3 py-2 text-left text-azul-oscuro font-semibold">Categoría</th>
                      <th className="border border-gray-200 px-3 py-2 text-left text-azul-oscuro font-semibold">Datos específicos</th>
                      <th className="border border-gray-200 px-3 py-2 text-left text-azul-oscuro font-semibold">Origen</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-3 py-2 font-medium text-gray-800">Identificación</td>
                      <td className="border border-gray-200 px-3 py-2">Nombre completo, correo electrónico</td>
                      <td className="border border-gray-200 px-3 py-2">Registro del Usuario</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-3 py-2 font-medium text-gray-800">Contacto</td>
                      <td className="border border-gray-200 px-3 py-2">Número de teléfono, ciudad de residencia</td>
                      <td className="border border-gray-200 px-3 py-2">Registro del Usuario</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-3 py-2 font-medium text-gray-800">Navegación</td>
                      <td className="border border-gray-200 px-3 py-2">Páginas visitadas, tiempo de sesión, clics, interacciones con la Plataforma</td>
                      <td className="border border-gray-200 px-3 py-2">Uso de la Plataforma (cookies y metadatos)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-3 py-2 font-medium text-gray-800">Dispositivo</td>
                      <td className="border border-gray-200 px-3 py-2">Dirección IP simulada, tipo de navegador, sistema operativo, resolución de pantalla</td>
                      <td className="border border-gray-200 px-3 py-2">Navegador del Usuario</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-3 py-2 font-medium text-gray-800">Uso del servicio</td>
                      <td className="border border-gray-200 px-3 py-2">Consultas realizadas, tipo de plan contratado, historial de interacciones</td>
                      <td className="border border-gray-200 px-3 py-2">Actividad en la Plataforma</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-3 py-2 font-medium text-gray-800">Cookies</td>
                      <td className="border border-gray-200 px-3 py-2">Preferencias de navegación, sesión, analítica anónima</td>
                      <td className="border border-gray-200 px-3 py-2">Almacenamiento local del navegador</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-3">
                Veeduría Ciudadana <strong className="text-azul-medio">no recolecta datos sensibles</strong> en 
                los términos de la Ley 1581 de 2012 (origen racial o étnico, orientación política, convicciones 
                religiosas o filosóficas, pertenencia a sindicatos u organizaciones sociales, datos relativos a 
                la salud, vida sexual, ni datos biométricos).
              </p>
            </section>

            {/* Finalidad */}
            <section>
              <h2 className="text-xl font-bold text-azul-oscuro mb-3">3. Finalidad del Tratamiento</h2>
              <p>
                Los datos personales recolectados serán tratados para las siguientes finalidades:
              </p>
              <ol className="list-decimal pl-6 mt-2 space-y-2">
                <li>Crear y administrar la cuenta de usuario en la Plataforma.</li>
                <li>Prestar el servicio de consulta, orientación y derivación ciudadana contratado.</li>
                <li>Gestionar la facturación y el cobro de los planes de suscripción.</li>
                <li>Personalizar la experiencia del Usuario dentro de la Plataforma.</li>
                <li>Enviar comunicaciones informativas sobre el servicio, actualizaciones, cambios en los Términos y novedades relevantes.</li>
                <li>Enviar boletines, notificaciones y contenido de interés ciudadano, previa autorización expresa del Titular.</li>
                <li>Realizar análisis estadísticos y de mejora del servicio, de forma agregada y anonimizada.</li>
                <li>Garantizar la seguridad de la Plataforma, prevenir fraudes y detectar usos no autorizados.</li>
                <li>Cumplir con obligaciones legales y requerimientos de autoridades competentes.</li>
                <li>Atender peticiones, quejas, reclamos y consultas de los Titulares.</li>
              </ol>
            </section>

            {/* Derechos del titular */}
            <section>
              <h2 className="text-xl font-bold text-azul-oscuro mb-3">4. Derechos del Titular</h2>
              <p>
                De conformidad con la Ley 1581 de 2012 y el Decreto 1377 de 2013, el Titular de los datos tiene 
                los siguientes derechos:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  <strong>Derecho de acceso:</strong> Conocer, actualizar y rectificar sus datos personales 
                  frente a Veeduría Ciudadana. Este derecho se puede ejercer, entre otros, frente a datos 
                  parciales, inexactos, incompletos, fraccionados, que induzcan a error o cuyo tratamiento 
                  esté prohibido o no haya sido autorizado.
                </li>
                <li>
                  <strong>Derecho de consulta:</strong> Solicitar prueba de la autorización otorgada para el 
                  tratamiento de sus datos, salvo cuando la ley exceptúe dicha autorización.
                </li>
                <li>
                  <strong>Derecho de rectificación y actualización:</strong> Solicitar la corrección de datos 
                  inexactos o incompletos.
                </li>
                <li>
                  <strong>Derecho de supresión:</strong> Solicitar la eliminación de sus datos cuando el 
                  tratamiento no respete los principios, derechos y garantías constitucionales y legales, o 
                  cuando hayan dejado de ser necesarios para la finalidad para la cual fueron recopilados.
                </li>
                <li>
                  <strong>Derecho de revocatoria:</strong> Revocar en cualquier momento la autorización 
                  otorgada para el tratamiento de sus datos, salvo que exista un deber legal o contractual 
                  que impida dicha revocatoria.
                </li>
                <li>
                  <strong>Derecho de oposición:</strong> Oponerse al tratamiento de sus datos en los casos 
                  previstos por la ley.
                </li>
                <li>
                  <strong>Derecho a presentar quejas:</strong> Presentar ante la Superintendencia de Industria 
                  y Comercio (SIC) quejas por infracciones a la Ley 1581 de 2012, una vez agotado el trámite 
                  de consulta o reclamo ante Veeduría Ciudadana.
                </li>
              </ul>
              <p className="mt-3">
                Para ejercer cualquiera de estos derechos, el Titular deberá enviar una comunicación escrita al 
                correo electrónico <span className="text-azul-medio">privacidad@veeduriaciudadana.co</span>, 
                identificándose plenamente y describiendo de manera clara y precisa la solicitud. Veeduría 
                Ciudadana dará respuesta en un plazo máximo de quince (15) días hábiles.
              </p>
            </section>

            {/* Transferencia */}
            <section>
              <h2 className="text-xl font-bold text-azul-oscuro mb-3">5. Transferencia y Transmisión de Datos</h2>
              <p>
                Veeduría Ciudadana no transfiere, vende, alquila ni comercializa datos personales a terceros. 
                No obstante, para la adecuada prestación del servicio, los datos podrán ser transmitidos a:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Proveedores de infraestructura tecnológica:</strong> Servicios de alojamiento en la 
                  nube, procesamiento de pagos, análisis de datos, siempre bajo estrictos acuerdos de 
                  confidencialidad y tratamiento de datos que garanticen niveles adecuados de protección.
                </li>
                <li>
                  <strong>Autoridades competentes:</strong> Cuando exista un requerimiento legal debidamente 
                  fundamentado por parte de autoridad judicial o administrativa colombiana.
                </li>
              </ul>
              <p className="mt-2">
                En caso de que los datos sean transferidos a un tercer país, Veeduría Ciudadana garantizará que 
                dicho país ofrezca niveles adecuados de protección de datos, de conformidad con los estándares 
                establecidos por la Superintendencia de Industria y Comercio de Colombia.
              </p>
            </section>

            {/* Retención */}
            <section>
              <h2 className="text-xl font-bold text-azul-oscuro mb-3">6. Período de Retención de los Datos</h2>
              <p>
                Los datos personales serán conservados durante el tiempo en que la cuenta del Usuario permanezca 
                activa y, tras su cancelación, por un período adicional de hasta cinco (5) años conforme a lo 
                dispuesto por la legislación colombiana en materia comercial, tributaria y de protección al 
                consumidor, o hasta que el Titular solicite su supresión, siempre que no exista un deber legal 
                de conservación.
              </p>
              <p className="mt-2">
                Los datos de navegación y metadatos recolectados a través de cookies serán conservados de forma 
                agregada y anonimizada por un período máximo de veintiséis (26) meses, conforme a las prácticas 
                estándar de la industria.
              </p>
            </section>

            {/* Seguridad */}
            <section>
              <h2 className="text-xl font-bold text-azul-oscuro mb-3">7. Medidas de Seguridad</h2>
              <p>
                Veeduría Ciudadana adopta medidas técnicas, administrativas y organizativas razonables para 
                proteger los datos personales contra acceso no autorizado, pérdida, alteración, divulgación o 
                destrucción. Dichas medidas incluyen: cifrado de datos sensibles en reposo y en tránsito, 
                controles de acceso basados en roles, autenticación segura, monitoreo continuo de la 
                infraestructura tecnológica y auditorías periódicas de seguridad.
              </p>
              <p className="mt-2">
                No obstante, el Usuario reconoce que ningún sistema de seguridad es infalible y que Veeduría 
                Ciudadana no puede garantizar la seguridad absoluta de la información transmitida a través de 
                internet. En caso de una violación de seguridad que afecte datos personales, Veeduría Ciudadana 
                notificará a los Titulares afectados y a la Superintendencia de Industria y Comercio en los 
                términos previstos por la ley.
              </p>
            </section>

            {/* Contacto */}
            <section>
              <h2 className="text-xl font-bold text-azul-oscuro mb-3">8. Contacto para el Ejercicio de Derechos</h2>
              <p>
                Para consultas, peticiones, quejas o reclamos relacionados con la protección de datos personales, 
                así como para ejercer cualquiera de los derechos mencionados en esta Política, el Titular puede 
                contactar al Responsable del Tratamiento a través de:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Correo electrónico (canal preferente):</strong>{' '}
                  <span className="text-azul-medio">privacidad@veeduriaciudadana.co</span>
                </li>
                <li>
                  <strong>Dirección física:</strong> Carrera 15 # 88-64, Oficina 401, Bogotá D.C., Colombia
                </li>
                <li>
                  <strong>Teléfono:</strong> +57 (601) 555-0123
                </li>
              </ul>
            </section>

            {/* Vigencia */}
            <section>
              <h2 className="text-xl font-bold text-azul-oscuro mb-3">9. Vigencia de la Política</h2>
              <p>
                La presente Política de Privacidad rige a partir del 1 de agosto de 2026. Cualquier modificación 
                será comunicada a los Titulares a través de la Plataforma o del correo electrónico registrado, con 
                al menos quince (15) días de antelación a su entrada en vigor. Las bases de datos que contengan 
                datos personales tendrán una vigencia igual al período de retención descrito en la sección 6 de 
                esta Política.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
