"use client";

import { useFirebase } from "../providers/FirebaseProvider";

export default function HomePage() {
  const { userRole } = useFirebase();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="mt-4 text-white">Welcome to the Home Page: {userRole}</p>
    </div>
  );
}
