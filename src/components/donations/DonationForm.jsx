import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Carga la clave pública de Stripe desde tu archivo .env
const stripePromise = loadStripe(import.meta.env.VITE_STRAPI_KEY);

// Componente interno para manejar el pago
const DonationForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!stripe || !elements) return;

        // Llamar al backend para crear el PaymentIntent
        const res = await fetch('https://zayenr-backend.onrender.com/donaciones/crear-intento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: parseFloat(amount) * 100, // Stripe requiere el monto en centavos
            }),
        });

        const { clientSecret } = await res.json();

        // Confirmar el pago usando la tarjeta ingresada
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (result.error) {
            alert(`Error: ${result.error.message}`);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                alert('¡Gracias por tu donación!');
            }
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-w-md mx-auto text-left">
            <label className="block text-sm font-medium text-gray-700">Información de tarjeta</label>
            <div className="p-3 border border-gray-300 rounded-md bg-white">
                <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
            </div>
            <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                disabled={loading}
            >
                {loading ? 'Procesando...' : 'Confirmar Donación'}
            </button>
        </form>
    );
}

export default DonationForm