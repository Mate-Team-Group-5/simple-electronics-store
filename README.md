# Folders structure

src/
├── assets/ # Global images, fonts, icons
├── components/ # Atomic Design hierarchy
│ ├── atoms/ # 1. Base UI elements
│ │ ├── Button/
│ │ │ ├── Button.jsx
│ │ │ ├── Button.module.css
│ │ │ └── Button.test.jsx
│ │ ├── Input/
│ │ └── Typography/
│ │
│ ├── molecules/ # 2. Simple combinations of atoms
│ │ ├── SearchBar/
│ │ │ ├── SearchBar.jsx
│ │ │ └── SearchBar.module.css
│ │ └── FormField/
│ │
│ ├── organisms/ # 3. Complex UI sections
│ │ ├── Header/
│ │ │ ├── Header.jsx
│ │ │ └── Header.module.css
│ │ └── ProductGrid/
│ │
│ └── templates/ # 4. Page layouts / wireframe structures
│ ├── MainLayout/
│ │ ├── MainLayout.jsx
│ │ └── MainLayout.module.css
│ └── DashboardLayout/
│
├── pages/ # 5. Actual views / routed pages (uses templates)
│ ├── HomePage.jsx
│ ├── ProfilePage.jsx
│ └── CatalogPage.jsx
│
├── hooks/ # Custom React hooks
├── context/ # React Context providers / State management
├── services/ # API calls and external services
├── utils/ # Helper functions and formatters
├── App.jsx # Root component with router
└── main.jsx # Application entry point

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
