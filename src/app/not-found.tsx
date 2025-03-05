import Link from 'next/link';
import { Frown } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <Frown className="w-10 text-gray-400 mt-10" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>We couldn&apos;t find the page you were looking for</p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
       Tillbaka
      </Link>
    </main>
  );
}
