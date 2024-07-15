'use client'

import { useProfile } from "../_contexts/profileContext"

export default function LoggedInAs() {
    const {profile} = useProfile();

    if (profile) {
        return <h3 className="h-full items-center flex text-dark-100 font-lato">{profile.username}</h3>
    }
    
    return <h3 className="h-full items-center flex text-dark-100 font-lato">Please Sign In</h3>
}