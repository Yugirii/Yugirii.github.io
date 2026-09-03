import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marcus | Portfolio",
  description:
    "Portfolio of Marcus, a web developer, software QA analyst, and project manager.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
