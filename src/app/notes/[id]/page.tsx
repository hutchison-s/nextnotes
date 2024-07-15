import RoundedInset from "@/app/_components/RoundedInset";
import { getNote } from "./actions";
import FullNote from "@/app/_components/FullNote";
import Link from "next/link";
import { ChevronLeft, MoreHorizontal } from "lucide-react";
import FullNoteMenu from "@/app/_components/FullNoteMenu";

export default async function NotePage({params}: {params: {id: string}}) {
    
    const note = await getNote(params.id);

    

    return (
        <>
            <article className="flex flex-col w-full h-full">
                <Link href='/notes' className="flex gap-2 py-2"><ChevronLeft/> Back to Notes</Link>
                <RoundedInset>
                    <FullNoteMenu isOwner note={note}/>
                    <FullNote note={note} />
                </RoundedInset>
            </article>
        </>
    )
}