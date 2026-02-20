import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

async function DeliveryTable() {
  const supabase = await createClient();
  const { data: deliveries } = await supabase.from("Deliver").select();

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-muted text-sm uppercase">
          <tr>
            <th className="p-4">Order #</th>
            <th className="p-4">Destination</th>
            <th className="p-4">Status</th>
            <th className="p-4">Arrival</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {deliveries?.map((d) => (
            <tr key={d.id} className="hover:bg-muted/50 transition-colors">
              <td className="p-4 font-mono font-bold text-blue-500">{d.order_number}</td>
              <td className="p-4 text-sm">{d.destination}</td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded text-xs ${
                  d.delivery_status === 'Delivered' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
                }`}>
                  {d.delivery_status}
                </span>
              </td>
              <td className="p-4 text-xs text-muted-foreground">
                {new Date(d.estimated_arrival).toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DeliverPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Logistics Tracking</h1>
      <Suspense fallback={<div>Loading deliveries...</div>}><DeliveryTable /></Suspense>
    </div>
  );
}