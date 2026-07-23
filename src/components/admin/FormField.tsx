export function FormField({
  label,
  name,
  children,
  error,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-[13.5px] font-bold text-[#374151]">
        {label}
      </label>
      {children}
      {error ? <p className="m-0 text-xs font-semibold text-accent-500">{error}</p> : null}
    </div>
  );
}

const inputClassName =
  "rounded-[10px] border-[1.5px] border-[#D1D5DB] px-3.5 py-2.5 text-[14.5px] outline-none focus:border-primary-600";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClassName} ${props.className ?? ""}`} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClassName} ${props.className ?? ""}`} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputClassName} ${props.className ?? ""}`} />;
}

export function SubmitButton({ children, pending }: { children: React.ReactNode; pending?: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="cursor-pointer rounded-lg border-none bg-primary-900 px-4 py-2.5 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
    >
      {children}
    </button>
  );
}

export function DeleteButton({ pending }: { pending?: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="cursor-pointer rounded-lg border-[1.5px] border-accent-500 bg-white px-3 py-1.5 text-[13px] font-bold text-accent-500 disabled:cursor-not-allowed disabled:opacity-60"
    >
      Delete
    </button>
  );
}
