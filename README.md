# BIT Learning Platform

An AI-powered e-learning platform for BIT that enables lecturers to generate structured course content through a multi-agent LLM pipeline, and students to consume it interactively.

## Tech Stack

- **Framework** — Next.js 15 (App Router)
- **Database** — PostgreSQL + Prisma
- **Auth** — Better Auth (students) + Firebase (lecturers & admins)
- **LLM** — Anthropic Claude (switchable: OpenAI, Google)
- **Queue** — BullMQ + Redis (async AI job processing)
- **Storage** — Cloudflare R2 (PDF/PPTX uploads via presigned URLs)
- **Styles** — Tailwind CSS
- **Package Manager** — pnpm
- **Hosting** — Sliplane (Next.js + Worker + Redis + PostgreSQL on one server)

---

## Multi-Agent Architecture

```
Lecturer uploads materials + curriculum (→ directly to R2 via presigned URL)
           │
           ▼
  ┌─────────────────┐
  │   API Route     │  Receives upload metadata, enqueues a job in BullMQ
  │   (Next.js)     │  Returns job ID immediately (no timeout risk)
  └────────┬────────┘
           │
           ▼
  ┌─────────────────┐
  │   BullMQ Worker │  Picks up the job and runs the agent pipeline
  │   (persistent)  │
  └────────┬────────┘
           │
           ▼
  ┌─────────────────┐
  │   Agent 1       │  Validates alignment between materials & curriculum
  │   (Validate)    │  Lightweight model (claude-haiku)
  └────────┬────────┘
           │
           ▼
  ┌─────────────────┐
  │   Agent 2       │  Generates the course outline
  │   (Outline)     │  Differentiates pre-class vs post-class content
  └────────┬────────┘
           │  Lecturer reviews and edits the outline
           ▼
  ┌─────────────────┐
  │   Agent 3       │  Generates module content
  │   (Generate)    │  Text, flashcards, quizzes, infographics
  └─────────────────┘
           │
           ▼
  Students consume content (no API calls at runtime)
```

> The client polls `/api/jobs/:id` or subscribes via SSE to track generation progress in real time.

---

## Authentication

Two distinct flows on a single login page with two tabs.

**Student tab** — Better Auth (email + password)
- Student profiles imported from the Lifecycle platform via API
- Temporary password sent by email on account creation
- First login redirects to password change screen
- `studentId` from Lifecycle platform stored on the user record

**Staff tab** — Firebase (email + password)
- Lecturers and admins authenticate with their existing Lifecycle platform Firebase account
- BIT Learning verifies their identity via the Lifecycle platform API key
- A BIT Learning session is created with their role (`LECTURER` or `SUPER_ADMIN`)

---

## File Uploads (Presigned URLs)

Large files (PDF, PPTX up to 200 MB) never transit the Next.js server. Instead:

1. Client requests a presigned URL from `/api/upload`
2. Server generates a temporary signed URL via Cloudflare R2
3. Client uploads the file **directly to R2** (bypasses Next.js entirely)
4. Server receives a confirmation and enqueues the processing job

---

## User Roles

| Role | Access |
|---|---|
| `SUPER_ADMIN` | Full access |
| `LECTURER` | Their own courses only |
| `STUDENT` | Courses they are enrolled in |

---

## Project Structure

```
elearning-platform/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/           # Unified login page (Student tab + Staff tab)
│   │   │   └── reset-password/  # Student first-login password change
│   │   ├── (dashboard)/
│   │   │   ├── lecturer/        # Upload, outline editor
│   │   │   ├── student/         # Module content viewer
│   │   │   └── admin/           # User management
│   │   └── api/
│   │       ├── agents/          # validate / outline / generate
│   │       ├── courses/
│   │       ├── upload/          # Presigned URL generation (R2)
│   │       ├── jobs/            # Job status polling (/api/jobs/:id)
│   │       └── lifecycle/       # Proxy → Lifecycle platform
│   ├── components/
│   │   ├── ui/                  # Shared UI components
│   │   ├── lecturer/
│   │   ├── student/
│   │   └── shared/
│   ├── lib/
│   │   ├── agents/              # LLM pipeline (base + 3 agents)
│   │   ├── queue/               # BullMQ queue definitions
│   │   ├── db/                  # Prisma client
│   │   └── utils/
│   │       ├── r2.ts            # Cloudflare R2 client + presigned URLs
│   │       └── lifecycle.ts     # Lifecycle platform integration
│   ├── hooks/
│   └── types/
├── worker/
│   └── index.ts                 # BullMQ worker (runs as a separate container)
├── prisma/
│   └── schema.prisma
├── public/
├── .env.example
├── .npmrc
└── next.config.ts
```

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/BIT-Solutions-Impact/bit-learning-platform
cd bit-learning-platform
pnpm install
```

> If pnpm shows a warning about ignored build scripts, run `pnpm approve-builds` and allow at least `prisma` and `@prisma/engines`.

### 2. Environment variables

```bash
cp .env.example .env
```

Generate an `AUTH_SECRET` and paste it in `.env`:
```bash
openssl rand -base64 32
```

### 3. Firebase setup (staff auth)

1. Go to [Firebase Console](https://console.firebase.google.com) → your BIT project
2. Project settings → Service accounts → **Generate new private key**
3. Copy `project_id`, `client_email`, and `private_key` into your `.env`

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

> Students do not need Firebase — their accounts are managed by Better Auth.

### 4. Cloudflare R2 setup (file storage)

R2 is used to store uploaded PDF and PPTX files. Files are uploaded directly from the browser via presigned URLs — they never transit the Next.js server.

**Step 1 — Create a Cloudflare account**
→ [cloudflare.com](https://cloudflare.com) — free up to 10 GB storage, no egress fees

**Step 2 — Create a bucket**
- Dashboard → **R2 Object Storage** → **Create bucket**
- Name: `bit-learning-files` (or anything you prefer)
- Choose the region closest to your users

**Step 3 — Enable public access** (needed to serve files to students)
- Bucket settings → **Public access** → Enable
- Copy the **Public URL** (e.g. `https://pub-xxx.r2.dev`)

