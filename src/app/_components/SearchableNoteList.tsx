'use client'
import React, { ChangeEventHandler, useState } from "react";
import { NoteRecord } from "../_utils/types";
import ClientNotePreview from "./ClientNotePreview";
import PublicSearchPreview from "./PublicSearchPreview";

export default function SearchableNoteList({notes}: {notes: NoteRecord[]}) {
    const [q, setQ] = useState('')

    const handleInput: ChangeEventHandler<HTMLInputElement> = (e)=>{
        console.log(e.target.value);
        const newQ = e.target.value;
        setQ(newQ);
    }

    return (
        <>
            <input
                type="search"
                name="query"
                id="query"
                onInput={handleInput}
                placeholder="Search..."
                className="px-2 py-1 my-4 min-w-[250px] max-w-[400px] w-3/4 bg-dark-50 rounded-lg border-cream-75 border-[1px] font-open font-light text-salt-100 m-auto block"
            />
            <ul className="grid gap-2 w-full">
                {notes
                    .filter(x => q === '' || x.content.match(q))
                    .map((note, i) => 
                        <li key={note.id}>
                            <PublicSearchPreview note={note} query={q} />
                        </li>
                    )}
            </ul>

        </>
    );
}
