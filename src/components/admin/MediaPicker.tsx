"use client";

import { useActionState, useRef, useState } from "react";
import { uploadMediaAsset, type UploadMediaState } from "@/lib/media-actions";
import { Select } from "@/components/admin/FormField";

export interface MediaOption {
  id: string;
  url: string;
  filename: string;
}

export function MediaPicker({
  name,
  assets,
  defaultValue,
  folder = "uploads",
}: {
  name: string;
  assets: MediaOption[];
  defaultValue?: string | null;
  folder?: string;
}) {
  const [options, setOptions] = useState(assets);
  const [selectedId, setSelectedId] = useState(defaultValue ?? "");
  const [state, formAction, pending] = useActionState<UploadMediaState, FormData>(uploadMediaAsset, {});
  const [lastHandledAssetId, setLastHandledAssetId] = useState<string | undefined>(undefined);

  // Newly uploaded asset from the action result — merge it into the options
  // list during render (React's sanctioned "adjust state from a changed
  // value" pattern), rather than in an effect.
  if (state.asset && state.asset.id !== lastHandledAssetId) {
    const newAsset = state.asset;
    setLastHandledAssetId(newAsset.id);
    setOptions((prev) => (prev.some((o) => o.id === newAsset.id) ? prev : [...prev, newAsset]));
    setSelectedId(newAsset.id);
  }

  const selected = options.find((o) => o.id === selectedId);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-2.5">
      <Select
        name={name}
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
      >
        <option value="">— None —</option>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.filename}
          </option>
        ))}
      </Select>

      {selected ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={selected.url} alt="" className="h-24 w-24 rounded-lg border border-[#E5E7EB] object-cover" />
      ) : null}

      {/* Not a nested <form> — this control lives inside the entity's own
          <form>, and HTML forbids nested forms. The upload action is
          dispatched directly via the useActionState action function. */}
      <div className="flex items-center gap-2.5 rounded-lg border border-dashed border-[#D1D5DB] p-2.5">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,application/pdf,video/*"
          className="text-[13px]"
        />
        <button
          type="button"
          disabled={pending}
          onClick={() => {
            const file = fileInputRef.current?.files?.[0];
            if (!file) return;
            const formData = new FormData();
            formData.set("file", file);
            formData.set("folder", folder);
            formAction(formData);
          }}
          className="cursor-pointer rounded-md border-[1.5px] border-[#D1D5DB] bg-white px-2.5 py-1.5 text-[13px] font-bold text-neutral-500 disabled:opacity-60"
        >
          {pending ? "Uploading…" : "Upload"}
        </button>
      </div>
      {state.error ? <p className="m-0 text-xs font-semibold text-accent-500">{state.error}</p> : null}
    </div>
  );
}
