"use client"

import Link from "next/link"
import { useActionState } from "react"

import { loginAction } from "@/actions/auth-actions"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const initialState = {
  error: "",
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, action, pending] = useActionState(
    loginAction,
    initialState,
  )

  return (
    <div
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <form action={action}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <span className="sr-only">Foodie</span>
            </Link>

            <h1 className="text-2xl font-bold">
              Welcome back
            </h1>

            <FieldDescription>
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-foreground underline underline-offset-4"
              >
                Sign up
              </Link>
            </FieldDescription>
          </div>

          <Field>
            <FieldLabel htmlFor="email">
              Email
            </FieldLabel>

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              autoComplete="email"
              required
              disabled={pending}
            />
          </Field>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="password">
                Password
              </FieldLabel>

              <Link
                href="/forgot-password"
                className="text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              minLength={8}
              required
              disabled={pending}
            />
          </Field>

          {state?.error && (
            <p
              role="alert"
              className="text-sm font-medium text-destructive"
            >
              {state.error}
            </p>
          )}

          <Field>
            <Button
              type="submit"
              className="w-full"
              disabled={pending}
            >
              {pending ? "Logging in..." : "Login"}
            </Button>
          </Field>

        </FieldGroup>
      </form>

      <FieldDescription className="px-6 text-center">
        By continuing, you agree to our{" "}
        <Link
          href="/terms"
          className="underline underline-offset-4"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-4"
        >
          Privacy Policy
        </Link>
        .
      </FieldDescription>
    </div>
  )
}