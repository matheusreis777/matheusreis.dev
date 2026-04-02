# Matheus Reis - Fullstack Vision

Portfólio profissional com foco em experiência moderna, performance e internacionalização (PT-BR/EN-US), incluindo página de notícias de tecnologia com múltiplas fontes, tradução automática, compartilhamento via story e APIs serverless para conteúdo dinâmico.

## Visão Geral

Este projeto foi construído com React + TypeScript para apresentar:

- Perfil profissional e experiências
- Hard skills e soft skills
- Projetos em destaque
- Página de notícias de tecnologia com múltiplas fontes (NewsData.io, GNews, Currents API)
- Tradução automática de notícias para português via Google Translate
- Compartilhamento de notícias com geração de story (imagem 1080×1920) para Instagram/WhatsApp
- Integração com APIs serverless (Vercel)
- Cursor customizado e efeito de partículas interativo
- Botão flutuante de WhatsApp
- Interface responsiva com componentes reutilizáveis
- PWA (Progressive Web App) com instalação nativa

## Stack Principal

- React 18 + Vite 5
- TypeScript
- Tailwind CSS + shadcn/ui (Radix UI)
- React Router DOM
- TanStack React Query
- i18next (pt-BR e en-US)
- html-to-image (geração de stories)
- Vite PWA plugin
- Vercel Functions (pasta `api/`)
- Vitest + Testing Library
- Playwright

## Rotas da Aplicação

- `/` → página principal (portfólio)
- `/news` → notícias de tecnologia
- `*` → página de não encontrado (404)

## APIs Serverless (`api/`)

- `GET /api/tech-news-multi`
  Endpoint principal de notícias. Busca de 3 fontes em paralelo (NewsData.io, GNews, Currents API), mescla, deduplica por título, ordena por data e traduz automaticamente para português quando `lang=pt`.
  Query params: `lang` (`pt` ou `en`), `cursor` (paginação via NewsData).
  Inclui cache em memória (3 min).

- `GET /api/tech-news`
  Endpoint legado (NewsData.io apenas) com cache em memória + cabeçalhos de cache.
  Query params: `lang` (`pt` ou `en`), `period` (`1d` ou `7d`).

- `GET /api/daily-verse`
  Retorna versículo diário determinístico por dia (UTC).

- `GET /api/bible-passage?ref=<referencia>`
  Retorna passagem bíblica pela referência informada (ex.: `?ref=joao+3`).

## Funcionalidade de Notícias

### Múltiplas Fontes

As notícias são buscadas de 3 APIs em paralelo no servidor (sem CORS):

- **NewsData.io** — notícias por categoria + paginação com cursor
- **GNews** — top headlines de tecnologia via Google News ranking
- **Currents API** — últimas notícias em tempo real

Os resultados são mesclados, deduplicados por similaridade de título e ordenados por data de publicação.

### Tradução Automática

Quando o idioma é português, todos os títulos e descrições em inglês são traduzidos automaticamente via Google Translate no servidor, divididos em chunks para respeitar limites de URL.

### Compartilhamento (Story)

Cada notícia tem um botão de compartilhamento que gera uma imagem 1080×1920 (formato story) com:

- Design glassmorphism com grid pattern
- Título e descrição da notícia
- Fonte da notícia e data de publicação
- CTA personalizado
- Opções: download da imagem, compartilhar via Web Share API ou copiar link

## Componentes Principais

| Componente          | Descrição                                          |
| ------------------- | -------------------------------------------------- |
| `HeroSection`       | Seção hero com apresentação e partículas           |
| `AboutSection`      | Sobre mim                                          |
| `ExperienceSection` | Experiência profissional                           |
| `HardSkillsSection` | Habilidades técnicas                               |
| `SoftSkillsSection` | Habilidades comportamentais                        |
| `ProjectsSection`   | Projetos em destaque                               |
| `ContactSection`    | Formulário de contato                              |
| `NewsShareStory`    | Gerador de story para compartilhamento de notícias |
| `ParticleNetwork`   | Efeito visual de partículas interativo             |
| `CustomCursor`      | Cursor customizado                                 |
| `FloatingWhatsApp`  | Botão flutuante de WhatsApp                        |
| `Navbar`            | Navegação com troca de idioma                      |

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

> **Nota:** Em desenvolvimento local, apenas o NewsData.io funciona diretamente (as demais APIs e a tradução dependem da serverless function no Vercel). Para testar tudo, faça deploy com `vercel dev` ou `vercel`.

## Estrutura do Projeto

```plaintext
.
├── api/                         # Funções serverless (Vercel)
│   ├── bible-passage.ts
│   ├── daily-verse.ts
│   ├── tech-news.ts             # Endpoint legado (NewsData.io)
│   └── tech-news-multi.ts       # Endpoint multi-fonte + tradução
├── public/
├── src/
│   ├── components/              # Seções e componentes reutilizáveis
│   │   ├── NewsShareStory.tsx   # Geração de story para compartilhamento
│   │   └── ui/                  # Biblioteca de componentes base (shadcn/ui)
│   ├── data/
│   ├── hooks/
│   ├── i18n/
│   │   ├── config.ts
│   │   └── locales/
│   │       ├── en-US.json
│   │       └── pt-BR.json
│   ├── lib/
│   ├── pages/
│   │   ├── Index.tsx            # Página principal (portfólio)
│   │   ├── News.tsx             # Página de notícias
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
- Cache em endpoints serverless (memória + cabeçalhos HTTP)
- Tradução automática com fallback seguro
- API keys protegidas no servidor (não expostas no client-side)
- Deduplicação e ordenação inteligente de múltiplas fontes
- Testes unitários e setup para testes E2E
- PWA com service worker e manifest

## Contato

- LinkedIn: [Matheus Reis Mendonça](https://www.linkedin.com/in/matheus-reis-584098306)
- E-mail: [matheusreismendonca1@gmail.com](mailto:matheusreismendonca1@gmail.com)
- WhatsApp: [+55 67 9 9143-1860](https://wa.me/5567991431860)
