import type { Database as DB } from '@/types/database.types';
import { AuthSession } from '@supabase/auth-ui-react/dist/components/Auth/UserContext';

declare global {
  type Database = DB;
  type Profile = DB['public']['Tables']['profiles']['Row'];
  type CompanyProfile = DB['public']['Tables']['company_profiles']['Row'];
  type User = AuthSession['user'];
  type Session = AuthSession['session'];
}
