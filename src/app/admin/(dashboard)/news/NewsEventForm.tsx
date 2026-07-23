"use client";

import { useActionState } from "react";
import { FormField, TextInput, TextArea, Select, SubmitButton } from "@/components/admin/FormField";
import { MediaPicker, type MediaOption } from "@/components/admin/MediaPicker";

export interface NewsEventFormValues {
  slug: string;
  title: string;
  type: string;
  body: string;
  eventDate: string | null;
  imageId: string | null;
  featured: boolean;
  publishAt: string;
  active: boolean;
}

type FormAction = (prev: { error?: string } | undefined, formData: FormData) => Promise<{ error?: string } | undefined>;

function toDateInputValue(iso: string | null) {
  if (!iso) return "";
  return iso.slice(0, 10);
}

export function NewsEventForm({
  action,
  initial,
  mediaAssets,
}: {
  action: FormAction;
  initial?: NewsEventFormValues;
  mediaAssets: MediaOption[];
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex max-w-[560px] flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Title" name="title">
          <TextInput name="title" defaultValue={initial?.title} required />
        </FormField>
        <FormField label="Slug" name="slug">
          <TextInput name="slug" defaultValue={initial?.slug} required />
        </FormField>
        <FormField label="Type" name="type">
          <Select name="type" defaultValue={initial?.type ?? "NEWS"}>
            <option value="NEWS">News</option>
            <option value="EVENT">Event</option>
          </Select>
        </FormField>
        <FormField label="Event date (for events)" name="eventDate">
          <TextInput name="eventDate" type="date" defaultValue={toDateInputValue(initial?.eventDate ?? null)} />
        </FormField>
        <FormField label="Publish date" name="publishAt">
          <TextInput name="publishAt" type="date" defaultValue={toDateInputValue(initial?.publishAt ?? null)} />
        </FormField>
      </div>

      <FormField label="Body" name="body">
        <TextArea name="body" rows={5} defaultValue={initial?.body} required />
      </FormField>

      <FormField label="Image" name="imageId">
        <MediaPicker name="imageId" assets={mediaAssets} defaultValue={initial?.imageId} folder="news-events" />
      </FormField>

      <div className="flex gap-5">
        <label className="flex items-center gap-2 text-[13.5px] font-semibold">
          <input type="checkbox" name="featured" defaultChecked={initial?.featured ?? false} />
          Featured
        </label>
        <label className="flex items-center gap-2 text-[13.5px] font-semibold">
          <input type="checkbox" name="active" defaultChecked={initial?.active ?? true} />
          Active
        </label>
      </div>

      {state?.error ? <p className="m-0 text-sm font-semibold text-accent-500">{state.error}</p> : null}

      <div>
        <SubmitButton pending={pending}>{initial ? "Save changes" : "Create"}</SubmitButton>
      </div>
    </form>
  );
}
