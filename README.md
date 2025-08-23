# @shellicar/reference-enterprise

[![Node.js](https://img.shields.io/badge/Node.js-20-5FA04E?logo=nodedotjs)][node]
[![npm](https://img.shields.io/badge/npm-10-CB3837?logo=npm)][npm]
[![pnpm](https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm)][pnpm]
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)][typescript]
[![nvm](https://img.shields.io/badge/nvm-0.40-F4DD4B?logo=nvm)][nvm]
[![Docker](https://img.shields.io/badge/Docker-dev-2496ED?logo=docker)][docker]
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60A5FA?style=flat&logo=biome)][biome]
[![AI Assisted](https://img.shields.io/badge/AI--Assisted-ChatGPT-412991?logo=openai)][chatgpt]
[![VS Code](https://img.shields.io/badge/VS%20Code-IDE-007ACC?logo=visualstudiocode&logoColor=white)][vscode]

## Built Using

These are some of the key tools and technologies used to build and develop this project:

[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)][vite]
[![esbuild](https://img.shields.io/badge/esbuild-0.24-FFCF00?logo=esbuild)][esbuild]
[![TSX](https://img.shields.io/badge/TSX-4-3178C6)][tsx]

## Runs On

These are some of the key dependencies required to run the applications:

[![@azure/functions](https://img.shields.io/badge/Azure%20Functions-4-0082FC?logo=github)][azure-functions]
[![GraphQL](https://img.shields.io/badge/GraphQL-16-E10098?logo=graphql)][graphql]
[![Nuxt.js](https://img.shields.io/badge/Nuxt-3-00DC82?logo=nuxt.js)][nuxt]
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?logo=tailwindcss)][tailwind]
[![Zod](https://img.shields.io/badge/Zod-3-3E67B1?logo=zod&logoColor=3E67B1)][zod]
[![js-joda](https://img.shields.io/badge/js--joda/core-5-2C3E50?logo=github)][js-joda]
[![Winston](https://img.shields.io/badge/Winston-3-5B8C5B?logo=github)][winston]
[![OpenTelemetry](https://img.shields.io/badge/OpenTelemetry-1-000000?logo=opentelemetry&logoColor=white)][opentelemetry]

---

`@shellicar/reference-enterprise` is a software architecture starter repository that provides a structured foundation for building Azure application workloads. This repository demonstrates enterprise-grade project organization with clear separation between customer-facing APIs, internal integrations, worker processes, and multiple web applications.

Unlike the foundational [`@shellicar/reference-foundation`](https://github.com/shellicar/reference-foundation) which illustrates individual concepts, this enterprise reference provides a complete project structure that can be used as the basis for creating new Azure application workloads.

## Table of Contents

- [Overview](#overview)
- [@shellicar Ecosystem](#shellicar-typescript-ecosystem)
- [Repository Structure](#repository-structure)
- [Applications](#applications)
- [Packages](#packages)
- [Infrastructure & Deployment](#infrastructure--deployment)
- [Development Tools](#development-tools)
- [Getting Started](#getting-started)

<!-- BEGIN_ECOSYSTEM -->

## @shellicar TypeScript Ecosystem

### Core Libraries

- [`@shellicar/core-config`](https://github.com/shellicar/core-config) - A library for securely handling sensitive configuration values like connection strings, URLs, and secrets.
- [`@shellicar/core-di`](https://github.com/shellicar/core-di) - A basic dependency injection library.

### Reference Architectures

- [`@shellicar/reference-foundation`](https://github.com/shellicar/reference-foundation) - A comprehensive starter repository. Illustrates individual concepts.
- [`@shellicar/reference-enterprise`](https://github.com/shellicar/reference-enterprise) - A comprehensive starter repository. Can be used as the basis for creating a new Azure application workload.

### Build Tools

- [`@shellicar/build-clean`](https://github.com/shellicar/build-clean) - Build plugin that automatically cleans unused files from output directories.
- [`@shellicar/build-version`](https://github.com/shellicar/build-version) - Build plugin that calculates and exposes version information through a virtual module import.
- [`@shellicar/build-graphql`](https://github.com/shellicar/build-graphql) - Build plugin that loads GraphQL files and makes them available through a virtual module import.

### Framework Adapters

- [`@shellicar/svelte-adapter-azure-functions`](https://github.com/shellicar/svelte-adapter-azure-functions) - A [SvelteKit adapter](https://kit.svelte.dev/docs/adapters) that builds your app into an Azure Function.

### Logging & Monitoring

- [`@shellicar/winston-azure-application-insights`](https://github.com/shellicar/winston-azure-application-insights) - An [Azure Application Insights](https://azure.microsoft.com/en-us/services/application-insights/) transport for [Winston](https://github.com/winstonjs/winston) logging library.
- [`@shellicar/pino-applicationinsights-transport`](https://github.com/shellicar/pino-applicationinsights-transport) - [Azure Application Insights](https://azure.microsoft.com/en-us/services/application-insights) transport for [pino](https://github.com/pinojs/pino)

<!-- END_ECOSYSTEM -->

## Overview

**@shellicar/reference-enterprise** provides a structured foundation for building Azure application workloads with clear architectural boundaries and separation of concerns.

## Repository Structure

This repository follows a structured approach to organising enterprise applications:

```text
├── apps/
│   ├── api/                    # Function App - User-facing APIs
│   ├── integration/            # Function App - Internal/non-user APIs
│   ├── worker/                 # App Service - TemporalIO & long-running processes
│   ├── webapp/                 # Main web application for users
│   ├── dashboard/              # Internal staff/line of business dashboard
│   └── admin/                  # Administration interface for mature apps
├── packages/
│   ├── common/                 # Code shared across frontend and backend
│   ├── server-common/          # Common functionality for Function Apps/worker
│   ├── ui/                     # Framework-dependent components (Nuxt) and configuration
│   ├── ui-common/              # Framework-agnostic UI code, validation, schemas
│   ├── ui-schema/              # Schema for frontend applications
│   ├── ui-schema-admin/           # Schema for admin interface (optional)
│   ├── server-schema/          # Schema for APIs
│   ├── server-schema-api/             # Schema specifically for API (optional)
│   ├── server-schema-integration/     # Schema for integration services (optional)
│   └── typescript-config/      # Shared TypeScript configuration
├── infra/                      # Infrastructure as Code (Bicep)
└── deploy/
    └── templates/              # Reusable Azure Pipeline templates
```

## Applications

| Application | Type | Purpose | Technology |
|-------------|------|---------|------------|
| `apps/api` | Azure Function App | User-facing APIs | Azure Functions with HTTP triggers |
| `apps/integration` | Azure Function App | Internal/non-user APIs | Azure Functions for third-party integrations |
| `apps/worker` | Azure App Service | Long-running processes | TemporalIO for workflow orchestration |
| `apps/webapp` | Web Application | Main user interface | Vue+Nuxt |
| `apps/dashboard` | Web Application | Internal staff dashboard | Vue+Nuxt |
| `apps/admin` | Web Application | Administration interface | Vue+Nuxt |

## Packages

| Package | Purpose | What Goes Here | Used By |
|---------|---------|----------------|---------|
| `common` | Shared code across frontend and backend | Utilities, types, constants that work everywhere | All apps |
| `server-common` | Server-side shared functionality | Middleware, auth helpers, server utilities | `api`, `integration`, `worker` |
| `ui` | Framework-dependent UI components | Nuxt components, framework-specific code | `webapp`, `dashboard`, `admin` |
| `ui-common` | Framework-agnostic UI code | Validation logic, Zod schemas, reusable functions | `webapp`, `dashboard`, `admin` |
| `schema-server` | Generated types for server APIs | GraphQL codegen types for server-side API consumption | Server applications |
| `schema-ui` | Generated types for frontend APIs | GraphQL codegen types for client-side API consumption | Frontend applications |
| `schema-api` | Generated types for API service (optional) | GraphQL codegen types specific to API service | `api` |
| `schema-integration` | Generated types for integration APIs (optional) | GraphQL codegen types for third-party/integration APIs | `integration` |
| `schema-admin` | Generated types for admin APIs (optional) | GraphQL codegen types specific to admin interface | `admin` |
| `typescript-config` | Shared TypeScript configuration | TSConfig files, build settings | All applications and packages |

## Infrastructure & Deployment

> **Work in Progress** - This section is under development

### Infrastructure as Code

#### `infra/`

- **Technology**: Bicep templates
- **Purpose**: Azure resource definitions
- **Contents**: Resource groups, Function Apps, App Services, databases, networking

### Deployment Templates

#### `deploy/templates/`

- **Purpose**: Reusable Azure Pipeline templates
- **Contents**: Build, test, and deployment pipeline definitions
- **Benefits**: Consistent deployment patterns across applications

## Development Tools

> **Work in Progress** - This section is under development

This repository includes several development tools to maintain code quality and consistency:

### Code Quality

- **Biome**: Linting and formatting
- **Lefthook**: Git hooks for pre-commit checks
- **GitVersion**: Semantic versioning based on Git history

### Build System

- **Turbo**: Monorepo task orchestration
- **pnpm Workspaces**: Package management and dependency resolution

## Getting Started

### Prerequisites

- Git
- Basic understanding of Azure services
- Azure subscription (for deployment)

### Setup

#### Automated Setup (Recommended)

Run the setup script to automatically install all required tools and dependencies:

**Linux/macOS:**

```sh
./setup.sh
```

**Windows:**

```powershell
.\setup.ps1
```

The setup script will:

- Install prerequisites (Homebrew on macOS)
- Install Node Version Manager (NVM)
- Install Node.js version from `.nvmrc`
- Enable Corepack for package manager management
- Install pnpm via Corepack
- Install Azure Functions Core Tools
- Install Docker (optional)

#### Manual Setup

If you prefer manual installation:

1. **Install Node.js** (version specified in `.nvmrc`)
2. **Enable Corepack and install pnpm**

   ```sh
   corepack enable
   corepack prepare pnpm@latest --activate
   ```

3. **Install Azure Functions Core Tools**

   See [Azure Functions Core Tools documentation](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local)

4. **Clone and setup the repository**

   ```sh
   git clone https://github.com/shellicar/reference-enterprise.git
   cd reference-enterprise
   pnpm install
   pnpm build
   ```

### Development

Once setup is complete, you can start developing:

```sh
# Start the API
pnpm --filter api dev

# Start the web application
pnpm --filter webapp dev

# Build all packages
pnpm build

# Run tests
pnpm test
```

### Architecture Decisions

This structure provides:

- **Clear separation** between user-facing and internal services
- **Shared code** through common packages
- **Scalable architecture** that can grow with application complexity
- **Consistent development** patterns across all applications
- **Flexible deployment** options for different application types

## Architecture Approach

This repository follows **Vertical Slice Architecture** - organising code by feature rather than technical layers. Each feature contains everything it needs (API endpoints, business logic, data access, validation) in one cohesive slice.

### Why Vertical Slices?

**Benefits:**

- **High cohesion** - Feature logic stays together
- **Team independence** - Developers can work on different features without conflicts
- **Easy to understand** - Business logic is contained and traceable
- **Better pull requests** - Code changes are colocated, making reviews easier to follow
- **Deployment flexibility** - Features can be developed and tested independently

**Trade-offs:**

- **Some code duplication** - Accept duplication when it keeps features independent
- **Consistency overhead** - Requires discipline to maintain standards across slices
- **Cross-cutting changes** - Security or infrastructure updates touch multiple slices

### Database Considerations

Using document databases (Cosmos DB NoSQL, MongoDB) aligns well with vertical slices:

- Features can model data as standalone documents or nested within parent entities
- Less coupling through shared database schemas
- Natural fit for feature-based data modelling

### Team Approach

This architecture works best with teams that:

- Communicate effectively and coordinate when needed
- Recognize when duplication becomes problematic and refactor accordingly
- Balance feature independence with shared concerns
- Understand that **no architecture is perfect** - there are always trade-offs

---

This enterprise reference provides a solid foundation for Azure application workloads with clear architectural boundaries and room for growth as applications mature.

*This README was created with the assistance of [ChatGPT][chatgpt] by OpenAI.*

[nvm]: https://github.com/nvm-sh/nvm
[pnpm]: https://pnpm.io
[docker]: https://www.docker.com
[chatgpt]: https://openai.com/chatgpt
[biome]: https://biomejs.dev
[typescript]: https://www.typescriptlang.org
[node]: https://nodejs.org/en
[npm]: https://www.npmjs.com
[tailwind]: https://tailwindcss.com
[vite]: https://vitejs.dev
[azure-functions]: https://www.npmjs.com/package/@azure/functions
[graphql]: https://www.npmjs.com/package/graphql
[nuxt]: https://nuxtjs.org
[opentelemetry]: https://opentelemetry.io
[zod]: https://github.com/colinhacks/zod
[js-joda]: https://js-joda.github.io/js-joda
[vscode]: https://code.visualstudio.com
[vitest]: https://github.com/vitest-dev/vitest
[tsx]: https://github.com/privatenumber/tsx
[winston]: https://github.com/winstonjs/winston
[esbuild]: https://esbuild.github.io
