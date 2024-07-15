'use client'

import Link from "next/link";
import { NoteRecord } from "../_utils/types";
import { formatTimeString } from "../_utils/formats";
import he from 'he';
import NotePreviewMenu from "./NotePreviewMenu";
import { getUsername } from "../_utils/supabase/serverActions";
import { useEffect, useState } from "react";



export default function PublicSearchPreview({note, query}: {note: NoteRecord, query: string}) {
    const [name, setName] = useState('')
    const [matched, setMatched] = useState('')

    useEffect(()=>{
        const getname = async ()=>{
            const username = await getUsername(note.author);
            setName(n => username)
        }
        getname();
    }, [note.author])

    useEffect(()=>{
        const idx = note.content.indexOf(query);
        if (idx >= 0) {
            const sub = he.decode(note.content).replace(/&newline&/g, ' ').substring(idx, 50);
            setMatched(sub);
        }
    }, [note.content, query])
    
    
    return (
        <article className="p-4 flex border-dark-100 border-2 rounded-md w-full relative overflow-hidden">
            <div className="flex flex-col justify-between h-full flex-1 gap-2">
                <div className="flex justify-between w-full items-center">
                    <Link href={note.public_url}><h4 className="font-open text-lg font-bold truncate">{he.decode(note.title)}</h4></Link>
                    <Link href={`/public-notes/${name}`} className="font-extralight italic text-sm">{name}</Link>
                </div>
                {query !== '' && <p><small className="bg-salt-50 text-dark-50 truncate">{matched}</small></p>}
                <p><small><em>{formatTimeString(note.last_edit)}</em></small></p>
            </div>
            <NotePreviewMenu note={note} />
        </article>
    )
}