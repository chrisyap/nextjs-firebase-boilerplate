"use client";

import { Button, Input } from "@headlessui/react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useFirebase } from "../../providers/FirebaseProvider";

export default function LoginPage() {
  const { user, authReady, isRoleReady, userRole, db, auth } = useFirebase();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
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

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider)
        .then((result) => {
          updateUserRole(result.user);
        })
        .catch((error) => {
          setError(error instanceof Error ? error.message : String(error));
        });
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    }
  };

  const handleAuth = async () => {
    setIsLoading(true);
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password)
          .then((result) => {
            updateUserRole(result.user);
          })
          .catch((error) => {
            setError(error instanceof Error ? error.message : String(error));
          });
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserRole = async (user: User): Promise<void> => {
    if (!user) return;
    try {
      await setDoc(
        doc(db, "users", user.uid),
        { email: user.email, role: "user" },
        { merge: true },
      );
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    }
  };

  if (!authReady) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <LoaderCircle className="animate-spin" size={64} />
        <p className="mt-4 text-white">Initializing Firebase...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="shadow-black-50 w-full max-w-sm rounded-lg bg-slate-800 p-8 shadow-xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          {isLogin ? "Login" : "Register"}
        </h1>

        {error && (
          <div className="mb-4 rounded-md bg-red-500 p-3 text-sm text-white">
            {error}
          </div>
        )}

        <Input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-md bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <Input
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-md bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <Button
          onClick={handleAuth}
          className="flex w-full justify-center rounded-md bg-indigo-800 px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-indigo-700"
        >
          {isLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : isLogin ? (
            "Login"
          ) : (
            "Register"
          )}
        </Button>

        <div className="my-4 flex justify-between px-10 opacity-50">
          <hr className="mt-6 flex-1 border-dotted opacity-50" />
          <p className="mx-6 mt-4 text-center text-sm">OR</p>
          <hr className="mt-6 flex-1 border-dotted opacity-50" />
        </div>
        <Button
          onClick={handleGoogleSignIn}
          className="mt-6 flex w-full items-center justify-center rounded-md border border-indigo-500 px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-indigo-700"
        >
          <svg
            width="20px"
            height="20px"
            viewBox="-0.5 0 48 48"
            className="mr-2"
          >
            <g
              id="Icons"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="Color-" transform="translate(-401.000000, -860.000000)">
                <g id="Google" transform="translate(401.000000, 860.000000)">
                  <path
                    d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                    id="Fill-1"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                    id="Fill-2"
                    fill="#EB4335"
                  ></path>
                  <path
                    d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                    id="Fill-3"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                    id="Fill-4"
                    fill="#4285F4"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
          Sign in with Google
        </Button>

        <div className="mt-6 text-center text-sm text-slate-400">
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
