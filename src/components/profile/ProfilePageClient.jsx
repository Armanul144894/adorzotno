"use client";

export default function ProfilePageClient({ user }) {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          My Profile
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-800">{user?.name}</h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Email
            </p>
            <p className="mt-2 text-base font-medium text-slate-800">
              {user?.email || "-"}
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Phone
            </p>
            <p className="mt-2 text-base font-medium text-slate-800">
              {user?.phone || "-"}
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Role
            </p>
            <p className="mt-2 text-base font-medium capitalize text-slate-800">
              {user?.role || "-"}
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Status
            </p>
            <p className="mt-2 text-base font-medium capitalize text-slate-800">
              {user?.status || "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
