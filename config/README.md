# Project Configuration Directory (`/config`)

Centralized project configurations and deployment specifications.

## Structure

```
config/
├── firebase/
│   └── firestore.rules      # Cloud Firestore Security Rules
├── vercel/
│   └── vercel.json          # Vercel SPA route rewrite specs
├── tooling/
│   ├── eslint.config.js     # Linter configuration
│   └── components.json      # UI component library aliases
└── README.md
```

## Config Mappings

1. **Firebase**: Managed via `firebase.json` at root; rules stored in `config/firebase/firestore.rules`.
2. **Vercel**: Deployment rules configured via `vercel.json`.
3. **Vite & Tooling**: Configured via `vite.config.js` and `jsconfig.json`.
