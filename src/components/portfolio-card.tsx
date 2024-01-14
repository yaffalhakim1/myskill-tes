import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface PortfolioCardProps {
  title: string;
  name?: string;
  position?: string;
  company: string;
  startDate: Date;
  endDate: Date;
  description: string;
  id: number;
  onDeleteClick: (id: number) => void;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  title,
  company,
  startDate,
  endDate,
  description,
  position,
  id,
  onDeleteClick,
}) => {
  return (
    <Card className="w-full mt-3">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{company}</CardDescription>
        <CardDescription>
          {startDate.toLocaleString("id-ID", {
            month: "long",
            year: "numeric",
          })}{" "}
          -{" "}
          {endDate
            ? endDate.toLocaleString("id-ID", {
                month: "long",
                year: "numeric",
              })
            : "Present"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {description
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(", ")}
      </CardContent>
    </Card>
  );
};

export default PortfolioCard;
