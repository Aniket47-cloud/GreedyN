"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "../Loader";

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
    <Loader/>
  );
}
