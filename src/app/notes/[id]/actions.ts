'use server'

import { createClient } from "@/app/_utils/supabase/server"

export async function getNote(id: string) {
    const sb = createClient();
    const {data, error} = await sb.from('notes').select('*').eq('id', id);
    if (error) {
        throw new Error('Unable to load note: '+error.message)
    }
    return data[0]
}