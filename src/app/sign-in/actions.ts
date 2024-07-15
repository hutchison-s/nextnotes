'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/app/_utils/supabase/server'

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

export async function login(formData: FormData) {
  const supabase = createClient()
  const email = validateEmail(formData.get('email'));
  const password = validatePass(formData.get('password'));

  const data = {email, password};

  const { data:userData, error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    throw new Error('Invalid credentials')
  }
  revalidatePath('/', 'layout')
  redirect('/sign-in/authenticate/'+userData.user.id)
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  const email = validateEmail(formData.get('email'));
  const password = validatePass(formData.get('password'));

  const loginData = {email, password};

  const { error, data } = await supabase.auth.signUp(loginData)
  if (error) {
    throw new Error('Could not create account: '+error.message)
  }
  console.log('Created user:', data.user?.id, data.user?.email);
  
  await createProfile(data.user!.id, data.user?.email!)
  revalidatePath('/', 'layout')
  redirect('/notes')
}

export async function createProfile(id: string | undefined, email: string | undefined) {
  const sb = createClient();
  const newUSERNAME = email?.split('@')[0];
  const {error} = await sb.from('profiles').insert({user_id: id, username: newUSERNAME});
  if (error) {
    console.log(error.code, error.message);
    
  }
  console.log('Created new profile.');
  
}

export async function logout() {
  const sb = createClient()
  const {error} = await sb.auth.signOut();
  if (error) {
    throw new Error('Server error while signing out:'+error.message)
  }
  revalidatePath('/', 'layout')
  redirect('/sign-in/authenticate')
}