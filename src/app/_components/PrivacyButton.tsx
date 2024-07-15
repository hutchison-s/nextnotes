'use client'

import { Earth, SquareUserRound } from "lucide-react";
import { useState } from "react"

export default function PrivacyButton({checked}: {checked: boolean}) {
    const [isChecked, setIsChecked] = useState(checked);

    const handleChange = ()=>{
        setIsChecked(c=>!c)
    }
    return (
        <>
            <label className="flex flex-col items-center justify-center">
                {isChecked 
                    ? <><SquareUserRound/><span className="text-[10px]">private</span></>
                    : <><Earth/><span className="text-[10px]">public</span></>
                }
                <input type="checkbox" name="isPrivate" id="isPrivate" className="hidden" checked={isChecked} onChange={handleChange}/>
            </label>
        </>
    )
}