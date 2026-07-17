"use client"

import Link from "next/link"
import { useActionState } from "react"

import { registerAction } from "@/actions/auth-actions"
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

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, action, pending] = useActionState(
    registerAction,
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
            <h1 className="text-2xl font-bold">
              Create your account
            </h1>

            <FieldDescription>
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-foreground underline underline-offset-4"
              >
                Sign in
              </Link>
            </FieldDescription>
          </div>

          <Field className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="first_name">
                First name
              </FieldLabel>

              <Input
                id="first_name"
                name="first_name"
                type="text"
                placeholder="Abdelrahman"
                autoComplete="given-name"
                required
                disabled={pending}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="last_name">
                Last name
              </FieldLabel>

              <Input
                id="last_name"
                name="last_name"
                type="text"
                placeholder="Elkhateeb"
                autoComplete="family-name"
                required
                disabled={pending}
              />
            </Field>
          </Field>

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
            <FieldLabel htmlFor="password">
              Password
            </FieldLabel>

            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a strong password"
              autoComplete="new-password"
              minLength={8}
              required
              disabled={pending}
            />

            <FieldDescription>
              Password must be at least 8 characters.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="confirm_password">
              Confirm password
            </FieldLabel>

            <Input
              id="confirm_password"
              name="confirm_password"
              type="password"
              placeholder="Enter your password again"
              autoComplete="new-password"
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
              {pending ? "Creating account..." : "Create account"}
            </Button>
          </Field>
        </FieldGroup>
      </form>

      <FieldDescription className="px-6 text-center">
        By creating an account, you agree to our{" "}
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
