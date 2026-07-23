"use client";

import { useActionState } from "react";
import { FormField, TextInput, TextArea, SubmitButton } from "@/components/admin/FormField";

export interface FaqFormValues {
  category: string;
  question: string;
  answer: string;
  order: number;
  active: boolean;
}

type FormAction = (prev: { error?: string } | undefined, formData: FormData) => Promise<{ error?: string } | undefined>;

export function FaqForm({ action, initial }: { action: FormAction; initial?: FaqFormValues }) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex max-w-[560px] flex-col gap-4">
      <FormField label="Question" name="question">
        <TextInput name="question" defaultValue={initial?.question} required />
      </FormField>
      <FormField label="Answer" name="answer">
        <TextArea name="answer" rows={4} defaultValue={initial?.answer} required />
      </FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Category" name="category">
          <TextInput name="category" defaultValue={initial?.category ?? "admissions"} />
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
        <SubmitButton pending={pending}>{initial ? "Save changes" : "Create FAQ"}</SubmitButton>
      </div>
    </form>
  );
}
