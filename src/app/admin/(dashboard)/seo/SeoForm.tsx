"use client";

import { useActionState } from "react";
import { FormField, TextInput, TextArea, SubmitButton } from "@/components/admin/FormField";

export interface SeoFormValues {
  path: string;
  title: string | null;
  description: string | null;
  ogImageUrl: string | null;
}

type FormAction = (prev: { error?: string } | undefined, formData: FormData) => Promise<{ error?: string } | undefined>;

export function SeoForm({ action, initial, lockPath }: { action: FormAction; initial?: SeoFormValues; lockPath?: boolean }) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex max-w-[560px] flex-col gap-4">
      <FormField label="Path (e.g. /colleges/sviet)" name="path">
        <TextInput name="path" defaultValue={initial?.path} placeholder="/some/path" required readOnly={lockPath} />
      </FormField>
      <FormField label="Title override" name="title">
        <TextInput name="title" defaultValue={initial?.title ?? ""} />
      </FormField>
      <FormField label="Description override" name="description">
        <TextArea name="description" rows={3} defaultValue={initial?.description ?? ""} />
      </FormField>
      <FormField label="OG image URL" name="ogImageUrl">
        <TextInput name="ogImageUrl" defaultValue={initial?.ogImageUrl ?? ""} />
      </FormField>

      {state?.error ? <p className="m-0 text-sm font-semibold text-accent-500">{state.error}</p> : null}

      <div>
        <SubmitButton pending={pending}>{initial ? "Save changes" : "Create override"}</SubmitButton>
      </div>
    </form>
  );
}
