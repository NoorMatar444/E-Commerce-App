import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request:NextRequest){
    const token=await getToken({req:request})
    if(token){
        if(request.nextUrl.pathname==="/Login" || request.nextUrl.pathname==="/Register" ){
            return NextResponse.redirect(new URL('/',request.url))
        }else{
            return NextResponse.next();
        }
    }
    else{
        if(request.nextUrl.pathname==="/Cart"){
            return NextResponse.redirect(new URL('/Login',request.url))
        }else{
            return NextResponse.next();
        }
        
    }
}
export const config={
    matcher:['/Cart',"/Login","/Register" ]
}