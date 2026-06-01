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
    description: 'Encuentra cómo un transistor controla la corriente',
    story:
      'La ciudad está a oscuras. Tu primera tarea es descubrir qué es un transistor y por qué su base, colector y emisor son tan importantes. Este conocimiento te permitirá pasar del apagón a una luz estable.',
    objectives: [
      'Aprender qué es un transistor',
      'Identificar los tres terminales: base, colector y emisor',
      'Comprender cómo el transistor controla el flujo de corriente',
    ],
    concept:
      'Un transistor es un dispositivo que funciona como una puerta para la corriente. La base controla si el colector puede dejar pasar corriente hacia el emisor. Entender esto es la base para todas las demás misiones.',
  },
  2: {
    title: 'Control de Corriente',
    description: 'Encuentra el valor correcto de Ib para encender la luz',
    story:
      'El generador principal está dormido. Debes encontrar cuánto debe recibir la base para que el transistor permita suficiente corriente en el colector y la luz vuelva a encenderse.',
    objectives: [
      'Identificar cómo Ib controla la corriente de colector',
      'Comparar cambios de Ib con cambios de Ic',
      'Usar el simulador para encontrar el valor de base correcto',
    ],
    concept:
      'En un transistor BJT, la base es la puerta. Ib es la corriente que le dice al transistor cuánto dejar pasar entre colector y emisor. La fórmula clave es Ic = β × Ib. Este concepto sirve para entender cómo encender o apagar una carga con una señal de control.',
  },
  3: {
    title: 'Amplificación',
    description: 'Ajusta β para lograr la intensidad correcta',
    story:
      'Las luces de la ciudad están encendidas, pero no con suficiente intensidad. Debes aprender cómo usar β para amplificar la corriente de base y lograr la potencia de salida necesaria.',
    objectives: [
      'Entender la ganancia de corriente β',
      'Ajustar β para obtener más amplificación',
      'Observar cómo cambia Ic cuando β varía',
    ],
    concept:
      'β es la ganancia de corriente del transistor. Indica cuántas veces mayor es Ic que Ib. A mayor β, una pequeña corriente de base produce una corriente de colector mucho más grande. Este concepto sirve para entender cómo una señal pequeña puede transformarse en una señal útil más potente.',
  },
  4: {
    title: 'Circuitos Complejos',
    description: 'Descubre cómo varios transistores trabajan juntos',
    story:
      'Las líneas de energía requieren más poder. Debes comprender por qué se usan transistores en cadena y cómo cada etapa controla la señal del siguiente.',
    objectives: [
      'Entender por qué se usan transistores en cascada',
      'Ver cómo se combina la amplificación',
      'Relacionar cada etapa con el control de salida',
    ],
    concept:
      'Un transistor puede amplificar una señal, pero uno solo no siempre es suficiente. En cascada, varias etapas permiten mayor ganancia y control, y cada etapa depende de la anterior. Esta idea sirve para construir amplificadores reales y sistemas de potencia más complejos.',
  },
  5: {
    title: 'Maestro de Transistores',
    description: 'Resuelve el desafío final usando todo lo aprendido',
    story:
      'La ciudad depende de ti para confirmar que dominas el transistor. Debes responder preguntas que exigen aplicar los conceptos de control, ganancia y regiones de operación.',
    objectives: [
      'Aplicar lo aprendido sobre Ib, β e Ic',
      'Identificar corte, activo y saturación',
      'Responder correctamente el quiz final',
    ],
    concept:
      'Un transistor puede trabajar en corte, activo o saturación. Cada modo define cómo controla y amplifica la corriente. Entenderlo es clave para diseñar circuitos reales y saber cuándo usar un transistor como amplificador o como conmutador.',
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

              {/* Mission Steps */}
              <motion.div
                className="glow-box p-6 rounded-lg backdrop-blur-md bg-slate-900/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl font-bold glow-text mb-4">✅ Pasos de la misión</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-300">
                  <li>Lee la historia y los objetivos de esta misión.</li>
                  <li>Usa la pantalla correspondiente (simulador, ejercicios o quiz).</li>
                  <li>Aplica los conceptos clave descritos aquí.</li>
                  <li>Cuando termines, presiona <strong>Completar Misión</strong>.</li>
                </ol>
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
