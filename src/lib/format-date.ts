import format from 'date-fns/format';
import fr from 'date-fns/locale/fr';

export function formatDate(date: Date | string | number) {
  return format(new Date(date), 'PPP', { locale: fr });
}
