
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { BookOpenIcon, CheckCircleIcon, ArrowRightIcon } from '../ui/Icons';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary-dark text-white">
      <header className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Guía Interactiva USAC</h1>
        <nav>
          {isAuthenticated ? (
            <Link to="/dashboard" className="bg-secondary text-primary-dark font-bold py-2 px-4 rounded-full hover:bg-yellow-300 transition duration-300">
              Ir al Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="mr-4 hover:text-secondary">Iniciar Sesión</Link>
              <Link to="/register" className="bg-secondary text-primary-dark font-bold py-2 px-4 rounded-full hover:bg-yellow-300 transition duration-300">
                Regístrate Gratis
              </Link>
            </>
          )}
        </nav>
      </header>

      <main className="container mx-auto px-6 text-center pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <BookOpenIcon className="w-24 h-24 mx-auto text-secondary mb-4" />
          <h2 className="text-5xl font-extrabold leading-tight mb-4">
            Domina el Examen de Lenguaje de la USAC
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Transformamos la guía temática oficial en una experiencia de aprendizaje interactiva, divertida y eficaz para asegurar tu ingreso a la Universidad de San Carlos.
          </p>
          <Link to={isAuthenticated ? "/dashboard" : "/register"} className="bg-accent text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-green-600 transition duration-300 inline-flex items-center">
            Comenzar a Aprender Ahora <ArrowRightIcon className="w-6 h-6 ml-2" />
          </Link>
        </div>
      </main>

      <section className="bg-white text-dark py-20">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">¿Por qué elegir nuestra plataforma?</h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="w-8 h-8"/>
              </div>
              <h4 className="text-xl font-bold mb-2">Contenido Oficial</h4>
              <p className="text-gray-600">Basado 100% en la guía temática de lenguaje del Sistema de Ubicación y Nivelación de la USAC.</p>
            </div>
            <div className="p-6">
               <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15.232 5.232 3.536 3.536m-2.036-5.036a2.5 2.5 0 1 1 3.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              </div>
              <h4 className="text-xl font-bold mb-2">Aprendizaje Interactivo</h4>
              <p className="text-gray-600">Quizzes, ejercicios y actividades lúdicas que hacen el estudio ameno y efectivo.</p>
            </div>
            <div className="p-6">
               <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              </div>
              <h4 className="text-xl font-bold mb-2">Seguimiento de Progreso</h4>
              <p className="text-gray-600">Visualiza tu avance, revisa tus resultados y gana insignias por tus logros.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary-dark text-center py-6">
        <p>&copy; {new Date().getFullYear()} Guía Interactiva USAC. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;
