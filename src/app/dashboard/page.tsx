import { auth } from "@/lib/auth";
import { redirectToLoginPage } from "@/lib/helpers/auth";
import { headers } from "next/headers";

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session) {
      redirectToLoginPage()
    }
    
    return <h1>Welcome {session!.user.name}</h1>
}