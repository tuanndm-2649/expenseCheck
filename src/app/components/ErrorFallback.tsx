"use client";

import React from "react";
type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorFallback({ error, reset }: Props) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="text-sm text-slate-600">{error.message}</p>
      <button
        className="rounded-lg bg-accent px-4 py-2 text-white"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
