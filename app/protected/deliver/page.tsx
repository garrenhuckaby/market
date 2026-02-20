import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

async function DeliverData() {
  const supabase = await createClient();
  const { data: Deliver } = await supabase.from("Deliver").select();

  return <pre>{JSON.stringify(Deliver, null, 2)}</pre>;
}

export default function notes() {
  return (
    <Suspense fallback={<div>Loading Deliver...</div>}>
      <DeliverData />
    </Suspense>
  );
}