import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
      <h2 className="text-xl font-semibold text-text-secondary mb-2">
        Page Not Found
      </h2>
      <p className="text-sm text-text-muted max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-primary/10 border border-primary/30 rounded-xl text-sm text-primary-light hover:bg-primary/20 transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
}
