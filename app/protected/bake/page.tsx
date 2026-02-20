import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function MyItems() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch only items where the baker_id matches the logged-in user
  const { data: myItems } = await supabase
    .from("Eat")
    .select("*")
    .eq("baker_id", user?.id);

  return (
    <div className="grid gap-3">
      <h2 className="font-bold text-lg">Your Current Listings</h2>
      {myItems?.length === 0 && <p className="text-sm text-muted-foreground">You haven't posted anything yet.</p>}
      {myItems?.map((item) => (
        <div key={item.id} className="p-3 border rounded bg-muted/30 flex justify-between">
          <span>{item.name}</span>
          <span className="font-mono text-green-600">${item.price}</span>
        </div>
      ))}
    </div>
  );
}

export default async function BakePage() {
  async function handleBake(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const rawData = {
      name: formData.get("name") as string,
      price: parseFloat(formData.get("price") as string),
      description: formData.get("description") as string,
      baker_id: user?.id, // This is the "Unique ID"
    };

    const { error } = await supabase.from("Eat").insert([rawData]);

    if (error) console.error(error);
    else redirect("/protected/eat"); // Send them to the marketplace to see it live
  }

  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
      {/* LEFT SIDE: THE FORM */}
      <form action={handleBake} className="flex flex-col gap-4 border p-6 rounded-xl">
        <h1 className="text-2xl font-bold italic text-orange-500 underline">The Oven</h1>
        <input name="name" placeholder="Name of creation" className="p-2 border rounded bg-background" required />
        <input name="price" type="number" step="0.01" placeholder="Price" className="p-2 border rounded bg-background" required />
        <textarea name="description" placeholder="Description..." className="p-2 border rounded bg-background h-32" />
        <button className="bg-orange-500 text-white font-bold py-3 rounded hover:bg-orange-600">
          POST TO MARKETPLACE
        </button>
      </form>

      {/* RIGHT SIDE: YOUR LIVE ITEMS */}
      <Suspense fallback={<div>Loading your items...</div>}>
        <MyItems />
      </Suspense>
    </div>
  );
}