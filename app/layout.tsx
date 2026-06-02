import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TransistorLab - Interactive Learning Platform',
  description: 'Learn about transistors through interactive simulations and missions',
  keywords: 'transistor, education, simulator, electronics, interactive learning',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">{children}</main>
          <footer className="border-t border-white/10 bg-slate-950/80 text-center py-6 px-4 text-sm text-gray-400 backdrop-blur-md">
            <div className="max-w-6xl mx-auto flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <p>TransistorLab — Ingeniería de Sistemas, Universidad Incca de Colombia, 2026</p>
              <p>LEIDY MARYURI RODRIGUEZ JIMÉNEZ · DAVID SANTIAGO VARGAS NOVA · RUBÉN DARÍO MONROY LEÓN</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
