"use client";

import { useState, type FormEvent } from "react";
import { Button } from "../ui/button";
import { TextField } from "../ui/text-field";

export type LoginFormValues = {
  email: string;
  password: string;
};

export type LoginFormProps = {
  submitLabel?: string;
  onSubmit?: (values: LoginFormValues) => void | Promise<void>;
};

export function LoginForm({
  submitLabel = "Sign in",
  onSubmit,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage(null);
    try {
      await onSubmit?.({ email: email.trim(), password });
      if (!onSubmit) {
        setMessage("Signed in (demo).");
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
      <TextField
        label="Email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@club.com"
      />
      <TextField
        label="Password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="••••••••"
      />
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending || email.trim().length === 0}>
          {pending ? "Signing in…" : submitLabel}
        </Button>
        {message ? (
          <p className="m-0 text-sm text-primary" role="status">
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
