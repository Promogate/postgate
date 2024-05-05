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
import { DateTimePicker } from "@/components/date-time-picker";
import { SCHEDULE_URL } from "@/config";

type PublishInput = {
  start_date: string;
  sending_list: string[];
  whatsapp_instance: string;
  messages: any[];
  token: string;
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
    const queryResult = await axios.get("/api/wapp/session", { params: { instanceId: instanceId } });
    const data: PublishInput = {
      start_date: scheduleTime as string,
      messages: nodes,
      sending_list: JSON.parse(list),
      whatsapp_instance: instanceId,
      token: queryResult.data.hash
    }
    await axios.post(SCHEDULE_URL, data);
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="rounded-full flex items-center justify-center gap-4">
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
          <div className="flex flex-col gap-y-2">
            <span className="text-xs text-gray-400">* Caso escolha o mesmo dia, atente-se para que o horário de início não seja antes do horário atual</span>
            <span className="text-xs text-gray-400">** A data de agendamento somente será contabilizada após a escolha do horário</span>
          </div>
          <DateTimePicker setDate={setDate} date={date as Date} />
          <DialogFooter>
            <Button variant="default" onClick={handlePublish}>
              Confirmar agendamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}