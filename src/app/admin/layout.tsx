import React from "react";
import { ReactNode } from "react";
import SideNav from "@/components/SideNav";

export const metadata = {
  title: "Next.js Firebase Auth Boilerplate",
  description:
    "A starting point for Next.js projects with Firebase Authentication.",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <React.Fragment>
      <SideNav />
      <main>{children}</main>
    </React.Fragment>
  );
}
