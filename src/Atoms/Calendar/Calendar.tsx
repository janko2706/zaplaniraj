import dynamic from "next/dynamic";
import { type FC, useState } from "react";
import { add, format } from "date-fns";

const DynamicCalendar = dynamic(() => import("react-calendar"), { ssr: false });

type DateType = {
  justDate: Date | null;
  dateTime: Date | null;
};

const CalendarComponent = () => {
  const [date, setDate] = useState<DateType>({
    dateTime: null,
    justDate: null,
  });

  const getTimes = () => {
    if (!date.justDate) return;
    const { justDate } = date;
    const begining = add(justDate, { hours: 9 });
    const end = add(justDate, { hours: 13 });
    const interval = 30; // minutes

    const times = [];
    for (let i = begining; i <= end; i = add(i, { minutes: interval })) {
      times.push(i);
    }

    return times;
  };

  const times = getTimes();

  return (
    <div className="flex w-full">
      <DynamicCalendar
        minDate={new Date()}
        className={`react-calendar`}
        view="month"
        onClickDay={(date) => setDate((prev) => ({ ...prev, justDate: date }))}
      />
      {date.justDate && times && (
        <div className="grid h-fit w-full grid-cols-2 gap-5">
          {times.map((time, idx) => {
            return (
              <div
                key={`time-${idx}`}
                className="w-fit cursor-pointer rounded-lg border border-dark p-4 transition-all duration-300 hover:bg-dark hover:text-white"
              >
                {format(time, "kk:mm")} / SMITH JOHN - RODENDAN
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
