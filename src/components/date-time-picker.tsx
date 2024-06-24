import * as React from "react";
import { DateTime } from "luxon";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { SelectSingleEventHandler } from "react-day-picker";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { differenceInCalendarDays, format } from "date-fns";
import { useFlowStore } from "@/hooks/use-flow-store";
import { ptBR } from "date-fns/locale";

interface DateTimePickerProps {
  date: Date;
  setDate: (date: Date) => void;
}

export function DateTimePicker({ date, setDate }: DateTimePickerProps) {
  const [selectedDateTime, setSelectedDateTime] = React.useState<DateTime>(
    DateTime.fromJSDate(date)
  );
  const {
    setScheduleTime,
    scheduleTime
  } = useFlowStore();

  const handleSelect: SelectSingleEventHandler = (day, selected) => {
    const selectedDay = DateTime.fromJSDate(selected);
    const modifiedDay = selectedDay.set({
      hour: selectedDateTime.hour,
      minute: selectedDateTime.minute,
    });

    setSelectedDateTime(modifiedDay);
    setDate(modifiedDay.toJSDate());
  };

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    const hours = Number.parseInt(value.split(':')[0] || '00', 10);
    const minutes = Number.parseInt(value.split(':')[1] || '00', 10);
    const modifiedDay = selectedDateTime.set({ hour: hours, minute: minutes });
    const formattedTime = format(new Date(`2000-01-01 ${hours+":"+minutes}`), 'HH:mm:ss');
    const formattedDate = format(new Date(date as Date), 'yyyy-MM-dd');
    const dateTime = `${formattedDate}T${formattedTime}`;
    setScheduleTime(dateTime);
    setSelectedDateTime(modifiedDay);
    setDate(modifiedDay.toJSDate());
  };

  function isPastDate(date: Date) {
    return differenceInCalendarDays(date, new Date()) < 0;
  }

  const footer = (
    <>
      <div className="px-4 pt-0 pb-4">
        <Label>Hora</Label>
        <Input
          type="time"
          onChange={handleTimeChange}
          value={selectedDateTime.toFormat('HH:mm')}
        />
      </div>
      {!selectedDateTime && <p>Please pick a day.</p>}
    </>
  );

  return (
    <Popover>
      <PopoverTrigger asChild className="z-10">
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            selectedDateTime.toFormat('DDD HH:mm')
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDateTime.toJSDate()}
          onSelect={handleSelect}
          initialFocus
          today={new Date()}
          modifiersClassNames={{
            selected: "bg-[#5528ff] text-white font-bold rounded-full",
            today: "rounded-full"
          }}
          disabled={isPastDate}
          locale={ptBR}
        />
        {footer}
      </PopoverContent>
    </Popover>
  );
}