'use client';

import React from 'react';
import TransistorSimulator from '@/components/TransistorSimulator';
import Navigation from '@/components/Navigation';

export default function SimulatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="text-center mb-12 px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="glow-text">Simulador</span> de Transistor
          </h1>
          <p className="text-gray-400 text-lg mb-4">
            Misión 2: Control de Corriente. Ajusta Ib y β para ver cómo cambia Ic y qué efectos tiene en el circuito.
          </p>
          <div className="mx-auto max-w-3xl grid gap-4 text-left">
            <div className="glow-box p-4 rounded-xl bg-slate-900/50 text-gray-300">
              <h2 className="font-semibold mb-2">Reto</h2>
              <p>Debes encontrar el valor correcto de <strong>Ib</strong> y luego usar <strong>β</strong> para que la corriente de colector sea suficiente y la luz aumente.</p>
            </div>
            <div className="glow-box p-4 rounded-xl bg-slate-900/50 text-gray-300">
              <h2 className="font-semibold mb-2">Tu tarea</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Sube o baja <strong>Ib</strong> y observa el cambio en <strong>Ic</strong>.</li>
                <li>Cambia <strong>β</strong> para ver cuánto amplifica cada unidad de corriente de base.</li>
                <li>Usa la luz como indicador: cuanto más brillante, mayor es la corriente de colector.</li>
              </ul>
            </div>
            <div className="glow-box p-4 rounded-xl bg-slate-900/50 text-gray-300">
              <h2 className="font-semibold mb-2">Concepto clave</h2>
              <p>La base es la entrada de control. <strong>Ib</strong> le dice al transistor cuánto dejar pasar, y <strong>β</strong> define cuánto se amplifica esa señal: <strong>Ic = β × Ib</strong>.</p>
            </div>
          </div>
        </div>
        <TransistorSimulator />
      </div>
    </div>
  );
}
