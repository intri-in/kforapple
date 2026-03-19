import { redirect } from "next/navigation";

export function redirectToLoginPage(){
    redirect("/login")

}

export function getEnabledLoginProviders(): string[]{
    if(!process.env.NEXT_PUBLIC_OAUTH_ENABLED_PROVIDERS) return []
    try{
        const toReturnArray = JSON.parse(process.env.NEXT_PUBLIC_OAUTH_ENABLED_PROVIDERS)
        if(toReturnArray && Array.isArray(toReturnArray)) return toReturnArray
        return []
    }catch(e){
        console.error("getEnabledLoginProviders", e)
        return []
    }

}