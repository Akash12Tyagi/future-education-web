"use client";

import { useActionState } from "react";
import { FormField, TextInput, Select, TextArea, SubmitButton } from "@/components/admin/FormField";
import { MediaPicker, type MediaOption } from "@/components/admin/MediaPicker";

export interface CourseFormValues {
  slug: string;
  name: string;
  streamId: string;
  type: string;
  duration: string;
  durMonths: number;
  eligibility: string;
  feeMin: number;
  feeMax: number;
  outcomes: string[];
  brochureId: string | null;
  order: number;
  active: boolean;
}

type FormAction = (prev: { error?: string } | undefined, formData: FormData) => Promise<{ error?: string } | undefined>;

export function CourseForm({
  action,
  initial,
  streams,
  mediaAssets,
}: {
  action: FormAction;
  initial?: CourseFormValues;
  streams: { id: string; label: string }[];
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
        <FormField label="Stream" name="streamId">
          <Select name="streamId" defaultValue={initial?.streamId}>
            {streams.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField label="Type" name="type">
          <Select name="type" defaultValue={initial?.type ?? "REGULAR"}>
            <option value="REGULAR">Regular</option>
            <option value="DISTANCE">Distance</option>
          </Select>
        </FormField>
        <FormField label="Duration (label)" name="duration">
          <TextInput name="duration" defaultValue={initial?.duration} required />
        </FormField>
        <FormField label="Duration (months)" name="durMonths">
          <TextInput name="durMonths" type="number" defaultValue={initial?.durMonths} required />
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

      <FormField label="Eligibility" name="eligibility">
        <TextArea name="eligibility" rows={2} defaultValue={initial?.eligibility} required />
      </FormField>

      <FormField label="Career outcomes (comma-separated)" name="outcomes">
        <TextInput name="outcomes" defaultValue={initial?.outcomes.join(", ")} />
      </FormField>

      <FormField label="Brochure (PDF)" name="brochureId">
        <MediaPicker name="brochureId" assets={mediaAssets} defaultValue={initial?.brochureId} folder="brochures" />
      </FormField>

      <label className="flex items-center gap-2 text-[13.5px] font-semibold">
        <input type="checkbox" name="active" defaultChecked={initial?.active ?? true} />
        Active (visible on site)
      </label>

      {state?.error ? <p className="m-0 text-sm font-semibold text-accent-500">{state.error}</p> : null}

      <div>
        <SubmitButton pending={pending}>{initial ? "Save changes" : "Create course"}</SubmitButton>
      </div>
    </form>
  );
}
