<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/temp/2

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Full setup (frontend + backend)

This project has a frontend (React + Vite/TypeScript) and a small Flask backend used for the local PyTorch model prediction.

1) Frontend

- Prereqs: Node.js 18+ and npm (or pnpm/yarn). Open PowerShell.
- Install dependencies:

```powershell
npm install
```

- Create a local environment file `.env.local` in the project root (if not already present) and add the following environment variables:

```text
# API key used by the Google/GenAI client in the frontend
API_KEY=<your_gemini_api_key_or_service_key>

# (Optional) if you use a differently named key in other tools
GEMINI_API_KEY=<your_gemini_api_key>
```

- Start the dev server (PowerShell):

```powershell
npm run dev
```

The frontend will be served by Vite (usually at http://localhost:5173).

2) Backend (optional, for the custom PyTorch model)

- Prereqs: Python 3.10+ and pip.
- Create and activate a virtual environment (PowerShell):

```powershell
python -m venv .venv; .\.venv\Scripts\Activate.ps1
```

- Install backend requirements:

```powershell
pip install -r backend/requirements.txt
```

- The backend expects model weights in `backend/weights/` (already present in this repo). Start the Flask app:

```powershell
python backend\app.py
```

By default the backend listens on `http://127.0.0.1:5000` and the frontend calls `http://127.0.0.1:5000/predict` for the custom model.

## Environment variables summary

- `API_KEY` (used by the frontend Google GenAI client)
- `GEMINI_API_KEY` (optional alias)

Set these either in `.env.local` (frontend) or in your shell environment when running the backend.

## Translations / "placeholder key" issues

If you see translation keys (for example `expertFinderTitle`, `contactTitle`, `welcomeTitle`) displayed instead of readable text, do the following:

1. Open `localization/translations.ts` and confirm the keys exist and contain values for all supported languages (en, kn, ta, te, ml).
2. The translations shape expects an object of keys where each key maps to an object with these properties: `en`, `kn`, `ta`, `te`, `ml`.
   Example entry:

```ts
export const translations = {
  welcomeTitle: {
    en: 'Your Coconut Health Partner',
    kn: 'ನಿಮ್ಮ ತೆಂಗಿನ ಆರೋಗ್ಯ ಪಾಲುದಾರ',
    ta: 'உங்கள் தென்னை சுகாதார கூட்டாளர்',
    te: 'మీ కొబ్బరి ఆరోగ్య భాగస్వామి',
    ml: 'നിങ്ങളുടെ തെങ്ങ് ആരോഗ്യ പങ്കാളി',
  },
  // ... other keys
}
```

3. If keys are missing, add them to `localization/translations.ts` with the `en` value at minimum. Then restart the dev server.
4. If the file contains syntax errors (unterminated strings, missing commas or braces) the app may fail to build — fix the syntax and restart Vite.

Common translation keys used in the app: `expertFinderTitle`, `expertFinderIntro`, `expertFinderSearchPlaceholder`, `expertFinderButton`, `contactTitle`, `contactIntro`, `welcomeTitle`, `getStartedButton`, `productManagementTitle`, etc.

## Troubleshooting

- "Model is overloaded" or 503 errors from Gemini: these are transient. The app includes a retry/backoff mechanism for some calls, but you may still see failures — try again in a few minutes or implement / increase retries where needed.

- Unterminated string literal / build errors after editing translations: open `localization/translations.ts`, check for unclosed quotes and missing `}` at the end of the object. Use your editor's TypeScript/TSLint diagnostics.

- Frontend can't reach backend: ensure Flask is running and that CORS or port configuration are correct. The frontend expects `http://127.0.0.1:5000/predict` for the custom model.

## Build for production

```powershell
npm run build
npm run preview
```

## Notes and next steps

- If you add new UI text that needs translation, add a new key to `localization/translations.ts` and reference it via the `t(key)` helper used throughout components.
- To improve resilience against API overloads, you can increase retry counts or add error UI that suggests the user try again later.

If you'd like, I can:

- Run a quick scan and automatically add any missing keys found in components to `localization/translations.ts` (I can add English defaults), or
- Fix the specific translation file errors you encountered (unterminated strings / missing keys) — tell me which you'd prefer.
