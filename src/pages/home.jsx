import React from 'react';
import { Link } from 'react-router-dom';
import { MdMuseum } from "react-icons/md";
import { FaBookOpen, FaChalkboardTeacher } from "react-icons/fa";
import { FaFacebook, FaSquareInstagram, FaXTwitter } from "react-icons/fa6";

export const Home = () => {
    return (
        <>
            <header className="container mx-auto py-6 md:flex justify-between items-center px-6">
                <div className="flex items-center gap-4">
                    <img src="/epn.png" alt="Logo EPN" className="h-20 w-auto" />
                    <h1 className='text-4xl text-teal-800 font-extrabold tracking-wider' style={{ fontFamily: "'Playfair Display', serif" }}>
                        MUSEO <span className='text-green-700'>GUSTAVO ORCÉS</span>
                    </h1>
                </div>

                <nav className='mt-4 md:mt-0'>
                    <ul className='flex gap-6 text-lg font-semibold text-teal-700'>
                        <li><a href="#" className='hover:text-green-800 transition-colors duration-300'>Inicio</a></li>
                        <li><Link to="/login" className='hover:text-green-800 transition-colors duration-300'>Iniciar Sesión</Link></li>
                    </ul>
                </nav>
            </header>

            <main className='bg-green-50 text-center py-14 px-6 md:text-left md:flex justify-between items-center gap-10'>
                <div className='md:w-3/5'>
                    <h1 className='text-5xl md:text-6xl font-extrabold text-teal-800 uppercase flex flex-col md:flex-row items-center gap-6 justify-center md:justify-start'>
                        <span style={{ fontFamily: "'Playfair Display', serif" }}>Patrimonio Científico</span>
                        <img
                            src="/museo.png"
                            alt="Logo Museo"
                            className="h-36 w-auto inline-block md:ml-6"
                        />
                    </h1>
                    <p className='text-xl md:text-2xl my-6 font-semibold text-gray-800'>Inspirando a través del conocimiento</p>
                    <p className='text-lg my-4 text-gray-700'>Exposiciones permanentes, visitas guiadas, talleres educativos y más...</p>
                </div>
            </main>

            <section className='container mx-auto px-4'>
                <div className="text-center my-14 relative">
                    <h2 className="font-bold text-4xl inline-block bg-green-50 px-6 relative z-10 text-teal-800 tracking-wide">
                        SOBRE NOSOTROS
                    </h2>
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 w-3/4 border-t-4 border-teal-700 z-0"></div>
                </div>

                <div className='my-10 flex flex-col gap-10 items-center sm:flex-row sm:justify-around sm:items-center'>
                    <div className='px-10 sm:w-3/4 text-center sm:text-left leading-relaxed text-lg'>
                        <p className='mb-6 text-gray-800'>
                            El Museo Gustavo Orcés es un espacio dedicado a la ciencia y la historia natural del Ecuador. Nuestro objetivo es educar,
                            inspirar y conectar a los visitantes con la riqueza biológica y paleontológica del país a través de experiencias
                            inmersivas y actividades didácticas.
                        </p>
                        <ul className='space-y-4 mt-6 text-teal-900 font-semibold'>
                            <li><MdMuseum className='inline text-3xl mr-3 text-green-800' /> Exhibiciones Permanentes</li>
                            <li><FaBookOpen className='inline text-3xl mr-3 text-green-800' /> Biblioteca Científica</li>
                            <li><FaChalkboardTeacher className='inline text-3xl mr-3 text-green-800' /> Programas Educativos</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className='container mx-auto px-4'>
                <div className="text-center my-14 relative">
                    <h2 className="font-bold text-4xl inline-block bg-green-50 px-6 relative z-10 text-teal-800 tracking-wide">
                        SERVICIOS
                    </h2>
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 w-3/4 border-t-4 border-teal-700 z-0"></div>
                </div>

                <div className='my-10 flex justify-between flex-wrap gap-10'>
                    <div className="text-center shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 bg-green-50 rounded-xl flex-1">
                        <FaBookOpen className='inline text-6xl text-teal-800 mb-4' />
                        <h4 className="text-2xl font-bold text-teal-700 hover:underline">Área de Visitantes</h4>
                        <p className="my-4 text-gray-700">Conoce nuestras exposiciones como visitante general, horarios y guías disponibles.</p>
                    </div>

                    <div className="text-center shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 bg-green-50 rounded-xl flex-1">
                        <MdMuseum className='inline text-6xl text-teal-800 mb-4' />
                        <h4 className="text-2xl font-bold text-teal-700 hover:underline">Login Pasantes</h4>
                        <p className="my-4 text-gray-700">
                            Accede a tu perfil, gestiona tus actividades y consulta tus horarios como pasante.
                        </p>
                        <Link to="/login" className='inline-block mt-4 bg-teal-800 text-white px-5 py-2 rounded-lg hover:bg-teal-700 transition-colors'>Iniciar Sesión</Link>
                    </div>
                </div>
            </section>

            <footer className='text-center bg-green-50 p-6 sm:px-20 sm:py-10 mt-20 rounded-tr-3xl rounded-tl-3xl space-y-8'>
                <div className='flex justify-between items-center flex-wrap gap-6'>
                    <div className='text-3xl font-extrabold text-teal-800'>Contáctanos</div>
                    <ul className='flex gap-6 mt-4 sm:mt-0 text-teal-800'>
                        <li><FaFacebook className='text-3xl hover:text-green-700 transition-colors' /></li>
                        <li><FaSquareInstagram className='text-3xl hover:text-green-700 transition-colors' /></li>
                        <li><FaXTwitter className='text-3xl hover:text-green-700 transition-colors' /></li>
                    </ul>
                </div>

                <div className='text-left text-gray-800 font-medium'>
                    <p className='my-2'>Email: <span className='font-semibold'>info@museogustavorces.ec</span></p>
                    <p>Teléfono: <span className='font-semibold'>02 123 4567</span></p>
                </div>

                <hr className='border-t-2 border-teal-800' />
                <p className='font-semibold text-teal-800'>© 2025 Museo Gustavo Orcés</p>
            </footer>
        </>
    );
};
