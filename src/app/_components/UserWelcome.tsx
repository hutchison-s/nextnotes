import Link from "next/link";
import LogoImage from "./LogoImage";
import RoundedInset from "./RoundedInset";
import { createClient } from "../_utils/supabase/server";

const getRecent = async () => {
    'use server'
    const sb = createClient()
    const {data:userData} = await sb.auth.getUser();
    const {data} = await sb.from('notes').select('*').eq('author', userData?.user?.id).order('last_edit', {ascending: false}).limit(3);
    return data
}

export default async function UserWelcome() {
    const recentNotes = await getRecent();

    return (
        <>
            <div className="py-8 px-4 h-full">
                <RoundedInset>
                <div className="flex flex-col h-full w-full justify-center gap-6">
                    <h1 className="text-salt-100 font-lato text-2xl text-center">Welcome to Next Notes</h1>
                    <div className="flex justify-center p-2">
                    <LogoImage size={120} />
                    </div>
                    {recentNotes && recentNotes.length > 0 
                        ? <><div className="mb-6">
                    <h4 className="font-light font-open text-xl leading-relaxed text-center">
                        <span>Your Recent Notes</span>
                    </h4>
                    <div className="w-full flex justify-even gap-1">
                        {recentNotes?.map(n => <Link href={`/notes/${n.id}`} key={n.id} className="flex-1 font-open p-2 underline text-center text-xs border-dark-100 border-x-2 truncate hover:bg-dark-50">{n.title}</Link>)}
                    </div>
                        
                    </div>
                    <div className="grid items-center gap-4">
                        <Link className="btn-primary" href='/notes'>My Notes</Link>
                        <Link className="btn-primary" href='/public-notes'>Public Notes</Link>
                        <Link className="btn-primary" href='/compose'>Compose</Link>
                    </div>
                </>
                        : <Link href='/compose' className="btn-primary">Write Your First Note</Link>
            }</div>
                </RoundedInset>
            </div>
        </>
    )
}