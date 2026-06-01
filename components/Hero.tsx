'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState(
    Array.from({ length: 20 }, () => ({ x: 0, y: 0, delay: 0, duration: 2 }))
  );

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, () => ({
        x: Math.random() * 1200,
        y: Math.random() * 800,
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 2,
      }))
    );
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const logoVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { duration: 1, ease: 'backOut' },
    },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue rounded-full mix-blend-screen filter blur-3xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple rounded-full mix-blend-screen filter blur-3xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 md:px-8 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo/Title */}
        <motion.div variants={logoVariants} className="mb-8">
          <div className="inline-block">
            <div className="text-7xl md:text-8xl font-bold mb-4">
              <span className="glow-text">Transistor</span>
              <span className="glow-text-purple">Lab</span>
            </div>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-300 mb-6 font-light tracking-wide"
        >
          Descubre el poder de los transistores a través de la experiencia interactiva
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Sumérgete en un mundo futurista donde aprenderás sobre transistores mediante
          simulaciones interactivas, misiones emocionantes y desafíos educativos.
        </motion.p>

        {/* Features */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {[
            { icon: '⚡', title: 'Simulador', desc: 'Interactivo y en tiempo real' },
            { icon: '🎮', title: 'Misiones', desc: '5 retos emocionantes' },
            { icon: '🏆', title: 'Competencia', desc: 'Ranking global' },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="glow-box p-6 rounded-lg backdrop-blur-md bg-slate-900/50"
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 240, 255, 0.8)' }}
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2 glow-text">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          variants={itemVariants}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Link href="/missions">
            <motion.button
              className="relative px-8 py-4 text-lg font-bold rounded-lg overflow-hidden group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple opacity-0 group-hover:opacity-50 blur-xl transition-opacity" />
              <span className="relative z-10">Comenzar Misión</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Bottom Navigation */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex justify-center gap-6 flex-wrap"
        >
          {[
            { label: 'Simulador', href: '/simulator' },
            { label: 'Ejercicios', href: '/exercises' },
            { label: 'Quiz', href: '/quiz' },
            { label: 'Ranking', href: '/leaderboard' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-400 hover:glow-text transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-neon-blue to-neon-purple scale-x-0 group-hover:scale-x-100 transition-transform" />
            </Link>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue rounded-full"
            initial={{ x: particle.x, y: particle.y }}
            animate={{ y: -900, opacity: [1, 0] }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
