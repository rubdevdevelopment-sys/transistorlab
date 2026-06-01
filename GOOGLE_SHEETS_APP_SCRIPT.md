# Google Sheets + Apps Script para TransistorLab

Este proyecto ahora usa Google Sheets como backend de leaderboard, sin Supabase.

## Configuración rápida

1. Abre Google Drive con tu cuenta educativa `rdmonroyl@unincca.edu.co`.
2. Crea una nueva Hoja de cálculo vacía.
3. En el menú, selecciona `Extensiones -> Apps Script`.
4. Reemplaza el contenido de `Code.gs` con el siguiente código.

```javascript
const SHEET_NAME = 'leaderboard';

function setupLeaderboardSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['name', 'score', 'created_at']);
  }
  return sheet;
}

function doGet(e) {
  const action = e.parameter.action;
  if (action === 'leaderboard') {
    return getLeaderboard(e);
  }
  return createJsonResponse({ status: 'ok', message: 'Web app activo' });
}

function doPost(e) {
  const payload = JSON.parse(e.postData.contents || '{}');
  if (payload.action === 'save') {
    return saveScore(payload.name, payload.score);
  }
  return createJsonResponse({ error: 'Acción inválida' }, 400);
}

function getLeaderboard(e) {
  const limit = parseInt(e.parameter.limit || '10', 10);
  const sheet = setupLeaderboardSheet();
  const rows = sheet.getDataRange().getValues();
  const data = rows.slice(1).map((row) => ({
    name: row[0],
    score: Number(row[1]),
    created_at: row[2],
  }));

  data.sort((a, b) => b.score - a.score);
  return createJsonResponse(data.slice(0, limit));
}

function saveScore(name, score) {
  const sheet = setupLeaderboardSheet();
  const timestamp = new Date().toISOString();
  sheet.appendRow([name, Number(score), timestamp]);
  return createJsonResponse({ status: 'success', name, score, created_at: timestamp });
}

function createJsonResponse(payload, statusCode = 200) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Despliegue

1. En Apps Script, haz clic en `Deploy -> New deployment`.
2. Elige `Web app`.
3. Selecciona:
   - `Execute as`: `Me`.
   - `Who has access`: `Anyone`.
4. Copia la URL de despliegue.
5. En tu proyecto Next.js, agrega en `.env.local`:

```env
GOOGLE_SHEETS_API_URL=https://script.google.com/macros/s/tu_script_id/exec
```

6. Reinicia el servidor de desarrollo.

## Uso

- El leaderboard se obtiene desde `/api/leaderboard`
- El guardado se hace desde `/api/leaderboard/save`

## Notas

- Esta solución es gratuita mientras tu proyecto no exceda los límites gratuitos de Google Apps Script.
- Funciona bien para demos educativas.
- El ranking será compartido entre todos los que visiten la app si usas la misma hoja y despliegue.
