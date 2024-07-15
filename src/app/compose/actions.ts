'use server'

import { revalidatePath } from "next/cache";
import { createClient } from "../_utils/supabase/server";
import { redirect } from "next/navigation";
import { randomString } from "../_utils/formats";
import { getProfile } from "../_utils/supabase/serverActions";

export async function saveNote(formData: FormData) {
    const title = formData.get('title');
    const content = formData.get('content');
    if (typeof(title) !== 'string' || typeof(content) !== 'string') {
        throw new Error('Invalid note format. Cannot save.')
    }
    const sb = createClient();
    const {username, user_id} = await getProfile();
    const is_private = formData.get('isPrivate') === 'on';
    const public_id = randomString(6);
    const public_url = `https://nextnotes-psi.vercel.app/public-notes/${username}/${public_id}`
    const {error} = await sb
        .from('notes')
        .insert({
            author: user_id, 
            title: sanitizeInput(title), 
            content: sanitizeInput(content), 
            is_private, 
            public_url
        });
    if (error) {
        console.error(error.message);
        throw new Error('We ran into trouble saving your note.')
    }
    revalidatePath('/notes');
    redirect('/notes')
}

function sanitizeInput(text: string) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/'/g, '&#39;')
        .replace(/"/g, '&quot;')
        .replace(/\//g, '&#x2F;')
        .replace(/\r\n/g, '&newline&');
}
