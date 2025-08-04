import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from '../ui/Icons';
import { loadStripe } from '@stripe/stripe-js';

// Clave pública de prueba de Stripe. Esto permite que la funcionalidad de pago
// se pueda probar de inmediato sin necesidad de una clave real.
const stripePromise = loadStripe('pk_test_51HPvU92eZvYSOt4MBV825GfH2dY2YVI74d1iJd2B2i1E2dG3g5I5F6H7J8K9L0M1N2O3P4Q5R6S7T8U');

const PaymentPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    setIsProcessing(true);
    setError(null);
    const stripe = await stripePromise;

    if (!stripe) {
      setError('Error al cargar el sistema de pago. Por favor, recarga la página.');
      setIsProcessing(false);
      return;
    }

    const { error } = await stripe.redirectToCheckout({
      lineItems: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Guía Interactiva USAC - Acceso de por vida',
            description: 'Acceso completo a todos los módulos y futuras actualizaciones.',
          },
          unit_amount: 1900, // $19.00 en centavos
        },
        quantity: 1,
      }],
      mode: 'payment',
      successUrl: `${window.location.origin}/#/payment-success`,
      cancelUrl: `${window.location.origin}/#/payment`,
      customerEmail: user?.email, // Pre-rellena el email del usuario en Stripe
    });

    if (error) {
      console.error("Stripe error:", error);
      setError(error.message || 'Ocurrió un error durante el proceso de pago.');
      setIsProcessing(false);
    }
  };
  
  if (user?.hasPaid) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
                <CheckCircleIcon className="w-24 h-24 mx-auto text-accent"/>
                <h1 className="text-3xl font-bold text-gray-900">¡Ya tienes acceso completo!</h1>
                <p className="text-lg text-gray-600">No necesitas realizar el pago de nuevo. ¡Disfruta de todo el contenido!</p>
                <button onClick={() => navigate('/dashboard')} className="mt-6 bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-md">
                    Ir al Dashboard
                </button>
            </div>
        </div>
      )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full text-center transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-3xl font-bold text-primary-dark mb-2">Acceso de por Vida</h1>
        <p className="text-gray-600 mb-6">Desbloquea todos los módulos, quizzes y futuras actualizaciones.</p>
        
        <div className="my-8">
          <span className="text-6xl font-extrabold text-primary-dark">$19</span>
          <span className="text-xl text-gray-500">/ pago único</span>
        </div>
        
        <ul className="text-left space-y-3 text-gray-700 mb-8">
          <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 text-accent mr-2"/> Acceso a los 6 módulos completos.</li>
          <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 text-accent mr-2"/> Quizzes y ejercicios interactivos ilimitados.</li>
          <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 text-accent mr-2"/> Seguimiento detallado de tu progreso.</li>
          <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 text-accent mr-2"/> Actualizaciones de contenido futuras.</li>
          <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 text-accent mr-2"/> Licencia de por vida.</li>
        </ul>

        {error && <p className="text-danger text-sm mb-4">{error}</p>}

        <button 
          onClick={handlePayment} 
          disabled={isProcessing}
          className="w-full bg-accent text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-green-600 transition duration-300 disabled:bg-gray-400 flex items-center justify-center"
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Procesando...
            </>
          ) : (
            'Pagar con Tarjeta'
          )}
        </button>
        <p className="text-xs text-gray-400 mt-4">Serás redirigido a la pasarela de pago segura de Stripe.</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-sm text-primary hover:underline">Volver</button>
      </div>
    </div>
  );
};

export default PaymentPage;