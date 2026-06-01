'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import QuizCard from '@/components/QuizCard';
import { saveScore } from '@/lib/supabase';

const EXERCISES = [
  {
    id: 1,
    question: '¿Qué es un transistor?',
    options: [
      'Un dispositivo que controla el flujo de corriente',
      'Un tipo de cable eléctrico',
      'Una fuente de energía',
      'Un resistor variable',
    ],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: '¿Cuál es la fórmula para calcular la corriente de colector (Ic)?',
    options: ['Ic = β × Ib', 'Ic = V/R', 'Ic = I/β', 'Ic = P/V'],
    correctAnswer: 0,
  },
  {
    id: 3,
    question: '¿Qué significa β en un transistor BJT?',
    options: ['Voltaje de base', 'Ganancia de corriente', 'Resistencia', 'Potencia'],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: '¿Cuál es la función principal de un transistor?',
    options: [
      'Proteger el circuito',
      'Amplificar o conmutar señales eléctricas',
      'Reducir el voltaje',
      'Almacenar energía',
    ],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: '¿Cuántos terminales tiene un transistor BJT?',
    options: ['2', '3', '4', '5'],
    correctAnswer: 1,
  },
];

export default function ExercisesPage() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [answers, setAnswers] = useState<(boolean | null)[]>(Array(EXERCISES.length).fill(null));
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (isCorrect: boolean) => {
    const newAnswers = [...answers];
    newAnswers[currentExercise] = isCorrect;
    setAnswers(newAnswers);
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentExercise < EXERCISES.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const correctCount = answers.filter((a) => a === true).length;
  const score = Math.round((correctCount / EXERCISES.length) * 100);

  const handleRestart = () => {
    setCurrentExercise(0);
    setAnswers(Array(EXERCISES.length).fill(null));
    setIsAnswered(false);
    setShowResults(false);
  };

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
                  <span className="glow-text">Ejercicios</span> de Transistores
                </h1>
                <p className="text-gray-400 text-lg">
                  Demuestra tu conocimiento con estos ejercicios de opción múltiple
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
                  <span className="text-sm font-semibold text-gray-300">Progreso</span>
                  <span className="text-sm font-bold glow-text">
                    {currentExercise + 1}/{EXERCISES.length}
                  </span>
                </div>
                <motion.div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
                    animate={{
                      width: `${(((currentExercise + 1) / EXERCISES.length) * 100).toFixed(0)}%`,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              </motion.div>

              {/* Quiz Card */}
              <motion.div
                key={currentExercise}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-8"
              >
                <QuizCard
                  {...EXERCISES[currentExercise]}
                  onAnswer={handleAnswer}
                  isAnswered={isAnswered}
                  selectedAnswer={
                    isAnswered
                      ? answers.findIndex((a, i) => i === currentExercise && a !== null)
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
                    {currentExercise === EXERCISES.length - 1 ? 'Ver Resultados' : 'Siguiente'}
                  </motion.button>
                </motion.div>
              )}
            </>
          ) : (
            /* Results Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.h2
                className="text-5xl font-bold mb-4 glow-text"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6 }}
              >
                ¡Resultados!
              </motion.h2>

              <motion.div
                className="glow-box-purple p-12 rounded-lg backdrop-blur-md bg-slate-900/50 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-6xl font-bold glow-text-purple mb-4">{score}%</div>
                <p className="text-2xl font-semibold text-gray-300 mb-6">
                  {correctCount} de {EXERCISES.length} correctas
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {answers.map((isCorrect, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className={`p-3 rounded text-sm font-semibold
                        ${
                          isCorrect
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }
                      `}
                    >
                      Pregunta {index + 1}: {isCorrect ? '✓ Correcta' : '✗ Incorrecta'}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Feedback */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-gray-300 mb-8"
              >
                {score >= 80
                  ? '¡Excelente! Dominas los conceptos de transistores. 🎉'
                  : score >= 60
                    ? 'Bien hecho. Repasa algunos conceptos y vuelve a intentar. 💪'
                    : 'Necesitas practicar más. ¡Vuelve al simulador! 📚'}
              </motion.p>

              {/* Restart Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex gap-4 justify-center"
              >
                <motion.button
                  onClick={handleRestart}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-black font-bold hover:shadow-glow transition-shadow"
                >
                  Reintentar
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
