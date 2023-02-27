import { parseISO, format } from 'date-fns'

export const toISODate = (date) => format(parseISO(date), 'dd/MM/yyyy')
