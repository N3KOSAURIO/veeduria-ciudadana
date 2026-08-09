import Header from '../../components/Header.jsx';

export default function Terminos({ onNavigate }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      <Header showClose onClose={() => onNavigate && onNavigate('landing')} />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 md:py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Encabezado del documento */}
          <div className="bg-azul-oscuro px-6 py-6 md:px-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Términos y Condiciones de Uso
            </h1>
            <p className="text-blue-200 text-sm">
              Última actualización: 1 de agosto de 2026
            </p>
          </div>

          {/* Contenido scrolleable */}
          <div className="px-6 py-8 md:px-8 max-h-[60vh] overflow-y-auto space-y-8 text-gray-700 leading-relaxed text-sm md:text-base">
            {/* 1. Aceptación */}
            <section>
              <h2 className="text-xl font-bold text-azul-oscuro mb-3">1. Aceptación de los Términos</h2>
              <p>
                Bienvenido a <strong className="text-azul-medio">Veeduría Ciudadana</strong> (en adelante, "la Plataforma"), 
                un servicio digital de control social y participación ciudadana operado desde la República de Colombia.
              </p>
              <p className="mt-2">
                Al acceder, navegar, registrarse o utilizar de cualquier forma la Plataforma —ya sea a través del sitio web, 
                aplicación móvil, API o cualquier otro medio—, usted (en adelante, "el Usuario") declara haber leído, 
                entendido y aceptado en su totalidad los presentes Términos y Condiciones de Uso (en adelante, "los Términos"). 
                Esta aceptación tiene carácter vinculante y constituye un acuerdo legal entre el Usuario y Veeduría Ciudadana.
              </p>
              <p className="mt-2">
                Si el Usuario no está de acuerdo con estos Términos, total o parcialmente, debe abstenerse de utilizar 
                la Plataforma y abandonar el sitio de inmediato. El uso continuado de la Plataforma tras cualquier 
                modificación de estos Términos implicará la aceptación tácita de dichos cambios.
              </p>
              <p className="mt-2">
                Veeduría Ciudadana se reserva el derecho de modificar, actualizar o sustituir estos Términos en cualquier 
                momento y sin previo aviso, publicando la versión actualizada en la Plataforma. Es responsabilidad del 
                Usuario revisar periódicamente los Términos para mantenerse informado de los cambios. La fecha de la 
                última actualización siempre estará visible al inicio del documento.
              </p>
            </section>

            {/* 2. Descripción del servicio */}
            <section>
              <h2 className="text-xl font-bold text-azul-oscuro mb-3">2. Descripción del Servicio</h2>
              <p>
                Veeduría Ciudadana es una herramienta digital de orientación ciudadana que permite a los usuarios 
                consultar información sobre obras públicas, contratación estatal, normatividad aplicable y procesos 
                de veeduría en el territorio colombiano. La Plataforma utiliza inteligencia artificial y fuentes de 
                datos públicos para proporcionar respuestas orientativas.
              </p>
              <p className="mt-2">
                El servicio incluye, sin limitarse a:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Consulta de obras públicas en ejecución por parte de entidades estatales.</li>
                <li>Información sobre normatividad de contratación pública colombiana.</li>
                <li>Orientación sobre mecanismos de participación ciudadana y control social.</li>
                <li>Derivación a entidades competentes según el tipo de hallazgo o denuncia.</li>
                <li>Planes de suscripción con funcionalidades ampliadas para usuarios frecuentes.</li>
              </ul>
              <p className="mt-2">
                La Plataforma se ofrece bajo las modalidades gratuita (plan básico con consultas limitadas) y de pago 
                (planes con características ampliadas). Las condiciones específicas de cada plan —precio, duración, 
                funcionalidades y límites— se detallan en la sección de Planes dentro de la Plataforma y forman parte 
                integrante de estos Términos.
              </p>
              <p className="mt-2">
                <strong className="text-azul-medio">Naturaleza orientativa del servicio:</strong> La información 
                proporcionada por la Plataforma tiene carácter exclusivamente orientativo e informativo. No constituye 
                asesoría legal, jurídica, técnica o profesional de ningún tipo. El Usuario reconoce que Veeduría 
                Ciudadana no es un despacho de abogados, una entidad gubernamental ni un organismo de control, y que 
                la información suministrada no sustituye la consulta con profesionales calificados ni los canales 
                oficiales de denuncia ante las autoridades competentes.
              </p>
            </section>

            {/* 3. Registro y cuenta */}
            <section>
              <h2 className="text-xl font-bold text-azul-oscuro mb-3">3. Registro y Cuenta de Usuario</h2>
              <p>
                Para acceder a determinadas funcionalidades de la Plataforma, el Usuario deberá crear una cuenta 
                proporcionando información veraz, precisa y completa, que incluye: nombre completo, dirección de 
                correo electrónico, número de teléfono y ciudad de residencia.
              </p>
              <p className="mt-2">
                El Usuario es responsable de:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Mantener la confidencialidad de sus credenciales de acceso (correo y contraseña).</li>
                <li>Toda actividad que ocurra bajo su cuenta, sea autorizada o no por el Usuario.</li>
                <li>Notificar de inmediato a Veeduría Ciudadana cualquier uso no autorizado de su cuenta.</li>
                <li>Proporcionar información actualizada y veraz en todo momento.</li>
              </ul>
              <p className="mt-2">
                Veeduría Ciudadana se reserva el derecho de suspender, deshabilitar o cancelar cualquier cuenta que 
                considere que ha proporcionado información falsa, que infringe estos Términos o cuya conducta sea 
                perjudicial para la Plataforma, otros usuarios o terceros. La cancelación de una cuenta no exime al 
                Usuario del cumplimiento de las obligaciones contraídas durante su vigencia.
              </p>
              <p className="mt-2">
                La edad mínima para registrarse en la Plataforma es de dieciocho (18) años. Los menores de edad no 
                están autorizados a crear una cuenta ni a utilizar los servicios sin la supervisión expresa de sus 
                padres o representantes legales, quienes asumirán la responsabilidad total por dicho uso.
              </p>
            </section>

            {/* 4. Obligaciones del usuario */}
            <section>
              <h2 className="text-xl font-bold text-azul-oscuro mb-3">4. Obligaciones del Usuario</h2>
              <p>
                El Usuario se compromete a utilizar la Plataforma de conformidad con la ley, la moral, las buenas 
                costumbres y el orden público, así como con lo dispuesto en estos Términos. En particular, el Usuario 
                se obliga a:
              </p>
              <ol className="list-decimal pl-6 mt-2 space-y-2">
                <li>
                  <strong>No utilizar la Plataforma con fines ilícitos:</strong> Queda prohibido el uso de la 
                  Plataforma para actividades fraudulentas, difamatorias, injuriosas, obscenas, amenazantes, 
                  discriminatorias o que de cualquier forma vulneren derechos fundamentales de terceros.
                </li>
                <li>
                  <strong>No interferir con el funcionamiento:</strong> El Usuario no podrá emplear mecanismos 
                  automatizados (bots, scrapers, spiders) para extraer datos de la Plataforma sin autorización 
                  expresa por escrito, ni realizar acciones que sobrecarguen, dañen o inutilicen los servidores, 
                  redes o sistemas de Veeduría Ciudadana.
                </li>
                <li>
                  <strong>No suplantar identidades:</strong> El Usuario no podrá hacerse pasar por otra persona, 
                  entidad o autoridad, ni falsear su afiliación con cualquier persona o entidad.
                </li>
                <li>
                  <strong>Respetar la propiedad intelectual:</strong> El Usuario se abstendrá de reproducir, 
                  distribuir, modificar, exhibir, ejecutar o explotar comercialmente cualquier contenido de la 
                  Plataforma sin la autorización previa y por escrito de Veeduría Ciudadana.
                </li>
                <li>
                  <strong>Proporcionar información verificaz:</strong> Las consultas y denuncias realizadas a través 
                  de la Plataforma deben basarse en hechos reales y verificables. El uso malintencionado con el 
                  propósito de difamar, calumniar o generar desinformación está estrictamente prohibido.
                </li>
              </ol>
              <p className="mt-3">
                El incumplimiento de cualquiera de estas obligaciones facultará a Veeduría Ciudadana para suspender 
                o cancelar la cuenta del Usuario infractor, sin perjuicio de las acciones legales que puedan 
                corresponder en defensa de los intereses de la Plataforma y de terceros afectados.
              </p>
            </section>

            {/* 5. Propiedad intelectual */}
            <section>
              <h2 className="text-xl font-bold text-azul-oscuro mb-3">5. Propiedad Intelectual</h2>
              <p>
                Todos los derechos de propiedad intelectual sobre la Plataforma —incluyendo, sin limitación, el 
                código fuente, el diseño gráfico, la interfaz de usuario, los logotipos, las marcas, los nombres 
                comerciales, los textos, las imágenes, las bases de datos, la arquitectura del sistema, los 
                algoritmos y cualquier otro elemento susceptible de protección— son titularidad exclusiva de 
                Veeduría Ciudadana o de sus licenciantes, y están protegidos por la legislación colombiana sobre 
                derechos de autor (Ley 23 de 1982, Ley 1915 de 2018), propiedad industrial (Decisión 486 de la 
                Comunidad Andina) y tratados internacionales suscritos por Colombia.
              </p>
              <p className="mt-2">
                La utilización de la Plataforma no confiere al Usuario derecho alguno sobre los contenidos, 
                marcas, diseños o cualquier otro elemento de propiedad intelectual, salvo el derecho limitado, 
                no exclusivo, revocable e intransferible de uso conforme a estos Términos y exclusivamente para 
                fines personales de control social ciudadano.
              </p>
              <p className="mt-2">
                Queda expresamente prohibida la reproducción, distribución, comunicación pública, transformación, 
                ingeniería inversa, descompilación o cualquier otra forma de explotación no autorizada de la 
                Plataforma o de cualquiera de sus elementos.
              </p>
            </section>

            {/* 6. Planes y pagos */}
            <section>
              <h2 className="text-xl font-bold text-azul-oscuro mb-3">6. Planes, Pagos y Facturación</h2>
              <p>
                Veeduría Ciudadana ofrece un plan gratuito con funcionalidades limitadas y planes de pago con 
                características ampliadas. Los detalles de cada plan —incluyendo precio, duración, funcionalidades 
                incluidas, límites de uso y condiciones de renovación— se encuentran descritos en la sección de 
                Planes de la Plataforma.
              </p>
              <p className="mt-2">
                Los pagos por planes de suscripción se procesan a través de pasarelas de pago seguras. Al contratar 
                un plan de pago, el Usuario autoriza a Veeduría Ciudadana a procesar el cargo correspondiente según 
                la periodicidad del plan seleccionado. Todos los precios se expresan en pesos colombianos (COP) e 
                incluyen los impuestos aplicables según la legislación colombiana vigente.
              </p>
              <p className="mt-2">
                Las suscripciones se renovarán automáticamente al final de cada período, salvo que el Usuario 
                cancele la renovación automática con al menos tres (3) días hábiles de antelación a la fecha de 
                renovación. No se realizarán reembolsos por períodos parcialmente utilizados, salvo que la ley 
                colombiana aplicable disponga lo contrario.
              </p>
            </section>

            {/* 7. Limitación de responsabilidad */}
            <section>
              <h2 className="text-xl font-bold text-azul-oscuro mb-3">7. Limitación de Responsabilidad</h2>
              <p>
                Veeduría Ciudadana proporciona la Plataforma "tal cual" y "según disponibilidad", sin garantías 
                de ningún tipo, expresas o implícitas, incluyendo pero no limitándose a las garantías implícitas 
                de comerciabilidad, adecuación para un fin particular, exactitud e integridad de la información, 
                y no infracción de derechos de terceros.
              </p>
              <p className="mt-2">
                En la máxima medida permitida por la ley colombiana, Veeduría Ciudadana no será responsable por:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Daños directos o indirectos:</strong> Incluyendo daños emergentes, lucro cesante, 
                  pérdida de datos, pérdida de oportunidades de negocio o cualquier otro perjuicio derivado del 
                  uso o la imposibilidad de uso de la Plataforma.
                </li>
                <li>
                  <strong>Decisiones basadas en la información:</strong> La Plataforma es una herramienta de 
                  orientación; las decisiones que el Usuario tome basándose en la información proporcionada son 
                  de su exclusiva responsabilidad.
                </li>
                <li>
                  <strong>Interrupciones del servicio:</strong> Veeduría Ciudadana no garantiza la disponibilidad 
                  continua, ininterrumpida o libre de errores de la Plataforma. Se podrán realizar labores de 
                  mantenimiento programado o de emergencia que suspendan temporalmente el acceso.
                </li>
                <li>
                  <strong>Contenido de terceros:</strong> La Plataforma puede contener enlaces a sitios web de 
                  terceros. Veeduría Ciudadana no controla ni asume responsabilidad por el contenido, las 
                  políticas de privacidad o las prácticas de dichos sitios.
                </li>
                <li>
                  <strong>Fuerza mayor o caso fortuito:</strong> Eventos fuera del control razonable de Veeduría 
                  Ciudadana, incluyendo desastres naturales, actos de guerra, disturbios civiles, fallas en 
                  infraestructura de telecomunicaciones y ciberataques.
                </li>
              </ul>
              <p className="mt-3">
                En caso de que, a pesar de lo anterior, se determine la responsabilidad de Veeduría Ciudadana, 
                la indemnización total estará limitada al valor efectivamente pagado por el Usuario durante los 
                seis (6) meses inmediatamente anteriores al hecho generador de la responsabilidad, o al equivalente 
                de cincuenta mil pesos colombianos (COP $50.000) para usuarios del plan gratuito.
              </p>
            </section>

            {/* 8. Legislación aplicable */}
            <section>
              <h2 className="text-xl font-bold text-azul-oscuro mb-3">8. Legislación Aplicable y Jurisdicción</h2>
              <p>
                Estos Términos se rigen por las leyes de la República de Colombia, en especial por la Constitución 
                Política de 1991, la Ley 527 de 1999 sobre comercio electrónico, la Ley 1581 de 2012 sobre 
                protección de datos personales, la Ley 1480 de 2011 —Estatuto del Consumidor—, la Ley 850 de 2003 
                sobre veedurías ciudadanas, el Código Civil, el Código de Comercio y demás normas concordantes y 
                complementarias.
              </p>
              <p className="mt-2">
                Para la resolución de cualquier controversia derivada de la interpretación, ejecución o 
                cumplimiento de estos Términos, las partes se someten a la jurisdicción de los jueces y tribunales 
                de la ciudad de Bogotá D.C., República de Colombia, con renuncia expresa a cualquier otro fuero 
                o jurisdicción que pudiera corresponderles por razón de domicilio presente o futuro.
              </p>
              <p className="mt-2">
                No obstante lo anterior, Veeduría Ciudadana promoverá mecanismos alternativos de solución de 
                conflictos, como la conciliación y el arbitraje, antes de acudir a la vía judicial, siempre que 
                la naturaleza del conflicto lo permita y las partes estén de acuerdo.
              </p>
            </section>

            {/* 9. Suspensión y terminación */}
            <section>
              <h2 className="text-xl font-bold text-azul-oscuro mb-3">9. Suspensión y Terminación</h2>
              <p>
                Veeduría Ciudadana se reserva el derecho de suspender o terminar el acceso del Usuario a la 
                Plataforma, de forma temporal o definitiva, sin previo aviso, en los siguientes casos:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Incumplimiento de cualquiera de las disposiciones contenidas en estos Términos.</li>
                <li>Uso fraudulento, abusivo o contrario a la ley de la Plataforma.</li>
                <li>Suministro de información falsa, incompleta o inexacta durante el registro.</li>
                <li>Falta de pago de los cargos correspondientes al plan contratado.</li>
                <li>Solicitud expresa del Usuario.</li>
                <li>Por decisión estratégica o comercial de Veeduría Ciudadana, previa notificación con al menos treinta (30) días de antelación.</li>
              </ul>
              <p className="mt-2">
                La terminación del servicio no exime al Usuario de las obligaciones de pago pendientes ni de 
                aquellas disposiciones de estos Términos que por su naturaleza deban subsistir tras la terminación, 
                incluyendo propiedad intelectual, limitación de responsabilidad y ley aplicable.
              </p>
            </section>

            {/* 10. Protección de datos */}
            <section>
              <h2 className="text-xl font-bold text-azul-oscuro mb-3">10. Protección de Datos Personales</h2>
              <p>
                El tratamiento de los datos personales del Usuario se rige por la Política de Privacidad de 
                Veeduría Ciudadana, la cual se incorpora por referencia a estos Términos y puede consultarse 
                en la sección correspondiente de la Plataforma. Al aceptar estos Términos, el Usuario reconoce 
                haber leído y entendido la Política de Privacidad y consiente el tratamiento de sus datos 
                personales conforme a lo allí dispuesto y a la Ley 1581 de 2012.
              </p>
            </section>

            {/* 11. Disposiciones generales */}
            <section>
              <h2 className="text-xl font-bold text-azul-oscuro mb-3">11. Disposiciones Generales</h2>
              <p>
                <strong className="text-azul-medio">Nulidad parcial:</strong> Si cualquier disposición de estos 
                Términos fuera declarada nula, inválida o ineficaz por autoridad judicial o administrativa 
                competente, dicha disposición se tendrá por no escrita, sin afectar la validez y eficacia de 
                las restantes disposiciones, que conservarán plena vigencia.
              </p>
              <p className="mt-2">
                <strong className="text-azul-medio">No renuncia:</strong> La falta de ejercicio por parte de 
                Veeduría Ciudadana de cualquier derecho o disposición de estos Términos no constituirá renuncia 
                a dicho derecho o disposición, ni impedirá su ejercicio posterior.
              </p>
              <p className="mt-2">
                <strong className="text-azul-medio">Cesión:</strong> El Usuario no podrá ceder, transferir o 
                subrogar los derechos y obligaciones derivados de estos Términos sin el consentimiento previo 
                y por escrito de Veeduría Ciudadana. La Plataforma podrá ceder o transferir estos Términos, 
                total o parcialmente, sin restricción alguna.
              </p>
              <p className="mt-2">
                <strong className="text-azul-medio">Acuerdo completo:</strong> Estos Términos, junto con la 
                Política de Privacidad y la Política de Cookies, constituyen el acuerdo íntegro entre el Usuario 
                y Veeduría Ciudadana en relación con el objeto de los mismos, y sustituyen cualquier acuerdo, 
                comunicación o entendimiento previo, verbal o escrito, entre las partes.
              </p>
            </section>

            {/* 12. Contacto */}
            <section>
              <h2 className="text-xl font-bold text-azul-oscuro mb-3">12. Contacto</h2>
              <p>
                Para cualquier comunicación relacionada con estos Términos y Condiciones, el Usuario puede 
                contactar a Veeduría Ciudadana a través de los siguientes canales:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Correo electrónico:</strong>{' '}
                  <span className="text-azul-medio">legal@veeduriaciudadana.co</span>
                </li>
                <li>
                  <strong>Dirección física:</strong> Carrera 15 # 88-64, Oficina 401, Bogotá D.C., Colombia
                </li>
                <li>
                  <strong>Teléfono:</strong> +57 (601) 555-0123
                </li>
                <li>
                  <strong>Formulario de contacto:</strong> Disponible en la sección de soporte de la Plataforma.
                </li>
              </ul>
              <p className="mt-3">
                Las comunicaciones se atenderán en un plazo máximo de quince (15) días hábiles, contados a 
                partir de la recepción de la solicitud completa por parte del Usuario.
              </p>
            </section>
          </div>

          {/* Botón de aceptación al final */}
          <div className="border-t border-gray-200 px-6 py-5 md:px-8 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500 text-center sm:text-left">
              Al hacer clic en "Aceptar y continuar", usted declara haber leído y aceptado los presentes Términos y Condiciones.
            </p>
            <button
              onClick={() => onNavigate && onNavigate('landing')}
              className="w-full sm:w-auto px-8 py-3 bg-dorado hover:bg-dorado-hover text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all text-sm whitespace-nowrap"
            >
              Aceptar y continuar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
