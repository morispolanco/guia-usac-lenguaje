
import React, { useState } from 'react';
import { QuizQuestion, QuizQuestionType } from '../types';
import { useAuth } from '../hooks/useAuth';
import { CheckCircleIcon, XCircleIcon, ArrowRightIcon } from './ui/Icons';

interface QuizProps {
  quiz: QuizQuestion[];
  unitId: string;
  onComplete: () => void;
}

const Quiz: React.FC<QuizProps> = ({ quiz, unitId, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | boolean | null>(null);
  const [answers, setAnswers] = useState<(string | boolean | null)[]>([]);
  const [showResult, setShowResult] = useState(false);
  const { updateUserProgress } = useAuth();

  const currentQuestion = quiz[currentQuestionIndex];

  const handleSelectAnswer = (answer: string | boolean) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult(newAnswers);
      setShowResult(true);
    }
  };

  const calculateResult = (finalAnswers: (string | boolean | null)[]) => {
    let correctCount = 0;
    quiz.forEach((q, i) => {
      if (q.answer === finalAnswers[i]) {
        correctCount++;
      }
    });
    const score = Math.round((correctCount / quiz.length) * 100);
    updateUserProgress(unitId, score);
  };
  
  const score = Math.round((answers.filter((ans, i) => ans === quiz[i].answer).length / quiz.length) * 100);

  if (showResult) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary-dark">Resultados del Quiz</h2>
        <p className="text-5xl font-extrabold my-4" style={{color: score > 70 ? '#4CAF50' : (score > 40 ? '#FFD700' : '#F44336')}}>
            {score}%
        </p>
        <p className="text-lg text-gray-600">
            Respondiste correctamente {answers.filter((ans, i) => ans === quiz[i].answer).length} de {quiz.length} preguntas.
        </p>
        
        <div className="mt-8 text-left max-w-2xl mx-auto space-y-4">
            {quiz.map((q, i) => (
                <div key={q.id} className={`p-4 rounded-lg border-l-4 ${answers[i] === q.answer ? 'border-accent bg-green-50' : 'border-danger bg-red-50'}`}>
                    <p className="font-semibold">{q.question}</p>
                    <p className="text-sm mt-1">Tu respuesta: <span className="font-bold">{answers[i]?.toString()}</span></p>
                    {answers[i] !== q.answer && (
                        <p className="text-sm mt-1 text-green-700 font-semibold">Respuesta correcta: {q.answer.toString()}</p>
                    )}
                    <p className="text-sm mt-2 text-gray-600 italic">{q.explanation}</p>
                </div>
            ))}
        </div>

        <button onClick={onComplete} className="mt-8 bg-primary text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-primary-dark transition duration-300">
          Continuar
        </button>
      </div>
    );
  }

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case QuizQuestionType.MultipleChoice:
        return (
          <div className="space-y-4">
            {currentQuestion.options?.map((option, i) => (
              <button
                key={i}
                onClick={() => handleSelectAnswer(option)}
                className={`block w-full text-left p-4 rounded-lg border-2 transition-colors ${selectedAnswer === option ? 'bg-secondary border-primary-dark text-primary-dark font-bold' : 'bg-gray-100 border-gray-200 hover:border-secondary'}`}
              >
                {option}
              </button>
            ))}
          </div>
        );
      case QuizQuestionType.TrueFalse:
        return (
          <div className="flex space-x-4">
            <button onClick={() => handleSelectAnswer(true)} className={`w-full p-4 rounded-lg border-2 transition-colors ${selectedAnswer === true ? 'bg-accent border-green-700 text-white font-bold' : 'bg-gray-100 hover:border-accent'}`}>
              Verdadero
            </button>
            <button onClick={() => handleSelectAnswer(false)} className={`w-full p-4 rounded-lg border-2 transition-colors ${selectedAnswer === false ? 'bg-danger border-red-700 text-white font-bold' : 'bg-gray-100 hover:border-danger'}`}>
              Falso
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary-dark">Pregunta {currentQuestionIndex + 1} de {quiz.length}</h2>
        <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
          <div className="bg-accent h-2.5 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / quiz.length) * 100}%` }}></div>
        </div>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg">
        <p className="text-lg font-semibold text-gray-800 mb-6">{currentQuestion.question}</p>
        {renderQuestion()}
      </div>
      <div className="mt-6 text-right">
        <button
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null}
          className="bg-primary text-white font-bold py-2 px-6 rounded-full inline-flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-primary-dark transition-colors"
        >
          {currentQuestionIndex < quiz.length - 1 ? 'Siguiente' : 'Finalizar'}
          <ArrowRightIcon className="w-5 h-5 ml-2"/>
        </button>
      </div>
    </div>
  );
};

export default Quiz;
