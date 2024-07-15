'use server'

import { revalidatePath } from "next/cache";
import { createClient } from "../_utils/supabase/server";
import { NoteRecord } from "../_utils/types";
import { randomString } from "../_utils/formats";
import { getProfile } from "../_utils/supabase/serverActions";



export async function getMyNotes() {
    const sb = createClient();
    const {data: {user}} = await sb.auth.getUser();
    const {data, error} = await sb.from('notes').select('*').eq('author', user?.id);
    if (error) {
        throw new Error('Could not retrieve notes: '+error.message)
    }
    return data;
}

export async function deleteNote(id: number) {
    const sb = createClient();
    const {error, status, statusText} = await sb.from('notes').delete().eq('id', id).select()
    console.log(status+":", statusText);
    
    if (error) {
        throw new Error('Could not delete note: '+error.message)
    }
    revalidatePath('/', 'layout')
}

export async function duplicateNote(note: NoteRecord) {
    const sb = createClient();
    const {username} = await getProfile();
    const public_id = randomString(6);
    const public_url = `/public-notes/${username}/${public_id}`
    const {title, content, is_private} = note;
    const {error, status, statusText} = await sb.from('notes').insert({
        title, content, is_private, public_url
    })
    console.log(status+":", statusText);
    
    if (error) {
        throw new Error('Could not duplicate note: '+error.message)
    }
    revalidatePath('/', 'layout')
}