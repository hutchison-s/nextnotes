'use client'

import { useState } from "react";
import { signOut } from "../_utils/supabase/client";
import Link from "next/link";
import { useProfile } from "../_contexts/profileContext";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { logout } from "../_utils/supabase/serverActions";

export default function MainMenu() {
    const router = useRouter();

    const [expanded, setExpanded] = useState(false);
    const {profile} = useProfile();

    const handleClick = ()=>{
        setExpanded(e => !e)
    }

    const handleSignOut = async ()=>{
        await logout();
        handleClick();
    }
    return (
        <>
        
        <button className="text-salt-100 p-2 block" onClick={handleClick}>
                    {expanded ? <ChevronUp/> : <ChevronDown />}
                </button>
        <ul className={`flex flex-col gap-4 text-3xl font-open font-light text-bean-100 px-4 py-6 absolute bg-gradient-to-r from-cream-100 to-transparent px-3 py-2 w-full left-0 top-full backdrop-blur-md z-20 ${expanded ? 'block' : 'hidden'}`}>
            
            {profile && <li onClick={handleClick}><Link href='/notes' className="hover:text-salt-100">My Notes</Link></li>}
            {profile && <li onClick={handleClick}><Link href='/public-notes' className="hover:text-salt-100">Public Notes</Link></li>}
            {profile ? <li onClick={handleSignOut}><Link href='/sign-in' className="hover:text-salt-100">Sign Out</Link></li> : <li onClick={handleClick}><Link href='/sign-in'>Sign In</Link></li>}
            <li onClick={handleClick}><Link href='/help' className="hover:text-salt-100">Help</Link></li>
        </ul>
        </>
    )
}