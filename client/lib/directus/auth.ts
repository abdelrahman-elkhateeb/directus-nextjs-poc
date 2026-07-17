import axios from "axios";

const directusUrl = process.env.DIRECTUS_URL;

if (!directusUrl) {
  throw new Error("DIRECTUS_URL is not defined");
}


const directusAuthApi = axios.create({
  baseURL: directusUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface LoginResponse {
  data: {
    access_token: string;
    refresh_token: string;
    expires: number;
  };
}

export async function loginUser(email: string, password: string) {
  try {
    const response = await directusAuthApi.post<LoginResponse>(
      "/auth/login",
      {
        email,
        password,
        mode: "json",
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.errors?.[0]?.message ??
        "Invalid email or password";

      throw new Error(message);
    }

    throw new Error("Login failed");
  }
}

export async function registerUser(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  try {
    await directusAuthApi.post("/users/register", {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.errors?.[0]?.message ??
        "Registration failed";

      throw new Error(message);
    }

    throw new Error("Registration failed");
  }
}