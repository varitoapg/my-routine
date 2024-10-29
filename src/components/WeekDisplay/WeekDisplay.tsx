import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { Card } from "@components/UI/Card/Card";
import { getServerTranslations } from "@/i18n/server";

const WeekDisplay = async () => {
  const { t } = await getServerTranslations("weekDisplay");
  const today = new Date();
  const monday = startOfWeek(today, { weekStartsOn: 1 });
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(monday, i));

  return (
    <div className="flex flex-wrap justify-center space-x-4">
      {daysOfWeek.map((day, index) => (
        <Card
          key={index}
          variant={isSameDay(day, today) ? "primary" : "default"}
        >
          <Card.Title className="flex items-center justify-center p-2">
            {t(format(day, "EEEE"))}
          </Card.Title>

          <Card.Body>{format(day, "dd/MM/yyyy")}</Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default WeekDisplay;
