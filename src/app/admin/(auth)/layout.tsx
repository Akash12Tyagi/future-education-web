export default function AdminAuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-[22px]"
      style={{ background: "var(--color-neutral-100)" }}
    >
      {children}
    </div>
  );
}
