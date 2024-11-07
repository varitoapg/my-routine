import { addDays, startOfWeek, isSameDay, format } from "date-fns";
import { getServerTranslations } from "@/i18n/server";
import DayCard from "@components/DayCard/DayCard";

const WeekDisplay = async () => {
  const { t } = await getServerTranslations("weekDisplay");
  const today = new Date();
  const monday = startOfWeek(today, { weekStartsOn: 1 });
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(monday, i));

  return (
    <div className="flex flex-wrap justify-center space-x-4">
      {daysOfWeek.map((day, index) => (
        <DayCard
          key={index}
          dayName={t(format(day, "EEEE"))}
          day={day}
          isCurrentDay={isSameDay(day, today)}
        />
      ))}
    </div>
  );
};

export default WeekDisplay;
