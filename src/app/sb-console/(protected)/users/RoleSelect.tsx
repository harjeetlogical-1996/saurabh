"use client";

import { useRef } from "react";
import { setUserRole } from "./actions";

export function RoleSelect({
  userId,
  defaultValue,
  disabled,
}: {
  userId: string;
  defaultValue: string;
  disabled?: boolean;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form ref={formRef} action={setUserRole}>
      <input type="hidden" name="id" value={userId} />
      <select
        name="role"
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={() => formRef.current?.requestSubmit()}
        className="h-8 rounded-md bg-[var(--bg)] border border-[var(--line)] px-2 text-[12px] font-mono text-white outline-none focus:border-[var(--accent)] disabled:opacity-50"
      >
        <option value="user">user</option>
        <option value="admin">admin</option>
      </select>
    </form>
  );
}
