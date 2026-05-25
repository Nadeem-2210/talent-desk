import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TalentDesk — Premium Recruiter Assessment Dashboard",
  description:
    "Professional candidate screening, video assessment, and talent review dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
