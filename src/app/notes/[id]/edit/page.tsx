import Link from "next/link";
import { getNote } from "../actions";
import { saveEdit } from "./actions";
import PrivacyButton from "@/app/_components/PrivacyButton";
import RoundedInset from "@/app/_components/RoundedInset";
import { ChevronLeft } from "lucide-react";
import he from "he";

export default async function NoteEditPage({params}: {params: {id: string}}) {
    
    const note = await getNote(params.id);

    

    return (
        <>
            <article className="flex flex-col w-full h-full">
                <Link href='/notes' className="flex gap-2 py-2"><ChevronLeft/> Back to Notes</Link>
                <RoundedInset>
                    <form className="flex flex-col gap-4 h-full">
                        <input type="text" hidden value={params.id} name="note_id" id="note_id"/>
                        <div className="h8 py-2 bg-dark-25 rounded-sm p-4 flex w-full">
                            <input
                                type="text"
                                name="title"
                                id="title"
                                defaultValue={note.title}
                                className=" text-xl font-lato flex-1 bg-transparent"/>
                            <div className="relative">
                                <PrivacyButton checked={note.is_private}/>
                            </div>
                        </div>
                        <textarea 
                            name="content" 
                            id="content" 
                            className="flex-1 bg-dark-25 rounded-sm p-4"
                            defaultValue={he.decode(note.content).replace(/&newline&/g, '\n')}>
                        </textarea>
                        <button className="btn-primary" formAction={saveEdit}>Save</button>
                    </form>
                </RoundedInset>
            </article>
        </>
    )
}