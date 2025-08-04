import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from '../ui/Icons';

const PaymentPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Construye el enlace de pago con el email del usuario para pre-rellenar el campo en Stripe
  const paymentLink = `https://buy.stripe.com/28E6oH3DH6UIaBZ6PW3AY0Y?prefilled_email=${encodeURIComponent(user?.email || '')}`;
  
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

        <a 
          href={paymentLink}
          className="w-full bg-accent text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-green-600 transition duration-300 flex items-center justify-center"
          aria-label="Pagar con Tarjeta para obtener acceso de por vida"
        >
          Pagar con Tarjeta
        </a>
        <p className="text-xs text-gray-400 mt-4">Serás redirigido a la pasarela de pago segura de Stripe.</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-sm text-primary hover:underline">Volver</button>
      </div>
    </div>
  );
};

export default PaymentPage;