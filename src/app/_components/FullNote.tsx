
import he from "he";
import { formatTimeString } from "../_utils/formats";
import { NoteRecord } from "../_utils/types";
import PrivacyDisplay from "./PrivacyDisplay";


export default function FullNote({note}: {note: NoteRecord}) {

    return (
        <>
            
            <div className="flex flex-col h-full">
                <header className="relative flex gap-2 mb-4 w-3/4">
                    <h4 className="font-open text-2xl font-bold mb-2 h-8">{he.decode(note.title)}</h4>
                </header>
                <pre className="flex-1 font-open leading-tight whitespace-pre">
                    <div>{decodeContent(note.content)}</div>
                </pre>
                <footer className="h-10 leading-none relative">
                    <p><small className="text-[10px]"><em>Edited {formatTimeString(note.last_edit)}</em></small></p>
                    <p><small className="text-[10px]"><em>Created {formatTimeString(note.created_at)}</em></small></p>
                    <div className="absolute right-0 bottom-1">
                        <PrivacyDisplay is_private={note.is_private}/>
                    </div>
                </footer>
            </div>
        </>
    )
}

function decodeContent(text: string) {
    const arr = text.split('&newline&');
    return arr.map((line, i) => <p key={i} className="m-0 w-full text-wrap">{he.decode(line)}</p>)
}