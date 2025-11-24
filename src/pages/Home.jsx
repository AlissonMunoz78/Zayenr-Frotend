import { Link } from "react-router-dom";
import { MdMuseum } from "react-icons/md";
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaMapMarkerAlt,
  FaClock,
  FaPhone,
  FaEnvelope,
  FaArrowRight,
  FaDonate,
  FaCalendarAlt,
  FaUserPlus,
} from "react-icons/fa";
import { FaFacebook, FaSquareInstagram } from "react-icons/fa6";
import epn from "../../Public/epn.png";
import museo from "../../Public/museo.png";

export const Home = () => {
  return (
    <>
      {/* HEADER */}
      <header className="container mx-auto py-6 md:flex justify-between items-center px-6 sticky top-0 bg-white shadow-md z-50">
        <div className="flex items-center gap-4">
          <img src={epn} alt="Logo EPN" className="h-20 w-auto" />
          <h1
            className="text-4xl text-teal-800 font-extrabold tracking-wider"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            MUSEO <span className="text-green-700">GUSTAVO ORCÉS</span>
          </h1>
        </div>

        <nav className="mt-4 md:mt-0">
          <ul className="flex gap-6 text-lg font-semibold text-teal-700">
            <li>
              <a
                href="#inicio"
                className="hover:text-green-800 transition-colors duration-300"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#sobre-nosotros"
                className="hover:text-green-800 transition-colors duration-300"
              >
                Nosotros
              </a>
            </li>
            <li>
              <a
                href="#servicios"
                className="hover:text-green-800 transition-colors duration-300"
              >
                Servicios
              </a>
            </li>
            <li>
              <a
                href="#contacto"
                className="hover:text-green-800 transition-colors duration-300"
              >
                Contacto
              </a>
            </li>
            <li>
              <Link
                to="/login"
                className="bg-teal-800 text-white px-5 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Iniciar Sesión
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* HERO SECTION */}
      <main
        id="inicio"
        className="bg-green-50 text-center py-14 px-6 md:text-left md:flex justify-between items-center gap-10"
      >
        <div className="md:w-3/5">
          <h1 className="text-5xl md:text-6xl font-extrabold text-teal-800 uppercase flex flex-col md:flex-row items-center gap-6 justify-center md:justify-start">
            <span style={{ fontFamily: "'Playfair Display', serif" }}>
              Patrimonio Científico
            </span>
            <img
              src={museo}
              alt="Logo Museo"
              className="h-36 w-auto inline-block md:ml-6"
            />
          </h1>

          <p className="text-xl md:text-2xl my-6 font-semibold text-gray-800">
            Inspirando a través del conocimiento
          </p>

          <p className="text-lg my-4 text-gray-700">
            Exposiciones permanentes, visitas guiadas, talleres educativos y
            más...
          </p>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">
            <a
              href="#servicios"
              className="bg-teal-800 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition font-semibold flex items-center justify-center space-x-2"
            >
              <span>Agendar Visita</span>
              <FaArrowRight />
            </a>
            <a
              href="#donaciones"
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-semibold flex items-center justify-center space-x-2"
            >
              <FaDonate />
              <span>Donar</span>
            </a>
          </div>
        </div>
      </main>

      {/* SOBRE NOSOTROS */}
      <section id="sobre-nosotros" className="container mx-auto px-4 py-16">
        <div className="text-center my-14 relative">
          <h2
            className="font-bold text-4xl inline-block bg-white px-6 relative z-10 text-teal-800 tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            SOBRE NOSOTROS
          </h2>
          <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 w-3/4 border-t-4 border-teal-700 z-0"></div>
        </div>

        <div className="my-10 flex flex-col gap-10 items-center sm:flex-row sm:justify-around sm:items-center">
          <div className="px-10 sm:w-3/4 text-center sm:text-left leading-relaxed text-lg">
            <p className="mb-6 text-gray-800">
              El Museo Gustavo Orcés es un espacio dedicado a la ciencia y la
              historia natural del Ecuador. Nuestro objetivo es educar, inspirar
              y conectar a los visitantes con la riqueza biológica y
              paleontológica del país a través de experiencias inmersivas y
              actividades didácticas.
            </p>
            <ul className="space-y-4 mt-6 text-teal-900 font-semibold">
              <li className="flex items-center gap-3">
                <MdMuseum className="text-4xl text-green-800" />
                <span>Exhibiciones Permanentes</span>
              </li>
              <li className="flex items-center gap-3">
                <FaBookOpen className="text-4xl text-green-800" />
                <span>Biblioteca Científica</span>
              </li>
              <li className="flex items-center gap-3">
                <FaChalkboardTeacher className="text-4xl text-green-800" />
                <span>Programas Educativos</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* INFORMACIÓN DEL MUSEO */}
      <section className="bg-green-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center my-14 relative">
            <h2
              className="font-bold text-4xl inline-block bg-green-50 px-6 relative z-10 text-teal-800 tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              INFORMACIÓN DEL MUSEO
            </h2>
            <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 w-3/4 border-t-4 border-teal-700 z-0"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Ubicación */}
            <div className="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="bg-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="text-4xl text-teal-800" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-teal-800">
                Ubicación
              </h3>
              <p className="text-gray-600">
                Escuela Politécnica Nacional
                <br />
                Ladrón de Guevara E11-253
                <br />
                Quito, Ecuador
              </p>
            </div>

            {/* Horarios */}
            <div className="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="bg-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-4xl text-teal-800" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-teal-800">Horarios</h3>
              <p className="text-gray-600">
                <strong>Lunes a Viernes</strong>
                <br />
                08:00 - 16:30
                <br />
                <span className="text-sm text-gray-500">Entrada gratuita</span>
              </p>
            </div>

            {/* Contacto */}
            <div className="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="bg-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPhone className="text-4xl text-teal-800" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-teal-800">Contacto</h3>
              <p className="text-gray-600">
                <FaEnvelope className="inline mr-2 text-teal-700" />
                info@museogustavorces.ec
                <br />
                <FaPhone className="inline mr-2 text-teal-700 mt-2" />
                02 123 4567
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="container mx-auto px-4 py-16">
        <div className="text-center my-14 relative">
          <h2
            className="font-bold text-4xl inline-block bg-white px-6 relative z-10 text-teal-800 tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            SERVICIOS
          </h2>
          <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 w-3/4 border-t-4 border-teal-700 z-0"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Visitas Grupales */}
          <div className="text-center shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 bg-green-50 rounded-xl">
            <FaCalendarAlt className="inline text-6xl text-teal-800 mb-4" />
            <h4 className="text-2xl font-bold text-teal-700 mb-4">
              Visitas Grupales
            </h4>
            <p className="text-gray-700 mb-4">
              Para grupos de 2 a 25 personas. Ideal para instituciones
              educativas.
            </p>
            <ul className="text-sm text-gray-600 mb-6 space-y-2 text-left">
              <li>✓ Bloques de 30 minutos</li>
              <li>✓ Reserva con 1 día de anticipación</li>
              <li>✓ Lunes a Viernes</li>
              <li>✓ Guías especializados</li>
            </ul>
            <Link
              to="/publico/visitas/disponibilidad"
              className="inline-block bg-teal-800 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Consultar Disponibilidad
            </Link>
          </div>

          {/* Visitas Individuales */}
          <div className="text-center shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 bg-green-50 rounded-xl">
            <FaUserPlus className="inline text-6xl text-teal-800 mb-4" />
            <h4 className="text-2xl font-bold text-teal-700 mb-4">
              Visitas Individuales
            </h4>
            <p className="text-gray-700 mb-4">
              Acceso libre durante nuestro horario de atención.
            </p>
            <ul className="text-sm text-gray-600 mb-6 space-y-2 text-left">
              <li>✓ Sin necesidad de reserva</li>
              <li>✓ Registro rápido al ingresar</li>
              <li>✓ Entrada gratuita</li>
              <li>✓ Recorre a tu propio ritmo</li>
            </ul>
            <Link
              to="/publico/visitante"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Registrar Visita
            </Link>
          </div>

          {/* Login Pasantes */}
          <div className="text-center shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 bg-green-50 rounded-xl">
            <MdMuseum className="inline text-6xl text-teal-800 mb-4" />
            <h4 className="text-2xl font-bold text-teal-700 mb-4">
              Acceso Personal
            </h4>
            <p className="text-gray-700 mb-4">
              Accede al sistema como administrador o pasante del museo.
            </p>
            <ul className="text-sm text-gray-600 mb-6 space-y-2 text-left">
              <li>✓ Gestiona tu perfil</li>
              <li>✓ Consulta horarios</li>
              <li>✓ Registra actividades</li>
              <li>✓ Administra visitas</li>
            </ul>
            <Link
              to="/login"
              className="inline-block bg-teal-800 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </section>

      {/* DONACIONES */}
      <section
        id="donaciones"
        className="bg-gradient-to-br from-teal-50 to-green-100 py-16"
      >
        <div className="container mx-auto px-4">
          <div className="text-center my-14 relative">
            <h2
              className="font-bold text-4xl inline-block bg-gradient-to-br from-teal-50 to-green-100 px-6 relative z-10 text-teal-800 tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              APOYA AL MUSEO
            </h2>
            <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 w-3/4 border-t-4 border-teal-700 z-0"></div>
          </div>

          <p className="text-center text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Tu contribución ayuda a preservar el patrimonio natural ecuatoriano
            y a continuar con nuestra labor educativa.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Donación Económica */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaDonate className="text-4xl text-green-700" />
              </div>
              <h3 className="text-2xl font-bold text-center text-teal-800 mb-4">
                Donación Económica
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Realiza una donación económica segura mediante pago en línea.
              </p>
              <Link
                to="/publico/donacion/economica"
                className="block text-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
              >
                Donar Ahora
              </Link>
            </div>

            {/* Donación de Bienes */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBookOpen className="text-4xl text-blue-700" />
              </div>
              <h3 className="text-2xl font-bold text-center text-teal-800 mb-4">
                Donación de Bienes
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Dona materiales, equipos o especímenes para nuestras
                colecciones.
              </p>
              <Link
                to="/publico/donacion/bienes"
                className="block text-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Registrar Donación
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="contacto"
        className="text-center bg-green-50 p-6 sm:px-20 sm:py-10 mt-20 rounded-tr-3xl rounded-tl-3xl space-y-8"
      >
        <div className="flex justify-between items-center flex-wrap gap-6">
          <div
            className="text-3xl font-extrabold text-teal-800"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Contáctanos
          </div>

          <ul className="flex gap-6 mt-4 sm:mt-0 text-teal-800">
            <li>
              <a
                href="https://www.facebook.com/MuseoGustavoOrcesEPN?locale=es_LA"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Museo Gustavo Orcés"
                className="hover:scale-110 transition-transform duration-300"
              >
                <FaFacebook className="text-4xl hover:text-green-700 transition-colors" />
              </a>
            </li>

            <li>
              <a
                href="https://www.instagram.com/mhngov?igsh=aHFzcjB2ZDNiM2o5"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Museo Gustavo Orcés"
                className="hover:scale-110 transition-transform duration-300"
              >
                <FaSquareInstagram className="text-4xl hover:text-green-700 transition-colors" />
              </a>
            </li>
          </ul>
        </div>

        <div className="text-left text-gray-800 font-medium space-y-2">
          <p className="flex items-center gap-2">
            <FaEnvelope className="text-teal-700" />
            <span>
              Email:{" "}
              <span className="font-semibold">info@museogustavorces.ec</span>
            </span>
          </p>
          <p className="flex items-center gap-2">
            <FaPhone className="text-teal-700" />
            <span>
              Teléfono: <span className="font-semibold">02 123 4567</span>
            </span>
          </p>
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-teal-700" />
            <span>Ladrón de Guevara E11-253, Quito</span>
          </p>
        </div>

        <hr className="border-t-2 border-teal-800" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-semibold text-teal-800">
            © 2025 Museo Gustavo Orcés - Escuela Politécnica Nacional
          </p>
          <Link
            to="/login"
            className="text-sm text-teal-700 hover:text-green-800 transition-colors"
          >
            Acceso para personal del museo →
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Home;
