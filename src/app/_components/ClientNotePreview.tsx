'use client'

import Link from "next/link";
import { NoteRecord } from "../_utils/types";
import { formatTimeString } from "../_utils/formats";
import he from 'he';
import NotePreviewMenu from "./NotePreviewMenu";
import { getUsername } from "../_utils/supabase/serverActions";
import { useEffect, useState } from "react";



export default function ClientNotePreview({note, isPublic}: {note: NoteRecord, isPublic: boolean}) {
    const [name, setName] = useState('')

    useEffect(()=>{
        const getname = async ()=>{
            const username = await getUsername(note.author);
            setName(n => username)
        }
        getname();
    }, [])
    
    
    return (
        <article className="p-4 flex border-dark-100 border-2 rounded-md w-full relative overflow-hidden">
            <div className="flex flex-col justify-between h-full flex-1 gap-2">
                <div className="flex justify-between w-full items-center">
                    <Link href={isPublic ? note.public_url : `/notes/${note.id}`}><h4 className="font-open text-lg font-bold truncate">{he.decode(note.title)}</h4></Link>
                    {isPublic && <p className="font-extralight italic text-sm">{name}</p>}
                </div>
                <p><small><em>{formatTimeString(note.last_edit)}</em></small></p>
            </div>
            {!isPublic && <NotePreviewMenu note={note} />}
            {/* <button className="p-3"><MoreVertical className="m-auto"></MoreVertical></button> */}
        </article>
    )
}