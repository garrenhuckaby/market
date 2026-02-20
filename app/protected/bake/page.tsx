import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

async function BakeData() {
  const supabase = await createClient();
  const { data: Bake } = await supabase.from("Bake").select();

  return <pre>{JSON.stringify(Bake, null, 2)}</pre>;
}

export default function notes() {
  return (
    <Suspense fallback={<div>Loading Bake...</div>}>
      <BakeData />
    </Suspense>
  );
}