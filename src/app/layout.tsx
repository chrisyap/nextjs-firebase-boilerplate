import { FirebaseProvider } from "@/providers/FirebaseProvider";
import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Next.js Firebase Auth Boilerplate",
  description:
    "A starting point for Next.js projects with Firebase Authentication.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="bg-slate-900 font-sans text-white"
        suppressHydrationWarning
      >
        <FirebaseProvider>{children}</FirebaseProvider>
      </body>
    </html>
  );
}
