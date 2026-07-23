"use client";

import { useActionState } from "react";
import { FormField, TextInput, SubmitButton } from "@/components/admin/FormField";

export interface RecruiterFormValues {
  name: string;
  logoUrl: string;
  order: number;
  active: boolean;
}

type FormAction = (prev: { error?: string } | undefined, formData: FormData) => Promise<{ error?: string } | undefined>;

export function RecruiterForm({ action, initial }: { action: FormAction; initial?: RecruiterFormValues }) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex max-w-[480px] flex-col gap-4">
      <FormField label="Company name" name="name">
        <TextInput name="name" defaultValue={initial?.name} required />
      </FormField>
      <FormField label="Logo URL" name="logoUrl">
        <TextInput name="logoUrl" defaultValue={initial?.logoUrl} placeholder="https://…" required />
      </FormField>
      <FormField label="Display order" name="order">
        <TextInput name="order" type="number" defaultValue={initial?.order ?? 0} />
      </FormField>

      <label className="flex items-center gap-2 text-[13.5px] font-semibold">
        <input type="checkbox" name="active" defaultChecked={initial?.active ?? true} />
        Active
      </label>

      {state?.error ? <p className="m-0 text-sm font-semibold text-accent-500">{state.error}</p> : null}

      <div>
        <SubmitButton pending={pending}>{initial ? "Save changes" : "Create recruiter"}</SubmitButton>
      </div>
    </form>
  );
}
