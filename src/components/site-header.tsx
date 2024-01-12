import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Button, buttonVariants } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";

export function SiteHeader() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex items-center justify-between h-16">
        <MobileNav />

        <div className="hidden gap-6 md:flex">
          <Link
            href="/"
            className="flex items-center space-x-2 text-apple-600 dark:text-apple-400"
          >
            {/* <Icons.Logo className="w-6 h-6" /> */}
            <span className="font-bold">Portfolio Manager</span>
          </Link>
        </div>

        <div className="flex items-center justify-end space-x-4">
          {/* <SearchCommandMenu /> */}

          <nav className="flex items-center space-x-2">
            <Button onClick={() => router.push("/portfolio/add")}>
              Create new portfolio
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
