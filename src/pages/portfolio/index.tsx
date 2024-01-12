import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      {/* <image src="/images/nextjs.svg" alt="nextjs" width={160} height={160} /> */}

      <div className="text-center">
        <h3 className="">Nama</h3>
        <p className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
          fugit, aperiam adipisci provident incidunt harum, ab molestiae,
          aliquam aspernatur similique laborum possimus recusandae. Enim
          inventore magnam mollitia ipsum non nesciunt rem, tenetur pariatur
          illum ipsa, delectus soluta quibusdam et ab nam provident repellat
          quia vitae nemo eligendi dicta. Reiciendis aliquid pariatur vel porro
          sequi quia expedita quos praesentium, molestiae sed maxime eaque ut
          fugiat doloremque. Voluptatum nemo repellendus fugit iure maxime sed
          vitae iste iusto, corporis illum consequatur voluptatem eveniet.
          Veniam modi voluptatem nobis cum voluptatum ducimus id debitis,
          incidunt fugiat corrupti temporibus saepe asperiores culpa eligendi
          quisquam labore in.
        </p>
      </div>

      <div>
        <h2 className="text-semibold">Portfolio</h2>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h2>Title</h2>
            <h4>Company</h4>
            <p>start date - end date</p>
            <p>description</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
