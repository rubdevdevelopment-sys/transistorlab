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
              <p>Tu objetivo es aprender qué controla el transistor: buscar cómo afecta <strong>Ib</strong> a <strong>Ic</strong> y cómo <strong>β</strong> amplifica esa señal para encender mejor la luz.</p>
            </div>
            <div className="glow-box p-4 rounded-xl bg-slate-900/50 text-gray-300">
              <h2 className="font-semibold mb-2">Tu tarea</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Usa los deslizadores para encontrar el valor de <strong>Ib</strong> que activa el transistor.</li>
                <li>Después ajusta <strong>β</strong> para ver cómo cambia la corriente de colector <strong>Ic</strong> con la misma base.</li>
                <li>No se trata solo de mover los controles, sino de ver qué combinación hace que la lámpara brille más con menos señal de control.</li>
              </ul>
            </div>
            <div className="glow-box p-4 rounded-xl bg-slate-900/50 text-gray-300">
              <h2 className="font-semibold mb-2">Qué debes buscar</h2>
              <p>Observa que cuando subes <strong>Ib</strong>, <strong>Ic</strong> debe subir. Y cuando subes <strong>β</strong>, la misma <strong>Ib</strong> produce una <strong>Ic</strong> mayor. Ese es el comportamiento que debes entender.</p>
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
