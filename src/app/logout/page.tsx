"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFirebase } from "../../providers/FirebaseProvider";

export default function LogoutPage() {
  const { auth } = useFirebase();

  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      if (auth) {
        await auth.signOut();
        router.replace("/");
      }
    };
    logout();
  }, [auth, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="mb-6 animate-pulse text-center text-white">
        Logging out...
      </h1>
    </div>
  );
}
