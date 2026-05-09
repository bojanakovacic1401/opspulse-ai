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

type Task = {
  title: string;
  owner: string;
  team: string;
  dueDate: string;
  priority: string;
  status: string;
};

type FeedbackCategory = {
  category: string;
  count: number;
};

type AnalysisResult = {
  summary: string;
  decisions: string[];
  tasks: Task[];
  risks: string[];
  blockers: string[];
  feedbackCategories: FeedbackCategory[];
  recommendedActions: string[];
};

export default function Home() {
  const [meeting, setMeeting] = useState("");
  const [feedback, setFeedback] = useState("");
  const [updates, setUpdates] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function loadDemoData() {
    setMeeting(demoMeeting);
    setFeedback(demoFeedback);
    setUpdates(demoUpdates);
    setResult(null);
    setError("");
  }

  async function analyzeData() {
    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meetingTranscript: meeting,
          supportMessages: feedback,
          teamUpdates: updates,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze inputs.");
      }

      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while analyzing the inputs.");
    } finally {
      setIsLoading(false);
    }
  }

  const activeTasks = result?.tasks?.length ?? 0;
  const blockedTasks =
    result?.tasks?.filter((task) => task.status === "Blocked").length ?? 0;
  const atRiskTasks =
    result?.tasks?.filter((task) => task.status === "At risk").length ?? 0;
  const customerSignals =
    result?.feedbackCategories?.reduce((sum, item) => sum + item.count, 0) ?? 0;

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
              className="mb-4 h-40 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-slate-100 outline-none focus:border-cyan-500"
            />

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Support / feedback messages
            </label>
            <textarea
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
              placeholder="Paste support messages here..."
              className="mb-4 h-40 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-slate-100 outline-none focus:border-cyan-500"
            />

            <label className="mb-2 block text-sm font-medium text-slate-300">
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
              disabled={isLoading}
              className="mt-5 w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300"
            >
              {isLoading ? "Analyzing..." : "Analyze with OpsPulse AI"}
            </button>

            {error && (
              <p className="mt-3 rounded-xl border border-red-900 bg-red-950 p-3 text-sm text-red-300">
                {error}
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
            <h2 className="mb-4 text-xl font-semibold">Management Dashboard</h2>

            {!result ? (
              <div className="flex h-[520px] items-center justify-center rounded-xl border border-dashed border-slate-700 text-center text-slate-500">
                Load demo data and click Analyze to generate insights.
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <MetricCard label="Active Tasks" value={activeTasks} />
                  <MetricCard label="Blocked Tasks" value={blockedTasks} />
                  <MetricCard label="At Risk Tasks" value={atRiskTasks} />
                  <MetricCard label="Customer Signals" value={customerSignals} />
                </div>

                <div className="rounded-xl bg-slate-950 p-4">
                  <h3 className="mb-2 font-semibold text-slate-200">
                    Executive Summary
                  </h3>
                  <p className="text-sm text-slate-400">{result.summary}</p>
                </div>

                <div className="rounded-xl bg-slate-950 p-4">
                  <h3 className="mb-3 font-semibold text-slate-200">
                    Top Risks This Week
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-400">
                    {result.risks.slice(0, 3).map((risk) => (
                      <li key={risk}>• {risk}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-slate-950 p-4">
                  <h3 className="mb-3 font-semibold text-slate-200">
                    Recommended Actions
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-400">
                    {result.recommendedActions.map((action) => (
                      <li key={action}>• {action}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {result && (
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="mb-4 text-xl font-semibold">Decisions</h2>
              <ul className="space-y-3 text-sm text-slate-400">
                {result.decisions.map((decision) => (
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
                      <th className="p-3">Priority</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.tasks.map((task) => (
                      <tr key={task.title} className="border-t border-slate-800">
                        <td className="p-3 text-slate-200">{task.title}</td>
                        <td className="p-3 text-slate-400">{task.owner}</td>
                        <td className="p-3 text-slate-400">{task.team}</td>
                        <td className="p-3 text-slate-400">{task.dueDate}</td>
                        <td className="p-3">
                          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-cyan-300">
                            {task.priority}
                          </span>
                        </td>
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

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="mb-4 text-xl font-semibold">Blockers</h2>
              <ul className="space-y-3 text-sm text-slate-400">
                {result.blockers.map((blocker) => (
                  <li key={blocker}>• {blocker}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 lg:col-span-2">
              <h2 className="mb-4 text-xl font-semibold">Feedback Categories</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {result.feedbackCategories.map((item) => (
                  <div
                    key={item.category}
                    className="rounded-xl bg-slate-950 p-4"
                  >
                    <p className="text-sm text-slate-500">{item.category}</p>
                    <p className="mt-2 text-2xl font-bold text-cyan-400">
                      {item.count}
                    </p>
                  </div>
                ))}
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