**Step 4 — Create an API token**
- R2 → **Manage R2 API tokens** → **Create API token**
- Permissions: **Object Read & Write**
- Scope: your bucket only
- Copy the `Access Key ID` and `Secret Access Key` — they are shown only once

**Step 5 — Get your Account ID**
- Cloudflare Dashboard → bottom right corner → **Account ID**

**Step 6 — Fill in your `.env`**
```env
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key_id
R2_SECRET_ACCESS_KEY=your_secret_access_key
R2_BUCKET_NAME=bit-learning-files
R2_PUBLIC_URL=https://pub-xxx.r2.dev
```

### 5. Database setup

Pick one of the two options below.

---

#### Option A — PostgreSQL via Docker (recommended if not installed locally)

```bash
docker run --name bit-learning-db \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=bit_learning \
  -p 5432:5432 \
  -d postgres
```

Then set your `DATABASE_URL` in `.env`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/bit_learning"
```

To stop / restart the container later:
```bash
docker stop bit-learning-db
docker start bit-learning-db
```

---

#### Option B — PostgreSQL already installed locally

Create the database manually:
```bash
psql -U postgres
```
```sql
CREATE DATABASE bit_learning;
CREATE USER bit_learning_user WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE bit_learning TO bit_learning_user;
\q
```

Then set your `DATABASE_URL` in `.env`:
```
DATABASE_URL="postgresql://bit_learning_user:password@localhost:5432/bit_learning"
```

---

### 6. Redis setup (for BullMQ)

Redis is required locally for BullMQ to queue and process AI generation jobs.

```bash
docker run --name bit-learning-redis \
  -p 6379:6379 \
  -d redis:alpine
```

Then set your `REDIS_URL` in `.env`:
```
REDIS_URL="redis://localhost:6379"
```

To stop / restart later:
```bash
docker stop bit-learning-redis
docker start bit-learning-redis
```

### 7. Prisma setup

Run these commands **in this exact order**:

```bash
# 1. Generate the Prisma client from the schema
pnpm db:generate

# 2. Create the tables in the database
pnpm db:migrate
```

> `db:migrate` will prompt for a migration name — enter something like `init`.

To visually inspect your database:
```bash
pnpm db:studio
```

### 8. Start dev server + worker

In two separate terminals:

```bash
# Terminal 1 — Next.js app
pnpm dev

# Terminal 2 — BullMQ worker
pnpm worker:dev
```

App running at **http://localhost:3000** 🚀

---

## Useful Commands

| Command | Description |
|---|---|
| `pnpm dev` | Start Next.js development server |
| `pnpm build` | Production build |
| `pnpm worker:dev` | Start BullMQ worker (development) |
| `pnpm worker:start` | Start BullMQ worker (production) |
| `pnpm db:generate` | Regenerate Prisma client (run after schema changes) |
| `pnpm db:migrate` | Create and apply a new migration |
| `pnpm db:push` | Push schema changes without creating a migration (quick dev) |
| `pnpm db:studio` | Open Prisma Studio (visual DB explorer) |

---

## Switching LLM Providers

Each agent has a default config in `src/lib/agents/base.ts`. Override per-request:

```ts
const result = await runOutlineAgent(input, {
  provider: "openai",
  model: "gpt-4o",
  temperature: 0.3,
});
```

Every `AgentJob` in the DB records the provider, model, temperature, and prompts — making it easy to compare output quality across runs.

---

## Lifecycle Platform Integration

Course data (code, name, department, semester) is fetched from the BIT Lifecycle Platform via `src/lib/utils/lifecycle.ts`. The `User` model includes a `lifecycleId` field for cross-platform user linking.

Student profiles are imported from the Lifecycle platform on account creation — their `studentId` is stored and linked to their Better Auth account.

---

## Infrastructure (Production)

All services run on a **single Sliplane server (~€9/month)** as separate Docker containers:

```
Sliplane Server
├── Container: Next.js app
├── Container: BullMQ Worker
├── Container: Redis
└── Container: PostgreSQL
```

File storage is handled separately by **Cloudflare R2** (free up to 10 GB, no egress fees).

---

## Docker

Two compose files are available depending on your use case.

### Option A — DB + Redis only (recommended for development)

Starts PostgreSQL and Redis only; run Next.js and the worker locally with hot reload.

```bash
docker compose -f docker-compose.dev.yml up -d
```

Your `.env`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/bit_learning"
REDIS_URL="redis://localhost:6379"
```

Then run the app and worker locally:
```bash
pnpm dev          # Terminal 1
pnpm worker:dev   # Terminal 2
```

### Option B — Full stack (app + worker + Redis + DB)

Builds and runs everything in containers — useful for testing a production-like setup.

```bash
docker compose up -d --build
```

App available at **http://localhost:3000**.

### Useful Docker commands

```bash
# Stop containers
docker compose down

# Stop and wipe the database volume (clean slate)
docker compose down -v

# View logs
docker compose logs -f app
docker compose logs -f worker
docker compose logs -f db
docker compose logs -f redis
```
