"use client";

import { useEffect, useState } from "react";
import type { CourseOption, LeadPayload } from "@/lib/types";
import { leadWaHref } from "@/lib/whatsapp";

interface LeadFormProps {
  variant?: "micro" | "full";
  sourceTag: string;
  submitLabel?: string;
  expectedWindow?: string;
  prefillCourse?: string;
  whatsappNumber?: string;
  showClassField?: boolean;
  nameLabel?: string;
  namePlaceholder?: string;
  onSubmitLead: (payload: LeadPayload) => void;
  courseOptions: CourseOption[];
}

interface FormData {
  name: string;
  phone: string;
  courseInterest: string;
  city: string;
  level: string;
  message: string;
  classYear: string;
}

type Errors = Partial<Record<keyof FormData, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const fieldClass = (err?: string) =>
  `rounded-[10px] border-[1.5px] bg-white px-3.5 py-3 font-inherit text-base text-[#14171F] outline-none ${
    err ? "border-accent-500" : "border-[#D1D5DB]"
  }`;

export function LeadForm({
  variant = "micro",
  sourceTag,
  submitLabel = "Request a callback",
  expectedWindow = "24 hours",
  prefillCourse = "",
  whatsappNumber,
  showClassField = false,
  nameLabel = "Full name",
  namePlaceholder = "e.g. Anshu Kumar",
  onSubmitLead,
  courseOptions,
}: LeadFormProps) {
  const [data, setData] = useState<FormData>({
    name: "",
    phone: "",
    courseInterest: "",
    city: "",
    level: "",
    message: "",
    classYear: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    // Re-syncs whenever the caller passes a new prefillCourse (e.g. a different
    // course's "Enquire" panel reusing this form), not just on initial mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (prefillCourse) setData((d) => ({ ...d, courseInterest: prefillCourse }));
  }, [prefillCourse]);

  const full = variant === "full";

  const setField = (field: keyof FormData, value: string) => {
    let v = value;
    if (field === "phone") v = v.replace(/\D/g, "").slice(0, 10);
    setData((d) => ({ ...d, [field]: v }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!data.name || data.name.trim().length < 2) e.name = "Please enter your name (min 2 characters).";
    if (!/^[6-9]\d{9}$/.test(data.phone)) e.phone = "Enter a valid 10-digit Indian mobile number.";
    if (!data.courseInterest) e.courseInterest = "Please choose a course you're interested in.";
    if (full && !data.city) e.city = "Please enter your city.";
    if (full && !data.level) e.level = "Please select your current level.";
    if (showClassField && !data.classYear) e.classYear = "Please enter your class/status.";
    return e;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setStatus("submitting");
    setTimeout(() => {
      // Demo: 9999999999 simulates a rate-limited failure -> WhatsApp fallback.
      if (data.phone === "9999999999") {
        setStatus("error");
        return;
      }
      setStatus("success");
      onSubmitLead({ ...data, sourceTag });
    }, 900);
  };

  const found = courseOptions.find((o) => o.value === data.courseInterest);
  const wa = leadWaHref({ name: data.name, phone: data.phone, courseInterest: data.courseInterest }, whatsappNumber);

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-[14px] border border-success-500 bg-white p-7">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-success-500 text-lg font-bold text-white">✓</div>
        <div className="text-xl font-bold text-primary-900">Request received, {data.name || "there"}</div>
        <div className="max-w-[52ch] text-base leading-relaxed text-neutral-900">
          A counsellor will call you within <strong className="text-success-500">{expectedWindow}</strong> on the number you shared. You&apos;ll be guided on{" "}
          {found ? found.label : "your options"} — eligibility, colleges, fees and next steps.
        </div>
        <div className="text-sm text-neutral-500">
          Prefer to talk now?{" "}
          <a href={wa} target="_blank" rel="noreferrer" className="font-semibold text-accent-500 no-underline">
            Message us on WhatsApp →
          </a>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-start gap-2.5 rounded-[14px] border border-accent-500 bg-accent-100 p-6">
        <div className="text-[17px] font-bold text-accent-500">We couldn&apos;t send that just now</div>
        <div className="max-w-[52ch] text-[15px] leading-snug text-neutral-900">
          Our lines are busy — please don&apos;t lose your place. Reach a counsellor directly on WhatsApp and we&apos;ll pick up from there.
        </div>
        <div className="flex flex-wrap gap-2.5">
          <a href={wa} target="_blank" rel="noreferrer" className="rounded-[10px] bg-accent-500 px-5 py-3 text-[15px] font-semibold text-white no-underline">
            WhatsApp a counsellor
          </a>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="cursor-pointer rounded-[10px] border-[1.5px] border-primary-600 bg-transparent px-[18px] py-2.5 text-[15px] font-semibold text-primary-600"
          >
            Try the form again
          </button>
        </div>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-neutral-900">{nameLabel}</label>
        <input
          value={data.name}
          onChange={(e) => setField("name", e.target.value)}
          placeholder={namePlaceholder}
          className={fieldClass(errors.name)}
        />
        {errors.name && <span className="text-[13px] text-accent-500">{errors.name}</span>}
      </div>

      {showClassField ? (
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap gap-3.5">
            <div className="flex flex-1 flex-col gap-1.5" style={{ flexBasis: 140 }}>
              <label className="text-sm font-semibold text-neutral-900">Class</label>
              <input
                value={data.classYear}
                onChange={(e) => setField("classYear", e.target.value)}
                placeholder="12th / Passed"
                className={fieldClass(errors.classYear)}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1.5" style={{ flexBasis: 140 }}>
              <label className="text-sm font-semibold text-neutral-900">Phone</label>
              <div className={`flex items-stretch overflow-hidden rounded-[10px] border-[1.5px] bg-white ${errors.phone ? "border-accent-500" : "border-[#D1D5DB]"}`}>
                <span className="border-r border-[#E5E7EB] bg-neutral-100 px-3 py-3 text-[15px] text-neutral-500">+91</span>
                <input
                  value={data.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="10-digit mobile"
                  className="min-w-0 flex-1 border-none bg-transparent px-3.5 py-3 text-base outline-none"
                />
              </div>
            </div>
          </div>
          {errors.phone && <span className="text-[13px] text-accent-500">{errors.phone}</span>}
        </div>
      ) : (
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-neutral-900">Phone number</label>
          <div className={`flex items-stretch overflow-hidden rounded-[10px] border-[1.5px] bg-white ${errors.phone ? "border-accent-500" : "border-[#D1D5DB]"}`}>
            <span className="border-r border-[#E5E7EB] bg-neutral-100 px-3 py-3 text-[15px] text-neutral-500">+91</span>
            <input
              value={data.phone}
              onChange={(e) => setField("phone", e.target.value)}
              inputMode="numeric"
              maxLength={10}
              placeholder="10-digit mobile"
              className="flex-1 border-none bg-transparent px-3.5 py-3 text-base outline-none"
            />
          </div>
          {errors.phone && <span className="text-[13px] text-accent-500">{errors.phone}</span>}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-neutral-900">Course interest</label>
        <select
          value={data.courseInterest}
          onChange={(e) => setField("courseInterest", e.target.value)}
          className={fieldClass(errors.courseInterest)}
        >
          <option value="">Select a course…</option>
          {courseOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.courseInterest && <span className="text-[13px] text-accent-500">{errors.courseInterest}</span>}
      </div>

      {full && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-neutral-900">City</label>
            <input
              value={data.city}
              onChange={(e) => setField("city", e.target.value)}
              placeholder="e.g. Bokaro"
              className={fieldClass(errors.city)}
            />
            {errors.city && <span className="text-[13px] text-accent-500">{errors.city}</span>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-neutral-900">Current level</label>
            <select value={data.level} onChange={(e) => setField("level", e.target.value)} className={fieldClass(errors.level)}>
              <option value="">Select…</option>
              <option value="10th">Class 10th</option>
              <option value="12th">Class 12th</option>
              <option value="graduate">Graduate</option>
            </select>
            {errors.level && <span className="text-[13px] text-accent-500">{errors.level}</span>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-neutral-900">
              Message <span className="font-normal text-neutral-500">(optional)</span>
            </label>
            <textarea
              value={data.message}
              onChange={(e) => setField("message", e.target.value)}
              rows={3}
              placeholder="Tell us what you're looking for…"
              className="resize-y rounded-[10px] border-[1.5px] border-[#D1D5DB] px-3.5 py-3 font-inherit text-base outline-none"
            />
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className={`flex w-full items-center justify-center gap-2.5 rounded-[10px] border-none px-[22px] py-3.5 text-base font-bold text-white ${
          submitting ? "cursor-wait bg-[#8f1e1a]" : "cursor-pointer bg-accent-500"
        }`}
      >
        {submitting && (
          <span
            className="inline-block h-4 w-4 rounded-full border-2 border-white/50"
            style={{ borderTopColor: "#fff", animation: "fe-spin .7s linear infinite" }}
          />
        )}
        <span>{submitting ? "Sending…" : submitLabel}</span>
      </button>
      <p className="m-0 text-xs leading-snug text-neutral-500">
        By submitting you agree to be contacted about admissions. No spam, no pre-ticked consent — we only call about what you asked.
      </p>
    </form>
  );
}
