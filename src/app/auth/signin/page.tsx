"use client";

import { useAppDispatch } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

// Image URLs (you can replace these with URLs to the images you'd like to use)
const backgroundImage = "https://source.unsplash.com/featured/?technology";
const googleLogo = "https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png";

export default function SignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsSidebarCollapsed(true));
  }, [dispatch]);

  return (
    <div
      className="fixed w-[100vw] h-[100vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Sign-In Card */}
      <div className="relative z-10 bg-white/80 backdrop-blur-md shadow-xl rounded-lg p-10 max-w-md w-full flex flex-col items-center">
        {/* Heading */}
        <h1 className="font-extrabold text-3xl text-gray-900 text-center mb-6">
          Welcome Back!
        </h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          Sign in with your Google account to continue.
        </p>

        {/* Google Sign-In Button */}
        <button
          onClick={() => signIn("google", { callbackUrl })}
          className="flex items-center w-full bg-white text-gray-900 border border-gray-300 rounded-lg py-3 px-4 hover:shadow-lg transition-all duration-300 ease-in- justify-center"
        >
          <img src={googleLogo} alt="Google Logo" className="w-17 h-6 mr-3" />
          <span className="text-lg font-semibold" >Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}
