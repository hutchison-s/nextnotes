import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import LogoImage from "./LogoImage";
import { Suspense, useState } from "react";
import { signOut } from "@/app/_utils/supabase/client";
import MainMenu from "./MainMenu";
import LoggedInAs from "./LoggedInAs";
import { ProfileProvider } from "../_contexts/profileContext";
import { logout } from "../_utils/supabase/serverActions";

export default function NavBar() {

    return (
        <>
            
            <nav className="bg-gradient-to-r from-cream-100 to-transparent px-3 py-2 relative h-14 lg:absolute lg:top-0 lg:left-0 lg:w-full">
            <div className="flex justify-between w-100">
                <div className="flex gap-2 align-center">
                    <Link href='/' className="text-bean-50" >
                        <LogoImage/>
                    </Link>
                    <LoggedInAs />
                </div>
                <MainMenu />
            </div>
            </nav>
            
        </>
    )
}