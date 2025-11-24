# WE-HR - Human Resources Management System

## 📋 Description du Projet

**WE-HR** est une application web moderne de gestion des ressources humaines (HRMS) développée pour QUANTECH. Cette plateforme complète permet de gérer efficacement tous les aspects des ressources humaines d'une entreprise, du recrutement à la planification des horaires.

### Fonctionnalités Principales

- **📊 Dashboard** : Vue d'ensemble des métriques RH (postes disponibles, employés, recrutements)
- **👥 Gestion des Employés** : CRUD complet pour la gestion du personnel
- **🎯 Recrutement** : Gestion des offres d'emploi et suivi des candidatures
- **🏢 Départements** : Organisation et gestion des départements de l'entreprise
- **📅 Planification** : Gestion des horaires et calendrier des événements RH

---

## 🛠️ Stack Technique

### Frontend

- **Framework** : [Next.js 16.0.3](https://nextjs.org) (App Router)
- **Runtime** : React 19.2.0
- **Langage** : TypeScript 5
- **Styling** :
  - TailwindCSS 4
  - Class Variance Authority (CVA)
  - Tailwind Merge
- **Animations** : Motion (Framer Motion) 12.23.24

### UI Components

- **Design System** : Radix UI
  - Avatar, Checkbox, Dialog, Dropdown Menu
  - Label, Popover, Select, Separator
  - Slot, Tabs, Tooltip, Collapsible
- **Icons** : Lucide React
- **Command Palette** : CMDK
- **Notifications** : Sonner (Toast)
- **Thème** : Next Themes (Dark/Light mode)

### Gestion d'État & Data Fetching

- **State Management** : Zustand 5.0.8
- **Data Fetching** : TanStack Query (React Query) 5.90.10
- **Tables** : TanStack Table 8.21.3
- **Forms** :
  - React Hook Form 7.66.1
  - Zod 4.1.12 (validation)
  - Hookform Resolvers

### Utilitaires

- **Date** : date-fns 4.1.0 + React Day Picker 9.11.1
- **Query String** : qs 6.14.0
- **Error Handling** : React Error Boundary 6.0.0
- **Environment** : dotenv + Zod validation

### DevOps & Tooling

- **Package Manager** : pnpm 10.14.0
- **Linting** : ESLint 9 + eslint-config-next
- **Testing** :
  - Vitest 4.0.12
  - Playwright 1.56.1
  - @vitest/browser-playwright
  - Coverage: @vitest/coverage-v8
- **Storybook** : 10.0.8 (Component Development)
  - Addon A11y (Accessibility)
  - Addon Docs
  - Addon Vitest
- **Containerization** : Docker (Dockerfile multi-stage)
- **Compiler** : React Compiler (Babel Plugin)

---

## 🏗️ Architecture

### Structure des Dossiers

```
we-hr/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (dashboard)/          # Route group avec layout
│   │   │   ├── dashboard/        # Page d'accueil
│   │   │   ├── department/       # Gestion départements
│   │   │   ├── employee/         # Gestion employés
│   │   │   ├── recruitment/      # Recrutement
│   │   │   ├── schedule/         # Planification
│   │   │   └── layout.tsx        # Layout partagé
│   │   ├── errors.tsx            # Error boundaries
│   │   ├── global-error.tsx      # Global error handler
│   │   ├── layout.tsx            # Root layout
│   │   └── providers.tsx         # Context providers
│   │
│   ├── components/               # Composants réutilisables
│   │   ├── dashboard/            # Composants dashboard
│   │   ├── icons/                # Icônes personnalisées
│   │   ├── layouts/              # Layouts (Sidebar, Header)
│   │   └── ui/                   # UI primitives (shadcn/ui)
│   │
│   ├── features/                 # Feature-based modules
│   │   ├── department/
│   │   │   ├── api/              # API calls (React Query)
│   │   │   ├── components/       # Composants spécifiques
│   │   │   └── types/            # Types TypeScript
│   │   ├── employee/
│   │   ├── recruitment/
│   │   └── schedule/
│   │
│   ├── config/                   # Configuration
│   │   └── env.ts                # Variables d'environnement
│   │
│   ├── data/                     # Données statiques/mock
│   │   └── dashboard-data.ts
│   │
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Utilitaires & helpers
│   ├── store/                    # Zustand stores
│   └── types/                    # Types globaux
│
├── public/                       # Assets statiques
├── .storybook/                   # Configuration Storybook
├── Dockerfile                    # Multi-stage Docker build
├── next.config.ts                # Configuration Next.js
├── tailwind.config.ts            # Configuration Tailwind
├── tsconfig.json                 # Configuration TypeScript
└── vitest.config.ts              # Configuration tests
```

### Patterns Architecturaux

#### 1. **Feature-Based Architecture**

Chaque module métier (department, employee, recruitment, schedule) est organisé en :

- `api/` : Hooks React Query pour les appels API
- `components/` : Composants UI spécifiques
- `types/` : Définitions TypeScript

#### 2. **Server & Client Components**

- Utilisation du App Router de Next.js
- Séparation claire entre Server Components (par défaut) et Client Components (`"use client"`)
- Optimisation des performances avec le React Server Components

#### 3. **Type Safety**

- TypeScript strict
- Validation des schémas avec Zod
- Types partagés entre features
- Validation des variables d'environnement

#### 4. **State Management**

- **Server State** : TanStack Query (cache, synchronisation API)
- **Client State** : Zustand (état global léger)
- **Form State** : React Hook Form (état local des formulaires)

#### 5. **Styling Strategy**

- Utility-first avec TailwindCSS
- Composants réutilisables avec CVA (variants)
- Design system cohérent avec Radix UI

#### 6. **API Integration**

- Configuration centralisée (`env.ts`)
- Hooks React Query personnalisés par feature
- Gestion des erreurs avec Error Boundaries

#### 7. **Security**

- Content Security Policy (CSP) configurée
- Validation des entrées avec Zod
- Variables d'environnement typées et validées

---

## 🚀 Getting Started

### Prérequis

- Node.js 22+
- pnpm 10.14.0+

### Installation

```bash
# Installer les dépendances
pnpm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos valeurs
```

### Développement

```bash
# Démarrer le serveur de développement (port 3001)
pnpm dev

# Lancer Storybook
pnpm storybook

# Exécuter les tests
pnpm test

# Linter
pnpm lint
```

Ouvrir [http://localhost:3001](http://localhost:3001) dans votre navigateur.

### Build & Production

```bash
# Build de production
pnpm build

# Démarrer en production
pnpm start
```

### Docker

```bash
# Build de l'image
docker build -t we-hr .

# Lancer le conteneur
docker run -p 3000:3000 we-hr
```

---

## 📦 Variables d'Environnement

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_URL=http://localhost:3001
```

---

## 🧪 Testing

- **Unit Tests** : Vitest
- **E2E Tests** : Playwright
- **Component Tests** : Storybook + Vitest addon
- **Coverage** : v8 coverage provider

---

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [Radix UI](https://www.radix-ui.com/)
- [TailwindCSS](https://tailwindcss.com/)

---

## 🤝 Contribution

Ce projet suit les conventions :

- **Commits** : Conventional Commits
- **Branches** : GitFlow
- **Code Style** : ESLint + Prettier

---

## 📄 License

Propriétaire - QUANTECH © 2024
