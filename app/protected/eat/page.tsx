import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

async function EatData() {
  const supabase = await createClient();
  const { data: Eat } = await supabase.from("Eat").select();

  return <pre>{JSON.stringify(Eat, null, 2)}</pre>;
}

export default function Eat() {
  return (
    <Suspense fallback={<div>Loading Eat...</div>}>
      <EatData />
    </Suspense>
  );
}