'use client'

import { useEffect, useRef, useState } from "react";
import { NoteRecord } from "../_utils/types";
import { Copy, LinkIcon, MoreVertical, Pencil, Trash } from "lucide-react";
import { deleteNote, duplicateNote } from "../notes/actions";
import { useProfile } from "../_contexts/profileContext";
import Link from "next/link";

export default function NotePreviewMenu({note}: {note: NoteRecord}) {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState<string | null>(null)
    const menuRef = useRef<HTMLUListElement>(null);
    const {profile} = useProfile();
    const isOwner = profile?.user_id === note.author;

    const toggleOpen = ()=>{
        setIsOpen(o=>!o);
    }

    const handleDelete = async ()=>{
        setStatus('Deleting...')
        await deleteNote(note.id)
        setIsOpen(false)
        setTimeout(()=>{
            setStatus(null)
        }, 400)
    }
    const handleDuplicate = async () => {
        setStatus('Duplicating...')
        await duplicateNote(note)
        setIsOpen(false)
        setTimeout(()=>{
            setStatus(null)
        }, 400)
    }

    const handleCopyURL = () => {
        if (note.is_private) {
            setStatus('Note is Private')
        } else {
            setStatus('URL Copied')
            navigator.clipboard.writeText(note.public_url)
        }
        setIsOpen(false)
        setTimeout(()=>{
            setStatus(null)
        }, 1200)
        
    }

    useEffect(()=>{
        const otherClick = (e: MouseEvent) => {
            console.log(e.target);
            
            if (isOpen && menuRef.current && !menuRef.current.contains(e.target as Node) && !['svg', 'button', 'circle'].includes((e.target as HTMLElement).tagName)) {
                setIsOpen(false);
            }
        }
        window.addEventListener('click', otherClick);

        return ()=>{
            window.removeEventListener('click', otherClick)
        }
    }, [isOpen])

    return (
        <>
            <button onClick={toggleOpen} className={`p-3 z-10 rounded-md hover:bg-dark-25 ${isOpen ? 'text-bean-100' : ''}`}><MoreVertical className="m-auto"/></button>
            <ul ref={menuRef} className={`z-5 flex items-center justify-end pr-[4.5rem] gap-4 h-full w-full absolute right-0 top-0 bg-gradient-to-l from-cream-75 to-transparent backdrop-blur-md ${isOpen ? '' : 'translate-x-full'} transition duration-0.3 ease`}>
                {isOwner && <li className="hover:bg-dark-25 rounded-md w-fit h-fit p-2 filter drop-shadow-lg text-salt-100">
                    <Link href={`/notes/${note.id}/edit`}>
                        <Pencil size={36}/>
                    </Link>
                </li>}
                {isOwner && <li className="hover:bg-dark-25 rounded-md w-fit h-fit p-2 filter drop-shadow-lg text-salt-100"><button onClick={handleDelete}>
                    <Trash size={36}/>
                </button></li>}
                <li className="hover:bg-dark-25 rounded-md w-fit h-fit p-2 filter drop-shadow-lg text-salt-100"><button onClick={handleCopyURL}>
                    <LinkIcon size={36}/>
                </button></li>
                {isOwner && <li className="hover:bg-dark-25 rounded-md w-fit h-fit p-2 filter drop-shadow-lg text-salt-100"><button onClick={handleDuplicate}>
                    <Copy size={36}/>
                </button></li>}
            </ul>
            {status && <div id="statusUpdate" className="fixed left-1/2 top-1/2 py-2 px-4 bg-salt-50 backdrop-blur-sm text-dark-100 text-2xl rounded-xl z-8">{status}</div>}    
        </>
    )
}