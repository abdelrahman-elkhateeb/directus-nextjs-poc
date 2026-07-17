"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { loginUser, registerUser } from "@/lib/directus/auth";

export interface AuthActionState {
  error: string
}

export async function loginAction(
  _previousState: { error: string },
  formData: FormData,
) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return {
      error: "Email and password are required",
    };
  }

  try {
    const response = await loginUser(email, password);

    const cookieStore = await cookies();

    cookieStore.set("access_token", response.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    cookieStore.set("refresh_token", response.data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    };
  }

  redirect("/");
}

export async function logoutAction() {
  const cookieStore = await cookies()

  cookieStore.delete("access_token")
  cookieStore.delete("refresh_token")

  redirect("/login")
}

export async function registerAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const firstName = formData.get("first_name")
  const lastName = formData.get("last_name")
  const email = formData.get("email")
  const password = formData.get("password")
  const confirmPassword = formData.get("confirm_password")

  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof confirmPassword !== "string"
  ) {
    return {
      error: "Please fill in all fields",
    }
  }

  const trimmedFirstName = firstName.trim()
  const trimmedLastName = lastName.trim()
  const trimmedEmail = email.trim().toLowerCase()

  if (
    !trimmedFirstName ||
    !trimmedLastName ||
    !trimmedEmail ||
    !password ||
    !confirmPassword
  ) {
    return {
      error: "Please fill in all fields",
    }
  }

  if (password.length < 8) {
    return {
      error: "Password must be at least 8 characters",
    }
  }

  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match",
    }
  }

  try {
    await registerUser({
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
      email: trimmedEmail,
      password,
    })
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again",
    }
  }

  redirect("/login")
}
