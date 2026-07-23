"use client";

import { useActionState } from "react";
import { createUser } from "../actions";
import { FormField, TextInput, Select, SubmitButton } from "@/components/admin/FormField";

export function UserForm() {
  const [state, formAction, pending] = useActionState(createUser, undefined);

  return (
    <form action={formAction} className="flex max-w-[480px] flex-col gap-4">
      <FormField label="Name" name="name">
        <TextInput name="name" required />
      </FormField>
      <FormField label="Email" name="email">
        <TextInput name="email" type="email" required />
      </FormField>
      <FormField label="Password" name="password">
        <TextInput name="password" type="password" minLength={8} required />
      </FormField>
      <FormField label="Role" name="role">
        <Select name="role" defaultValue="EDITOR">
          <option value="EDITOR">Editor</option>
          <option value="ADMIN">Admin</option>
          <option value="SUPER_ADMIN">Super Admin</option>
        </Select>
      </FormField>

      {state?.error ? <p className="m-0 text-sm font-semibold text-accent-500">{state.error}</p> : null}

      <div>
        <SubmitButton pending={pending}>Create user</SubmitButton>
      </div>
    </form>
  );
}
