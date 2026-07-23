"use client";

import { useActionState } from "react";
import { FormField, TextInput, Select, TextArea, SubmitButton } from "@/components/admin/FormField";
import { MediaPicker, type MediaOption } from "@/components/admin/MediaPicker";

export interface CollegeFormValues {
  id?: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  type: string;
  accreditations: string[];
  feeMin: number;
  feeMax: number;
  isVerifiedPartner: boolean;
  hasVideo: boolean;
  websiteUrl: string | null;
  imageId: string | null;
  imageAlt: string | null;
  labsAndAchievements: string | null;
  order: number;
  active: boolean;
  courseIds: string[];
}

type FormAction = (prev: { error?: string } | undefined, formData: FormData) => Promise<{ error?: string } | undefined>;

export function CollegeForm({
  action,
  initial,
  allCourses,
  mediaAssets,
}: {
  action: FormAction;
  initial?: CollegeFormValues;
  allCourses: { id: string; name: string }[];
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
        <FormField label="City" name="city">
          <TextInput name="city" defaultValue={initial?.city} required />
        </FormField>
        <FormField label="State" name="state">
          <TextInput name="state" defaultValue={initial?.state} required />
        </FormField>
        <FormField label="Type" name="type">
          <Select name="type" defaultValue={initial?.type ?? "PRIVATE"}>
            <option value="GOVERNMENT">Government</option>
            <option value="PRIVATE">Private</option>
            <option value="DEEMED">Deemed</option>
          </Select>
        </FormField>
        <FormField label="Website" name="websiteUrl">
          <TextInput name="websiteUrl" defaultValue={initial?.websiteUrl ?? ""} />
        </FormField>
        <FormField label="Fee min (₹)" name="feeMin">
          <TextInput name="feeMin" type="number" defaultValue={initial?.feeMin} required />
        </FormField>
        <FormField label="Fee max (₹)" name="feeMax">
          <TextInput name="feeMax" type="number" defaultValue={initial?.feeMax} required />
        </FormField>
        <FormField label="Display order" name="order">
          <TextInput name="order" type="number" defaultValue={initial?.order ?? 0} />
        </FormField>
      </div>

      <FormField label="Accreditations (comma-separated)" name="accreditations">
        <TextInput name="accreditations" defaultValue={initial?.accreditations.join(", ")} />
      </FormField>

      <FormField label="Labs & achievements" name="labsAndAchievements">
        <TextArea name="labsAndAchievements" rows={3} defaultValue={initial?.labsAndAchievements ?? ""} />
      </FormField>

      <FormField label="Courses offered" name="courseIds">
        <Select name="courseIds" multiple size={6} defaultValue={initial?.courseIds}>
          {allCourses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField label="Image" name="imageId">
        <MediaPicker name="imageId" assets={mediaAssets} defaultValue={initial?.imageId} folder="colleges" />
      </FormField>
      <FormField label="Image alt text" name="imageAlt">
        <TextInput name="imageAlt" defaultValue={initial?.imageAlt ?? ""} />
      </FormField>

      <div className="flex gap-5">
        <label className="flex items-center gap-2 text-[13.5px] font-semibold">
          <input type="checkbox" name="isVerifiedPartner" defaultChecked={initial?.isVerifiedPartner ?? true} />
          Verified partner
        </label>
        <label className="flex items-center gap-2 text-[13.5px] font-semibold">
          <input type="checkbox" name="hasVideo" defaultChecked={initial?.hasVideo ?? false} />
          Has video
        </label>
        <label className="flex items-center gap-2 text-[13.5px] font-semibold">
          <input type="checkbox" name="active" defaultChecked={initial?.active ?? true} />
          Active (visible on site)
        </label>
      </div>

      {state?.error ? <p className="m-0 text-sm font-semibold text-accent-500">{state.error}</p> : null}

      <div>
        <SubmitButton pending={pending}>{initial ? "Save changes" : "Create college"}</SubmitButton>
      </div>
    </form>
  );
}
