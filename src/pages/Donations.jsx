import DonationForm from "../components/donations/DonationForm";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from "react";
import { Link } from "react-router";

// Carga la clave pública de Stripe desde tu archivo .env
const stripePromise = loadStripe(import.meta.env.VITE_STRAPI_KEY);


export const Donations = () => {
    const [amount, setAmount] = useState('');

    return (
        <div className="text-center py-20 px-4">
            <h2 className="text-3xl font-bold text-teal-800 mb-6">Apoya al Museo con una Donación</h2>

            <input
                type="number"
                min="1"
                placeholder="Ingrese el monto en USD"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border p-2 rounded mb-4 w-60 text-center"
            />

            {/* Mostrar el formulario de pago solo si hay un monto válido */}
            {amount && parseFloat(amount) > 0 && (
                <Elements stripe={stripePromise}>
                    <DonationForm amount={amount} />
                </Elements>
            )}

            <div className="mt-6">
                <Link
                    to="/"
                    className="inline-block bg-teal-800 text-white px-6 py-2 rounded hover:bg-teal-700 transition-colors"
                >
                    Volver
                </Link>
            </div>
        </div>
    );
};