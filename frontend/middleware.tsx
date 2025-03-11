import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { useSelector } from "react-redux";

export async function  middleware(request: NextRequest){
    const cookieStore = await cookies()
    const hasCookie = cookieStore.has("Authorization")
    if(!hasCookie){
        return NextResponse.redirect( new URL("/signup", request.url))
    }
//     if(user.role === "user"){
//     const { pathname } = request.nextUrl;
//     const blockedRoutes = ['/dashboard/users'];
//       if (blockedRoutes.includes(pathname)) {
//      return NextResponse.rewrite(new URL('/404', request.url));
//   } 
//  }
return NextResponse.next()
}

export const config ={
    matcher:['/dashboard', '/dashboard/Important', '/dashboard/assigned']
}