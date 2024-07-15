'use server'

import { createClient } from "../_utils/supabase/server"
import { getUsername } from "../_utils/supabase/serverActions";

export async function getPublicNote(user: string, public_id: string) {
    const sb = createClient();
        const {data:profileData, error:profileError} = await sb.from('profiles').select('user_id').eq('username', user);
        if (!profileData) {
            throw new Error('This user does not exist in our system')
        }
        console.log('profile retrieved: ',profileData);
        
        const {data:noteData, error:noteError} = await sb.from('notes').select('*').eq('author', profileData[0].user_id).like('public_url', '%'+public_id)
        if (noteError) {
            if (noteError.code === '404') {
                throw new Error('This note does not exist')
            } else {
                throw new Error('We had a problem retrieving this note: '+noteError.message)
            }
        }
        console.log("note retrieved: ", noteData);
        
        if (noteData.length === 0) {
            throw new Error('Note does not exist publicly')
        }
        
        return noteData[0];
}

export async function getManyPublic(query: string) {
    const sb = createClient();
    const {data, error} = await sb.from('notes').select().eq('is_private', false).ilike('content', `%${query}%`);
    if (error) {
        console.log(error.message);
        throw new Error('Trouble finding those public notes')
    }
    return data
}

export async function getAllPublic () {
    const sb = createClient();
    const {data, error} = await sb.from('notes').select('*').eq('is_private', false).order('created_at', {ascending: false});
    if (error) {
        throw new Error('Could not retrieve public notes:'+error.message)
    }
    return data;
}

export async function getPublicByAuthor(username: string) {
    const sb = createClient()
    const {data:id, error:userError} = await sb.from('profiles').select('user_id').eq('username', username).single();
    if (userError) {
        console.log(userError.message);
        throw new Error('Could not find a user by that name')
    }
    const {data:publicNotes, error:dataError} = await sb.from('notes').select().eq('author', id?.user_id).eq('is_private', false);
    if (dataError) {
        console.log(dataError.message);
        throw new Error('Error retrieving public notes for this user')
    }
    return publicNotes;

}