import React from 'react';
import { Link } from 'react-router-dom';

export const DonationsSuccess = () => {
    return (
        <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-green-700 mb-6">¡Gracias por tu donación!</h2>
            <p className="text-lg text-gray-700 mb-4">
                Tu aporte contribuye a preservar el conocimiento y la ciencia en el Ecuador.
            </p>
            <Link
                to="/"
                className="bg-teal-800 text-white px-6 py-2 rounded hover:bg-teal-700 transition-colors"
            >
                Volver al Inicio
            </Link>
        </div>
    );
};
