"use client";

import { useActionState } from "react";
import { FormField, TextInput, Select, SubmitButton } from "@/components/admin/FormField";

export interface AlbumFormValues {
  title: string;
  slug: string;
  category: string;
  active: boolean;
}

type FormAction = (prev: { error?: string } | undefined, formData: FormData) => Promise<{ error?: string } | undefined>;

export function AlbumForm({ action, initial }: { action: FormAction; initial?: AlbumFormValues }) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex max-w-[480px] flex-col gap-4">
      <FormField label="Title" name="title">
        <TextInput name="title" defaultValue={initial?.title} required />
      </FormField>
      <FormField label="Slug" name="slug">
        <TextInput name="slug" defaultValue={initial?.slug} required />
      </FormField>
      <FormField label="Category" name="category">
        <Select name="category" defaultValue={initial?.category ?? "EVENTS"}>
          <option value="CAMPUS">Campus</option>
          <option value="EVENTS">Events</option>
          <option value="LABS">Labs</option>
          <option value="SPORTS">Sports</option>
          <option value="OTHER">Other</option>
        </Select>
      </FormField>
      <label className="flex items-center gap-2 text-[13.5px] font-semibold">
        <input type="checkbox" name="active" defaultChecked={initial?.active ?? true} />
        Active (visible on site)
      </label>

      {state?.error ? <p className="m-0 text-sm font-semibold text-accent-500">{state.error}</p> : null}

      <div>
        <SubmitButton pending={pending}>{initial ? "Save changes" : "Create album"}</SubmitButton>
      </div>
    </form>
  );
}
