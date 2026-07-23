"use client";

import { useActionState } from "react";
import { FormField, TextInput, Select, SubmitButton } from "@/components/admin/FormField";
import { MediaPicker, type MediaOption } from "@/components/admin/MediaPicker";

export interface DownloadFormValues {
  title: string;
  category: string;
  fileId: string;
  order: number;
  active: boolean;
}

type FormAction = (prev: { error?: string } | undefined, formData: FormData) => Promise<{ error?: string } | undefined>;

export function DownloadForm({
  action,
  initial,
  mediaAssets,
}: {
  action: FormAction;
  initial?: DownloadFormValues;
  mediaAssets: MediaOption[];
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex max-w-[480px] flex-col gap-4">
      <FormField label="Title" name="title">
        <TextInput name="title" defaultValue={initial?.title} required />
      </FormField>
      <FormField label="Category" name="category">
        <Select name="category" defaultValue={initial?.category ?? "PROSPECTUS"}>
          <option value="PROSPECTUS">Prospectus</option>
          <option value="ACADEMIC_CALENDAR">Academic Calendar</option>
          <option value="FORM">Form</option>
          <option value="OTHER">Other</option>
        </Select>
      </FormField>
      <FormField label="File (PDF)" name="fileId">
        <MediaPicker name="fileId" assets={mediaAssets} defaultValue={initial?.fileId} folder="downloads" />
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
        <SubmitButton pending={pending}>{initial ? "Save changes" : "Create download"}</SubmitButton>
      </div>
    </form>
  );
}
