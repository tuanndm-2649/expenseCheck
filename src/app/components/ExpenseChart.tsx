"use client";

import React from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type Props = {
  monthLabel: string;
  income: number;
  expense: number;
};

export function ExpenseChart({ monthLabel, income, expense }: Props) {
  const data = {
    labels: [monthLabel],
    datasets: [
      {
        label: "Income",
        data: [income],
        backgroundColor: "#1f7a8c",
      },
      {
        label: "Expense",
        data: [expense],
        backgroundColor: "#d7263d",
      },
    ],
  };

  return (
    <div className="rounded-xl bg-panel p-3 shadow-sm">
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: { legend: { position: "bottom" } },
        }}
      />
    </div>
  );
}
