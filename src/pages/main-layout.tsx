import React from "react";

import { SiteFooter } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="sticky w-full"></div>
      <div className="container max-w-6xl ">{children}</div>
    </div>
  );
}

export default MainLayout;
