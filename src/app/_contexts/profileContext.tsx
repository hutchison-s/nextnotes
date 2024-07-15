'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createClient, signOut } from "../_utils/supabase/client";
import { createClient as cC } from "../_utils/supabase/server";
import { revalidatePath } from "next/cache";
import { AuthChangeEvent, Session, Subscription, SupabaseClient } from "@supabase/supabase-js";
import { getProfile } from "../_utils/supabase/serverActions";

type Profile = {
    id?: string,
    user_id?: string,
    username?: string
} | null

type contexttype = {
    profile: Profile,
    updateProfile: (p: Profile) => void
}

const initialProfile = {profile: null, updateProfile: (p: Profile)=>console.log(p)}

const ProfileContext = createContext<contexttype>(initialProfile);

export function ProfileProvider({ children }: { children: ReactNode }) {
    const [profile, setProfile] = useState<Profile>(null);

    useEffect(()=>{
        const initProfile = async ()=>{
            const p = await getProfile()
            setProfile(p)
        }
        initProfile()
    }, [])

    return (
        <ProfileContext.Provider value={{profile, updateProfile: setProfile}}>
            {children}
        </ProfileContext.Provider>
    );
}

export const useProfile = () => useContext(ProfileContext);
