# Matheus Reis - Fullstack Vision

Portfólio profissional com foco em experiência moderna, performance e internacionalização (PT-BR/EN-US), incluindo página de notícias de tecnologia e APIs serverless para conteúdo dinâmico.

## Visão Geral

Este projeto foi construído com React + TypeScript para apresentar:

- Perfil profissional e experiências
- Hard skills e soft skills
- Projetos em destaque
- Página de notícias de tecnologia
- Integração com APIs serverless (Vercel)
- Interface responsiva com componentes reutilizáveis

## Stack Principal

- React 18 + Vite 5
- TypeScript
- Tailwind CSS + shadcn/ui (Radix UI)
- React Router DOM
- TanStack React Query
- i18next (pt-BR e en-US)
- Vite PWA plugin
- Vercel Functions (pasta `api/`)
- Vitest + Testing Library
- Playwright

## Rotas da Aplicação

- `/` -> página principal (portfólio)
- `/news` -> notícias de tecnologia
- `*` -> página de não encontrado (404)

## APIs Serverless (`api/`)

- `GET /api/tech-news`
  : retorna notícias de tecnologia com cache em memória + cabeçalhos de cache
  : query params suportados: `lang` (`pt` ou `en`) e `period` (`1d` ou `7d`)

- `GET /api/daily-verse`
  : retorna versículo diário determinístico por dia (UTC)

- `GET /api/bible-passage?ref=<referencia>`
  : retorna passagem bíblica pela referência informada (ex.: `?ref=joao+3`)

## Scripts Disponíveis

```bash
npm run dev         # inicia ambiente de desenvolvimento (porta 8080)
npm run build       # build de produção
npm run build:dev   # build em modo development
npm run preview     # preview local do build
npm run lint        # lint com ESLint
npm run test        # executa testes unitários (vitest run)
npm run test:watch  # executa testes em watch mode
```

## Como Executar Localmente

### Pré-requisitos

- Node.js 18+ (recomendado)
- npm (ou outro gerenciador compatível)

### Passo a passo

```bash
git clone https://github.com/SEU_USUARIO/matheus-reis-fullstack-vision.git
cd matheus-reis-fullstack-vision
npm install
npm run dev
```

A aplicação ficará disponível em `http://localhost:8080`.

## Estrutura Atual do Projeto

```plaintext
.
├── api/                     # Funções serverless (Vercel)
│   ├── bible-passage.ts
│   ├── daily-verse.ts
│   └── tech-news.ts
├── public/
├── src/
│   ├── components/          # Seções e componentes reutilizáveis
│   │   └── ui/              # Biblioteca de componentes base (shadcn/ui)
│   ├── data/
│   ├── hooks/
│   ├── i18n/
│   │   ├── config.ts
│   │   └── locales/
│   │       ├── en-US.json
│   │       └── pt-BR.json
│   ├── lib/
│   ├── pages/
│   │   ├── Index.tsx
│   │   ├── News.tsx
│   │   └── NotFound.tsx
│   ├── test/
│   ├── App.tsx
│   └── main.tsx
├── playwright.config.ts
├── vitest.config.ts
├── vite.config.ts
└── vercel.json
```

## Qualidade e Boas Práticas

- Tipagem forte com TypeScript
- Componentização e organização por domínio
- Internacionalização com fallback automático
- Cache em endpoints serverless
- Testes unitários e setup para testes E2E

## Contato

- LinkedIn: [Matheus Reis Mendonça](https://www.linkedin.com/in/matheus-reis-584098306)
- E-mail: [matheusreismendonca1@gmail.com](mailto:matheusreismendonca1@gmail.com)
- WhatsApp: [+55 67 9 9143-1860](https://wa.me/5567991431860)
