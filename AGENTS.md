# Voice Survey Workshop

## Purpose

This repo is a public live-coding workshop starter. The final outcome is a single-page voice survey app where a participant clicks `Talk to Interviewer`, answers spoken survey questions from interview.json file, and receives AI-generated insights after the interview finishes.

## Architecture

```text
Browser (/demo)
  -> React Router v7 SSR UI
  -> OpenAI Realtime over WebRTC for live audio
  -> Express endpoints for token bootstrap and final insights

Express server
  -> POST /api/token
  -> POST /api/insights
  -> GET /health

OpenAI usage
  -> Realtime API for live interview turns
  -> Chat Completions with Zod validation for insights
```

Audio flows directly browser -> OpenAI. The server never proxies the microphone stream.

## Frontend design

Use the branding/oxagile.md file for the branding and design. If not specified, use the fallback React Router default design options.

## Conventions

- Use `pnpm`
- Use Node 22+
- Keep survey content hardcoded in interview.json file for the workshop
- No auth, no database, no admin UI, no persistence
- Use `zod` for schema validation
- Use the OpenAI Agents SDK as the canonical voice implementation path
- Keep the workshop docs and branch guide updated when the implementation changes
- Always use the OpenAI developer documentation MCP server if you need to work with the OpenAI API, ChatGPT Apps SDK without me having to explicitly ask.

## Key Files And Contracts

- Public route: `/demo`
- Health check: `GET /health`
- Realtime bootstrap: `POST /api/token`
- Insights analysis: `POST /api/insights`
- Survey source of truth: one local JSON file with `title`, `description`, `questions`

## Environment

Source of truth for the OpenAI API key `OPENAI_API_KEY` is the `.env` file.
