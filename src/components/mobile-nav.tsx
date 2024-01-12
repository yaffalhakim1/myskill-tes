import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FlipVertical } from "lucide-react";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="flex px-0 mr-2 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <FlipVertical className="w-6 h-6" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pl-1 pr-0">
        <div className="px-7">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setOpen(false)}
          >
            {/* <Icons.Logo className="w-4 h-4 mr-2" /> */}
            <span className="font-bold">Test</span>
          </Link>
        </div>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="pl-1 pr-7">
            <Sidebar />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

export function Sidebar() {
  const pathname = useRouter().pathname;

  return (
    <div className="flex flex-col w-full gap-2 p-1 mt-3">
      return (
      <Link href="/">
        <span
          className={cn(
            "flex items-center w-full px-2 py-1 rounded-lg text-sm font-medium",
            pathname === "/" && "bg-gray-100 dark:bg-gray-800"
          )}
        >
          <span>Yourt Portfolio</span>
        </span>
      </Link>
      );
    </div>
  );
}
