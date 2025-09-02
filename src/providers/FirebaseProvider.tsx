"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { onAuthStateChanged, User, Unsubscribe } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

// Context types for strong typing
type FirebaseContextType = {
  user: User | null;
  authReady: boolean;
  db: any;
  auth: any;
  userRole: string | null;
  isRoleReady: boolean;
};

const FirebaseContext = createContext<FirebaseContextType | undefined>(
  undefined
);

/**
 * A hook to easily access Firebase context.
 * @returns {FirebaseContextType} The Firebase context value.
 */
export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};

/**
 * Provides Firebase authentication and Firestore services to child components.
 * @param {object} props - Component props.
 * @param {ReactNode} props.children - The child components to render.
 * @returns {JSX.Element} The provider component.
 */
export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isRoleReady, setIsRoleReady] = useState<boolean>(false);

  // Authenticate user on initial load
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
    });
    return () => unsubscribeAuth();
  }, []);

  // Fetch user role from Firestore after authentication
  useEffect(() => {
    let unsubscribe: Unsubscribe;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      unsubscribe = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          const role = docSnap.data().role;
          setUserRole(role);
        } else {
          setUserRole("user"); // Default role if document doesn't exist
        }
        setIsRoleReady(true);
      });
    } else if (authReady && !user) {
      // Handle unauthenticated state
      setUserRole(null);
      setIsRoleReady(true);
    }
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, authReady]);

  const value = { user, authReady, db, auth, userRole, isRoleReady };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};
