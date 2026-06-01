# TransistorLab

Una experiencia educativa interactiva para aprender sobre transistores con simuladores, misiones, ejercicios y un sistema de ranking global.

## 🚀 Características

### 1. **Landing Page Futurista**
- Hero con animaciones avanzadas de Framer Motion
- Diseño tecnológico con colores neón (azul y morado)
- Completamente responsive
- Botón "Comenzar Misión" con efectos glow

### 2. **Módulo de Misiones Interactivas**
- Historia inmersiva: "Una ciudad sin energía"
- 5 misiones progresivas que se desbloquean secuencialmente
- Barra de progreso en tiempo real
- Sistema de bloqueo dinámico

### 3. **Simulador de Transistor**
- Controles interactivos:
  - Slider para corriente de base (Ib)
  - Configuración de beta (ganancia)
- Cálculo en tiempo real: Ic = β × Ib
- Visualización SVG del transistor con animaciones
- Representación visual de lámpara con intensidad variable
- Datos mostrados en tiempo real

### 4. **Ejercicios de Opción Múltiple**
- 5 ejercicios educativos
- Retroalimentación inmediata (✓/✗)
- Respuestas correctas resaltadas
- Sistema de puntuación

### 5. **Quiz Final**
- 5 preguntas desafiantes
- Calificación automática
- Mostrar porcentaje y respuestas correctas
- Guardar puntuación con nombre del jugador

### 6. **Sistema de Ranking**
- Integración con Supabase
- Top 10 jugadores
- Medallas (🥇🥈🥉)
- Estadísticas globales

### 7. **Diseño Premium**
- Estilo futurista con efectos glow
- Colores: Azul neón (#00F0FF) y Morado (#B000FF)
- Animaciones suave con Framer Motion
- Navegación responsive

## 📋 Requisitos Previos

- Node.js 18+
- npm o yarn
- Cuenta de Google (para Google Sheets)

## 🛠️ Instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar Google Sheets + Apps Script:**
   - Usa la cuenta educativa `rdmonroyl@unincca.edu.co`
   - Abre Google Sheets y crea una hoja nueva
   - Abre `Extensiones -> Apps Script` y pega el código de `GOOGLE_SHEETS_APP_SCRIPT.md`
   - Despliega la app como `Web app` con acceso `Anyone`

3. **Configurar variables de entorno (.env.local):**
```env
GOOGLE_SHEETS_API_URL=https://script.google.com/macros/s/tu_script_id/exec
```

## 🚀 Desarrollo

Iniciar servidor de desarrollo:
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📦 Build para Producción

```bash
npm run build
npm start
```

## 🏗️ Estructura del Proyecto

```
TransistorLab/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx              # Layout global
│   ├── globals.css             # Estilos globales
│   ├── simulator/
│   │   └── page.tsx            # Página simulador
│   ├── missions/
│   │   └── page.tsx            # Página misiones
│   ├── exercises/
│   │   └── page.tsx            # Página ejercicios
│   ├── quiz/
│   │   └── page.tsx            # Página quiz
│   └── leaderboard/
│       └── page.tsx            # Página ranking
├── components/
│   ├── Hero.tsx                # Componente hero
│   ├── Navigation.tsx          # Navegación global
│   ├── TransistorSimulator.tsx # Simulador interactivo
│   ├── MissionCard.tsx         # Card de misión
│   └── QuizCard.tsx            # Card de pregunta
├── lib/
│   └── sheets.ts               # Configuración Google Sheets
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── postcss.config.js
```

## 🎮 Cómo Usar

1. **Visita la Landing Page**: Explora las características
2. **Comienza las Misiones**: Sigue la historia progresiva
3. **Experimenta con el Simulador**: Ajusta parámetros en tiempo real
4. **Completa los Ejercicios**: Prueba tu conocimiento
5. **Realiza el Quiz Final**: Compite por el ranking global

## 🔧 Tecnologías Utilizadas

- **Next.js 15**: Framework React moderno
- **TypeScript**: Tipado estático
- **TailwindCSS**: Diseño utility-first
- **Framer Motion**: Animaciones declarativas
- **Google Sheets + Apps Script**: Backend gratuito y fácil
- **SVG**: Gráficos vectoriales

## 📚 Conceptos Educativos

El simulador enseña:
- ¿Qué es un transistor?
- Relación entre corriente de base (Ib) y colector (Ic)
- Concepto de ganancia (β)
- Amplificación de señales
- Aplicaciones prácticas

## 🎨 Personalización

Editar colores en `tailwind.config.ts`:
```typescript
colors: {
  neon: {
    blue: '#00F0FF',
    purple: '#B000FF',
  }
}
```

## 📊 Almacenamiento Local

- Misiones completadas: localStorage → `completedMissions`
- Datos de simulador: Estado React

## 🔒 Seguridad

- Variables de entorno protegidas
- Google Sheets + Apps Script configurado desde una cuenta educativa
- Validación en cliente y servidor

## 🤝 Contribuir

Este es un proyecto educativo. Siéntete libre de:
- Agregar más misiones
- Crear nuevos ejercicios
- Mejorar visualizaciones
- Optimizar rendimiento

## 📄 Licencia

MIT

## 📞 Soporte

Para problemas o sugerencias, abre un issue.

---

**Creado con ⚡ para aprender sobre transistores de forma interactiva**
