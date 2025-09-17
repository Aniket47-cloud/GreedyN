"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const encoded = searchParams.get("data");
    if (encoded) {
      try {
        const decoded = JSON.parse(atob(encoded));
        const { token,user } = decoded;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setTimeout(() => {
          if (user.role === "normal") {
            router.push("/dashboard/user");
          } else {
            router.push("/dashboard/superuser");
          }
        }, 1000); 
      } catch (err) {
        console.error("Failed to decode token payload", err);
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Loader */}
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        
        {/* Text */}
        <p className="text-lg font-semibold text-gray-700">
          Signing you in, please wait...
        </p>
      </div>
    </div>
  );
}
