import { LoginForm } from "@/components/auth/login-form";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <main className="flex items-center justify-center">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}

export default LoginPage;
