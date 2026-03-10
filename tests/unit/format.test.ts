import { inMonth, toMonthInput } from "@/lib/format";

describe("format helpers", () => {
  it("creates YYYY-MM month value", () => {
    const value = toMonthInput(new Date("2026-03-10T00:00:00.000Z"));
    expect(value).toBe("2026-03");
  });

  it("checks month by prefix", () => {
    expect(inMonth("2026-03-11", "2026-03")).toBe(true);
    expect(inMonth("2026-02-11", "2026-03")).toBe(false);
  });
});
