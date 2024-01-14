/* eslint-disable @next/next/no-img-element */

import React, { ReactElement } from "react";
import MainLayout from "./main-layout";
import PortfolioCard from "@/components/portfolio-card";
import { useProfile } from "@/lib/fetchers";
import { FileCheck2Icon, Loader2 } from "lucide-react";

export default function PortfolioPage() {
  const { profile, isErrorProfile, isLoadingProfile } = useProfile();

  return (
    <>
      <div className="relative">
        <img
          src={profile?.backgroundImage || "bg.svg"}
          className="object-cover w-full h-60"
          alt="background"
        />
        <img
          src={profile?.avatar || "profile.svg"}
          className="absolute bottom-0 object-cover w-32 h-32 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-full"
          alt="avatar"
          style={{ left: "50%", top: "100%" }}
        />
      </div>
      <div className="text-center">
        <h3 className="mt-20 text-3xl font-semibold">
          {profile?.username || "Your Name"}
        </h3>
        <h5 className="text-xl font-semibold text-muted-foreground">
          {profile?.title || "Your Title"}
        </h5>
        <p className="">{profile?.description || "Your Bio"}</p>
      </div>

      <div className="mb-8">
        <h2 className="mt-8 text-2xl font-semibold">Portfolio</h2>
        {isLoadingProfile && (
          <Loader2 className="w-4 h-4 mr-2 text-center animate-spin" />
        )}
        {isErrorProfile && (
          <p>
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <FileCheck2Icon className="w-24 h-24 text-muted-foreground" />
              <h1 className="text-2xl font-bold text-muted-foreground">
                No portfolio added
              </h1>
              <p className="text-lg text-center text-muted-foreground">
                Add your portfolio to show your skills and experience
              </p>
            </div>
          </p>
        )}
        {profile?.portfolios?.length === 0 && (
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
          <div key={portfolio.id}>
            <PortfolioCard
              title={portfolio.position}
              company={portfolio.company}
              startDate={new Intl.DateTimeFormat("id-ID", {
                month: "long",
                year: "numeric",
              }).format(new Date(portfolio.startDate))}
              endDate={
                portfolio.endDate
                  ? new Intl.DateTimeFormat("id-ID", {
                      month: "long",
                      year: "numeric",
                    }).format(new Date(portfolio.endDate))
                  : "Present"
              }
              description={portfolio.description}
              position={portfolio.position}
            />
          </div>
        ))}
      </div>
    </>
  );
}

PortfolioPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
