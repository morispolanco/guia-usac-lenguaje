
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from '../ui/Icons';

const PaymentPage: React.FC = () => {
  const { user, updatePaymentStatus } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(user?.hasPaid || false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate API call to Stripe
    setTimeout(() => {
      updatePaymentStatus();
      setIsProcessing(false);
      setIsPaid(true);
      // Redirect after a short delay to show success message
      setTimeout(() => navigate('/dashboard'), 2000);
    }, 1500);
  };
  
  if (isPaid && !isProcessing) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
                <CheckCircleIcon className="w-24 h-24 mx-auto text-accent"/>
                <h1 className="text-3xl font-bold text-gray-900">¡Pago Exitoso!</h1>
                <p className="text-lg text-gray-600">¡Gracias! Has desbloqueado el acceso de por vida. Serás redirigido en un momento.</p>
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
            'Pagar $19 con Stripe'
          )}
        </button>
        <p className="text-xs text-gray-400 mt-4">Simulación de pago seguro con Stripe.</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-sm text-primary hover:underline">Volver</button>
      </div>
    </div>
  );
};

export default PaymentPage;
