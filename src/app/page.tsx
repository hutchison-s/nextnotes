import Link from "next/link";
import RoundedInset from "./_components/RoundedInset";
import LogoImage from "./_components/LogoImage";
import VisitorWelcome from "./_components/VisitorWelcome";
import { isLoggedIn } from "./_utils/supabase/serverActions";
import UserWelcome from "./_components/UserWelcome";

export default async function Home() {

  const isUser = await isLoggedIn();

  return (
    <>
      {isUser
        ? <UserWelcome />
        : <VisitorWelcome />
      }
    </>
      
  );
}
