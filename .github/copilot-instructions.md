# Instrucciones para TransistorLab

## Descripción del Proyecto

TransistorLab es una plataforma educativa interactiva construida con Next.js 15, TypeScript, TailwindCSS, Framer Motion y Google Sheets + Apps Script. Proporciona una experiencia inmersiva para aprender sobre transistores mediante simulaciones, misiones, ejercicios, quiz y un sistema de ranking global.

## Estructura del Proyecto

- **app/**: Páginas de Next.js (App Router)
  - `page.tsx`: Landing page con hero y navegación
  - `layout.tsx`: Layout global
  - `globals.css`: Estilos base y animaciones
  - `simulator/`: Simulador interactivo de transistor
  - `missions/`: Módulo de 5 misiones progresivas
  - `exercises/`: 5 ejercicios de opción múltiple
  - `quiz/`: Quiz final con 5 preguntas
  - `leaderboard/`: Ranking global con Google Sheets + Apps Script

- **components/**: Componentes reutilizables
  - `Hero.tsx`: Componente landing page
  - `Navigation.tsx`: Navegación responsive
  - `TransistorSimulator.tsx`: Simulador con controles y visualización
  - `MissionCard.tsx`: Card para cada misión
  - `QuizCard.tsx`: Card para preguntas

- **lib/**: Funciones y configuraciones
  - `sheets.ts`: Cliente de Google Sheets y funciones CRUD

## Características Principales

### Simulador de Transistor
- Sliders para Ib (0-50 μA) y β (10-300)
- Cálculo en tiempo real: Ic = β × Ib
- Visualización SVG del transistor
- Lámpara con intensidad animada
- Datos mostrados en dashboard

### Sistema de Misiones
- 5 misiones con historia narrativa
- Desbloqueo secuencial (completar una para la siguiente)
- Barra de progreso
- Guardado en localStorage

### Ejercicios y Quiz
- 5 ejercicios con retroalimentación inmediata
- Quiz final de 5 preguntas
- Sistema de puntuación automática
- Guardado de puntuaciones en Google Sheets

### Leaderboard
- Integración con Google Sheets + Apps Script
- Top 10 jugadores
- Medallas para top 3
- Estadísticas globales

## Configuración Requerida

1. **Variables de Entorno (.env.local)**:
```
GOOGLE_SHEETS_API_URL=https://script.google.com/macros/s/tu_script_id/exec
```

2. **Google Sheets + Apps Script**:
   - Usa tu cuenta educativa para crear la hoja y el script
   - Despliega el Apps Script como `Web app` con acceso `Anyone`

## Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build
npm build

# Producción
npm start
```

## Diseño y Estilos

- **Colores**: Azul neón (#00F0FF) y Morado (#B000FF)
- **Animaciones**: Framer Motion para transiciones suaves
- **Responsive**: Totalmente adaptable a móvil y desktop
- **Efecto Glow**: Sombras brillantes personalizadas

## Tecnologías Stack

- Next.js 15 (React 19 RC)
- TypeScript
- TailwindCSS 3.4
- Framer Motion 11
- Google Sheets + Apps Script

## Notas de Desarrollo

- Todo el código está listo para producción
- Tipado TypeScript completo
- Componentes optimizados con React.memo donde corresponde
- Manejo de errores en llamadas a Google Sheets API
- Validación de entrada en formularios

## Próximas Mejoras Sugeridas

- Autenticación de usuarios
- Más misiones y desafíos
- Sistema de logros/badges
- Exportar resultados en PDF
- Soporte múltiples idiomas
- Análisis detallados de rendimiento
