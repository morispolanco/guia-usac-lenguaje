import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { CheckCircleIcon } from '../ui/Icons';

const PaymentSuccessPage: React.FC = () => {
  const { updatePaymentStatus, user } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Verificando tu compra...');

  useEffect(() => {
    // Este efecto se ejecuta una sola vez cuando el componente se monta.
    // Solo actualiza el estado si el usuario aún no ha pagado.
    if (user && !user.hasPaid) {
      updatePaymentStatus();
    }
    
    setMessage('¡Gracias! Has desbloqueado el acceso de por vida.');

    const timer = setTimeout(() => {
      navigate('/dashboard', { replace: true });
    }, 3000);

    // Limpia el temporizador si el componente se desmonta antes de tiempo.
    return () => clearTimeout(timer);
  }, [user, updatePaymentStatus, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <CheckCircleIcon className="w-24 h-24 mx-auto text-accent"/>
        <h1 className="text-3xl font-bold text-gray-900">¡Pago Exitoso!</h1>
        <p className="text-lg text-gray-600">{message}</p>
        <div className="flex justify-center items-center space-x-2 pt-4">
            <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-500">Serás redirigido al dashboard en un momento...</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
