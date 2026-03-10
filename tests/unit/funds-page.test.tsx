import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import FundsPage from "@/app/funds/page";

describe("FundsPage", () => {
  it("blocks deleting fund when balance > 0", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: "f1", name: "Emergency Fund", balance: 500000 }],
    }) as unknown as typeof fetch;

    render(<FundsPage />);

    await waitFor(() => {
      expect(screen.getByText(/Emergency Fund/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Delete fund/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Cannot delete a fund with remaining balance/i),
      ).toBeInTheDocument();
    });
  });
});
