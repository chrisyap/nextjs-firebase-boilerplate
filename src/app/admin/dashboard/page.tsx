"use client";

import { useState, useEffect } from "react";
import { useFirebase } from "../../../providers/FirebaseProvider";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  query,
  limit,
} from "firebase/firestore";

/**
 * Main authenticated dashboard page with chat functionality.
 * @returns {JSX.Element}
 */
export default function DashboardPage() {
  const { user, auth, db, authReady } = useFirebase();
  const router = useRouter();

  useEffect(() => {
    // Redirect to home if not authenticated and auth state is ready
    if (authReady && !user) {
      router.push("/");
      return;
    }
  }, [db, user, authReady, router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!authReady || !user) {
    // Show a loading indicator while auth state is being determined or redirected
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        <p className="mt-4 text-white">Authenticating...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Welcome!</h1>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
          >
            Sign Out
          </button>
        </div>
        <p className="text-gray-300 mb-4">
          Your user ID:{" "}
          <span className="font-mono break-all text-sm">{user.uid}</span>
        </p>
      </div>
    </div>
  );
}
