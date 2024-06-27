import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function formatDateToBrazilian(dateString: string) {
  const date = parseISO(dateString);
  const formattedDate = format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  return formattedDate;
}