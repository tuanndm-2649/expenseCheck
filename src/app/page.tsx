"use client";

import React from "react";
import { useEffect, useMemo, useState } from "react";
import { toCurrency, toMonthInput } from "@/lib/format";

type SummaryResponse = {
  totalIncome: number;
  totalExpense: number;
  totalFunds: number;
};

export default function HomePage() {
  const [month, setMonth] = useState(toMonthInput());
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setError("");
        const res = await fetch(`/api/summary?month=${month}`);
        if (!res.ok) throw new Error("Unable to load dashboard");
        const data = (await res.json()) as SummaryResponse;
        setSummary(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    }
    loadData();
  }, [month]);

  const balance = useMemo(() => {
    if (!summary) return 0;
    return summary.totalIncome - summary.totalExpense;
  }, [summary]);

  return (
    <main className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Dashboard Overview</h2>
        <div className="flex gap-2">
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2"
          />
        </div>
      </div>

      {error ? <p className="text-sm text-warn">{error}</p> : null}

      <div className="grid gap-3 sm:grid-cols-3">
        <article className="rounded-lg bg-slate-50 p-3">
          <p className="text-sm text-slate-600">Total Income</p>
          <p className="font-semibold">
            {toCurrency(summary?.totalIncome ?? 0)}
          </p>
        </article>
        <article className="rounded-lg bg-slate-50 p-3">
          <p className="text-sm text-slate-600">Total Expense</p>
          <p className="font-semibold">
            {toCurrency(summary?.totalExpense ?? 0)}
          </p>
        </article>
        <article className="rounded-lg bg-slate-50 p-3">
          <p className="text-sm text-slate-600">Monthly Difference</p>
          <p className="font-semibold">{toCurrency(balance)}</p>
        </article>
      </div>
    </main>
  );
}
