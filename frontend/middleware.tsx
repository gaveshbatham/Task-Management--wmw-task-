import { NextResponse } from "next/server";

export function middleware(request: any){
    const user = "true"
    if(!user){
        return NextResponse.redirect( new URL("/signup", request.url))
    }
    return NextResponse.next()
// const { pathname } = request.nextUrl;

// const blockedRoutes = ['/dashboard/users'];

// if (blockedRoutes.includes(pathname)) {
//   return NextResponse.rewrite(new URL('/', request.url));
// }
}

export const config ={
    matcher:['/dashboard', '/dashboard/Important', '/dashboard/assigned']
}