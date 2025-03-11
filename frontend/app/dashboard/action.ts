"use server"
import axios from 'axios';
import { cookies } from 'next/headers';

export async function deleteAuthCookie() {
  "use server"
  const cookieStore = await cookies();
  cookieStore.delete('Authorization');
}

export async function handleLogout() {

  try{
    await axios.post(`${process.env.NEXT_PUBLIC_ROUTE}/auth/logout`,{
        withCredentials: true
    });
    deleteAuthCookie()
    console.log('User logged out on server');
    return {success: true}
  }
  catch(err:any){
    return {success: false}
  }

}