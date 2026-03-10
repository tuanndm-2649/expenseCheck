import type { Metadata } from "next";
import "@/styles/globals.css";
import { HeaderNav } from "@/app/components/HeaderNav";
import { SidebarSummary } from "@/app/components/SidebarSummary";

export const metadata: Metadata = {
  title: "ExpenseCheck",
  description: "Personal finance management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <HeaderNav />
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-4 md:grid-cols-[280px,1fr]">
          <SidebarSummary />
          <section className="min-h-[70vh] rounded-xl bg-panel p-4 shadow-sm">
            {children}
          </section>
        </div>
      </body>
    </html>
  );
}
