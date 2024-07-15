'use client'

import { useProfile } from "@/app/_contexts/profileContext"
import { createClient } from "@/app/_utils/supabase/client";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Authenticate() {
    const {updateProfile} = useProfile();
    const router = useRouter();

    useEffect(()=>{
        const getUser = async () => {
            const sb: SupabaseClient = createClient();
            const {data: {user}, error} = await sb.auth.getUser();
            return user;
        }
        const getProfile = async () => {
            const user = await getUser();
            if (!user) {
                updateProfile(null)
                return router.push('/sign-in')
            }
            const sb: SupabaseClient = createClient();
            const {data, error} = await sb.from('profiles').select('*').eq('user_id', user.id).single();
            if (error) {
                console.log(error);
                throw new Error('Error retrieving profile')
            }
            if (!data) {
                updateProfile(null)
                router.push('/sign-in')
            } else {
                updateProfile(data)
                router.push('/')
            }
        }

        getProfile()

    }, [router, updateProfile])

    return (
        <>
            <section className="grid items-center w-full h-full text-4xl text-salt-100">
                <LoaderCircle id="loader" size={200} className="m-auto"/>
            </section>
        </>
    )
}