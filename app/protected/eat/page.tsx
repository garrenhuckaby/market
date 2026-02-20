import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

async function EatList() {
  const supabase = await createClient();
  // Inside your EatData function:
  const { data: menuItems, error } = await supabase.from("Eat").select(`*,Account ( full_name )`);
  //const { data: menuItems, error } = await supabase.from("Eat").select();

  if (error || !menuItems) return <p>No items found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {menuItems.map((item) => (
        <div key={item.id} className="border border-foreground/10 rounded-xl overflow-hidden bg-card flex flex-col">
          {/* 1. IMAGE PLACEHOLDER */}
          <div className="h-48 bg-muted flex items-center justify-center text-4xl">
             {item.image_url ? (
               <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
             ) : "🍔"} 
          </div>

          {/* 2. DATA DISPLAY */}
          <div className="p-4 flex-1">
            <h3 className="text-lg font-bold">{item.name || "Untitled Dish"}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.description || "No description provided."}
            </p>
            <p className="mt-2 font-semibold text-green-600">${item.price || "0.00"}</p>
          </div>
          {/* 3. BUTTONS/TOOLS */}
          <div className="p-4 pt-0 flex gap-2">
            <button className="flex-1 bg-primary text-primary-foreground py-2 rounded-md text-sm font-medium hover:opacity-90">
              Select
            </button>
            <button className="px-3 py-2 border rounded-md hover:bg-muted">
              ❤️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Eat() {
  return (
    <div className="space-y-8">
      {/* HEADER & FILTERS BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Menu & Dining</h1>
          <p className="text-muted-foreground">Manage your eatables and selections</p>
        </div>
        
        {/* SEARCH & FILTER PLACEHOLDERS */}
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Search food..." 
            className="bg-background border rounded-md px-4 py-2 text-sm w-64"
          />
          <button className="bg-foreground text-background px-4 py-2 rounded-md text-sm">
            Filters
          </button>
        </div>
      </div>

      <hr className="border-foreground/10" />

      {/* DATA DISPLAY */}
      <Suspense fallback={<div className="animate-pulse flex gap-4">Loading menu...</div>}>
        <EatList />
      </Suspense>
    </div>
  );
}