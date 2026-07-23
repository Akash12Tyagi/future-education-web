"use client";

import { useActionState } from "react";
import { FormField, TextInput, TextArea, SubmitButton } from "@/components/admin/FormField";
import { MediaPicker, type MediaOption } from "@/components/admin/MediaPicker";

export interface CounsellorFormValues {
  slug: string;
  name: string;
  role: string;
  specialization: string;
  credentials: string;
  bio: string | null;
  experienceYears: number | null;
  email: string | null;
  phone: string | null;
  imageId: string | null;
  imageAlt: string | null;
  order: number;
  active: boolean;
}

type FormAction = (prev: { error?: string } | undefined, formData: FormData) => Promise<{ error?: string } | undefined>;

export function CounsellorForm({
  action,
  initial,
  mediaAssets,
}: {
  action: FormAction;
  initial?: CounsellorFormValues;
  mediaAssets: MediaOption[];
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex max-w-[640px] flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Name" name="name">
          <TextInput name="name" defaultValue={initial?.name} required />
        </FormField>
        <FormField label="Slug" name="slug">
          <TextInput name="slug" defaultValue={initial?.slug} required />
        </FormField>
        <FormField label="Role" name="role">
          <TextInput name="role" defaultValue={initial?.role} required />
        </FormField>
        <FormField label="Experience (years)" name="experienceYears">
          <TextInput name="experienceYears" type="number" defaultValue={initial?.experienceYears ?? ""} />
        </FormField>
        <FormField label="Email" name="email">
          <TextInput name="email" type="email" defaultValue={initial?.email ?? ""} />
        </FormField>
        <FormField label="Phone" name="phone">
          <TextInput name="phone" defaultValue={initial?.phone ?? ""} />
        </FormField>
        <FormField label="Display order" name="order">
          <TextInput name="order" type="number" defaultValue={initial?.order ?? 0} />
        </FormField>
      </div>

      <FormField label="Specialization" name="specialization">
        <TextArea name="specialization" rows={2} defaultValue={initial?.specialization} required />
      </FormField>
      <FormField label="Credentials" name="credentials">
        <TextArea name="credentials" rows={2} defaultValue={initial?.credentials} required />
      </FormField>
      <FormField label="Bio" name="bio">
        <TextArea name="bio" rows={3} defaultValue={initial?.bio ?? ""} />
      </FormField>

      <FormField label="Photo" name="imageId">
        <MediaPicker name="imageId" assets={mediaAssets} defaultValue={initial?.imageId} folder="counsellors" />
      </FormField>
      <FormField label="Photo alt text" name="imageAlt">
        <TextInput name="imageAlt" defaultValue={initial?.imageAlt ?? ""} />
      </FormField>

      <label className="flex items-center gap-2 text-[13.5px] font-semibold">
        <input type="checkbox" name="active" defaultChecked={initial?.active ?? true} />
        Active (visible on site)
      </label>

      {state?.error ? <p className="m-0 text-sm font-semibold text-accent-500">{state.error}</p> : null}

      <div>
        <SubmitButton pending={pending}>{initial ? "Save changes" : "Create counsellor"}</SubmitButton>
      </div>
    </form>
  );
}
