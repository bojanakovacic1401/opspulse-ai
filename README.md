# OpsPulse AI

**From workplace noise to actionable insight.**

OpsPulse AI is an AI-powered operational intelligence dashboard that turns meeting transcripts, support messages and team updates into clear tasks, blockers, risks and executive insights.

It helps managers understand what the team is working on, what is blocked, what risks are emerging and what actions should be taken next.

---

## Problem

Modern teams generate important operational information across many unstructured channels:

- meeting transcripts
- support tickets
- customer feedback
- daily updates
- weekly reports
- internal messages

Important decisions, blockers and risks often get lost in this noise.

Managers usually have to manually read through many messages and updates to understand:

- what the team is working on
- which tasks are delayed
- who owns each action item
- which issues are affecting customers
- which blockers need escalation
- what the top risks are this week

---

## Solution

OpsPulse AI analyzes raw workplace inputs and converts them into a structured management dashboard.

The app extracts:

- executive summary
- decisions
- action items
- task owners
- deadlines
- priorities
- blockers
- risks
- feedback categories
- recommended management actions
- ready-to-share executive brief

---

## Demo Flow

1. Click **Load demo data**
2. Review the generated meeting transcript, support messages and team updates
3. Click **Generate OpsPulse**
4. View the management dashboard
5. Review the executive brief
6. Click **Copy report** to copy a ready-to-share management summary

---

## Core Features

### Meeting Intelligence

Extracts decisions, tasks, owners, deadlines and blockers from meeting transcripts.

### Feedback Intelligence

Classifies support and customer feedback into categories such as:

- bug
- feature request
- complaint
- sales opportunity
- praise

### Management Dashboard

Shows:

- active tasks
- blocked tasks
- at-risk work
- customer signals
- top risks
- recommended actions
- team load map
- customer signal mix

### Executive Brief

Generates a ready-to-copy weekly management report from the analyzed inputs.

---

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- OpenAI API
- GitHub

---

## AI Mode

The application is designed to use the OpenAI API for live analysis.

If the API quota is unavailable, the app automatically falls back to demo analysis mode. This keeps the hackathon demo stable and reliable while still showing the full product experience.

To enable live AI analysis, create a `.env.local` file:

```env
OPENAI_API_KEY=your_openai_api_key_here