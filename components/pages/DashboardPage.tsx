
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { EDUCATIONAL_CONTENT } from '../../constants';
import { BookOpenIcon, ArrowRightIcon } from '../ui/Icons';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const calculateModuleProgress = (moduleId: string) => {
    const module = EDUCATIONAL_CONTENT.find(m => m.id === moduleId);
    if (!module || !user || module.units.length === 0) return 0;

    const completedUnits = module.units.filter(unit => user.progress[unit.id]?.completed).length;
    return Math.round((completedUnits / module.units.length) * 100);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Dashboard de Aprendizaje</h1>
      <p className="mt-1 text-lg text-gray-600">Hola, {user?.email}! Continúa tu preparación para el examen.</p>

      <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {EDUCATIONAL_CONTENT.map(module => {
          const progress = calculateModuleProgress(module.id);
          return (
            <div key={module.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="bg-primary-light text-white p-3 rounded-full">
                     <BookOpenIcon className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-semibold text-primary">{progress}% completado</span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-900">{module.title}</h3>
                <p className="mt-2 text-gray-600 h-16">{module.description}</p>
                
                <div className="mt-4">
                    <div className="bg-gray-200 rounded-full h-2.5">
                        <div className="bg-accent h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>

              </div>
              <div className="bg-gray-50 px-6 py-4">
                 <Link to={module.units.length > 0 ? `/module/${module.id}/unit/${module.units[0].id}` : '#'} className={`flex items-center justify-center text-primary font-semibold ${module.units.length === 0 ? 'cursor-not-allowed text-gray-400' : 'hover:text-primary-dark'}`}>
                  {module.units.length > 0 ? 'Empezar Módulo' : 'Próximamente'}
                  {module.units.length > 0 && <ArrowRightIcon className="w-5 h-5 ml-2" />}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardPage;
