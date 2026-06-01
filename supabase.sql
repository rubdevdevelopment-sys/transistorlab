-- Crea la tabla de leaderboard en Supabase
-- Ejecuta esto en el editor SQL de Supabase o en tu consola de base de datos.

CREATE TABLE IF NOT EXISTS leaderboard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  score INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Opcional: si usas Row Level Security, permite lectura pública
-- ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow public read" ON leaderboard
--   FOR SELECT
--   USING (true);
