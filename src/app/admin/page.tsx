"use client";

import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFirebase } from "../../providers/FirebaseProvider";

export default function AdminPage() {
  const { authReady, isRoleReady, user, userRole } = useFirebase();
  const router = useRouter();

  useEffect(() => {
    if (authReady && isRoleReady) {
      if (!user || userRole !== "admin") {
        router.replace("/");
      } else {
        router.replace("/admin/dashboard");
      }
    }
  }, [authReady, isRoleReady, router, user, userRole]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <LoaderCircle className="animate-spin" size={64} />
      <p className="mt-4 text-white">Authenticating...</p>
    </div>
  );
}
