# OpsPulse AI

**Operational & Revenue Intelligence Dashboard**

**Tagline:** From workplace noise to actionable insight.

OpsPulse AI turns meeting transcripts, support messages and team updates into clear tasks, blockers, churn risks, sales opportunities, revenue insights and executive briefs.

It helps teams understand what is happening across the company, what is blocked, what could hurt revenue and what management should do next.

---

## Problem

Modern teams generate important business signals every day across meetings, support conversations, customer feedback and team updates.

But those signals are usually scattered across different tools and formats.

As a result, managers often miss:

- important decisions
- action items
- task owners
- blockers
- customer complaints
- churn risks
- sales opportunities
- revenue-impacting issues

This creates operational noise and slows down decision-making.

---

## Solution

OpsPulse AI analyzes unstructured workplace inputs and converts them into a structured management dashboard.

The app extracts:

- executive summary
- decisions
- action items
- owners
- deadlines
- blockers
- risks
- customer feedback categories
- revenue at risk
- expansion opportunities
- churn risk signals
- recommended management actions
- ready-to-copy executive brief

---

## Why It Matters

OpsPulse AI is not only a productivity tool.

It helps teams improve operational efficiency and protect revenue by surfacing business-critical signals hidden inside daily work.

The dashboard helps management answer:

- What is the team working on?
- What is blocked?
- What risks are emerging?
- Which customer issues are repeating?
- Which issues could create churn?
- Which messages contain sales opportunities?
- What should leadership do next?

---

## Demo Flow

1. Click **Load demo data** or use the integration-ready import cards.
2. Review the imported meeting transcript, support messages and team updates.
3. Click **Generate OpsPulse**.
4. View the management dashboard.
5. Review revenue impact, team load, risks and recommended actions.
6. Copy the auto-generated executive brief.

---

## Core Features

### Meeting Intelligence

Extracts decisions, action items, owners, deadlines, blockers and risks from meeting transcripts.

### Feedback Intelligence

Classifies customer and support messages into categories such as:

- bug
- feature request
- complaint
- urgent issue
- sales opportunity
- praise

### Operational Dashboard

Shows:

- active tasks
- blocked tasks
- at-risk work
- team load map
- customer signal mix
- top risks
- recommended actions

### Revenue Intelligence

Surfaces business impact from daily communication, including:

- revenue at risk
- expansion pipeline
- churn risk signals
- sales opportunities
- revenue-related insights

### Executive Brief

Generates a ready-to-copy management report that can be shared with leadership or the team.

### Integration-Ready Import Hub

The MVP includes simulated imports for:

- Slack support messages
- Zoom meeting transcripts
- Jira sprint updates

For the hackathon demo, these imports use mock data. In production, they can be replaced with real API connectors.

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

OpsPulse AI is designed to use the OpenAI API for live analysis.

If API credits are unavailable, the app automatically uses demo mode with pre-generated analysis. This keeps the hackathon demo stable and reliable.

To enable live AI analysis, create a `.env.local` file:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

An example environment file is provided in `.env.example`.

---

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app:

```text
http://localhost:3000
```

---

## Project Structure

```text
opspulse-ai
├── app
│   ├── page.tsx
│   └── api
│       └── analyze
│           └── route.ts
├── public
├── .env.example
├── package.json
└── README.md
```

If the project uses a `src` directory, the main files are located in:

```text
src/app/page.tsx
src/app/api/analyze/route.ts
```

---

## Hackathon Positioning

OpsPulse AI is an operational and revenue intelligence MVP.

It does not track employees. It analyzes existing business inputs and turns them into structured insight.

The goal is to help teams reduce operational chaos, detect blockers earlier, surface customer issues and identify revenue opportunities before they are missed.

---

## One-Sentence Pitch

OpsPulse AI turns meetings, support messages and team updates into tasks, blockers, churn risks, sales opportunities and executive insights.

---

## Future Improvements

- Real Slack integration
- Real Zoom transcript import
- Real Jira connector
- Authentication
- Team workspace support
- Historical trend tracking
- Export to PDF
- Push tasks to Jira or Linear
- Revenue impact scoring based on CRM data

---

## Summary

OpsPulse AI transforms workplace noise into an actionable operating and revenue dashboard for modern teams.