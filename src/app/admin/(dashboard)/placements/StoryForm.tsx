"use client";

import { useActionState } from "react";
import { FormField, TextInput, Select, TextArea, SubmitButton } from "@/components/admin/FormField";
import { MediaPicker, type MediaOption } from "@/components/admin/MediaPicker";

export interface StoryFormValues {
  slug: string;
  name: string;
  courseId: string | null;
  collegeId: string | null;
  streamId: string | null;
  quote: string;
  year: number;
  verified: boolean;
  videoUrl: string | null;
  packageLpa: number | null;
  imageId: string | null;
  order: number;
  active: boolean;
}

type FormAction = (prev: { error?: string } | undefined, formData: FormData) => Promise<{ error?: string } | undefined>;

export function StoryForm({
  action,
  initial,
  courses,
  colleges,
  streams,
  mediaAssets,
}: {
  action: FormAction;
  initial?: StoryFormValues;
  courses: { id: string; name: string }[];
  colleges: { id: string; name: string }[];
  streams: { id: string; label: string }[];
  mediaAssets: MediaOption[];
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex max-w-[640px] flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Student name" name="name">
          <TextInput name="name" defaultValue={initial?.name} required />
        </FormField>
        <FormField label="Slug" name="slug">
          <TextInput name="slug" defaultValue={initial?.slug} required />
        </FormField>
        <FormField label="Course" name="courseId">
          <Select name="courseId" defaultValue={initial?.courseId ?? ""}>
            <option value="">— None —</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField label="College" name="collegeId">
          <Select name="collegeId" defaultValue={initial?.collegeId ?? ""}>
            <option value="">— None —</option>
            {colleges.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField label="Stream" name="streamId">
          <Select name="streamId" defaultValue={initial?.streamId ?? ""}>
            <option value="">— None —</option>
            {streams.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField label="Year" name="year">
          <TextInput name="year" type="number" defaultValue={initial?.year} required />
        </FormField>
        <FormField label="Package (LPA)" name="packageLpa">
          <TextInput name="packageLpa" type="number" step="0.1" defaultValue={initial?.packageLpa ?? ""} />
        </FormField>
        <FormField label="Video URL" name="videoUrl">
          <TextInput name="videoUrl" defaultValue={initial?.videoUrl ?? ""} />
        </FormField>
        <FormField label="Display order" name="order">
          <TextInput name="order" type="number" defaultValue={initial?.order ?? 0} />
        </FormField>
      </div>

      <FormField label="Quote" name="quote">
        <TextArea name="quote" rows={3} defaultValue={initial?.quote} required />
      </FormField>

      <FormField label="Photo" name="imageId">
        <MediaPicker name="imageId" assets={mediaAssets} defaultValue={initial?.imageId} folder="stories" />
      </FormField>

      <div className="flex gap-5">
        <label className="flex items-center gap-2 text-[13.5px] font-semibold">
          <input type="checkbox" name="verified" defaultChecked={initial?.verified ?? true} />
          Verified
        </label>
        <label className="flex items-center gap-2 text-[13.5px] font-semibold">
          <input type="checkbox" name="active" defaultChecked={initial?.active ?? true} />
          Active (visible on site)
        </label>
      </div>

      {state?.error ? <p className="m-0 text-sm font-semibold text-accent-500">{state.error}</p> : null}

      <div>
        <SubmitButton pending={pending}>{initial ? "Save changes" : "Create story"}</SubmitButton>
      </div>
    </form>
  );
}
