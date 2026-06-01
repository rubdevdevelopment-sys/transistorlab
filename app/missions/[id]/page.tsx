'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import TransistorSimulator from '@/components/TransistorSimulator';

interface MissionDetail {
  title: string;
  description: string;
  story: string;
  objectives: string[];
  concept: string;
}

const MISSION_DETAILS: { [key: number]: MissionDetail } = {
  1: {
    title: 'El Apagón',
    description: 'La ciudad quedó sin energía',
    story:
      'Hace una semana, un apagón catastrófico dejó la ciudad a oscuras. Tú, como ingeniero, debes entender qué son los transistores para comenzar a restaurar el poder.',
    objectives: [
      'Aprender qué es un transistor',
      'Entender los tres terminales (base, colector, emisor)',
      'Comprender el concepto básico de amplificación',
    ],
    concept:
      'Un transistor es un dispositivo semiconductor con tres terminales que controla el flujo de corriente. Es el componente fundamental de toda la electrónica moderna.',
  },
  2: {
    title: 'Control de Corriente',
    description: 'Domina el control de corriente',
    story:
      'Ahora que entiendes qué son los transistores, aprenderás a controlar la corriente con precisión. Esta habilidad es clave para restaurar los sistemas de la ciudad.',
    objectives: [
      'Controlar la corriente de base (Ib)',
      'Observar cómo afecta a la corriente de colector (Ic)',
      'Entender la relación Ic = β × Ib',
    ],
    concept:
      'La corriente que fluye por la base controla la corriente mucho mayor que fluye entre colector y emisor. Esta es la base de la amplificación.',
  },
  3: {
    title: 'Amplificación',
    description: 'Aprende sobre ganancia',
    story: 'Con el control dominado, ahora explorarás la amplificación. Las luces de la ciudad comienzan a brillar.',
    objectives: [
      'Entender el concepto de ganancia (β)',
      'Ajustar beta para diferentes amplificaciones',
      'Observar cómo β afecta la intensidad de salida',
    ],
    concept:
      'La ganancia (β) determina cuántas veces se amplifica la corriente. Un transistor con β=100 amplifica la corriente de base 100 veces.',
  },
  4: {
    title: 'Circuitos Complejos',
    description: 'Crea circuitos avanzados',
    story:
      'Ahora construirás circuitos con múltiples transistores. La ciudad se moderniza con sistemas complejos de control.',
    objectives: [
      'Combinar múltiples transistores',
      'Crear circuitos de amplificación en cascada',
      'Controlar sistemas complejos de energía',
    ],
    concept:
      'Los transistores se pueden conectar en serie (en cascada) para obtener amplificaciones aún mayores, permitiendo diseños complejos.',
  },
  5: {
    title: 'Maestro de Transistores',
    description: 'El desafío final',
    story:
      'Has llegado al final. Demuestra tu maestría en transistores y sé el ingeniero que la ciudad necesita. ¡La ciudad te espera!',
    objectives: [
      'Dominar todos los conceptos aprendidos',
      'Resolver un desafío técnico complejo',
      'Reclamar tu título de Maestro de Transistores',
    ],
    concept:
      'Los transistores son la base de toda la tecnología moderna. Desde amplificadores hasta computadoras, los transistores lo hacen posible.',
  },
};

export default function MissionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const missionId = parseInt(params.id as string);
  const mission = MISSION_DETAILS[missionId];

  const [isCompleted, setIsCompleted] = useState(false);
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);

  useEffect(() => {
    // Load completed missions
    const saved = localStorage.getItem('completedMissions');
    if (saved) {
      const completed = JSON.parse(saved);
      setCompletedMissions(completed);
      setIsCompleted(completed.includes(missionId));
    }
  }, [missionId]);

  const handleCompleteMission = () => {
    const updated = [...completedMissions, missionId];
    setCompletedMissions(updated);
    localStorage.setItem('completedMissions', JSON.stringify(updated));
    setIsCompleted(true);
  };

  if (!mission) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Navigation />
        <div className="pt-28 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold glow-text mb-4">Misión no encontrada</h1>
            <button
              onClick={() => router.push('/missions')}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-black font-bold"
            >
              Volver a Misiones
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navigation />

      <div className="pt-28 pb-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">🎮</span>
              <h1 className="text-4xl md:text-5xl font-bold glow-text">Misión {missionId}</h1>
            </div>
            <h2 className="text-2xl font-semibold text-gray-300 mb-4">{mission.title}</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Story */}
              <motion.div
                className="glow-box p-6 rounded-lg backdrop-blur-md bg-slate-900/50"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-bold glow-text mb-4">📖 Historia</h3>
                <p className="text-gray-300 leading-relaxed">{mission.story}</p>
              </motion.div>

              {/* Objectives */}
              <motion.div
                className="glow-box-purple p-6 rounded-lg backdrop-blur-md bg-slate-900/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold glow-text-purple mb-4">🎯 Objetivos</h3>
                <ul className="space-y-3">
                  {mission.objectives.map((obj, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-neon-blue mt-1">✓</span>
                      <span className="text-gray-300">{obj}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Concept */}
              <motion.div
                className="glow-box p-6 rounded-lg backdrop-blur-md bg-slate-900/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl font-bold glow-text mb-4">💡 Concepto Clave</h3>
                <p className="text-gray-300">{mission.concept}</p>
              </motion.div>
            </motion.div>

            {/* Sidebar - Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Status Card */}
              <motion.div
                className={`glow-box p-6 rounded-lg backdrop-blur-md ${
                  isCompleted
                    ? 'bg-green-500/10 border-green-400/50'
                    : 'bg-slate-900/50 border-neon-blue/50'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{isCompleted ? '✅' : '⏳'}</div>
                  <p className="text-lg font-bold text-gray-300 mb-2">
                    {isCompleted ? 'Completada' : 'En Progreso'}
                  </p>
                  <p className="text-sm text-gray-400">
                    {isCompleted
                      ? 'Excelente trabajo. Misión lograda.'
                      : 'Completa la misión para continuar.'}
                  </p>
                </div>
              </motion.div>

              {/* Difficulty */}
              <motion.div className="glow-box-purple p-6 rounded-lg backdrop-blur-md bg-slate-900/50">
                <p className="text-sm text-gray-400 mb-2">Dificultad</p>
                <div className="flex gap-1">
                  {[...Array(missionId)].map((_, i) => (
                    <div key={i} className="w-2 h-8 bg-neon-purple rounded" />
                  ))}
                  {[...Array(5 - missionId)].map((_, i) => (
                    <div key={i} className="w-2 h-8 bg-gray-700 rounded" />
                  ))}
                </div>
              </motion.div>

              {/* Action Button */}
              {!isCompleted && (
                <motion.button
                  onClick={handleCompleteMission}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-black font-bold hover:shadow-glow transition-shadow"
                >
                  Completar Misión
                </motion.button>
              )}

              {/* Navigation */}
              <motion.button
                onClick={() => router.push('/missions')}
                className="w-full px-6 py-3 rounded-lg bg-slate-800 text-neon-blue font-bold border border-neon-blue hover:bg-slate-700 transition-colors"
              >
                Volver a Misiones
              </motion.button>
            </motion.div>
          </div>

          {/* Simulator - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold glow-text mb-8">🔬 Experimenta</h2>
            <TransistorSimulator />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
