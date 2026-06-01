'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface TransistorSimulatorProps {
  onDataChange?: (data: SimulatorData) => void;
}

interface SimulatorData {
  Ib: number;
  beta: number;
  Ic: number;
  lampIntensity: number;
}

export default function TransistorSimulator({ onDataChange }: TransistorSimulatorProps) {
  const [Ib, setIb] = useState(5);
  const [beta, setBeta] = useState(100);

  const Ic = useMemo(() => Ib * beta, [Ib, beta]);
  const lampIntensity = Math.min((Ic / 1000) * 100, 100);

  const data: SimulatorData = { Ib, beta, Ic, lampIntensity };

  React.useEffect(() => {
    onDataChange?.(data);
  }, [Ib, beta, Ic, lampIntensity]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto p-6 md:p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <motion.div variants={itemVariants} className="space-y-8">
          <h2 className="text-3xl font-bold glow-text mb-8">Control del Transistor</h2>

          {/* Ib Slider */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-200">
              Corriente Base (Ib): <span className="glow-text">{Ib.toFixed(2)} μA</span>
            </label>
            <input
              type="range"
              min="0"
              max="50"
              step="0.1"
              value={Ib}
              onChange={(e) => setIb(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-neon-blue"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>0 μA</span>
              <span>50 μA</span>
            </div>
          </div>

          {/* Beta Slider */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-200">
              Beta (Ganancia): <span className="glow-text">{beta}</span>
            </label>
            <input
              type="range"
              min="10"
              max="300"
              step="5"
              value={beta}
              onChange={(e) => setBeta(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-neon-purple"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>10</span>
              <span>300</span>
            </div>
          </div>

          {/* Formula */}
          <motion.div
            className="glow-box-purple p-6 rounded-lg backdrop-blur-md bg-slate-900/50"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-center font-mono text-lg">
              <span className="text-gray-300">Ic = β × Ib</span>
              <br />
              <span className="glow-text text-xl mt-2 block">{Ic.toFixed(0)} μA</span>
            </p>
          </motion.div>
        </motion.div>

        {/* Visualization */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center space-y-8"
        >
          <h2 className="text-3xl font-bold glow-text-purple text-center">Visualización</h2>

          {/* Transistor Diagram */}
          <svg
            viewBox="0 0 200 300"
            className="w-full max-w-xs h-auto filter drop-shadow-lg"
            style={{
              filter: `drop-shadow(0 0 ${lampIntensity / 10}px rgba(0, 240, 255, 0.5))`,
            }}
          >
            {/* Base connection */}
            <motion.line
              x1="50"
              y1="150"
              x2="80"
              y2="150"
              stroke="#00F0FF"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: Ib / 50 }}
              transition={{ duration: 0.3 }}
            />

            {/* Collector connection */}
            <motion.line
              x1="150"
              y1="50"
              x2="150"
              y2="120"
              stroke="#B000FF"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: Math.min(Ic / 1000, 1) }}
              transition={{ duration: 0.3 }}
            />

            {/* Emitter connection */}
            <motion.line
              x1="150"
              y1="180"
              x2="150"
              y2="250"
              stroke="#00D9FF"
              strokeWidth="2"
            />

            {/* Transistor symbol */}
            <circle cx="150" cy="150" r="40" fill="none" stroke="#00F0FF" strokeWidth="2" />

            {/* Base line */}
            <line x1="110" y1="130" x2="110" y2="170" stroke="#00F0FF" strokeWidth="3" />

            {/* Collector arrow */}
            <motion.path
              d="M 130 140 L 145 155 L 140 150"
              fill="none"
              stroke="#B000FF"
              strokeWidth="2"
              initial={{ opacity: 0 }}
              animate={{ opacity: Math.min(Ic / 100, 1) }}
              transition={{ duration: 0.3 }}
            />
          </svg>

          {/* Lamp */}
          <motion.div
            className="relative w-32 h-40 flex items-center justify-center"
            animate={{
              filter: `drop-shadow(0 0 ${lampIntensity / 2}px rgba(255, 200, 0, ${
                lampIntensity / 100
              }))`,
            }}
            transition={{ duration: 0.3 }}
          >
            <svg viewBox="0 0 100 140" className="w-full h-full">
              {/* Bulb */}
              <circle
                cx="50"
                cy="40"
                r="30"
                fill="none"
                stroke="#FFD700"
                strokeWidth="2"
                style={{
                  fillOpacity: lampIntensity / 100,
                  fill: `rgba(255, 200, 0, ${lampIntensity / 100})`,
                }}
              />

              {/* Filament */}
              <motion.path
                d="M 40 30 Q 50 15 60 30"
                stroke="#FFA500"
                strokeWidth="2"
                fill="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: lampIntensity / 100 }}
                transition={{ duration: 0.3 }}
              />

              {/* Socket */}
              <rect x="40" y="70" width="20" height="15" fill="#888" stroke="#666" strokeWidth="1" />
              <line x1="45" y1="85" x2="45" y2="100" stroke="#666" strokeWidth="2" />
              <line x1="55" y1="85" x2="55" y2="100" stroke="#666" strokeWidth="2" />
            </svg>

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(255, 200, 0, ${
                  lampIntensity / 200
                }) 0%, transparent 70%)`,
              }}
              animate={{
                boxShadow: `0 0 ${lampIntensity}px rgba(255, 200, 0, ${lampIntensity / 100})`,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Intensity indicator */}
          <div className="w-full max-w-xs">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Intensidad</span>
              <span>{lampIntensity.toFixed(0)}%</span>
            </div>
            <motion.div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple"
                animate={{ width: `${lampIntensity}%` }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Data Display */}
      <motion.div
        variants={itemVariants}
        className="mt-12 glow-box p-6 rounded-lg backdrop-blur-md bg-slate-900/50"
      >
        <h3 className="text-xl font-semibold glow-text mb-4">Datos en Tiempo Real</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Ib (μA)', value: Ib.toFixed(2) },
            { label: 'β (ganancia)', value: beta },
            { label: 'Ic (μA)', value: Ic.toFixed(0) },
            { label: 'Luz', value: `${lampIntensity.toFixed(0)}%` },
          ].map((item, i) => (
            <div key={i} className="text-center p-3 bg-slate-800/50 rounded">
              <p className="text-sm text-gray-400">{item.label}</p>
              <p className="text-lg font-bold glow-text">{item.value}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
