import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MENTOR-ONE | Conscious Voice AI Mentor",
  description: "A realistic, voice-first AI Life-Mentor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen selection:bg-amber-400 selection:text-slate-900">
        {children}
      </body>
    </html>
  );
}
