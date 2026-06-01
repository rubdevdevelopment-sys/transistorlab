'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface MissionCardProps {
  id: number;
  title: string;
  description: string;
  difficulty: 'Fácil' | 'Medio' | 'Difícil';
  completed: boolean;
  locked: boolean;
  icon: string;
}

export default function MissionCard({
  id,
  title,
  description,
  difficulty,
  completed,
  locked,
  icon,
}: MissionCardProps) {
  const difficultyColor = {
    Fácil: 'text-green-400',
    Medio: 'text-yellow-400',
    Difícil: 'text-red-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={!locked ? { y: -5 } : {}}
      viewport={{ once: true }}
      className={`relative group h-full ${locked ? 'opacity-60' : ''}`}
    >
      <div
        className={`glow-box p-6 rounded-lg backdrop-blur-md transition-all h-full flex flex-col
        ${
          locked
            ? 'bg-slate-900/30 border-gray-700/50 cursor-not-allowed'
            : completed
              ? 'bg-slate-900/70 border-green-400/50'
              : 'bg-slate-900/50 border-neon-blue/50 hover:border-neon-blue'
        }
        `}
      >
        {/* Lock overlay */}
        {locked && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/30 backdrop-blur-sm">
            <div className="text-4xl">🔒</div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl">{icon}</div>
          {completed && <span className="text-2xl">✅</span>}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-2 glow-text">{title}</h3>

        {/* Description */}
        <p className="text-sm text-gray-400 mb-4 flex-grow">{description}</p>

        {/* Difficulty */}
        <div className="mb-4">
          <span className={`text-xs font-semibold ${difficultyColor[difficulty]}`}>
            {difficulty}
          </span>
        </div>

        {/* Button */}
        {!locked && (
          <Link href={`/missions/${id}`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2 rounded bg-gradient-to-r from-neon-blue to-neon-purple text-black font-bold hover:shadow-glow-strong transition-shadow"
            >
              {completed ? 'Revisar' : 'Comenzar'}
            </motion.button>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
