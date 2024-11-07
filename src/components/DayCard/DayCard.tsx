import { Card } from "@components/UI/Card/Card";
import { format } from "date-fns";

interface DayCardProps {
  dayName: string;
  day: Date;
  isCurrentDay: boolean;
}
const DayCard = ({ dayName, isCurrentDay, day }: DayCardProps) => {
  return (
    <Card variant={isCurrentDay ? "primary" : "default"}>
      <Card.Title className="flex items-center justify-center p-2">
        {dayName}
      </Card.Title>

      <Card.Body>
        <div>{format(day, "dd/MM/yyyy")}</div>
      </Card.Body>
    </Card>
  );
};

export default DayCard;
