'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import MissionCard from '@/components/MissionCard';

interface Mission {
  id: number;
  title: string;
  description: string;
  difficulty: 'Fácil' | 'Medio' | 'Difícil';
  icon: string;
}

const MISSIONS: Mission[] = [
  {
    id: 1,
    title: 'El Apagón',
    description: 'La ciudad quedó sin energía. Aprende los conceptos básicos del transistor para restaurarla.',
    difficulty: 'Fácil',
    icon: '🌑',
  },
  {
    id: 2,
    title: 'Control de Corriente',
    description: 'Domina cómo controlar la corriente usando transistores. La ciudad comienza a iluminarse.',
    difficulty: 'Fácil',
    icon: '⚡',
  },
  {
    id: 3,
    title: 'Amplificación',
    description: 'Aprende sobre ganancia y amplificación. Las luces brillan más que nunca.',
    difficulty: 'Medio',
    icon: '📈',
  },
  {
    id: 4,
    title: 'Circuitos Complejos',
    description: 'Crea circuitos con múltiples transistores. La ciudad se moderniza.',
    difficulty: 'Medio',
    icon: '🔌',
  },
  {
    id: 5,
    title: 'Maestro de Transistores',
    description: 'El desafío final. Demuestra tu conocimiento y sé el ingeniero de la ciudad.',
    difficulty: 'Difícil',
    icon: '👑',
  },
];

export default function MissionsPage() {
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);

  useEffect(() => {
    // Load completed missions from localStorage
    const saved = localStorage.getItem('completedMissions');
    if (saved) {
      setCompletedMissions(JSON.parse(saved));
    }
  }, []);

  const isLocked = (id: number) => {
    if (id === 1) return false;
    return !completedMissions.includes(id - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navigation />

      <div className="pt-28 pb-16 px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="glow-text">Misiones</span> del Transistor
          </h1>
          <p className="text-xl text-gray-400">
            Una ciudad sin energía necesita tu ayuda. Completa las 5 misiones para restaurar el poder de la electricidad.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-gray-300">Progreso General</span>
            <span className="text-sm font-bold glow-text">
              {completedMissions.length}/5 Completadas
            </span>
          </div>
          <motion.div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
              animate={{ width: `${(completedMissions.length / 5) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </motion.div>

        {/* Missions Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MISSIONS.map((mission) => (
              <MissionCard
                key={mission.id}
                {...mission}
                completed={completedMissions.includes(mission.id)}
                locked={isLocked(mission.id)}
              />
            ))}
          </div>
        </div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto mt-16 glow-box-purple p-8 rounded-lg backdrop-blur-md bg-slate-900/50"
        >
          <h2 className="text-2xl font-bold glow-text-purple mb-4">La Historia</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Hace una semana, un apagón catastrófico dejó a toda la ciudad sin energía. Los cables están rotos, los
            generadores fuera de servicio. Pero hay esperanza: descubrimientos antiguos sobre transistores podrían ser
            la clave para reconstruir el sistema eléctrico.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Como ingeniero elegido, debes completar 5 misiones progresivas para entender los secretos de los
            transistores. Con cada misión completada, la ciudad se ilumina un poco más. ¿Estás listo para ser el
            salvador?
          </p>
        </motion.div>
      </div>
    </div>
  );
}
