import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import TrackingPage from "@/app/tracking/page";

describe("TrackingPage", () => {
  beforeEach(() => {
    const fetchMock = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    global.fetch = fetchMock as unknown as typeof fetch;
  });

  it("validates required amount/date before submit", async () => {
    render(<TrackingPage />);

    await waitFor(() => {
      expect(
        screen.getByText(/Income & Expense Tracking/i),
      ).toBeInTheDocument();
    });

    const amount = screen.getByPlaceholderText("Amount") as HTMLInputElement;
    fireEvent.change(amount, { target: { value: "" } });

    fireEvent.click(screen.getByRole("button", { name: /Add transaction/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Amount and date are required/i),
      ).toBeInTheDocument();
    });
  });
});
