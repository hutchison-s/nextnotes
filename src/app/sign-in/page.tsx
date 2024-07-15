import RoundedInset from "../_components/RoundedInset";
import { login, signup } from "../_utils/supabase/serverActions";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: 'Sign-in | NextNotes',
    description: 'Sign in or create an account to start taking notes with NextNotes',
  }

export default function SignInPage() {

    
    return (
        <>
            <RoundedInset>
                <div className="flex flex-col justify-center gap-4 h-full">
                    <h1 className="font-lato text-4xl text-center text-salt-100 mt-6">Next Notes</h1>
                    <h2 className="my-8 text-center font-open font-light text-2xl">Get started by signing in or creating a new account</h2>
                    {/* <form className="grid items-center w-full p-2 gap-6 font-open" onSubmit={handleSubmit}> */}
                    <form className="grid items-center w-full p-2 gap-6 font-open" >
                        <label className="grid w-3/4 min-w-[280px] max-w-[500px] m-auto">
                            <span>Email</span>
                            <input type="email" name="email" id="email" className="p-1 rounded-md bg-dark-50 text-lg" required/>
                        </label>
                        <label className="grid w-3/4 min-w-[280px] max-w-[500px] m-auto mb-6">
                            <span>Password</span>
                            <input type="password" name="password" id="password" className="p-1 rounded-md bg-dark-50 text-lg" pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$" required/>
                        </label>
                        <button className="btn-primary" formAction={login}>Sign in</button>
                        <button className="btn-secondary" formAction={signup}>Create Account</button>
                    </form>
                </div>
            </RoundedInset>
        </>
    )
}