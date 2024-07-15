import { ChevronLeft, SquareUserRound } from "lucide-react";
import Link from "next/link";
import RoundedInset from "../_components/RoundedInset";
import { saveNote } from "./actions";
import PrivacyButton from "../_components/PrivacyButton";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: 'Compose | NextNotes',
    description: 'Create a new note with custom privacy status',
  }

export default function ComposePage() {
    return (
        <>
            <article className="flex flex-col w-full h-full">
                <Link href='/notes' className="flex gap-2 py-2"><ChevronLeft/> Back to Notes</Link>
                <RoundedInset>
                    <form className="flex flex-col gap-4 h-full">
                        <div className="h8 py-2 bg-dark-25 rounded-sm p-4 flex w-full">
                            <input
                                type="text"
                                name="title"
                                id="title"
                                defaultValue='Untitled'
                                className=" text-xl font-lato flex-1 bg-transparent"/>
                            <div className="relative">
                                <PrivacyButton checked/>
                            </div>
                        </div>
                        <textarea 
                            name="content" 
                            id="content" 
                            className="flex-1 bg-dark-25 rounded-sm p-4">
                        </textarea>
                        <button className="btn-primary" formAction={saveNote}>Save</button>
                    </form>
                </RoundedInset>
            </article>
        </>
    )
}