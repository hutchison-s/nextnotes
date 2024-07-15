import { createBrowserClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";

const validateEmail = (email: FormDataEntryValue | null): string => {
    if (typeof(email) !== 'string' || !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(email)) {
        throw new Error('Invalid email format');
    }
    return email;
}

const validatePass = (password: FormDataEntryValue | null): string => {
    if (typeof(password) !== 'string') {
        throw new Error('Invalid password format')
    }
    const pieces = [
        /[A-Z]+/,        // At least one uppercase letter
        /[a-z]+/,        // At least one lowercase letter
        /[0-9]+/,        // At least one digit
        /[!@#$%^&*(),.?":{}|<>]/, // At least one special character
        /^.{8,24}$/      // Length between 8 and 24 characters
    ];
    for (const check of pieces) {
        if (!check.test(password)) {
            throw new Error('Invalid password format')
        }
    }
    return password;
}

export function createClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

    if (!url || !key) {
        console.log('Could not find env variables. Found', url,key);
        throw new Error('missing env variables')
    }

    return createBrowserClient(
        url, key
    )
}

export async function getCurrentUser() {
    const sb = createClient();
    return await sb.auth.getUser();
}

export async function signOut() {
    const sb = createClient();
    const {error} = await sb.auth.signOut();
    if (error) {
        throw new Error('Error signing user out')
    }
    return true
}

export async function signIn(formData: FormData) {
    const sb = createClient();
    const email = validateEmail(formData.get('email'));
    const password = validatePass(formData.get('password'));

    const data = {email, password};
    const {error} = await sb.auth.signInWithPassword(data);
    if (error) {
        throw new Error('Invalid Credentials')
    }
}

export async function signup(formData: FormData) {
    const sb = createClient()
    const email = validateEmail(formData.get('email'));
    const password = validatePass(formData.get('password'));
  
    const loginData = {email, password};
  
    const { error, data } = await sb.auth.signUp(loginData)
    if (error) {
      throw new Error('Could not create account: '+error.message)
    }
    return data.user;
  }
