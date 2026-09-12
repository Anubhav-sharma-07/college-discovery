import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "College Discovery Platform",
  description: "Find, predict, and compare colleges",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="flex gap-6 p-4 border-b max-w-6xl mx-auto">
          <a href="/" className="font-medium">Listing</a>
          <a href="/predictor" className="font-medium">Predictor</a>
          <a href="/compare" className="font-medium">Compare</a>
        </nav>
        {children}
      </body>
    </html>
  );
}