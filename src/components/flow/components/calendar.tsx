import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useFlowStore } from "@/hooks/use-flow-store";
import { differenceInCalendarDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDays } from "lucide-react";
import { useState } from "react";
import { Row, RowProps } from "react-day-picker";

export function FlowCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [hour, setHour] = useState<any | undefined | null>(null);
  const setScheduleTime = useFlowStore(state => state.setScheduleTime);

  function isPastDate(date: Date) {
    return differenceInCalendarDays(date, new Date()) < 0;
  }

  function OnlyFutureRow(props: RowProps) {
    const isPastRow = props.dates.every(isPastDate);
    if (isPastRow) return <></>;
    return <Row {...props} />;
  }

  
  const handleSchedule = () => {
    const formattedDate = format(new Date(date as Date), 'yyyy-MM-dd');
    const formattedTime = format(new Date(`2000-01-01 ${hour}`), 'HH:mm:ss');
    const dateTime = `${formattedDate}T${formattedTime}`;
    setScheduleTime(dateTime);
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="primary-outline" className="rounded-full flex items-center justify-center gap-4">
            <CalendarDays size={16} />
            Agendar
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white md:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>
              <h2>Agendamento</h2>
            </DialogTitle>
            <DialogDescription>
              Data e hora em que será iniciado o fluxo
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col justify-center gap-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className=""
              components={{ Row: OnlyFutureRow }}
              hidden={isPastDate}
            />
            <input type="time" onChange={e => setHour(e.target.value)} step="3600000" className="max-w-20" />
          </div>
          <DialogFooter>
            <Button variant="primary-action" onClick={handleSchedule}>
              Confirmar agendamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}