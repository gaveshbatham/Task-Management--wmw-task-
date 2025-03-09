import { NextResponse } from "next/server";
import { useSelector } from "react-redux";

export function middleware(request: any){
    const user = useSelector((state:any) => state.user)
    if(!user){
        return NextResponse.redirect( new URL("/signup", request.url))
    }
    if(user.role === "user"){
    const { pathname } = request.nextUrl;
    const blockedRoutes = ['/dashboard/users'];
   if (blockedRoutes.includes(pathname)) {
     return NextResponse.rewrite(new URL('/404', request.url));
  } 
 }
}

export const config ={
    matcher:['/dashboard', '/dashboard/Important', '/dashboard/assigned']
}