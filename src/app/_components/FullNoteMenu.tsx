'use client'

import { MoreHorizontal } from "lucide-react"
import { useEffect, useState } from "react"
import { deleteNote } from "../notes/actions"
import { NoteRecord } from "../_utils/types"
import { getUsername } from "../_utils/supabase/serverActions"
import { useRouter } from "next/navigation"

export default function FullNoteMenu({isOwner, note}: {isOwner: boolean, note: NoteRecord}) {
    const [isOpen, setIsOpen] = useState(false)
    const [username, setUsername] = useState('');
    const router = useRouter();

    const toggleOpen = ()=>{
        setIsOpen(o => !o)
        console.log('opened');
    }
    const handleEdit = ()=>{
        router.push(`/notes/${note.id}/edit`);
    }
    const handleDelete = async ()=>{
        await deleteNote(note.id)
        router.push('/notes')
    }
    const handleCopyURL = async () => {
        if (note.is_private) {
            return;
        } else {
            navigator.clipboard.writeText(note.public_url)
        }
        setIsOpen(false)
    }

    useEffect(()=>{
        const initUsername = async()=>{
            const un = await getUsername(note.author);
            setUsername(un);
        }
        initUsername();
    }, [note])

    return (
        <>
            <ul 
            className={`absolute left-0 top-0 w-full min-h-[120px] pb-4 pt-16 text-xl font-light font-open text-salt-100 text-right bg-dark-25 backdrop-blur-md flex flex-col gap-4 px-8 ${isOpen ? 'translate-y-0' : '-translate-y-full'} transition-transform duration-3 ease z-5`}>
                {isOwner && <li onClick={handleEdit}>Edit</li>}
                {isOwner && <li onClick={handleDelete}>Delete</li>}
                <li onClick={handleCopyURL}>Copy Link</li>
            </ul>
            <button
                onClick={toggleOpen} 
                className={`absolute top-2 right-2 p-2 z-5`}>
                <MoreHorizontal />
            </button>
        </>
    )
}