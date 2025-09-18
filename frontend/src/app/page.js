"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    setLoading(true); 
    if (!role || !token) {
      router.push("/login");
    } else if (role === "normal") {
      router.push("/dashboard/user");
    } else {
      router.push("/dashboard/superuser");
    }

    setLoading(false); // finished checking
  }, [router]);

  if (loading) {
    // 👇 skeleton loader placeholder
    return (
       <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-4 w-48 bg-gray-200 animate-pulse rounded mt-2"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-3 text-sm font-medium text-gray-500 py-2 border-b">
        <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-4 w-12 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-4 w-14 bg-gray-200 animate-pulse rounded"></div>
      </div>

      {/* Table Rows (repeat for skeleton effect) */}
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="grid grid-cols-3 items-center py-4 border-b last:border-b-0"
        >
          <div>
            <div className="h-4 w-40 bg-gray-200 animate-pulse rounded mb-2"></div>
            <div className="h-3 w-32 bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-6 w-10 bg-gray-200 animate-pulse rounded-full"></div>
        </div>
      ))}
    </div>
    );
  }

  return null; 
}

