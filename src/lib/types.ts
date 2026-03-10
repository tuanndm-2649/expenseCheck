export type TransactionType = "income" | "expense";

export type Fund = {
  id: string;
  name: string;
  balance: number;
  created_at: string;
  updated_at: string;
};

export type Transaction = {
  id: string;
  type: TransactionType;
  amount: number;
  date: string;
  note: string | null;
  created_at: string;
  updated_at: string;
};

export type MonthlySummary = {
  totalIncome: number;
  totalExpense: number;
  totalFunds: number;
  chart: Array<{ label: string; income: number; expense: number }>;
};
