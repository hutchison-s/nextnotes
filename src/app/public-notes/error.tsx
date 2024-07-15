'use client'

import { useEffect } from "react";

export default function Error({
    error,
    reset
}: {
    error: Error & {digest?: string}
    reset: ()=>void
}) {
    useEffect(()=>{
        console.log(error);
    }, [error])

    return (
        <>
            <div className="w-full h-full grid items-center">
                <div className="wrapper">
                    <h2 className="text-3xl text-center text-salt-100 font-lato mb-8">Note Unavailable</h2>
                    <p className="my-4 text-md font-open font-light text-center">{error.message}</p>
                    <button onClick={()=>reset()} className="btn-primary">Try again</button>
                    <p className="text-center my-4"><small><em>If you are the author, try signing in to change its privacy settings.</em></small></p>
                </div>
            </div>
        </>
    )
}