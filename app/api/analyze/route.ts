import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function parseJsonFromAi(text: string) {
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error("AI did not return JSON. Raw output: " + cleaned);
  }

  return JSON.parse(jsonMatch[0]);
}

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is missing. Check your .env.local file.");
    }

    const body = await request.json();

    const meetingTranscript = body.meetingTranscript || "";
    const supportMessages = body.supportMessages || "";
    const teamUpdates = body.teamUpdates || "";

    const response = await client.responses.create({
      model: "gpt-5.4-mini",
      input: [
        {
          role: "developer",
          content:
            "You are OpsPulse AI. Return only valid JSON. No markdown. No explanation. Keep everything in English.",
        },
        {
          role: "user",
          content: `
Analyze these company inputs.

MEETING TRANSCRIPT:
${meetingTranscript}

SUPPORT / CUSTOMER FEEDBACK:
${supportMessages}

TEAM UPDATES:
${teamUpdates}


Return this exact JSON structure:

{
  "summary": "string",
  "decisions": ["string"],
  "tasks": [
    {
      "title": "string",
      "owner": "string",
      "team": "string",
      "dueDate": "string",
      "priority": "Low | Medium | High",
      "status": "Open | Blocked | At risk | Done"
    }
  ],
  "risks": ["string"],
  "blockers": ["string"],
  "feedbackCategories": [
    {
      "category": "Bug | Feature Request | Complaint | Urgent Issue | Sales Opportunity | Praise",
      "count": 0
    }
  ],
  "recommendedActions": ["string"],
  "revenueImpact": {
    "revenueAtRisk": "string",
    "expansionPipeline": "string",
    "churnRiskSignals": 0,
    "salesOpportunities": 0,
    "insights": ["string"]
  },
  "businessImpact": {
    "timeSavedPerManager": "string",
    "annualHoursSaved": "string",
    "estimatedAnnualSavings": "string",
    "pipelineSurfaced": "string",
    "assumptions": ["string"]
  }
}
Rules:
- If owner is unclear, use "Unassigned".
- If due date is unclear, use "Not specified".
- If team is unclear, infer the most likely team.
- Keep everything in English.
- Extract concrete tasks from meetings and updates.
- Classify feedback into the provided feedback categories.
- Identify blockers that slow down delivery.
- Identify risks that could affect customers, deadlines or revenue.
- Estimate revenue impact from customer complaints, churn signals, urgent issues and sales opportunities.
- If exact revenue is unknown, use reasonable demo estimates such as "$18,000" or "$42,000".
- Revenue insights should connect customer issues and sales requests to business impact.
- Recommended actions should be specific, practical and management-oriented.
- Estimate business impact using demo assumptions.
- Include time saved, annual productivity savings and pipeline surfaced.
- Clearly frame business impact as estimated or projected, not guaranteed.
- Keep revenueImpact.revenueAtRisk and revenueImpact.expansionPipeline as short currency values only, for example "$18,000" or "$42,000".
- Keep businessImpact metric values short, for example "10h/week", "5,200h/year", "$260,000/year", "$50,000".
- Put explanations only inside insights or assumptions, never inside metric values.
- Use EUR currency symbol (€) for all revenue and business impact estimates.
`,
        },
      ],
    });

    const text = response.output_text;

    console.log("AI RAW OUTPUT:", text);

    const data = parseJsonFromAi(text);

    return NextResponse.json(data);
  } catch (error) {
    console.error("ANALYZE API REAL ERROR:", error);

    const message =
      error instanceof Error ? error.message : "Unknown server error";

    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 }
    );
  }
}