import React from 'react';
import { Link } from 'react-router-dom';
import { MdMuseum } from "react-icons/md";
import { FaBookOpen, FaChalkboardTeacher } from "react-icons/fa";
import { FaFacebook, FaSquareInstagram, FaXTwitter } from "react-icons/fa6";



export const Home = () => {
    return (
        <>
            <header className="container mx-auto h-40 text-center py-4 md:flex justify-between items-center px-4 md:h-15">
                <div className="flex items-center gap-4 my-2">
                  <img src="frontend/Public/epn.png" alt="Logo EPN" className="h-14 w-auto" />
                  <img src="frontend/Public/museo.png" alt="Logo Museo" className="h-14 w-auto" />
                  <h1 className='font-bold text-2xl text-teal-800'>
                    Museo <span className='text-green-700'>Gustavo Orcés</span>
                  </h1>
                </div>

                <ul className='flex gap-5 justify-center my-4 flex-wrap'>
                    <li><a href="#" className='font-bold hover:text-teal-700 hover:underline'>Inicio</a></li>
                    <li><Link to="/login" className='font-bold hover:text-teal-700 hover:underline'>Iniciar Sesión</Link></li>
                </ul>
            </header>

            <main className='text-center py-6 px-8 bg-green-50 md:text-left md:flex justify-between items-center gap-10 md:py-1'>
                <div>
                    <h1 className='font-extrabold text-teal-800 uppercase text-4xl my-4 md:text-6xl'>Patrimonio Científico</h1>
                    <p className='font-bold text-left my-8 md:text-2xl underline'>Inspirando a través del conocimiento</p>
                    <p className='text-2xl my-6 font-sans'>Exposiciones permanentes, visitas guiadas, talleres educativos y más...</p>
                </div>
            </main>

            <section className='container mx-auto px-4'>
                <div className='container mx-auto relative mt-6'>
                    <h2 className='font-semibold text-3xl relative z-1 w-50 text-center mx-auto bg-white'>SOBRE NOSOTROS</h2>
                    <div className='text-green-700 border-2 absolute top-1/2 w-full z-0' />
                </div>

                <div className='my-10 flex flex-col gap-10 items-center sm:flex-row sm:justify-around sm:items-center'>
                    <div className='px-10 sm:w-3/4 text-center sm:text-left'>
                        <p className='my-4'>
                            El Museo Gustavo Orcés es un espacio dedicado a la ciencia y la historia natural del Ecuador. Nuestro objetivo es educar,
                            inspirar y conectar a los visitantes con la riqueza biológica y paleontológica del país a través de experiencias
                            inmersivas y actividades didácticas.
                        </p>
                        <ul className='space-y-4 mt-6'>
                            <li><MdMuseum className='inline text-2xl mr-2' />Exhibiciones Permanentes</li>
                            <li><FaBookOpen className='inline text-2xl mr-2' />Biblioteca Científica</li>
                            <li><FaChalkboardTeacher className='inline text-2xl mr-2' />Programas Educativos</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className='container mx-auto px-4'>
                <div className='container mx-auto relative mt-6'>
                    <h2 className='font-semibold text-3xl relative z-1 w-50 text-center mx-auto bg-white'>SERVICIOS</h2>
                    <div className='text-green-700 border-2 absolute top-1/2 w-full z-0' />
                </div>

                <div className='my-10 flex justify-between flex-wrap gap-5'>
                  
                    <div className="text-center shadow-md hover:shadow-lg transition-shadow duration-300 relative pt-4 bg-green-50 sm:flex-1">
                        <FaBookOpen className='inline text-5xl text-teal-800' />
                        <h4 className="text-xl font-bold py-4 text-teal-700 hover:underline">Área de Visitantes</h4>
                        <p className="my-4 px-2">Conoce nuestras exposiciones como visitante general, horarios y guías disponibles.</p>
                    </div>

                    <div className="text-center shadow-md hover:shadow-lg transition-shadow duration-300 relative pt-4 bg-green-50 sm:flex-1">
                        <MdMuseum className='inline text-5xl text-teal-800' />
                        <h4 className="text-xl font-bold py-4 text-teal-700 hover:underline">Login Pasantes</h4>
                        <p className="my-4 px-2">
                            Accede a tu perfil, gestiona tus actividades y consulta tus horarios como pasante.
                        </p>
                        <Link to="/login" className='inline-block mt-2 bg-teal-800 text-white px-4 py-2 rounded-lg hover:bg-teal-700'>Iniciar Sesión</Link>
                    </div>
                </div>
            </section>

            <footer className='text-center bg-green-50 p-6 sm:px-20 sm:py-10 mt-20 rounded-tr-3xl rounded-tl-3xl space-y-8'>
                <div className='flex justify-between items-center'>
                    <div className='text-3xl font-extrabold text-teal-800'>Contáctanos</div>
                    <ul className='flex gap-4'>
                        <li><FaFacebook className='text-2xl' /></li>
                        <li><FaSquareInstagram className='text-2xl' /></li>
                        <li><FaXTwitter className='text-2xl' /></li>
                    </ul>
                </div>

                <div className='flex justify-between items-center'>
                    <div className='text-left'>
                        <p className='font-bold my-2'>Email: info@museogustavorces.ec</p>
                        <p className='font-bold'>Teléfono: 02 123 4567</p>
                    </div>
                </div>

                <hr className='border-1 border-teal-800' />
                <p className='font-semibold'>© 2025 Museo Gustavo Orcés</p>
            </footer>
        </>
    );
}
