import Link from "next/link";
import Paragraph from "../components/base/ui/primitives/paragraph";

const socialLinks = [
  {
    name: "X",
    href: "https://x.com/yourcompany",
  },
  {
    name: "Facebook",
    href: "https://facebook.com/yourcompany",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/yourcompany",
  },
];

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        {/* 404 */}
        <p className="text-8xl font-bold tracking-tight">
          404
        </p>

        <h1 className="mt-6 text-2xl font-semibold">
          Page not found
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        {/* Dashboard button */}
        <Link
          href="/dashboard"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <Paragraph size="md" color="white">
             Back to dashboard
          </Paragraph>
        </Link>

        {/* Social links */}
        <div className="mt-10">
          <p className="mb-4 text-sm text-gray-500">
            Or follow us on
          </p>

          <div className="flex justify-center gap-3">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-[var(--color-outline2)] px-4 py-2 text-sm font-medium transition hover:bg-gray-100"
              >
                {social.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
