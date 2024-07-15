import { Earth, SquareUserRound } from "lucide-react";

export default function PrivacyDisplay({is_private}: {is_private: boolean}) {
    return (
        
        <>
            <label className="flex flex-col items-center justify-center">
                {is_private 
                    ? <><SquareUserRound/><span className="text-[10px]">private</span></>
                    : <><Earth/><span className="text-[10px]">public</span></>
                }
            </label>
        </>
        
    )
}