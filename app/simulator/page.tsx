'use client';

import React, { useState } from 'react';
import TransistorSimulator from '@/components/TransistorSimulator';
import Navigation from '@/components/Navigation';

export default function SimulatorPage() {
  const [simulatorData, setSimulatorData] = useState({
    Ib: 5,
    beta: 100,
    Ic: 500,
    lampIntensity: 50,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="text-center mb-12 px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="glow-text">Simulador</span> de Transistor
          </h1>
          <p className="text-gray-400 text-lg">
            Experimenta con los parámetros del transistor y observa cómo afecta a la salida
          </p>
        </div>
        <TransistorSimulator onDataChange={setSimulatorData} />
      </div>
    </div>
  );
}
