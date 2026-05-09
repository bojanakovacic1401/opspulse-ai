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
      model: "gpt-5",
      input: [
        {
          role: "developer",
          content:
            "You are OpsPulse AI. Return only valid JSON. No markdown. No explanation.",
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
  "recommendedActions": ["string"]
}

Rules:
- If owner is unclear, use "Unassigned".
- If due date is unclear, use "Not specified".
- If team is unclear, infer the most likely team.
- Keep everything in English.
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