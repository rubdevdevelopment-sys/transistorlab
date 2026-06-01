import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#00F0FF',
          purple: '#B000FF',
          cyan: '#00D9FF',
          pink: '#FF006E',
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 240, 255, 0.5)',
        'glow-purple': '0 0 20px rgba(176, 0, 255, 0.5)',
        'glow-strong': '0 0 40px rgba(0, 240, 255, 0.8)',
      },
      textShadow: {
        'glow': '0 0 20px rgba(0, 240, 255, 0.5)',
        'glow-purple': '0 0 20px rgba(176, 0, 255, 0.5)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 240, 255, 0.8)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
