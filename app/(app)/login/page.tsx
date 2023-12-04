import LoginForm from "@/components/login-form";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      Login
      <LoginForm />
      <Link href="/space">Space</Link>
    </div>
  );
}
