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
  company: string;
  date: string;
  description: string;
  id: number;
  onDeleteClick: (id: number) => void;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  title,
  company,
  date,
  description,
  id,
  onDeleteClick,
}) => {
  return (
    <Card className="w-full mt-3">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{company}</CardDescription>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter className="flex space-x-2">
        <Link href={`/portfolio/edit/${id}`}>
          <Button>Edit Portfolio</Button>
        </Link>
        <Button variant="destructive" onClick={() => onDeleteClick(id)}>
          Delete Portfolio
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PortfolioCard;
