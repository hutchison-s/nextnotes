import SearchableNoteList from "@/app/_components/SearchableNoteList";
import { getPublicByAuthor } from "../actions";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";


export default async function PublicUserNotes({params}: {params: {user_id: string}}) {
    const notes = await getPublicByAuthor(params.user_id);

    return (
        <>
        <article className="flex flex-col w-full h-full">
        <Link href='/public-notes' className="flex gap-2 py-2"><ChevronLeft/> All Public Notes</Link>
        <h1 className="text-3xl font-bold font-lato text-center mt-4 mb-6">{params.user_id}&apos;s<br></br>Public Notes</h1>
        <SearchableNoteList notes={notes}/>
        </article>
        </>
    )
}