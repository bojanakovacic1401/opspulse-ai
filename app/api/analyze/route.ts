import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const meetingTranscript = body.meetingTranscript || "";
    const supportMessages = body.supportMessages || "";
    const teamUpdates = body.teamUpdates || "";

    const prompt = `
You are OpsPulse AI, an operational intelligence assistant.

Analyze these company inputs:

MEETING TRANSCRIPT:
${meetingTranscript}

SUPPORT / CUSTOMER FEEDBACK:
${supportMessages}

TEAM UPDATES:
${teamUpdates}

Extract operational insights for management.

Return ONLY valid JSON. Do not include markdown. Do not include explanations.

Use exactly this JSON structure:

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
  "recommendedActions": ["string"]
}

Rules:
- If owner is unclear, use "Unassigned".
- If due date is unclear, use "Not specified".
- If team is unclear, infer the most likely team.
- Prioritize business impact.
- Keep the summary concise.
`;

    const response = await client.responses.create({
      model: "gpt-5.5",
      input: prompt,
    });

    const text = response.output_text;

    const data = JSON.parse(text);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Analyze API error:", error);

    return NextResponse.json(
      {
        error: "Failed to analyze company inputs.",
      },
      { status: 500 }
    );
  }
}