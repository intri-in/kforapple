import { getBaseURL } from "@/lib/helpers/env"
import { Metadata } from "next"


export const SUPPORTED_LANGUAGES = ["en", "hi"]
export const DEFAULT_LANGUAGE = "en"

export const DEFAULT_METADATA: Metadata = {
    title:"KForApple - Quiz Software",
    metadataBase: new URL(getBaseURL()),
    description:"A self-hosted tool for creating quizzes.",
    keywords:"quiz, self-hosted, open-source",
    icons:[
        {
            rel:"icon",
            url:"/kforappleLogoHQ.png"
        }
    ],
    openGraph:{
        images:[{
            url:"/cover/archiveCover.jpg"

        }
     ]    
    
    }
}
