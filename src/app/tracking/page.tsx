"use client";

import React from "react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { toCurrency, toMonthInput } from "@/lib/format";
import { Transaction, TransactionType } from "@/lib/types";

export default function TrackingPage() {
  const [month, setMonth] = useState(toMonthInput());
  const [rows, setRows] = useState<Transaction[]>([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    type: "expense" as TransactionType,
    amount: "",
    date: `${toMonthInput()}-01`,
    note: "",
  });

  async function loadAll() {
    try {
      setError("");
      const txRes = await fetch(`/api/transactions?month=${month}`);
      if (!txRes.ok) throw new Error("Unable to load data");

      const txData = (await txRes.json()) as Transaction[];
      setRows(txData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);

  async function handleAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.amount || !form.date) {
      setError("Amount and date are required");
      return;
    }

    const amount = Number(form.amount);
    if (Number.isNaN(amount) || amount <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: form.type,
        amount,
        date: form.date,
        note: form.note || null,
      }),
    });

    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      setError(body.error ?? "Unable to create transaction");
      return;
    }

    setForm((prev) => ({ ...prev, amount: "", note: "" }));
    await loadAll();
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this transaction?"))
      return;
    const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Failed to delete transaction");
      return;
    }
    await loadAll();
  }

  const totals = useMemo(() => {
    return rows.reduce(
      (acc, row) => {
        if (row.type === "income") acc.income += Number(row.amount);
        else acc.expense += Number(row.amount);
        return acc;
      },
      { income: 0, expense: 0 },
    );
  }, [rows]);

  return (
    <main className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Income & Expense Tracking</h2>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2"
        />
      </div>

      {error ? <p className="text-sm text-warn">{error}</p> : null}

      <form
        className="grid gap-2 rounded-lg border border-slate-200 p-3 sm:grid-cols-4"
        onSubmit={handleAdd}
      >
        <select
          className="rounded border border-slate-300 px-2 py-2"
          value={form.type}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              type: e.target.value as TransactionType,
            }))
          }
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="number"
          placeholder="Amount"
          className="rounded border border-slate-300 px-2 py-2"
          value={form.amount}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, amount: e.target.value }))
          }
        />
        <input
          type="date"
          className="rounded border border-slate-300 px-2 py-2"
          value={form.date}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, date: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Note (optional)"
          className="rounded border border-slate-300 px-2 py-2"
          value={form.note}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, note: e.target.value }))
          }
        />
        <button
          className="rounded bg-accent px-3 py-2 text-white sm:col-span-5"
          type="submit"
        >
          Add transaction
        </button>
      </form>

      <div className="grid gap-3 sm:grid-cols-2">
        <article className="rounded-lg bg-slate-50 p-3">
          <p className="text-sm text-slate-600">Total income</p>
          <p className="font-semibold">{toCurrency(totals.income)}</p>
        </article>
        <article className="rounded-lg bg-slate-50 p-3">
          <p className="text-sm text-slate-600">Total expense</p>
          <p className="font-semibold">{toCurrency(totals.expense)}</p>
        </article>
      </div>

      <ul className="space-y-2">
        {rows.map((row) => (
          <li
            key={row.id}
            className="flex items-center justify-between rounded border border-slate-200 p-3"
          >
            <div>
              <p className="font-medium">
                {row.type === "income" ? "Income" : "Expense"}:{" "}
                {toCurrency(Number(row.amount))}
              </p>
              <p className="text-sm text-slate-600">
                {row.date} {row.note ? `- ${row.note}` : ""}
              </p>
            </div>
            <button
              className="rounded bg-warn px-3 py-1 text-white"
              onClick={() => handleDelete(row.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
