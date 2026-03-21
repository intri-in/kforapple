import { redirect } from "next/navigation";

export function redirectToLoginPage(redirect_url?: string){
    let finalURL = `/login`
    if(redirect_url){
        finalURL += `?redirect_url=${redirect_url}`
    }
    redirect(finalURL)

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