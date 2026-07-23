export function AdminCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[14px] border border-[#E5E7EB] bg-white p-5.5 ${className}`}>{children}</div>;
}
