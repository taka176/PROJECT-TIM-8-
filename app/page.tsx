"use client";

import { useState, useEffect } from "react";
import Loginril from "../Components/Loginril";
import Register from "../Components/Register";
import TodokartUtama from "../Components/TodokartUtama";
import { loginAction, registerAction, getUserLogin } from "@/action/auth/auth.action";

export default function Home() {
  const [currentView, setCurrentView] = useState<"login" | "register" | "todo">(
    "login",
  );
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getUserLogin();
      if (user) {
        setCurrentView("todo");
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async (data: { email: string; password: string }) => {
    setIsLoginLoading(true);
    setLoginError("");

    try {
      const result = await loginAction(data.email, data.password);

      if (result.success) {
        setCurrentView("todo");
        return false;
      }

      setLoginError(result.message || "Login gagal");
      return false;
    } catch {
      setLoginError("Terjadi kesalahan. Silakan coba lagi.");
      return false;
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleRegister = async (data: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setIsRegisterLoading(true);
    setRegisterError("");

    if (data.password !== data.confirmPassword) {
      setRegisterError("Password tidak cocok");
      setIsRegisterLoading(false);
      return false;
    }

    try {
      const result = await registerAction(data.fullName, data.email, data.password);

      if (result.success) {
        setCurrentView("login");
        return false;
      }

      setRegisterError(result.message || "Registrasi gagal");
      return false;
    } catch {
      setRegisterError("Terjadi kesalahan. Silakan coba lagi.");
      return false;
    } finally {
      setIsRegisterLoading(false);
    }
  };

  return (
    <main>
      {currentView === "login" && (
        <Loginril
          onNavigateToRegister={() => {
            setRegisterError("");
            setCurrentView("register");
          }}
          onSubmit={handleLogin}
          isLoading={isLoginLoading}
          errorMessage={loginError}
        />
      )}

      {currentView === "register" && (
        <Register
          onNavigateToLogin={() => {
            setLoginError("");
            setCurrentView("login");
          }}
          onSubmit={handleRegister}
          isLoading={isRegisterLoading}
          errorMessage={registerError}
        />
      )}

      {currentView === "todo" && <TodokartUtama />}
    </main>
  );
}
