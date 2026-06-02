'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { getLeaderboard, Player } from '@/lib/sheets';

const TEAM_MEMBERS = [
  'LEIDY MARYURI RODRIGUEZ JIMÉNEZ',
  'DAVID SANTIAGO VARGAS NOVA',
  'RUBÉN DARÍO MONROY LEÓN',
];

export default function LeaderboardPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await getLeaderboard(10);
        setPlayers(data);
      } catch (err) {
        setError('Error al cargar el ranking');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const medalColors = {
    0: 'text-yellow-400',
    1: 'text-gray-400',
    2: 'text-orange-400',
  };

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navigation />

      <div className="pt-28 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="glow-text">Ranking</span> Global
            </h1>
            <p className="text-gray-400 text-lg mb-4">
              Los mejores ingenieros de transistores del planeta
            </p>
            <div className="glow-box p-4 rounded-lg bg-slate-900/60 border border-neon-blue/40 text-sm text-gray-300">
              <p className="font-semibold text-neon-blue">Equipo TransistorLab</p>
              <p>Ingeniería de Sistemas - Universidad Incca de Colombia - 2026</p>
              <div className="mt-3 space-y-1 text-gray-400">
                {TEAM_MEMBERS.map((member) => (
                  <p key={member}>• {member}</p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Leaderboard */}
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="inline-block">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-12 h-12 border-4 border-neon-blue border-t-transparent rounded-full"
                />
              </div>
              <p className="text-gray-400 mt-4">Cargando ranking...</p>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glow-box-purple p-8 rounded-lg text-center text-red-400"
            >
              {error}
            </motion.div>
          ) : players.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glow-box p-12 rounded-lg backdrop-blur-md bg-slate-900/50 text-center"
            >
              <p className="text-2xl text-gray-400 mb-4">Sé el primero en el ranking</p>
              <p className="text-gray-500">
                Completa el quiz para aparecer en el leaderboard global
              </p>
              <motion.a
                href="/quiz"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block mt-6 px-8 py-3 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-black font-bold hover:shadow-glow transition-shadow"
              >
                Ir al Quiz
              </motion.a>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="space-y-4"
            >
              {players.map((player, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                  className={`glow-box p-6 rounded-lg backdrop-blur-md flex items-center justify-between
                    ${
                      index === 0
                        ? 'bg-yellow-500/10 border-yellow-400/50'
                        : index === 1
                          ? 'bg-gray-400/10 border-gray-300/50'
                          : index === 2
                            ? 'bg-orange-500/10 border-orange-400/50'
                            : 'bg-slate-900/50 border-neon-blue/50'
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    {/* Medal or Position */}
                    <div className={`text-3xl font-bold w-12 text-center ${medalColors[index as keyof typeof medalColors] || 'text-neon-blue'}`}>
                      {index < 3 ? medals[index] : `#${index + 1}`}
                    </div>

                    {/* Player Info */}
                    <div>
                      <p className="text-xl font-bold text-white">{player.name}</p>
                      <p className="text-sm text-gray-400">
                        {player.created_at
                          ? new Date(player.created_at).toLocaleDateString()
                          : 'Recientemente'}
                      </p>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <p className="text-3xl font-bold glow-text">{player.score}%</p>
                    <p className="text-sm text-gray-400">Puntuación</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Stats Section */}
          {players.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                {
                  label: 'Promedio',
                  value: `${(players.reduce((a, b) => a + b.score, 0) / players.length).toFixed(0)}%`,
                },
                {
                  label: 'Máximo',
                  value: `${Math.max(...players.map((p) => p.score))}%`,
                },
                { label: 'Jugadores', value: players.length },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="glow-box-purple p-6 rounded-lg backdrop-blur-md bg-slate-900/50 text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-sm text-gray-400 mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold glow-text-purple">{stat.value}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
