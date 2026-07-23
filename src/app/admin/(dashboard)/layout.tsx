import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { adminNavGroups } from "@/lib/admin-nav";
import { signOutAction } from "./sign-out-action";

export default async function AdminDashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen" style={{ background: "var(--color-neutral-100)" }}>
      <aside className="hidden w-[240px] shrink-0 border-r border-[#E5E7EB] bg-white px-4 py-6 md:block">
        <div className="mb-6 px-2 text-lg font-extrabold text-primary-900">Admin</div>
        <nav className="flex flex-col gap-5">
          {adminNavGroups.map((group) => (
            <div key={group.heading}>
              <div className="mb-1.5 px-2 text-[11px] font-bold tracking-wide text-neutral-500 uppercase">
                {group.heading}
              </div>
              <div className="flex flex-col gap-0.5">
                {group.items
                  .filter((item) => !item.minRole || session.user.role === item.minRole || session.user.role === "SUPER_ADMIN")
                  .map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="rounded-lg px-2.5 py-2 text-[13.5px] font-semibold text-neutral-900 hover:bg-primary-100"
                    >
                      {item.label}
                    </a>
                  ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-[#E5E7EB] bg-white px-6 py-3.5">
          <div className="text-sm font-semibold text-neutral-500">Future Education — Admin Panel</div>
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-semibold text-neutral-900">
              {session.user.name} <span className="text-neutral-500">· {session.user.role}</span>
            </span>
            <form action={signOutAction}>
              <button
                type="submit"
                className="cursor-pointer rounded-lg border-[1.5px] border-[#D1D5DB] bg-white px-3 py-1.5 text-[13px] font-bold text-neutral-500"
              >
                Sign out
              </button>
            </form>
          </div>
        </header>
        <main className="flex-1 px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
