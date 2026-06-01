'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import QuizCard from '@/components/QuizCard';
import { saveScore } from '@/lib/supabase';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: '¿En qué regiones de operación del transistor BJT se amplifica la señal?',
    options: ['Región de corte', 'Región activa', 'Región de saturación', 'Todas las anteriores'],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: '¿Cuál es la diferencia entre un transistor NPN y un PNP?',
    options: [
      'El flujo de corriente y la polaridad del voltaje',
      'La ganancia',
      'La potencia',
      'No hay diferencia',
    ],
    correctAnswer: 0,
  },
  {
    id: 3,
    question: '¿Qué sucede cuando Vbe (voltaje base-emisor) es mayor que 0.7V en un transistor BJT?',
    options: [
      'El transistor se apaga',
      'El transistor se satura',
      'El transistor se destruye',
      'No tiene efecto',
    ],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: '¿Cuál es la función del capacitor en un amplificador de transistor?',
    options: [
      'Amplificar la señal',
      'Bloquear corriente DC y permitir AC',
      'Reducir el ruido',
      'Aumentar la ganancia',
    ],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: '¿Qué es la retroalimentación negativa en un amplificador?',
    options: [
      'Una reducción de la ganancia',
      'Un aumento de la distorsión',
      'Un método para estabilizar el amplificador y reducir la distorsión',
      'Un fallo del transistor',
    ],
    correctAnswer: 2,
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(boolean | null)[]>(Array(QUIZ_QUESTIONS.length).fill(null));
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [finalScore, setFinalScore] = useState(0);
  const [scoreSaved, setScoreSaved] = useState(false);

  const handleAnswer = (isCorrect: boolean) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = isCorrect;
    setAnswers(newAnswers);
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setIsAnswered(false);
    } else {
      showResultsScreen();
    }
  };

  const showResultsScreen = () => {
    const correctCount = answers.filter((a) => a === true).length;
    const score = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
    setFinalScore(score);
    setShowResults(true);
  };

  const handleSaveScore = async () => {
    if (playerName.trim()) {
      await saveScore(playerName, finalScore);
      setScoreSaved(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers(Array(QUIZ_QUESTIONS.length).fill(null));
    setIsAnswered(false);
    setShowResults(false);
    setPlayerName('');
    setFinalScore(0);
    setScoreSaved(false);
  };

  const correctCount = answers.filter((a) => a === true).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navigation />

      <div className="pt-28 pb-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          {!showResults ? (
            <>
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="glow-text">Quiz Final</span>
                </h1>
                <p className="text-gray-400 text-lg">
                  Demuestra tu dominio absoluto de los transistores en este desafío final
                </p>
              </motion.div>

              {/* Progress */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-300">Progreso del Quiz</span>
                  <span className="text-sm font-bold glow-text">
                    {currentQuestion + 1}/{QUIZ_QUESTIONS.length}
                  </span>
                </div>
                <motion.div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
                    animate={{
                      width: `${(((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100).toFixed(0)}%`,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              </motion.div>

              {/* Quiz Card */}
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-8"
              >
                <QuizCard
                  {...QUIZ_QUESTIONS[currentQuestion]}
                  onAnswer={handleAnswer}
                  isAnswered={isAnswered}
                  selectedAnswer={
                    isAnswered
                      ? answers.findIndex((a, i) => i === currentQuestion && a !== null)
                      : null
                  }
                />
              </motion.div>

              {/* Navigation Button */}
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-end"
                >
                  <motion.button
                    onClick={handleNext}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-black font-bold hover:shadow-glow transition-shadow"
                  >
                    {currentQuestion === QUIZ_QUESTIONS.length - 1
                      ? 'Completar Quiz'
                      : 'Siguiente Pregunta'}
                  </motion.button>
                </motion.div>
              )}
            </>
          ) : (
            /* Results Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {!scoreSaved ? (
                <>
                  <motion.h2
                    className="text-5xl font-bold mb-4 text-center glow-text"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.6 }}
                  >
                    ¡Quiz Completado!
                  </motion.h2>

                  <motion.div
                    className="glow-box-purple p-12 rounded-lg backdrop-blur-md bg-slate-900/50 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="text-7xl font-bold glow-text-purple mb-4 text-center">
                      {finalScore}%
                    </div>
                    <p className="text-2xl font-semibold text-gray-300 mb-8 text-center">
                      {correctCount} de {QUIZ_QUESTIONS.length} correctas
                    </p>

                    <div className="grid grid-cols-5 gap-2 mb-8">
                      {answers.map((isCorrect, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className={`p-3 rounded text-center font-bold text-sm
                            ${
                              isCorrect
                                ? 'bg-green-500/20 text-green-400 border border-green-400'
                                : 'bg-red-500/20 text-red-400 border border-red-400'
                            }
                          `}
                        >
                          {isCorrect ? '✓' : '✗'}
                        </motion.div>
                      ))}
                    </div>

                    {/* Performance Message */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-center text-lg text-gray-300 mb-8"
                    >
                      {finalScore >= 90
                        ? '¡Eres un maestro de transistores! 👑'
                        : finalScore >= 70
                          ? '¡Buen trabajo! Demuestras sólido conocimiento. 🎉'
                          : '¡Vuelve a intentar! Hay muchas cosas interesantes por aprender. 📚'}
                    </motion.p>
                  </motion.div>

                  {/* Save Score Form */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="glow-box p-8 rounded-lg backdrop-blur-md bg-slate-900/50 mb-8"
                  >
                    <h3 className="text-xl font-bold glow-text mb-4">Guardar tu Puntaje</h3>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        placeholder="Tu nombre"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        maxLength={20}
                        className="flex-1 px-4 py-2 rounded bg-slate-800 text-white border border-neon-blue/50 focus:border-neon-blue outline-none transition-colors"
                      />
                      <motion.button
                        onClick={handleSaveScore}
                        disabled={!playerName.trim()}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-black font-bold hover:shadow-glow transition-shadow disabled:opacity-50"
                      >
                        Guardar
                      </motion.button>
                    </div>
                  </motion.div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <motion.h2
                    className="text-4xl font-bold mb-4 glow-text-purple"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.6 }}
                  >
                    ¡Puntaje Guardado!
                  </motion.h2>
                  <p className="text-lg text-gray-300 mb-8">
                    Tu puntaje de <span className="glow-text font-bold">{finalScore}%</span> ha sido
                    registrado como <span className="glow-text-purple font-bold">{playerName}</span>
                  </p>
                  <p className="text-gray-400 mb-8">
                    Consulta el ranking para ver cómo te posicionas contra otros jugadores.
                  </p>
                </motion.div>
              )}

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex gap-4 justify-center flex-wrap"
              >
                <motion.button
                  onClick={handleRestart}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-black font-bold hover:shadow-glow transition-shadow"
                >
                  Reintentar Quiz
                </motion.button>
                <motion.a
                  href="/leaderboard"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-lg bg-slate-800 text-neon-blue font-bold border border-neon-blue hover:shadow-glow transition-shadow inline-block"
                >
                  Ver Ranking
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
