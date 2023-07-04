import type { Database as DB } from "@/types/database.types";

declare global {
    type Database = DB;
    type Profile = DB["public"]["Tables"]["profiles"]["Row"];
}