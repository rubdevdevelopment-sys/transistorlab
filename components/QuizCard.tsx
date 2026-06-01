'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface QuizCardProps {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  onAnswer: (selectedIndex: number) => void;
  isAnswered: boolean;
  selectedAnswer: number | null;
}

export default function QuizCard({
  id,
  question,
  options,
  correctAnswer,
  onAnswer,
  isAnswered,
  selectedAnswer,
}: QuizCardProps) {
  const handleSelectOption = (index: number) => {
    if (!isAnswered) {
      onAnswer(index);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <div className="glow-box p-8 rounded-lg backdrop-blur-md bg-slate-900/50 mb-6">
        <h3 className="text-2xl font-bold glow-text mb-8">Pregunta {id}</h3>
        <p className="text-lg text-gray-200 mb-8">{question}</p>

        <div className="space-y-4">
          {options.map((option, index) => {
            const isCorrect = index === correctAnswer;
            const isSelected = index === selectedAnswer;
            const showFeedback = isAnswered && isSelected;

            return (
              <motion.button
                key={index}
                onClick={() => handleSelectOption(index)}
                disabled={isAnswered}
                whileHover={!isAnswered ? { scale: 1.02 } : {}}
                whileTap={!isAnswered ? { scale: 0.98 } : {}}
                className={`w-full p-4 rounded-lg text-left font-semibold transition-all
                  ${
                    showFeedback && isCorrect
                      ? 'bg-green-500/20 border-2 border-green-400 text-green-400'
                      : showFeedback && !isCorrect
                        ? 'bg-red-500/20 border-2 border-red-400 text-red-400'
                        : isSelected
                          ? 'bg-neon-blue/20 border-2 border-neon-blue text-neon-blue'
                          : 'bg-slate-800/50 border-2 border-gray-600 text-gray-200 hover:border-neon-blue hover:text-neon-blue'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border-2">
                    {showFeedback && isCorrect && '✓'}
                    {showFeedback && !isCorrect && '✗'}
                    {!showFeedback && String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {isAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg text-center font-semibold
            ${
              selectedAnswer === correctAnswer
                ? 'bg-green-500/20 text-green-400 border border-green-400'
                : 'bg-red-500/20 text-red-400 border border-red-400'
            }
          `}
        >
          {selectedAnswer === correctAnswer ? '¡Correcto! 🎉' : 'Respuesta incorrecta. ❌'}
        </motion.div>
      )}
    </motion.div>
  );
}
