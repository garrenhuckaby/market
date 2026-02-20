import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

async function NotesData() {
  const supabase = await createClient();
  const { data: notes } = await supabase.from("notes").select();

  return <pre>{JSON.stringify(notes, null, 2)}</pre>;
}

export default function notes() {
  return (
    <Suspense fallback={<div>Loading notes...</div>}>
      <NotesData />
    </Suspense>
  );
}