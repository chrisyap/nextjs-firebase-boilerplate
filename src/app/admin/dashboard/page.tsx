"use client";

import { useEffect } from "react";
import clsx from "clsx";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useFirebase } from "../../../providers/FirebaseProvider";

export default function DashboardPage() {
  const { user, auth, db, authReady, isRoleReady, userRole } = useFirebase();
  const isAdmin = userRole === "admin";
  const router = useRouter();

  useEffect(() => {
    if (authReady && isRoleReady && (!user || userRole !== "admin")) {
      router.replace("/");
    }
  }, [db, user, authReady, isRoleReady, router, userRole]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!authReady || !user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-white"></div>
        <p className="mt-4 text-white">Authenticating...</p>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        isAdmin && "p-4 sm:ml-64",
        "flex min-h-screen items-center justify-center p-6",
      )}
    >
      <div className="w-full max-w-lg rounded-lg bg-slate-800 p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Welcome!</h1>
          <button
            onClick={handleSignOut}
            className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white shadow-md transition-colors duration-200 hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
        <p className="mb-4 text-slate-300">
          Your user ID:{" "}
          <span className="font-mono text-sm break-all">{user.uid}</span>
        </p>
      </div>
    </div>
  );
}
