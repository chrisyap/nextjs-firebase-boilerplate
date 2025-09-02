import { FirebaseProvider } from "@/providers/FirebaseProvider";
import { ReactNode } from "react";
import SideNav from "@/components/SideNav";

export const metadata = {
  title: "Next.js Firebase Auth Boilerplate",
  description:
    "A starting point for Next.js projects with Firebase Authentication.",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white font-sans">
        <FirebaseProvider>
          <SideNav />
          <div className="p-4 sm:ml-64">{children}</div>
        </FirebaseProvider>
      </body>
    </html>
  );
}
