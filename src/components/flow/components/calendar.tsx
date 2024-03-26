"use client";

import { differenceInCalendarDays, format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { useState } from "react";
import { Row, RowProps } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useFlowStore } from "@/hooks/use-flow-store";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SendingList } from "@/@types";

type PublishInput = {
  start_date: string;
  sending_list: string[];
  whatsapp_instance: string;
  messages: any[]
}

export function FlowCalendar() {
  const { userId } = useAuth();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [hour, setHour] = useState<any | undefined | null>(null);
  const [chosenList, setChosenList] = useState<string>("");
  const setScheduleTime = useFlowStore(state => state.setScheduleTime);
  const {
    nodes,
    scheduleTime
  } = useFlowStore()

  function isPastDate(date: Date) {
    return differenceInCalendarDays(date, new Date()) < 0;
  }

  function OnlyFutureRow(props: RowProps) {
    const isPastRow = props.dates.every(isPastDate);
    if (isPastRow) return <></>;
    return <Row {...props} />;
  }

  const listsQuery = useQuery({
    queryKey: ["schedule_sending_lists", userId],
    queryFn: async () => {
      const { data } = await axios.get<SendingList[]>("/api/wapp/sending_list");
      return data;
    },
    staleTime: 1000 * 60 * 60
  });

  const handleSchedule = () => {
    const formattedDate = format(new Date(date as Date), 'yyyy-MM-dd');
    const formattedTime = format(new Date(`2000-01-01 ${hour}`), 'HH:mm:ss');
    const dateTime = `${formattedDate}T${formattedTime}`;
    setScheduleTime(dateTime);
  }

  const handlePublish = async () => {
    const [instanceId, list] = chosenList.split("_");

    const data: PublishInput = {
      start_date: scheduleTime as string,
      messages: nodes,
      sending_list: JSON.parse(list),
      whatsapp_instance: instanceId
    }
    
    await axios.post("https://primary-production-18bf.up.railway.app/webhook-test/schedule", data, {
      headers: {
        Authorization: "W0CDwQvZcONecU43QBBw6I5fnrd1w5TD"
      }
    })
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
            <input type="time" onChange={e => {
              setHour(e.target.value)
              handleSchedule()
            }} step="3600000" className="max-w-20" />
            <Select onValueChange={(value) => setChosenList(value)}>
              <SelectTrigger >
                <SelectValue placeholder="Escolha uma lista de disparo" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Listas de disparo</SelectLabel>
                  {listsQuery.data?.map((sendingList) => {
                    return (
                      <SelectItem key={sendingList.id} value={`${sendingList.instanceId}_${sendingList.list}`}>
                        <div className="flex items-center gap-x-2">
                          <p>{sendingList.name}</p>
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="primary-action" onClick={handlePublish}>
              Confirmar agendamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}