import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ProfileForm } from "@/features/portfolio-forms";
import { ReactElement } from "react";
import MainLayout from "../main-layout";

export default function AddPortfolioPage() {
  return (
    <Card>
      <CardHeader className="max-w-6xl space-y-1">
        <CardTitle className="text-2xl ">Add Portfolio</CardTitle>
      </CardHeader>
      <CardContent>
        <ProfileForm mode="add" />
      </CardContent>
    </Card>
  );
}
