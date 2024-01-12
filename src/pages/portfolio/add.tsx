import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ProfileForm } from "@/features/portfolio-forms";

export default function AddPortfolioPage() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Add Products</CardTitle>
      </CardHeader>
      <CardContent>
        <ProfileForm mode="add" />
      </CardContent>
    </Card>
  );
}
