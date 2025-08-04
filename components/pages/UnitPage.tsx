
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EDUCATIONAL_CONTENT } from '../../constants';
import Quiz from '../Quiz';
import { useAuth } from '../../hooks/useAuth';
import { CheckCircleIcon } from '../ui/Icons';

const UnitPage: React.FC = () => {
  const { moduleId, unitId } = useParams<{ moduleId: string; unitId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showQuiz, setShowQuiz] = useState(false);

  const module = EDUCATIONAL_CONTENT.find(m => m.id === moduleId);
  const unit = module?.units.find(u => u.id === unitId);

  const isCompleted = user?.progress[unitId!]?.completed || false;
  const score = user?.progress[unitId!]?.score;

  if (!module || !unit) {
    return <div>Contenido no encontrado.</div>;
  }
  
  const handleQuizComplete = () => {
    setShowQuiz(false);
    // Potentially navigate to next unit
    const currentUnitIndex = module.units.findIndex(u => u.id === unitId);
    if(currentUnitIndex < module.units.length - 1) {
        const nextUnit = module.units[currentUnitIndex + 1];
        navigate(`/module/${moduleId}/unit/${nextUnit.id}`);
    } else {
        navigate('/dashboard');
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{unit.title}</h1>
          <p className="mt-1 text-lg text-gray-500">{module.title}</p>
        </div>
        {isCompleted && (
            <div className="flex items-center bg-green-100 text-accent font-semibold px-4 py-2 rounded-full">
                <CheckCircleIcon className="w-6 h-6 mr-2" />
                Completado (Puntaje: {score}%)
            </div>
        )}
      </div>

      <div className="mt-8 bg-white p-8 rounded-lg shadow-lg">
        {!showQuiz ? (
          <>
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-primary-dark">Teoría</h2>
              {unit.content.theory.map((p, i) => <p key={i}>{p}</p>)}
              
              {unit.content.examples.length > 0 && (
                <>
                  <h3 className="text-xl font-bold mt-6 text-primary-dark">Ejemplos</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {unit.content.examples.map((ex, i) => <li key={i}>{ex}</li>)}
                  </ul>
                </>
              )}
            </div>

            <div className="mt-10 text-center">
              <button
                onClick={() => setShowQuiz(true)}
                className="bg-secondary text-primary-dark font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-300 transition duration-300 shadow-md"
              >
                {isCompleted ? 'Repetir Quiz' : 'Comenzar Quiz'}
              </button>
            </div>
          </>
        ) : (
          <Quiz quiz={unit.quiz} unitId={unit.id} onComplete={handleQuizComplete} />
        )}
      </div>
    </div>
  );
};

export default UnitPage;
