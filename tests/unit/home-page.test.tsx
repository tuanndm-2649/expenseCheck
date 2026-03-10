import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders summary and refetches when month changes", async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          totalIncome: 1000000,
          totalExpense: 200000,
          totalFunds: 4000000,
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          totalIncome: 500000,
          totalExpense: 100000,
          totalFunds: 4200000,
        }),
      });

    global.fetch = fetchMock as unknown as typeof fetch;

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText(/Total Income/i)).toBeInTheDocument();
    });

    const monthInput = screen.getByDisplayValue(
      /\d{4}-\d{2}/,
    ) as HTMLInputElement;
    fireEvent.change(monthInput, { target: { value: "2026-01" } });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });
  });

  it("shows error text when summary api fails", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue({ ok: false }) as unknown as typeof fetch;

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText(/Unable to load dashboard/i)).toBeInTheDocument();
    });
  });
});
