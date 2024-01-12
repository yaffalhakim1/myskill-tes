/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import MainLayout from "./main-layout";
import Image from "next/image";
import PortfolioCard from "@/components/portfolio-card";

export default function PortfolioPage() {
  const router = useRouter();

  return (
    <>
      {/* <img src="https://placehold.co/1920x900" alt="nextjs" /> */}

      <div className="text-center">
        <h3 className="mt-8 text-3xl font-semibold">Nama</h3>
        <h5 className="text-xl font-semibold text-muted-foreground">Title</h5>

        <p className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At sapiente
          fuga quisquam quod, deleniti aut. Sunt consequatur ratione expedita
          quia perspiciatis eveniet similique ipsam, at possimus. Placeat,
          nostrum dolore. Deserunt modi fugiat sunt ipsam vero facere quidem
          excepturi debitis magni soluta! Illo aliquid itaque ducimus rerum
          consequatur, deserunt optio molestias?
        </p>
      </div>

      <div>
        <h2 className="mt-8 text-2xl font-semibold">Portfolio</h2>
        <PortfolioCard
          title="AI Engineer"
          company="Vercel"
          date="21 Agustus 2021 - 21 Agustus 2021"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam minus nobis assumenda cupiditate repudiandae magnam ipsum provident vel consectetur. Quam."
          id={1}
          onDeleteClick={(id) => console.log(id)}
        />
        <PortfolioCard
          title="AI Engineer"
          company="Vercel"
          date="21 Agustus 2021 - 21 Agustus 2021"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam minus nobis assumenda cupiditate repudiandae magnam ipsum provident vel consectetur. Quam."
          id={1}
          onDeleteClick={(id) => console.log(id)}
        />
        <PortfolioCard
          title="AI Engineer"
          company="Vercel"
          date="21 Agustus 2021 - 21 Agustus 2021"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam minus nobis assumenda cupiditate repudiandae magnam ipsum provident vel consectetur. Quam."
          id={1}
          onDeleteClick={(id) => console.log(id)}
        />
      </div>
    </>
  );
}

PortfolioPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
