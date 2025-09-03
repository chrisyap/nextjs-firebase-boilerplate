"use client";

import { useFirebase } from "../providers/FirebaseProvider";

export default function HomePage() {
  const { user, userRole } = useFirebase();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <p className="mt-4 text-white">Welcome to the Home Page: {userRole}</p>
      {user ? (
        <a href="/logout" className="m-4 bg-red-800 px-4 py-2 text-white">
          Logout
        </a>
      ) : (
        <a href="/login" className="m-4 bg-indigo-800 px-4 py-2 text-white">
          Login
        </a>
      )}
    </div>
  );
}
