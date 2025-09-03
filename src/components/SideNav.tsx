"use client";

import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { useFirebase } from "@/providers/FirebaseProvider";
import { adminNav } from "./Constants";

export default function SideNav() {
  const { userRole } = useFirebase();
  const isAdmin = userRole === "admin";

  if (!isAdmin) return <></>;

  return (
    <aside
      id="sidebar-multi-level-sidebar"
      className="fixed top-0 left-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="flex h-full flex-col overflow-y-auto border-r border-slate-800">
        <div className="border-b border-slate-800 px-6 pt-5 pb-4">
          <h3 className="font-bold">BRAND</h3>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <ul className="flex-1 space-y-2 font-medium">
            {adminNav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.link}
                  className="group flex items-center rounded-lg p-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
                >
                  {item.icon}
                  <span className="ms-3">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="my-12 space-y-2 font-medium">
            <li>
              <Link
                href="/logout"
                className="group flex items-center rounded-lg p-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
              >
                <LogOutIcon />
                <span className="ms-3">Log out</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
