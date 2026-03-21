import "dotenv/config";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin as adminPlugin } from "better-auth/plugins"
import { genericOAuth } from "better-auth/plugins"
// If your Prisma file is located elsewhere, you can change the path
import {prisma} from '@/lib/prisma'
import { getIfEmailSignupEnabled, getMinimumPasswordLength } from "./helpers/env";
import { ac, admin, manager, user } from "@/lib/permissions"
import { emailOTP } from "better-auth/plugins"
import { sendLoginOTPEmail } from "./helpers/api/email";

let plugins = [
        adminPlugin({
            ac,
            roles: {
                admin,
                manager,
                user
            }
        }),
        genericOAuth(
                    {
                        config:[
                            {
                                providerId:"AUTHENTIK",
                                clientId: process.env.AUTHENTIK_CLIENT_ID!,
                                clientSecret:process.env.AUTHENTIK_CLIENT_SECRET!,
                                discoveryUrl:process.env.AUTHENTIK_DISCOVERY_URL!,
                            }
                        ]
                    }
            ),
        emailOTP({ 
        async sendVerificationOTP({ email, otp, type }) { 
                if (type === "sign-in") { 
                    // Send the OTP for sign in
                    await sendLoginOTPEmail(email, otp)
                } else if (type === "email-verification") { 
                    // Send the OTP for email verification
                } else { 
                    // Send the OTP for password reset
                } 
            }, 
        }) 
]
// console.log("process.env.OAUTH_ENABLED_PROVIDERS", process.env.OAUTH_ENABLED_PROVIDERS, )
let emailAndPasswordEnabled = getIfEmailSignupEnabled()
if(process.env.OAUTH_ENABLED_PROVIDERS){
    const parsedProviders =  JSON.parse(process.env.OAUTH_ENABLED_PROVIDERS!)
    if(Array.isArray(parsedProviders))
    for(const i in parsedProviders){
        // switch(parsedProviders[i]){

        //     case "EMAIL":
        //         emailAndPasswordEnabled=true
        //         break;
        //     case :
        //         plugins.push()
        //         break;
        // }
        
    }
}
export const auth = betterAuth({
    trustedOrigins: process.env.CORS_TRUSTED_ORIGINS ? JSON.parse(process.env.CORS_TRUSTED_ORIGINS) : [],
    database: prismaAdapter(prisma, {
        provider: (process.env.DB_DIALECT && (process.env.DB_DIALECT =="postgresql" || process.env.DB_DIALECT =="mysql" || process.env.DB_DIALECT =="sqlite")) ? process.env.DB_DIALECT: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: { 
        enabled: emailAndPasswordEnabled, 
        minPasswordLength:getMinimumPasswordLength()
    }, 
    plugins: plugins,
    rateLimit: {
        enabled: true,
        storage: "database",
        modelName: "rateLimit", //optional by default "rateLimit" is used
        customRules: {
        "/sign-in/email-otp": {
            window: 10,
            max: 3,
        },
        "/two-factor/*": async (request)=> {
            // custom function to return rate limit window and max
            return {
                window: 10,
                max: 3,
            }
        }
        },
    }
    
});