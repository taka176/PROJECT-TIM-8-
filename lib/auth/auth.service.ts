import { db } from "@/src/config/db";
import { userTable } from "@/src/config/schema";
import { and, eq } from "drizzle-orm";
import {
  loginValidation,
  registerValidation,
} from "./valiadtion/auth.validation";
import { createToken } from "@/lib/auth/jwt";
import bcrypt from "bcrypt";

class AuthService {
  login = async (emailUser: string, passwordUser: string) => {
    const validation = loginValidation.parse({
      email: emailUser,
      password: passwordUser,
    });
    const { email, password } = validation;
    const result = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    const user = result[0];

    if (!user) {
      return {
        success: false,
        message: "Email atau password salah",
      };
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return {
        success: false,
        message: "Email atau password salah",
      };
    }

    const token = await createToken(user.id);

    return {
      success: true,
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  };

  register = async (user: string, emailUser: string, passwordUser: string) => {
    try {
      const validation = registerValidation.parse({
        username: user,
        email: emailUser,
        password: passwordUser,
      });

      const { username, email, password } = validation;
      const isExist = await db
        .select()
        .from(userTable)
        .where(eq(userTable.email, emailUser));

      if (isExist.length > 0) {
        return {
          statusCode: 409,
          success: false,
          message: "email sudah digunakan",
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await db.insert(userTable).values({
        username: username,
        email: email,
        password: hashedPassword,
      });

      return {
        statusCode: 201,
        success: true,
        message: "akun berhasil dibuat",
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        message: `Internal Server Error : ${error}`,
      };
    }
  };
}

export const authService = new AuthService
