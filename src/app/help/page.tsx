
import RoundedInset from "../_components/RoundedInset";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: 'Help | NextNotes',
    description: 'Learn more about how to use NextNotes, the simple note-taking and organizing app',
  }

export default function HelpPage() {
    return (
        <>
            
            <section className="flex flex-col gap-4 p-4 w-full h-full justify-center">
                <h1 className="text-3xl text-center font-lato my-4 text-salt-100 lg:text-[3rem]">How to use Next Notes</h1>
                    <ol className="list-decimal pl-6 text-xl lg:text-2xl leading-8 font-open filter drop-shadow-xl indent-2 lg:text-center lg:w-fit lg:m-auto ">
                        <li className="lg:my-4">Sign in or create an account</li>
                        <li className="lg:my-4">Create a note and give it a title</li>
                        <li className="lg:my-4">Set the note privacy status</li>
                    </ol>
                
                <RoundedInset>
                    <ul className="list-disc text-lg font-open font-extralight p-4 leading-loose lg:text-2xl lg:text-center lg:leading-12 lg:list-none">
                        <li className="lg:my-4">Public notes are visible to all</li>
                        <li className="lg:my-4">Private notes are only visible to you</li>
                        <li className="lg:my-4">Review your notes</li>
                        <li className="lg:my-4">Browse public notes</li>
                        <li className="lg:my-4">Share links to public notes</li>
                        <li className="lg:my-4">Contact <a className="underline" href="mailto:hutchison.music@gmail.com">site admin</a> with issues or questions</li>
                    </ul>
                </RoundedInset>
            </section>

        </>
    )
}