import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Link } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRAPI_KEY);

export const Donations = () => {
    const [amount, setAmount] = useState('');

    const handleDonate = async () => {
        const stripe = await stripePromise;

        const res = await fetch('http://localhost:3000/api/donaciones/crearDonacion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ monto: parseFloat(amount) }),
        });


        const data = await res.json();

        const result = await stripe.redirectToCheckout({
            sessionId: data.id,
        });

        if (result.error) {
            alert(result.error.message);
        }
    };

    return (
        <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-teal-800 mb-6">Apoya al Museo con una Donación</h2>
            <input
                type="number"
                min="1"
                placeholder="Ingrese el monto en USD"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border p-2 rounded mb-4 w-60 text-center"
            />
            <br />
            <button
                onClick={handleDonate}
                className="bg-teal-800 text-white px-6 py-2 rounded hover:bg-teal-700 transition-colors"
            >
                Donar
            </button>

            <Link
                to="/"
                className="ml-4 inline-block bg-teal-800 text-white px-6 py-2 rounded hover:bg-teal-700 transition-colors"
            >
                Volver
            </Link>

        </div>
    );
};
