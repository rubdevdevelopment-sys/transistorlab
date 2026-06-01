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
        {children}
      </body>
    </html>
  );
}
