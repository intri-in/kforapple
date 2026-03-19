// src/lib/auth-client.ts
import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins"
import { genericOAuthClient } from "better-auth/client/plugins"
import { getBaseURL } from "./helpers/env";
let plugins = [
        adminClient(),
        genericOAuthClient()  
]

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  plugins: plugins
});

export const { signIn, signUp, signOut, useSession } = authClient;