"use client";

import { useState } from "react";

const demoMeeting = `Sarah: We need to finish the new onboarding flow by Friday.
Alex: I can take the frontend work, but I am waiting for the final design from Nina.
Nina: Design is delayed because we still do not have the final product copy.
Daniel: Support is reporting that multiple users are having login issues after the latest update.
Sarah: The login issue is now a priority. Alex, please investigate it by Wednesday.
Daniel: We also have an enterprise customer asking for SSO before they commit to the annual plan.`;

const demoFeedback = `1. I cannot log in after the latest update.
2. We need SSO before buying the enterprise plan.
3. The dashboard is very slow when loading reports.
4. I love the new reporting feature.
5. Login keeps failing for multiple team members.
6. We are interested in a 50-seat enterprise plan if SSO is available.`;

const demoUpdates = `Engineering: Working on onboarding frontend. Blocked by final design.
Product: Final onboarding copy is still not ready.
Support: Multiple users are reporting login failures after the latest release.
Sales: Enterprise prospect is interested in a 50-seat annual plan if SSO is available.
Design: Waiting for product copy before finalizing onboarding screens.`;

const mockResults = {
  summary:
    "The team is focused on launching the onboarding flow, resolving login issues, and following up on an enterprise SSO opportunity.",
  decisions: [
    "Login issues are now a high-priority investigation.",
    "The onboarding flow should be completed by Friday.",
    "The enterprise SSO request should be treated as a sales and product opportunity.",
  ],
  tasks: [
    {
      title: "Investigate login issue",
      owner: "Alex",
      team: "Engineering",
      dueDate: "Wednesday",
      priority: "High",
      status: "Open",
    },
    {
      title: "Finish onboarding design",
      owner: "Nina",
      team: "Design",
      dueDate: "Thursday",
      priority: "High",
      status: "Blocked",
    },
    {
      title: "Finalize onboarding copy",
      owner: "Sarah",
      team: "Product",
      dueDate: "Wednesday",
      priority: "Medium",
      status: "At risk",
    },
    {
      title: "Follow up on enterprise SSO request",
      owner: "Daniel",
      team: "Sales",
      dueDate: "Friday",
      priority: "High",
      status: "Open",
    },
  ],
  risks: [
    "Onboarding launch may be delayed because design is blocked by missing product copy.",
    "Login issues are affecting multiple users and may damage customer trust.",
    "The enterprise SSO opportunity may be lost without clear sales follow-up.",
  ],
  blockers: [
    "Engineering is waiting for final design.",
    "Design is waiting for final product copy.",
  ],
  feedbackCategories: [
    { category: "Bug", count: 2 },
    { category: "Feature Request", count: 1 },
    { category: "Complaint", count: 1 },
    { category: "Sales Opportunity", count: 2 },
  ],
};

export default function Home() {
const [meeting, setMeeting] = useState("");
const [feedback, setFeedback] = useState("");
const [updates, setUpdates] = useState("");
const [hasResults, setHasResults] = useState(false);

  function loadDemoData() {
  setMeeting(demoMeeting);
  setFeedback(demoFeedback);
  setUpdates(demoUpdates);
  setHasResults(false);
}

  function analyzeData() {
    setHasResults(true);
  }

  const activeTasks = mockResults.tasks.length;
  const blockedTasks = mockResults.tasks.filter(
    (task) => task.status === "Blocked"
  ).length;
  const atRiskTasks = mockResults.tasks.filter(
    (task) => task.status === "At risk"
  ).length;
  const urgentIssues = mockResults.feedbackCategories.find(
    (item) => item.category === "Bug"
  )?.count;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-cyan-400">
            OpsPulse AI
          </p>
          <h1 className="text-4xl font-bold tracking-tight">
            Company Work Intelligence Dashboard
          </h1>
          <p className="mt-3 max-w-2xl text-slate-400">
            Turn meetings, support messages and team updates into tasks,
            blockers, risks and management insights.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Input Hub</h2>
              <button
                onClick={loadDemoData}
                className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
              >
                Load demo data
              </button>
            </div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Meeting transcript
            </label>
            <textarea
              value={meeting}
              onChange={(event) => setMeeting(event.target.value)}
              placeholder="Paste meeting transcript here..."
              className="mb-4 h-44 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-slate-100 outline-none focus:border-cyan-500"
            />

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Support / feedback messages
            </label>
            <textarea
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
              placeholder="Paste support messages here..."
              className="h-44 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-slate-100 outline-none focus:border-cyan-500"
            />

            <label className="mb-2 mt-4 block text-sm font-medium text-slate-300">
              Team updates
            </label>
            <textarea
              value={updates}
              onChange={(event) => setUpdates(event.target.value)}
              placeholder="Paste daily or weekly team updates here..."
              className="h-36 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-slate-100 outline-none focus:border-cyan-500"
            />

            <button
              onClick={analyzeData}
              className="mt-5 w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
            >
              Analyze with OpsPulse AI
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
            <h2 className="mb-4 text-xl font-semibold">Management Dashboard</h2>

            {!hasResults ? (
              <div className="flex h-[420px] items-center justify-center rounded-xl border border-dashed border-slate-700 text-center text-slate-500">
                Load demo data and click Analyze to generate insights.
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <MetricCard label="Active Tasks" value={activeTasks} />
                  <MetricCard label="Blocked Tasks" value={blockedTasks} />
                  <MetricCard label="At Risk Tasks" value={atRiskTasks} />
                  <MetricCard label="Bug Reports" value={urgentIssues ?? 0} />
                </div>

                <div className="rounded-xl bg-slate-950 p-4">
                  <h3 className="mb-2 font-semibold text-slate-200">
                    Executive Summary
                  </h3>
                  <p className="text-sm text-slate-400">
                    {mockResults.summary}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-950 p-4">
                  <h3 className="mb-3 font-semibold text-slate-200">
                    Top 3 Risks This Week
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-400">
                    {mockResults.risks.map((risk) => (
                      <li key={risk}>• {risk}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-slate-950 p-4">
                  <h3 className="mb-3 font-semibold text-slate-200">
                    Recommended Actions
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li>• Assign one engineer to investigate login issues today.</li>
                    <li>• Finalize onboarding copy before design handoff.</li>
                    <li>• Create Sales follow-up for enterprise SSO request.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {hasResults && (
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="mb-4 text-xl font-semibold">Decisions</h2>
              <ul className="space-y-3 text-sm text-slate-400">
                {mockResults.decisions.map((decision) => (
                  <li key={decision}>• {decision}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 lg:col-span-2">
              <h2 className="mb-4 text-xl font-semibold">Action Items</h2>
              <div className="overflow-hidden rounded-xl border border-slate-800">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-950 text-slate-300">
                    <tr>
                      <th className="p-3">Task</th>
                      <th className="p-3">Owner</th>
                      <th className="p-3">Team</th>
                      <th className="p-3">Due</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockResults.tasks.map((task) => (
                      <tr key={task.title} className="border-t border-slate-800">
                        <td className="p-3 text-slate-200">{task.title}</td>
                        <td className="p-3 text-slate-400">{task.owner}</td>
                        <td className="p-3 text-slate-400">{task.team}</td>
                        <td className="p-3 text-slate-400">{task.dueDate}</td>
                        <td className="p-3">
                          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-cyan-300">
                            {task.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-slate-950 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-cyan-400">{value}</p>
    </div>
  );
}