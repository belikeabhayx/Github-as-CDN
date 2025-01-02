"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  const handleSignIn = () => {
    signIn("github", {
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <button
        onClick={handleSignIn}
        className="bg-black text-white px-6 py-3 rounded-md"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
