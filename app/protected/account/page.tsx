import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

async function AccountData() {
  const supabase = await createClient();
  const { data: Account } = await supabase.from("Account").select();

  return <pre>{JSON.stringify(Account, null, 2)}</pre>;
}

export default function notes() {
  return (
    <Suspense fallback={<div>Loading Account...</div>}>
      <AccountData />
    </Suspense>
  );
}