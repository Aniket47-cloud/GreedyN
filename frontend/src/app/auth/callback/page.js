"use client";

import { Suspense } from "react";

import Loader from "../Loader"; // your spinner component
import AuthCallback from "./AuthCallback";

export default function CallbackPage() {
  return (
    <Suspense fallback={<Loader />}>
      <AuthCallback />
    </Suspense>
  );
}
