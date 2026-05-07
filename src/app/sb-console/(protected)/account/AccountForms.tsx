"use client";

import { useActionState } from "react";
import { Field, TextInput } from "@/components/admin/Field";
import { Button } from "@/components/admin/Button";
import { updateName, changePassword } from "./actions";

export function NameForm({ defaultName }: { defaultName: string }) {
  const [state, action] = useActionState(updateName, null);
  return (
    <form action={action} className="space-y-4">
      <Field label="Display name" required>
        <TextInput name="name" defaultValue={defaultName} required maxLength={100} />
      </Field>
      <div className="flex items-center justify-between">
        <Button type="submit" size="sm">Save name</Button>
        {state?.ok && (
          <span className="text-[12px] text-[var(--accent)] font-mono">
            ✓ Saved
          </span>
        )}
        {state?.error && (
          <span className="text-[12px] text-red-400 font-mono">{state.error}</span>
        )}
      </div>
    </form>
  );
}

export function PasswordForm() {
  const [state, action] = useActionState(changePassword, null);
  return (
    <form action={action} className="space-y-4">
      <Field label="Current password" required>
        <TextInput
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
        />
      </Field>
      <Field label="New password" required hint="At least 8 characters">
        <TextInput
          name="newPassword"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
        />
      </Field>
      <div className="flex items-center justify-between">
        <Button type="submit" size="sm">Change password</Button>
        {state?.ok && (
          <span className="text-[12px] text-[var(--accent)] font-mono">
            ✓ Password changed. Other sessions signed out.
          </span>
        )}
        {state?.error && (
          <span className="text-[12px] text-red-400 font-mono">{state.error}</span>
        )}
      </div>
    </form>
  );
}
