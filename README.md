# Voice Survey Workshop

![Oxagile](./branding/company-logo.svg) × ![GenAI Zürich](./public/favicon.png)

Public starter repo for a 60-minute live workshop that builds a voice-powered interview app with OpenAI Realtime, React Router v7, and Express.

## What This Repo Is

- The workshop is taught branch-by-branch. Each named branch is a checkpoint attendees can jump to if they fall behind.
- The final app is a single-page voice interviewer: talk to an AI voice, answer five interview questions, then view structured insights.

## Branch Guide

- `01-scaffold`: base app scaffold and workshop setup
- `02-voice`: ephemeral token endpoint and browser voice connection
- `03-interview`: prompt-driven interview flow and live transcript
- `04-insights`: interview completion detection and structured insights
- `05-complete`: full working demo and workshop fallback branch

## Local Setup

Requirements:

- Node.js 22+
- `pnpm`
- `OPENAI_API_KEY` with Realtime API access for the voice branches

Install and run:

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Open: [http://localhost:5173/](http://localhost:5173/)

## Deployment

### Docker

Build and run locally:

```bash
docker build -t voice-interview-workshop .
docker run -p 3000:3000 voice-interview-workshop
```

### Fly.io

Install the Fly.io CLI (`flyctl`): <https://fly.io/docs/flyctl/install/>

This repo includes a starter `fly.toml`. Update the Fly app name before the first deploy if needed.

```bash
fly launch --copy-config --no-deploy
fly secrets set OPENAI_API_KEY=...
fly deploy
```
