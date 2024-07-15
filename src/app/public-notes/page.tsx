import { ChevronLeft } from "lucide-react";
import NotePreview from "../_components/NotePreview";
import { createClient } from "../_utils/supabase/server"
import Link from "next/link";
import SearchableNoteList from "../_components/SearchableNoteList";
import { getAllPublic } from "./actions";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: 'Public Notes | NextNotes',
    description: 'Browse and search public notes from all users',
  }

export default async function PublicNotes() {
    const notes = await getAllPublic();

    return (
        <>
        <h1 className="text-3xl font-bold font-lato text-center mt-4 mb-6">Public Notes</h1>
        <SearchableNoteList notes={notes}/>
        </>
    )
}