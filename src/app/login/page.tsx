"use client";

import { Button, Field, Input, Label } from "@headlessui/react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState, FormEvent } from "react";
import { useFirebase } from "../../providers/FirebaseProvider";

export default function HomePage() {
  const { user, auth, authReady, isRoleReady, userRole } = useFirebase();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only redirect once authentication state is confirmed.
    if (authReady && user && isRoleReady) {
      if (userRole === "admin") {
        router.push("/admin/dashboard");
      } else if (userRole === "user") {
        router.push("/");
      }
    }
  }, [user, authReady, isRoleReady, userRole, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!authReady || !auth || !email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  if (!authReady) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-white"></div>
        <p className="mt-4 text-white">Initializing Firebase...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-lg bg-stone-800 p-8 shadow-xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          {isLogin ? "Login" : "Register"}
        </h1>

        {error && (
          <div className="mb-4 rounded-md bg-red-500 p-3 text-sm text-white">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field>
            <Label>Email address</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </Field>

          <Button
            type="submit"
            className="w-full rounded-md bg-indigo-800 px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-indigo-700"
          >
            {isLogin ? "Login" : "Register"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-400 transition-colors duration-300 hover:underline"
          >
            {isLogin ? "Register now" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
