"use client";

import React from "react";
import { useEffect, useState } from "react";
import { toCurrency, toMonthInput } from "@/lib/format";
import { ExpenseChart } from "@/app/components/ExpenseChart";

type SummaryResponse = {
  totalIncome: number;
  totalExpense: number;
  totalFunds: number;
};

export function SidebarSummary() {
  const [month, setMonth] = useState(toMonthInput());
  const [summary, setSummary] = useState<SummaryResponse>({
    totalIncome: 0,
    totalExpense: 0,
    totalFunds: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSummary() {
      try {
        setError("");
        const res = await fetch(`/api/summary?month=${month}`);
        if (!res.ok) {
          throw new Error("Unable to load summary data");
        }
        const data = (await res.json()) as SummaryResponse;
        setSummary(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    }

    loadSummary();
  }, [month]);

  return (
    <aside className="flex flex-col gap-4 rounded-xl bg-panel p-4 shadow-sm">
      <label className="text-sm font-medium">
        Current month
        <input
          type="month"
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </label>

      <div className="space-y-2 text-sm">
        <p>
          Total income: <strong>{toCurrency(summary.totalIncome)}</strong>
        </p>
        <p>
          Total expense: <strong>{toCurrency(summary.totalExpense)}</strong>
        </p>
        <p>
          Total funds: <strong>{toCurrency(summary.totalFunds)}</strong>
        </p>
      </div>

      <ExpenseChart
        monthLabel={month}
        income={summary.totalIncome}
        expense={summary.totalExpense}
      />

      {error ? <p className="text-sm text-warn">{error}</p> : null}
    </aside>
  );
}
