import FullNote from "@/app/_components/FullNote";
import { getPublicNote } from "../../actions";
import RoundedInset from "@/app/_components/RoundedInset";
import FullNoteMenu from "@/app/_components/FullNoteMenu";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function PublicNote({params}: {params: {user_id: string, public_id: string}}) {
    console.log(params.user_id, params.public_id);
    
    const note = await getPublicNote(params.user_id, params.public_id);
    return (
        <>
        <article className="flex flex-col w-full h-full">
            <Link href='/public-notes' className="flex gap-2 py-2"><ChevronLeft/> All Public Notes</Link>
            <RoundedInset>
                <FullNoteMenu isOwner={false} note={note}/>
                <FullNote note={note} />
            </RoundedInset>
        </article>
            
        </>
    )
}