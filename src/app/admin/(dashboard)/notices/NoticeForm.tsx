"use client";

import { useActionState } from "react";
import { FormField, TextInput, TextArea, Select, SubmitButton } from "@/components/admin/FormField";
import { MediaPicker, type MediaOption } from "@/components/admin/MediaPicker";
import { useActionToast } from "@/components/admin/Toaster";
import { submitKeepingValues } from "@/components/admin/submit-keeping-values";

export interface NoticeFormValues {
  title: string;
  body: string | null;
  type: string;
  linkHref: string | null;
  attachmentId: string | null;
  pinned: boolean;
  active: boolean;
  publishAt: string | null;
  expiresAt: string | null;
}

type FormAction = (prev: { error?: string } | undefined, formData: FormData) => Promise<{ error?: string } | undefined>;

function toDateInputValue(iso: string | null) {
  if (!iso) return "";
  return iso.slice(0, 10);
}

export function NoticeForm({
  action,
  initial,
  mediaAssets,
}: {
  action: FormAction;
  initial?: NoticeFormValues;
  mediaAssets: MediaOption[];
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  useActionToast(state);

  return (
    <form onSubmit={submitKeepingValues(formAction)} className="flex max-w-[560px] flex-col gap-4">
      <FormField label="Title" name="title">
        <TextInput name="title" defaultValue={initial?.title} required />
      </FormField>
      <FormField label="Body" name="body">
        <TextArea name="body" rows={3} defaultValue={initial?.body ?? ""} />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Type" name="type">
          <Select name="type" defaultValue={initial?.type ?? "TICKER"}>
            <option value="POPUP">Popup</option>
            <option value="TICKER">Scrolling ticker</option>
            <option value="BANNER">Announcement banner</option>
          </Select>
        </FormField>
        <FormField label="Link (optional)" name="linkHref">
          <TextInput name="linkHref" defaultValue={initial?.linkHref ?? ""} placeholder="/admission-consultancy" />
        </FormField>
        <FormField label="Publish date" name="publishAt">
          <TextInput name="publishAt" type="date" defaultValue={toDateInputValue(initial?.publishAt ?? null)} />
        </FormField>
        <FormField label="Expiry date (optional)" name="expiresAt">
          <TextInput name="expiresAt" type="date" defaultValue={toDateInputValue(initial?.expiresAt ?? null)} />
        </FormField>
      </div>

      <FormField label="Attachment — PDF or JPG/PNG image (optional)" name="attachmentId">
        <MediaPicker
          name="attachmentId"
          assets={mediaAssets}
          defaultValue={initial?.attachmentId}
          folder="notices"
          accept="application/pdf,image/jpeg,image/png,image/webp"
        />
      </FormField>
      <p className="-mt-2 m-0 text-[12.5px] text-neutral-500">
        Choose a file and press <strong>Upload</strong>. Scrolling-ticker notices appear at the very top of every page;
        visitors click the notice to open the attached PDF or image.
      </p>

      <div className="flex gap-5">
        <label className="flex items-center gap-2 text-[13.5px] font-semibold">
          <input type="checkbox" name="pinned" defaultChecked={initial?.pinned ?? false} />
          Pin (always shows first)
        </label>
        <label className="flex items-center gap-2 text-[13.5px] font-semibold">
          <input type="checkbox" name="active" defaultChecked={initial?.active ?? true} />
          Active
        </label>
      </div>

      {state?.error ? <p className="m-0 text-sm font-semibold text-accent-500">{state.error}</p> : null}

      <div>
        <SubmitButton pending={pending}>{initial ? "Save changes" : "Create notice"}</SubmitButton>
      </div>
    </form>
  );
}
