import React from 'react';
import { Link } from 'react-router-dom';

export const DonationsCancel = () => {
    return (
        <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-red-600 mb-6">Donación cancelada</h2>
            <p className="text-lg text-gray-700 mb-4">
                Puedes intentarlo nuevamente cuando estés listo.
            </p>
            <Link
                to="/donations"
                className="bg-teal-800 text-white px-6 py-2 rounded hover:bg-teal-700 transition-colors"
            >
                Volver a Donar
            </Link>
        </div>
    );
};
