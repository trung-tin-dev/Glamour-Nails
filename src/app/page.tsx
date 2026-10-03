import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-5xl font-serif font-bold text-neutral-800 mb-4">
        Welcome to Glamour Nails
      </h1>
      <p className="text-neutral-600 max-w-md mb-8 text-base">
        Experience top-tier nail care and pampering. Book your favorite service online in seconds!
      </p>

      <Link
        href="/booking"
        className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3.5 px-8 rounded-xl shadow-md transition duration-200 text-base active:scale-95"
      >
        Book Now
      </Link>
    </div>
  );
}