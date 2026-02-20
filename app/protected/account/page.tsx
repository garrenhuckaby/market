import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

async function AccountList() {
  const supabase = await createClient();
  const { data: accounts } = await supabase.from("Account").select();

  return (
    <div className="space-y-4">
      {accounts?.map((acc) => (
        <div key={acc.id} className="flex items-center justify-between p-4 border rounded-lg bg-card">
          <div className="flex items-center gap-4">
            <img src={acc.avatar_url} alt="" className="w-12 h-12 rounded-full bg-muted" />
            <div>
              <p className="font-bold text-lg">{acc.full_name}</p>
              <p className="text-sm text-muted-foreground">{acc.email}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
              {acc.role}
            </span>
            <span className="text-[10px] uppercase text-muted-foreground">Status: {acc.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AccountPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Team Accounts</h1>
      <Suspense fallback={<div>Loading accounts...</div>}><AccountList /></Suspense>
    </div>
  );
}