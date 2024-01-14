import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Button, buttonVariants } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";
import { useProfile } from "@/lib/fetchers";

export function SiteHeader() {
  const router = useRouter();

  const { profile } = useProfile();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex items-center justify-between h-16">
        {/* <MobileNav /> */}

        <div className="hidden gap-6 md:flex">
          <Link
            href="/"
            className="flex items-center space-x-2 text-apple-600 dark:text-apple-400"
          >
            <span className="font-bold">Portfolio Manager</span>
          </Link>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {profile?.portfolios ? (
              <Button
                onClick={() => router.push(`/portfolio/edit/${profile.id}`)}
              >
                Edit Portfolio
              </Button>
            ) : (
              <Button onClick={() => router.push("/portfolio/add")}>
                Create Portfolio
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
