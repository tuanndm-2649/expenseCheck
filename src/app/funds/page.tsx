"use client";

import React from "react";
import { FormEvent, useEffect, useState } from "react";
import { toCurrency } from "@/lib/format";
import { Fund } from "@/lib/types";

export default function FundsPage() {
  const [funds, setFunds] = useState<Fund[]>([]);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");
  const [topup, setTopup] = useState<Record<string, string>>({});
  const [rename, setRename] = useState<Record<string, string>>({});

  async function loadFunds() {
    const res = await fetch("/api/funds");
    if (!res.ok) {
      setError("Unable to load fund list");
      return;
    }
    const data = (await res.json()) as Fund[];
    setFunds(data);
  }

  useEffect(() => {
    loadFunds();
  }, []);

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    if (!newName.trim()) {
      setError("Fund name is required");
      return;
    }

    const res = await fetch("/api/funds", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName.trim() }),
    });

    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      setError(body.error ?? "Unable to create fund");
      return;
    }

    setNewName("");
    setError("");
    await loadFunds();
  }

  async function handleTopup(id: string) {
    const amount = Number(topup[id] ?? "0");
    if (amount <= 0) {
      setError("Top-up amount must be greater than 0");
      return;
    }

    const res = await fetch(`/api/funds/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ add_amount: amount }),
    });

    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      setError(body.error ?? "Top-up failed");
      return;
    }

    setTopup((prev) => ({ ...prev, [id]: "" }));
    setError("");
    await loadFunds();
  }

  async function handleRename(id: string) {
    const name = (rename[id] ?? "").trim();
    if (!name) {
      setError("New name is invalid");
      return;
    }

    const res = await fetch(`/api/funds/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      setError(body.error ?? "Rename failed");
      return;
    }

    setRename((prev) => ({ ...prev, [id]: "" }));
    setError("");
    await loadFunds();
  }

  async function handleDelete(fund: Fund) {
    if (Number(fund.balance) > 0) {
      setError("Cannot delete a fund with remaining balance");
      return;
    }
    if (!window.confirm(`Delete fund ${fund.name}?`)) return;

    const res = await fetch(`/api/funds/${fund.id}`, { method: "DELETE" });
    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      setError(body.error ?? "Failed to delete fund");
      return;
    }

    setError("");
    await loadFunds();
  }

  return (
    <main className="space-y-4">
      <h2 className="text-xl font-semibold">Fund Management</h2>
      {error ? <p className="text-sm text-warn">{error}</p> : null}

      <form onSubmit={handleAdd} className="flex flex-wrap gap-2">
        <input
          className="rounded border border-slate-300 px-3 py-2"
          placeholder="New fund name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button
          className="rounded bg-accent px-3 py-2 text-white"
          type="submit"
        >
          Add fund
        </button>
      </form>

      <ul className="space-y-3">
        {funds.map((fund) => (
          <li
            key={fund.id}
            className="space-y-2 rounded border border-slate-200 p-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <strong>{fund.name}</strong>
              <span>{toCurrency(Number(fund.balance))}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <input
                className="rounded border border-slate-300 px-2 py-1"
                placeholder="New name"
                value={rename[fund.id] ?? ""}
                onChange={(e) =>
                  setRename((prev) => ({ ...prev, [fund.id]: e.target.value }))
                }
              />
              <button
                className="rounded bg-slate-700 px-3 py-1 text-white"
                onClick={() => handleRename(fund.id)}
              >
                Rename
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <input
                type="number"
                className="rounded border border-slate-300 px-2 py-1"
                placeholder="Top-up amount"
                value={topup[fund.id] ?? ""}
                onChange={(e) =>
                  setTopup((prev) => ({ ...prev, [fund.id]: e.target.value }))
                }
              />
              <button
                className="rounded bg-accent px-3 py-1 text-white"
                onClick={() => handleTopup(fund.id)}
              >
                Top up
              </button>
              <button
                className="rounded bg-warn px-3 py-1 text-white"
                onClick={() => handleDelete(fund)}
              >
                Delete fund
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
