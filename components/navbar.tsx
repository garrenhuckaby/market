import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-slate-900 text-white border-b border-slate-800">
      <div className="flex gap-6">
        <Link href="/protected" className="hover:text-blue-400 font-bold">Dashboard Home</Link>
        <Link href="/protected/instruments" className="hover:text-blue-400">My Instruments</Link>
        <Link href="/protected/notes" className="hover:text-blue-400">My Notes</Link></div>
      <div>
        {/* We can add a Login/Logout button here later */}
        <span className="text-xs text-slate-400">Supabase Connected</span>
      </div>
    </nav>
  );
}