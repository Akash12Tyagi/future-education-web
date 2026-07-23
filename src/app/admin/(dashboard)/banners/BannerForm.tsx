"use client";

import { useActionState } from "react";
import { FormField, TextInput, SubmitButton } from "@/components/admin/FormField";
import { MediaPicker, type MediaOption } from "@/components/admin/MediaPicker";

export interface BannerFormValues {
  heading: string;
  subheading: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
  imageId: string;
  order: number;
  active: boolean;
  startsAt: string | null;
  endsAt: string | null;
}

type FormAction = (prev: { error?: string } | undefined, formData: FormData) => Promise<{ error?: string } | undefined>;

function toDateInputValue(iso: string | null) {
  if (!iso) return "";
  return iso.slice(0, 10);
}

export function BannerForm({
  action,
  initial,
  mediaAssets,
}: {
  action: FormAction;
  initial?: BannerFormValues;
  mediaAssets: MediaOption[];
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex max-w-[560px] flex-col gap-4">
      <FormField label="Heading" name="heading">
        <TextInput name="heading" defaultValue={initial?.heading} required />
      </FormField>
      <FormField label="Subheading" name="subheading">
        <TextInput name="subheading" defaultValue={initial?.subheading ?? ""} />
      </FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="CTA label" name="ctaLabel">
          <TextInput name="ctaLabel" defaultValue={initial?.ctaLabel ?? ""} placeholder="e.g. Find My Course" />
        </FormField>
        <FormField label="CTA link" name="ctaHref">
          <TextInput name="ctaHref" defaultValue={initial?.ctaHref ?? ""} placeholder="/find-your-course/matcher" />
        </FormField>
      </div>

      <FormField label="Image" name="imageId">
        <MediaPicker name="imageId" assets={mediaAssets} defaultValue={initial?.imageId} folder="banners" />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Display order" name="order">
          <TextInput name="order" type="number" defaultValue={initial?.order ?? 0} />
        </FormField>
        <FormField label="Starts (optional)" name="startsAt">
          <TextInput name="startsAt" type="date" defaultValue={toDateInputValue(initial?.startsAt ?? null)} />
        </FormField>
        <FormField label="Ends (optional)" name="endsAt">
          <TextInput name="endsAt" type="date" defaultValue={toDateInputValue(initial?.endsAt ?? null)} />
        </FormField>
      </div>

      <label className="flex items-center gap-2 text-[13.5px] font-semibold">
        <input type="checkbox" name="active" defaultChecked={initial?.active ?? true} />
        Active (visible on site)
      </label>

      {state?.error ? <p className="m-0 text-sm font-semibold text-accent-500">{state.error}</p> : null}

      <div>
        <SubmitButton pending={pending}>{initial ? "Save changes" : "Create banner"}</SubmitButton>
      </div>
    </form>
  );
}
