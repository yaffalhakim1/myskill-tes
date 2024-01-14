import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PortfolioCardProps {
  title?: string;
  name?: string;
  position?: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  company,
  startDate,
  endDate,
  description,
  position,
}) => {
  return (
    <Card className="w-full mt-3">
      <CardHeader>
        <CardTitle>{position}</CardTitle>
        <CardDescription>{company}</CardDescription>
        <CardDescription>
          {/* {startDate.toLocaleString("id-ID", {
            month: "long",
            year: "numeric",
          })}{" "}
          -{" "}
          {endDate
            ? endDate.toLocaleString("id-ID", {
                month: "long",
                year: "numeric",
              })
            : "Present"} */}
          {startDate + " - " + endDate}
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
