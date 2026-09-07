"use server";

import { cookies } from "next/headers";
import { authService } from "@/lib/auth/auth.service";
import { getAuthenticatedUser } from "@/lib/auth/getUser";

export async function loginAction(
  email: string,
  password: string
) {
  const result = await authService.login(
    email,
    password
  );

  if (!result.success || !result.token) {
    return result;
  }

  const cookieStore = await cookies();

  cookieStore.set("token", result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return {
    success: true,
    message: "Login berhasil",
    user: result.user,
  };
}

export async function registerAction(username : string, email : string, password : string) {
    if (!username || !email || !password) {
        return({
            success : false,
            message : "silahkan isi semua form nya"
        })
    }

    return await authService.register(username, email, password)
}

export async function getUserLogin() {
    return await getAuthenticatedUser()
}