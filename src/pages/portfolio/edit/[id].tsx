import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "@/features/portfolio-forms";

export default function EditPostPage() {
  return (
    <>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Edit post</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm mode="edit" />
        </CardContent>
      </Card>
    </>
  );
}
