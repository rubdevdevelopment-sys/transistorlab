export interface Player {
  id?: string;
  name: string;
  score: number;
  created_at?: string;
}

export async function saveScore(name: string, score: number) {
  try {
    const response = await fetch('/api/leaderboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, score }),
    });

    if (!response.ok) {
      throw new Error('Error al guardar el puntaje');
    }

    return await response.json();
  } catch (error) {
    console.error('saveScore error:', error);
    return null;
  }
}

export async function getLeaderboard(limit = 10) {
  try {
    const response = await fetch(`/api/leaderboard?limit=${limit}`);
    if (!response.ok) {
      throw new Error('Error al obtener el ranking');
    }

    return (await response.json()) as Player[];
  } catch (error) {
    console.error('getLeaderboard error:', error);
    return [];
  }
}
