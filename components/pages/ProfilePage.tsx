
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { EDUCATIONAL_CONTENT } from '../../constants';
import { AwardIcon, CheckCircleIcon } from '../ui/Icons';
import { Unit } from '../../types';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  
  const allUnits: Unit[] = EDUCATIONAL_CONTENT.flatMap(m => m.units);
  const completedUnitsCount = allUnits.filter(unit => user?.progress[unit.id]?.completed).length;
  const totalUnitsCount = allUnits.length;
  const overallProgress = totalUnitsCount > 0 ? Math.round((completedUnitsCount / totalUnitsCount) * 100) : 0;
  
  const averageScore = () => {
    if (!user || totalUnitsCount === 0) return 0;
    const scores = Object.values(user.progress)
      .map(p => p.score)
      .filter((s): s is number => s !== null);
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }

  const badges = [
    { id: 'b1', name: 'Primeros Pasos', description: 'Completa tu primera unidad.', achieved: completedUnitsCount >= 1 },
    { id: 'b2', name: 'Aprendiz Comunicador', description: 'Completa el Módulo 1.', achieved: EDUCATIONAL_CONTENT.find(m => m.id === 'm1')?.units.every(u => user?.progress[u.id]?.completed) },
    { id: 'b3', name: 'Puntaje Perfecto', description: 'Obtén 100 en cualquier quiz.', achieved: Object.values(user?.progress || {}).some(p => p.score === 100) },
    { id: 'b4', name: 'Estudiante Dedicado', description: 'Completa 5 unidades.', achieved: completedUnitsCount >= 5 },
  ];

  if (!user) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Mi Progreso</h1>
      <p className="mt-1 text-lg text-gray-600">Un resumen de tu viaje de aprendizaje.</p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-500">Progreso Total</h3>
            <p className="text-5xl font-bold text-primary mt-2">{overallProgress}%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-500">Unidades Completadas</h3>
            <p className="text-5xl font-bold text-accent mt-2">{completedUnitsCount} <span className="text-2xl text-gray-400">/ {totalUnitsCount}</span></p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-500">Puntaje Promedio</h3>
            <p className="text-5xl font-bold text-secondary mt-2">{averageScore()}%</p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800">Insignias y Logros</h2>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map(badge => (
            <div key={badge.id} className={`p-4 rounded-lg shadow-md text-center border-2 ${badge.achieved ? 'border-secondary bg-yellow-50' : 'bg-gray-100'}`}>
              <AwardIcon className={`w-16 h-16 mx-auto ${badge.achieved ? 'text-secondary' : 'text-gray-400'}`} />
              <h4 className={`mt-2 font-bold ${badge.achieved ? 'text-gray-800' : 'text-gray-500'}`}>{badge.name}</h4>
              <p className="text-sm text-gray-500">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800">Progreso por Módulo</h2>
        <ul className="mt-4 space-y-4">
        {EDUCATIONAL_CONTENT.map(module => {
            const completedUnits = module.units.filter(unit => user.progress[unit.id]?.completed).length;
            const isCompleted = module.units.length > 0 && completedUnits === module.units.length;
            return (
                <li key={module.id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-lg text-gray-800">{module.title}</h3>
                        <p className="text-sm text-gray-500">{completedUnits} / {module.units.length} unidades completadas</p>
                    </div>
                    {isCompleted && <CheckCircleIcon className="w-8 h-8 text-accent" />}
                </li>
            )
        })}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
