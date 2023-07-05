import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query';
import {supabase} from "@/lib/supabaseClient";

const supabaseApi = createApi({
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getProfile: builder.query({
            queryFn: async () => {
                const profile = await supabase
                    .from('profiles')
                    .select('last_name, first_name');
                return {data: profile };
            }
        })
    })
});
