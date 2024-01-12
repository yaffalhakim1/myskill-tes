import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import React from "react";

export default function PortfolioPage() {
  const router = useRouter();

  return (
    <div>
      <Button onClick={() => router.push("/portfolio/add")}>
        Create new portfolio
      </Button>
      <h1>Portfolio Page</h1>
    </div>
  );
}
