"use client";

import { useState, type ReactNode } from "react";

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

type RevenueImpact = {
  revenueAtRisk: string;
  expansionPipeline: string;
  churnRiskSignals: number;
  salesOpportunities: number;
  insights: string[];
};

type AnalysisResult = {
  summary: string;
  decisions: string[];
  tasks: Task[];
  risks: string[];
  blockers: string[];
  feedbackCategories: FeedbackCategory[];
  recommendedActions: string[];
  revenueImpact?: RevenueImpact;
};

const fallbackRevenueImpact: RevenueImpact = {
  revenueAtRisk: "$18,000",
  expansionPipeline: "$42,000",
  churnRiskSignals: 2,
  salesOpportunities: 2,
  insights: [
    "Enterprise customer may convert if SSO is prioritized this week.",
    "Repeated login failures create churn risk for existing accounts.",
    "Slow dashboard performance may block expansion in reporting-heavy teams.",
  ],
};

const fallbackResult: AnalysisResult = {
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
  recommendedActions: [
    "Assign one engineer to investigate login issues today.",
    "Finalize onboarding copy before the design handoff.",
    "Create a sales follow-up task for the enterprise SSO opportunity.",
  ],
    revenueImpact: fallbackRevenueImpact,
};

export default function Home() {
  const [meeting, setMeeting] = useState("");
  const [feedback, setFeedback] = useState("");
  const [updates, setUpdates] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function loadDemoData() {
    setMeeting(demoMeeting);
    setFeedback(demoFeedback);
    setUpdates(demoUpdates);
    setResult(null);
    setError("");
    setCopied(false);
  }

  async function analyzeData() {
    setIsLoading(true);
    setError("");
    setResult(null);
    setCopied(false);

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
      setResult(fallbackResult);
      setError(
        "Live AI analysis is unavailable because API quota is exceeded. Showing demo analysis instead."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function copyExecutiveBrief() {
    if (!result) return;

    const brief = buildExecutiveBrief(result);
    await navigator.clipboard.writeText(brief);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  const activeTasks = result?.tasks?.length ?? 0;

  const blockedTasks =
    result?.tasks?.filter((task) => task.status.toLowerCase() === "blocked")
      .length ?? 0;

  const customerSignals =
    result?.feedbackCategories?.reduce((sum, item) => sum + item.count, 0) ?? 0;

  return (
    <main className="min-h-screen overflow-hidden bg-[#050713] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute right-[-10%] top-[10%] h-[520px] w-[520px] rounded-full bg-fuchsia-500/20 blur-[140px]" />
        <div className="absolute bottom-[-15%] left-[25%] h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />
      </div>

      <section className="relative mx-auto max-w-7xl px-6 py-8">
        <nav className="mb-14 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/15 ring-1 ring-cyan-300/30">
              <div className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_24px_rgba(103,232,249,0.9)]" />
            </div>

            <div>
              <p className="text-sm font-semibold tracking-[0.25em] text-cyan-300">
                OPSPULSE AI
              </p>
              <p className="text-xs text-slate-400">
                Operational intelligence dashboard
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 text-xs md:flex">
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-emerald-300">
              Demo Ready
            </span>
            <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-violet-300">
              AI + Ops
            </span>
          </div>
        </nav>

        <header className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-200">
              From workplace noise to actionable insight
            </div>

            <h1 className="max-w-4xl text-5xl font-black tracking-tight text-white md:text-7xl">
              Company work intelligence,
              <span className="block bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-violet-300 bg-clip-text text-transparent">
                powered by AI.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              OpsPulse AI turns meetings, support messages and team updates into
              clear tasks, blockers, risks and executive insights.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={loadDemoData}
                className="rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-100"
              >
                Load demo data
              </button>

              <button
                onClick={analyzeData}
                disabled={isLoading}
                className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-6 py-3 text-sm font-bold text-cyan-200 transition hover:bg-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Analyzing..." : "Analyze with OpsPulse AI"}
              </button>
            </div>
          </div>

          <AICoreVisual
            activeTasks={activeTasks || 12}
            blockedTasks={blockedTasks || 3}
            risks={result?.risks.length || 3}
            signals={customerSignals || 6}
          />
        </header>

        {error && (
          <div className="mb-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-200">
            {error}
          </div>
        )}

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 shadow-2xl backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Input Hub</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Paste raw operational noise here.
                </p>
              </div>

              <button
                onClick={loadDemoData}
                className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Load demo
              </button>
            </div>

            <InputBlock
              label="Meeting transcript"
              value={meeting}
              onChange={setMeeting}
              placeholder="Paste meeting transcript here..."
              height="h-36"
            />

            <InputBlock
              label="Support / feedback messages"
              value={feedback}
              onChange={setFeedback}
              placeholder="Paste support messages here..."
              height="h-36"
            />

            <InputBlock
              label="Team updates"
              value={updates}
              onChange={setUpdates}
              placeholder="Paste daily or weekly team updates here..."
              height="h-32"
            />

            <button
              onClick={analyzeData}
              disabled={isLoading}
              className="mt-5 w-full rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 px-5 py-4 font-black text-slate-950 shadow-[0_0_40px_rgba(34,211,238,0.25)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Analyzing company signals..." : "Generate OpsPulse"}
            </button>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 shadow-2xl backdrop-blur-xl">
            <div className="mb-5">
              <h2 className="text-2xl font-bold">Management Dashboard</h2>
              <p className="mt-1 text-sm text-slate-400">
                Executive view of tasks, risks and customer signals.
              </p>
            </div>

            {!result ? (
              <div className="flex h-[520px] items-center justify-center rounded-[1.5rem] border border-dashed border-white/15 bg-[#070a19]/70 text-center">
                <div>
                  <div className="mx-auto mb-5 h-16 w-16 rounded-full bg-cyan-300/10 p-4 shadow-[0_0_60px_rgba(34,211,238,0.35)]">
                    <div className="h-full w-full rounded-full bg-cyan-300" />
                  </div>
                  <p className="font-semibold text-slate-300">
                    Load demo data and generate the first OpsPulse.
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    The dashboard will appear here.
                  </p>
                </div>
              </div>
            ) : (
              <Dashboard result={result} />
            )}
          </div>
        </section>

        {result && (
          <ExecutiveBrief
            result={result}
            copied={copied}
            onCopy={copyExecutiveBrief}
          />
        )}

        {result && (
          <section className="mt-6 grid gap-6 lg:grid-cols-3">
            <Panel title="Decisions">
              <List items={result.decisions} />
            </Panel>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 shadow-2xl backdrop-blur-xl lg:col-span-2">
              <h2 className="mb-4 text-2xl font-bold">Action Items</h2>

              <div className="overflow-hidden rounded-2xl border border-white/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/[0.06] text-slate-300">
                    <tr>
                      <th className="p-4">Task</th>
                      <th className="p-4">Owner</th>
                      <th className="p-4">Team</th>
                      <th className="p-4">Due</th>
                      <th className="p-4">Priority</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {result.tasks.map((task) => (
                      <tr
                        key={task.title}
                        className="border-t border-white/10 bg-[#070a19]/60"
                      >
                        <td className="p-4 font-medium text-white">
                          {task.title}
                        </td>
                        <td className="p-4 text-slate-400">{task.owner}</td>
                        <td className="p-4 text-slate-400">{task.team}</td>
                        <td className="p-4 text-slate-400">{task.dueDate}</td>
                        <td className="p-4">
                          <Badge>{task.priority}</Badge>
                        </td>
                        <td className="p-4">
                          <Badge>{task.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <Panel title="Blockers">
              <List items={result.blockers} />
            </Panel>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 shadow-2xl backdrop-blur-xl lg:col-span-2">
              <h2 className="mb-4 text-2xl font-bold">Feedback Categories</h2>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {result.feedbackCategories.map((item) => (
                  <div
                    key={item.category}
                    className="rounded-2xl border border-white/10 bg-[#070a19]/70 p-5"
                  >
                    <p className="text-sm text-slate-400">{item.category}</p>
                    <p className="mt-2 text-3xl font-black text-cyan-300">
                      {item.count}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan-300">
            How it works
          </p>

          <h2 className="text-3xl font-black">
            Three noisy inputs. One clear operating view.
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <HowItWorksCard
              step="01"
              title="Analyze meetings"
              text="Extract decisions, owners, tasks, deadlines and blockers from raw meeting transcripts."
            />
            <HowItWorksCard
              step="02"
              title="Classify feedback"
              text="Sort customer messages into bugs, feature requests, complaints and sales opportunities."
            />
            <HowItWorksCard
              step="03"
              title="Generate dashboard"
              text="Show management what is blocked, what is risky and what needs action this week."
            />
          </div>
        </section>
      </section>
    </main>
  );
}

function Dashboard({ result }: { result: AnalysisResult }) {
  const activeTasks = result.tasks.length;

  const blockedTasks = result.tasks.filter(
    (task) => task.status.toLowerCase() === "blocked"
  ).length;

  const atRiskTasks = result.tasks.filter(
    (task) => task.status.toLowerCase() === "at risk"
  ).length;

  const customerSignals = result.feedbackCategories.reduce(
  (sum, item) => sum + item.count,
  0
);

const revenueImpact = result.revenueImpact ?? fallbackRevenueImpact;

const teamStats = Object.values(
    result.tasks.reduce<
      Record<string, { team: string; tasks: number; blockers: number }>
    >((acc, task) => {
      if (!acc[task.team]) {
        acc[task.team] = {
          team: task.team,
          tasks: 0,
          blockers: 0,
        };
      }

      acc[task.team].tasks += 1;

      if (task.status.toLowerCase() === "blocked") {
        acc[task.team].blockers += 1;
      }

      return acc;
    }, {})
  );

  const maxTeamTasks = Math.max(...teamStats.map((team) => team.tasks), 1);

  const maxFeedbackCount = Math.max(
    ...result.feedbackCategories.map((item) => item.count),
    1
  );

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <MetricCard label="Active Tasks" value={activeTasks} />
        <MetricCard label="Blocked Tasks" value={blockedTasks} />
        <MetricCard label="At Risk" value={atRiskTasks} />
        <MetricCard label="Signals" value={customerSignals} />
      </div>
      
      <RevenueImpactPanel impact={revenueImpact} />
      
      <div className="rounded-2xl border border-white/10 bg-[#070a19]/70 p-5">
        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-cyan-300">
          Executive Summary
        </p>
        <p className="leading-7 text-slate-300">{result.summary}</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[#070a19]/70 p-5">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-violet-300">
            Team Load Map
          </p>

          <div className="space-y-4">
            {teamStats.map((team) => (
              <div key={team.team}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-300">
                    {team.team}
                  </span>
                  <span className="text-slate-500">
                    {team.tasks} tasks · {team.blockers} blockers
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-300"
                    style={{
                      width: `${(team.tasks / maxTeamTasks) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#070a19]/70 p-5">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-fuchsia-300">
            Customer Signal Mix
          </p>

          <div className="space-y-4">
            {result.feedbackCategories.map((item) => (
              <div key={item.category}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-300">
                    {item.category}
                  </span>
                  <span className="text-slate-500">{item.count}</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-fuchsia-300 to-cyan-300"
                    style={{
                      width: `${(item.count / maxFeedbackCount) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#070a19]/70 p-5">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-fuchsia-300">
          Top Risks This Week
        </p>
        <List items={result.risks.slice(0, 3)} />
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#070a19]/70 p-5">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-emerald-300">
          Recommended Actions
        </p>
        <List items={result.recommendedActions} />
      </div>
    </div>
  );
}

function ExecutiveBrief({
  result,
  copied,
  onCopy,
}: {
  result: AnalysisResult;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-2xl backdrop-blur-xl">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-emerald-300">
            Auto-generated report
          </p>
          <h2 className="text-3xl font-black">
            This Week&apos;s Executive Brief
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            A ready-to-share management summary generated from meetings,
            feedback and team updates.
          </p>
        </div>

        <button
          onClick={onCopy}
          className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-5 py-3 text-sm font-bold text-emerald-200 transition hover:bg-emerald-300/20"
        >
          {copied ? "Copied!" : "Copy report"}
        </button>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#070a19]/80 p-5">
        <p className="mb-4 text-lg font-bold text-white">Operating Summary</p>
        <p className="leading-7 text-slate-300">{result.summary}</p>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <BriefColumn title="Top Risks" items={result.risks.slice(0, 3)} />
          <BriefColumn title="Blockers" items={result.blockers.slice(0, 3)} />
          <BriefColumn
            title="Next Actions"
            items={result.recommendedActions.slice(0, 3)}
          />
        </div>
      </div>
    </section>
  );
}

function BriefColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <h3 className="mb-3 font-bold text-cyan-300">{title}</h3>
      <List items={items} />
    </div>
  );
}

function AICoreVisual({
  activeTasks,
  blockedTasks,
  risks,
  signals,
}: {
  activeTasks: number;
  blockedTasks: number;
  risks: number;
  signals: number;
}) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-2xl backdrop-blur-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(34,211,238,0.25),transparent_35%),radial-gradient(circle_at_70%_55%,rgba(217,70,239,0.18),transparent_35%)]" />

      <div className="relative">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
              AI Signal
            </p>
            <h3 className="mt-2 text-2xl font-black">OpsPulse Core</h3>
          </div>

          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
            Online
          </span>
        </div>

        <div className="relative mx-auto mb-7 flex h-72 items-center justify-center">
          <div className="absolute h-72 w-72 rounded-full border border-cyan-300/20 bg-cyan-300/5 shadow-[0_0_120px_rgba(34,211,238,0.25)]" />
          <div className="absolute h-56 w-56 rounded-full border border-fuchsia-300/20" />
          <div className="absolute h-40 w-40 rounded-full border border-violet-300/25" />
          <div className="absolute h-28 w-28 rounded-full bg-gradient-to-br from-cyan-300 via-violet-300 to-fuchsia-300 opacity-90 blur-sm" />
          <div className="absolute h-16 w-16 rounded-full bg-white/80 shadow-[0_0_80px_rgba(255,255,255,0.7)]" />

          <div className="absolute left-8 top-10 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(103,232,249,0.9)]" />
          <div className="absolute right-12 top-16 h-2 w-2 rounded-full bg-fuchsia-300 shadow-[0_0_20px_rgba(240,171,252,0.9)]" />
          <div className="absolute bottom-14 left-16 h-2 w-2 rounded-full bg-violet-300 shadow-[0_0_20px_rgba(196,181,253,0.9)]" />
        </div>

        <div className="mb-5 grid grid-cols-2 gap-3">
          <CoreStat label="Active tasks" value={activeTasks} />
          <CoreStat label="Blockers" value={blockedTasks} />
          <CoreStat label="Risks" value={risks} />
          <CoreStat label="Customer signals" value={signals} />
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#060817]/80 p-4 backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
              Intelligence Flow
            </p>
            <p className="text-xs text-emerald-300">Ready</p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-xs text-slate-300">
            <div className="rounded-xl bg-white/[0.04] p-3">Meetings</div>
            <div className="rounded-xl bg-white/[0.04] p-3">Feedback</div>
            <div className="rounded-xl bg-white/[0.04] p-3">Updates</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoreStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#060817]/75 p-4 backdrop-blur-xl">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-3xl font-black text-cyan-300">{value}</p>
    </div>
  );
}

function InputBlock({
  label,
  value,
  onChange,
  placeholder,
  height,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  height: string;
}) {
  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-semibold text-slate-300">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`${height} w-full resize-none rounded-2xl border border-white/10 bg-[#050713]/80 p-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10`}
      />
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#070a19]/70 p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-4xl font-black text-cyan-300">{value}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 shadow-2xl backdrop-blur-xl">
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      {children}
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-sm leading-6 text-slate-300">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.9)]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200">
      {children}
    </span>
  );
}

function HowItWorksCard({
  step,
  title,
  text,
}: {
  step: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#070a19]/70 p-5">
      <p className="mb-4 text-sm font-black text-cyan-300">{step}</p>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}

function RevenueImpactPanel({ impact }: { impact: RevenueImpact }) {
  return (
    <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.06] p-5 shadow-[0_0_40px_rgba(16,185,129,0.08)]">
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.25em] text-emerald-300">
            Revenue Impact
          </p>
          <h3 className="text-2xl font-black text-white">
            Revenue risks and opportunities hidden in daily work
          </h3>
        </div>

        <span className="w-fit rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-xs font-bold text-emerald-200">
          Revenue Intelligence
        </span>
      </div>

      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <RevenueMetric label="Revenue at Risk" value={impact.revenueAtRisk} />
        <RevenueMetric
          label="Expansion Pipeline"
          value={impact.expansionPipeline}
        />
        <RevenueMetric
          label="Churn Risk Signals"
          value={impact.churnRiskSignals.toString()}
        />
        <RevenueMetric
          label="Sales Opportunities"
          value={impact.salesOpportunities.toString()}
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#070a19]/80 p-4">
        <p className="mb-3 text-sm font-bold text-emerald-300">
          Revenue Insights
        </p>
        <List items={impact.insights} />
      </div>
    </div>
  );
}

function RevenueMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#070a19]/80 p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-black text-emerald-300">{value}</p>
    </div>
  );
}

function buildExecutiveBrief(result: AnalysisResult) {
  const revenueImpact = result.revenueImpact ?? fallbackRevenueImpact;

  return `OpsPulse AI — Executive Brief

Summary:
${result.summary}

Revenue Impact:
- Revenue at Risk: ${revenueImpact.revenueAtRisk}
- Expansion Pipeline: ${revenueImpact.expansionPipeline}
- Churn Risk Signals: ${revenueImpact.churnRiskSignals}
- Sales Opportunities: ${revenueImpact.salesOpportunities}

Revenue Insights:
${revenueImpact.insights
  .map((insight, index) => `${index + 1}. ${insight}`)
  .join("\n")}

Top Risks:
${result.risks.map((risk, index) => `${index + 1}. ${risk}`).join("\n")}

Blockers:
${result.blockers
  .map((blocker, index) => `${index + 1}. ${blocker}`)
  .join("\n")}

Recommended Actions:
${result.recommendedActions
  .map((action, index) => `${index + 1}. ${action}`)
  .join("\n")}

Action Items:
${result.tasks
  .map(
    (task, index) =>
      `${index + 1}. ${task.title} — Owner: ${task.owner}, Team: ${
        task.team
      }, Due: ${task.dueDate}, Priority: ${task.priority}, Status: ${
        task.status
      }`
  )
  .join("\n")}
`;
}