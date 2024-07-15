import type { Metadata } from "next";
import {Lato, Open_Sans} from 'next/font/google';
import "./globals.css"
import NavBar from "./_components/NavBar";
import { ProfileProvider } from "./_contexts/profileContext";
import { createClient } from "./_utils/supabase/server";
import { logout } from "./_utils/supabase/serverActions";

export const lato = Lato({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-lato'
})

export const open = Open_Sans({
  subsets: ['latin'],
  weight: 'variable',
  display: 'swap',
  variable: '--font-open'
})



export const metadata: Metadata = {
  title: "Next Notes",
  description: "initial note app in Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const sb = createClient()
  // const {data: {subscription}} = sb.auth.onAuthStateChange((event, session) => {
  //   console.log('event:', event);
  //   console.log('session:', session?.refresh_token,session?.user.email);
  // })

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
      </head>
      <ProfileProvider>
        <body className={`${lato.variable} ${open.variable} h-screen w-screen max-w-4xl bg-bean-100 text-cream-100 overflow-hidden flex flex-col m-auto relative lg:grid lg:items-center`}>
        
          <NavBar />
          <main id="pageWrap" className="p-2 w-full min-h-3xl flex-1 overflow-auto max-w-[800px] m-auto lg:max-h-[1200px] lg:max-w-[800px] lg:min-h-[800px] lg:h-3/4 lg:p-6">
            {children}
          </main>
        
        
      </body>
      </ProfileProvider>
    </html>
  );
}
