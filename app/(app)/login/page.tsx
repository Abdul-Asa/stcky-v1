import LoginForm from "@/components/login-form";
import Link from "next/link";
import { Suspense } from "react";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      Login
      <LoginForm />
    </div>
  );
}
