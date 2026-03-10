import { getSupabaseClient } from "@/lib/supabaseClient";
import { Fund, MonthlySummary, Transaction } from "@/lib/types";
import { inMonth } from "@/lib/format";

export async function getFunds(): Promise<Fund[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("funds")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as Fund[];
}

export async function createFund(name: string): Promise<Fund> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("funds")
    .insert({ name, balance: 0 })
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data as Fund;
}

export async function updateFund(
  id: string,
  patch: Partial<Pick<Fund, "name" | "balance">>,
): Promise<Fund> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("funds")
    .update(patch)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data as Fund;
}

export async function deleteFund(id: string): Promise<void> {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from("funds").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function getTransactions(month: string): Promise<Transaction[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .order("date", { ascending: false });
  if (error) throw new Error(error.message);
  const rows = (data ?? []) as Transaction[];
  return rows.filter((row) => inMonth(row.date, month));
}

export async function createTransaction(
  payload: Pick<Transaction, "type" | "amount" | "date" | "note">,
): Promise<Transaction> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("transactions")
    .insert(payload)
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data as Transaction;
}

export async function deleteTransaction(id: string): Promise<void> {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from("transactions").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function getSummary(month: string): Promise<MonthlySummary> {
  const [funds, transactions] = await Promise.all([
    getFunds(),
    getTransactions(month),
  ]);

  const totalIncome = transactions
    .filter((it) => it.type === "income")
    .reduce((sum, it) => sum + Number(it.amount), 0);
  const totalExpense = transactions
    .filter((it) => it.type === "expense")
    .reduce((sum, it) => sum + Number(it.amount), 0);
  const totalFunds = funds.reduce((sum, it) => sum + Number(it.balance), 0);

  return {
    totalIncome,
    totalExpense,
    totalFunds,
    chart: [{ label: month, income: totalIncome, expense: totalExpense }],
  };
}
