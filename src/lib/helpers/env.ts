import { getEnabledLoginProviders } from "./auth"
import { addTrailingSlashtoURL } from "./general"

export function getBaseURL(){
    if(!process.env.NEXT_PUBLIC_BASE_URL) throw new Error("BASE_URL param not defined.")
    return process.env.NEXT_PUBLIC_BASE_URL
}
export function getAPIURL(){
    return addTrailingSlashtoURL(getBaseURL())+'api/'
}

export function getMinimumPasswordLength(){
    if(!process.env.NEXT_PUBLIC_MIN_PASSWORD_LENGTH) return 8
    const length = parseInt(process.env.NEXT_PUBLIC_MIN_PASSWORD_LENGTH)
    if(isNaN(length)) return 8
    return length
}

export function getIfEmailSignupEnabled(){
    const enabledProviders =  getEnabledLoginProviders()
    return enabledProviders.includes("EMAIL")
}

export function getOTPLength(){
    
    if(!process.env.NEXT_PUBLIC_OTP_LENGTH) return 6
    const length = parseInt(process.env.NEXT_PUBLIC_OTP_LENGTH)
    if(isNaN(length)) return 8
    return length

}