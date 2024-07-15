import Link from "next/link";
import NotePreview from "../_components/NotePreview";
import { createClient } from "../_utils/supabase/server";
import { getMyNotes } from "./actions";
import { Plus, PlusCircle, PlusCircleIcon } from "lucide-react";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: 'My Notes | NextNotes',
    description: 'View, manage, and share your notes, or create something new!',
  }

export default async function MyNotes() {
    const rows = await getMyNotes();
    const sb = createClient();
    const {data: {user}} = await sb.auth.getUser()
   
    return (
        <>
            <section className="flex flex-col pb-[80px]">
                <h1 className="text-3xl font-bold font-lato text-center mt-4 mb-6 h-fit">My Notes</h1>
                <ul className="grid gap-2 w-full flex-1">
                    {rows.length > 0
                        ?   rows.map(row => <li key={row.id}><NotePreview  note={row} isPublic={false}/></li>)
                        :   <Link href='/compose' className="btn-primary">New Note <Plus className="inline -translate-y-[2px]"/></Link>
                    }
                </ul>
            </section>
            <Link href='/compose' className="absolute bottom-4 right-4 z-20 ">
                <PlusCircleIcon 
                    fill="var(--one)"
                    fillOpacity='0.75' 
                    stroke="var(--three)" 
                    strokeWidth={1} 
                    size={60}
                />
            </Link>
        </>
    )
}