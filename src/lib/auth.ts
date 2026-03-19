import "dotenv/config";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins"
import { genericOAuth } from "better-auth/plugins"
// If your Prisma file is located elsewhere, you can change the path
import {prisma} from '@/lib/prisma'

let plugins = [
        admin(),
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
            )
]
// console.log("process.env.OAUTH_ENABLED_PROVIDERS", process.env.OAUTH_ENABLED_PROVIDERS, )
let emailAndPasswordEnabled = false
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
    }, 
     plugins: plugins
});