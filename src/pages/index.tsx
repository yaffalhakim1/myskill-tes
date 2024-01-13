/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import MainLayout from "./main-layout";
import Image from "next/image";
import PortfolioCard from "@/components/portfolio-card";
import useSWR from "swr";
import { fetcher, useProfile } from "@/lib/fetchers";
import { Portfolio, Profile } from "@/types/api";
import { FileCheck2Icon } from "lucide-react";

export default function PortfolioPage() {
  const router = useRouter();

  const { profile, isErrorProfile, isLoadingProfile } = useProfile();

  const { data, isLoading, error } = useSWR<Portfolio[]>(
    "/portfolios",
    fetcher
  );

  console.log(profile?.portfolios);

  return (
    <>
      <img src="https://placehold.co/1920x900" alt="nextjs" />

      <div className="text-center">
        <h3 className="mt-8 text-3xl font-semibold">
          {profile?.username || "Your Name"}{" "}
        </h3>
        <h5 className="text-xl font-semibold text-muted-foreground">
          {profile?.title || "Your Title"}
        </h5>
        <p className="">{profile?.description || "Your Bio"}</p>
      </div>

      <div>
        <h2 className="mt-8 text-2xl font-semibold">Portfolio</h2>
        {isLoading && <p>Loading...</p>}
        {error && <p>Failed to fetch portfolios, please try again later</p>}
        {data?.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <FileCheck2Icon className="w-24 h-24 text-muted-foreground" />
            <h1 className="text-2xl font-bold text-muted-foreground">
              No portfolio added
            </h1>
            <p className="text-lg text-center text-muted-foreground">
              Add your portfolio to show your skills and experience
            </p>
          </div>
        )}
        {profile?.portfolios?.map((portfolio) => (
          <PortfolioCard
            key={portfolio.id}
            id={portfolio.id}
            title={portfolio.name}
            company={portfolio.company}
            startDate={new Date(portfolio.startDate)}
            endDate={new Date(portfolio.endDate)}
            description={portfolio.description}
            onDeleteClick={() => {}}
          />
        ))}
      </div>
    </>
  );
}

PortfolioPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
