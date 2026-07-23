"use client";

import { useActionState } from "react";
import { FormField, TextInput, TextArea, Select, SubmitButton } from "@/components/admin/FormField";

export interface ScholarshipFormValues {
  name: string;
  desc: string;
  income: string;
  streamId: string | null;
  order: number;
  active: boolean;
}

type FormAction = (prev: { error?: string } | undefined, formData: FormData) => Promise<{ error?: string } | undefined>;

export function ScholarshipForm({
  action,
  initial,
  streams,
}: {
  action: FormAction;
  initial?: ScholarshipFormValues;
  streams: { id: string; label: string }[];
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex max-w-[560px] flex-col gap-4">
      <FormField label="Scheme name" name="name">
        <TextInput name="name" defaultValue={initial?.name} required />
      </FormField>
      <FormField label="Description" name="desc">
        <TextArea name="desc" rows={3} defaultValue={initial?.desc} required />
      </FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Income bracket" name="income">
          <Select name="income" defaultValue={initial?.income ?? "BELOW_2_5L"}>
            <option value="BELOW_2_5L">Below ₹2.5 lakh</option>
            <option value="BETWEEN_2_5L_5L">₹2.5–5 lakh</option>
            <option value="ABOVE_5L">Above ₹5 lakh</option>
          </Select>
        </FormField>
        <FormField label="Stream (optional — leave blank for all)" name="streamId">
          <Select name="streamId" defaultValue={initial?.streamId ?? ""}>
            <option value="">All streams</option>
            {streams.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField label="Display order" name="order">
          <TextInput name="order" type="number" defaultValue={initial?.order ?? 0} />
        </FormField>
      </div>

      <label className="flex items-center gap-2 text-[13.5px] font-semibold">
        <input type="checkbox" name="active" defaultChecked={initial?.active ?? true} />
        Active
      </label>

      {state?.error ? <p className="m-0 text-sm font-semibold text-accent-500">{state.error}</p> : null}

      <div>
        <SubmitButton pending={pending}>{initial ? "Save changes" : "Create scholarship"}</SubmitButton>
      </div>
    </form>
  );
}
