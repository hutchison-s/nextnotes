
import Link from "next/link";
import LogoImage from "./LogoImage";
import RoundedInset from "./RoundedInset";

export default function VisitorWelcome() {
    return (
        <>
            <div className="p-4 h-full">
                <RoundedInset>
                <div className="flex flex-col h-full w-full justify-center gap-4 flex-1">
                    <h1 className="text-salt-100 font-lato text-2xl text-center">Welcome to Next Notes</h1>
                    <div className="flex justify-center p-2 my-2">
                    <LogoImage size={120} />
                    </div>
                    <div className="flex-3">
                    <p className="font-light font-open text-xl leading-relaxed mb-6">NextNotes is a straightforward notes application to help organize your life. We help keep the complex simple.</p>
                    <p className="font-light font-open text-xl leading-relaxed"><Link href='/sign-in' className="underline">Sign in</Link> or create an account to begin saving and sharing your notes.</p>
                    </div>
                    <div className="w-full h-12 grid items-center my-2">
                        <Link className="btn-primary" href='/sign-in'>Get Started</Link>
                    </div>
                </div>
                </RoundedInset>
            </div>
        </>
    )
}