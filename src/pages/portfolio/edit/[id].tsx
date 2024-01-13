import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "@/features/portfolio-forms";
import { Profile, ProfileSchema } from "@/types/api";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps<{
  data: ProfileSchema;
}> = async (context) => {
  const res = await fetch(`http://localhost:3001/profiles/1?_embed=portfolios`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
};
export default function EditPostPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Edit post</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm mode="edit" initialProductData={data} />
        </CardContent>
      </Card>
    </>
  );
}
