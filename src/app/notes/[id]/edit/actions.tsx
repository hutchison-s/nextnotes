'use server'

import { randomString } from "@/app/_utils/formats";
import { createClient } from "@/app/_utils/supabase/server";
import { getProfile } from "@/app/_utils/supabase/serverActions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveEdit(formData: FormData) {
    console.log('starting edit');
    
        const title = formData.get('title');
        const content = formData.get('content');
        const note_id = formData.get('note_id');
        if (typeof(title) !== 'string' || typeof(content) !== 'string' || typeof(note_id) !== 'string') {
            throw new Error('Invalid note format. Cannot save.')
        }
        console.log('received', title, content, note_id);
        
        const sb = createClient();
        const is_private = formData.get('isPrivate') === 'on';
        const {data, error} = await sb
            .from('notes')
            .update({
                title: sanitizeInput(title), 
                content: sanitizeInput(content), 
                is_private: is_private
            })
            .eq('id', parseInt(note_id))
            .select();
        if (error) {
            console.error(error.message);
            throw new Error('We ran into trouble saving your note.')
        }
        console.log('updated:', data.length);
        
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
