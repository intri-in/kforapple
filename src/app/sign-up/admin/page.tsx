import { DEFAULT_LANGUAGE, DEFAULT_METADATA } from "#/defines/constants"
import FullPageLoadingPlaceholder from "@/components/general/FullPageLoadingPlaceholder"
import { LoginForm } from "@/components/login/LoginForm"
import { serverTranslation } from "@/i18n"
import { Suspense } from "react"
import { unauthorized } from 'next/navigation'
import { getSuccessFromAPIReponse } from "@/lib/helpers/api/parsers"
import { getAPIURL } from "@/lib/helpers/env"
export async function generateMetadata({  searchParams }: {  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>  }){
  const lng = (await searchParams)?.lng?.toString() ?? DEFAULT_LANGUAGE
  const i18n= await serverTranslation(lng)

//   const slug = validator.escape(params.slug)
   let toReturn = DEFAULT_METADATA
//   const newMetaTags = []
  const pageTitle = `${i18n.t("KFORAPPLE")} | ${i18n.t("LOGIN")}`

toReturn.title = pageTitle
toReturn.description = pageTitle
toReturn.openGraph={
  images:[{
    url: 'cover/default_cover_image.jpg'
  }
  ]
} 

return toReturn
  
}

const getIfAllowedtoAccess = async () =>{
    return new Promise( (resolve, reject) => {
      const url_api=getAPIURL()+"sign-up/admin/check"

        const requestOptions = {
            method: 'GET',
            mode: 'cors',    
        }
    
        fetch(url_api, requestOptions as RequestInit)
        .then(response =>{
            return response.json()
          })
        .then((body) =>{
          return resolve(getSuccessFromAPIReponse(body))
        }
      ).catch( (e)=>{
        console.error("getIfAllowedtoAccess", e)
        return resolve(false)
      })

    })
        
}
export default async function Home({searchParams }:{ searchParams?: Promise<{ [key: string]: string | string[] | undefined }>}) {
  const lng = (await searchParams)?.lng?.toString() ?? DEFAULT_LANGUAGE
  const allowed = await getIfAllowedtoAccess()  
  if(!allowed){
    return unauthorized()
  }
  return (
      <Suspense fallback={<FullPageLoadingPlaceholder />}>
        <LoginForm callbackURL="/sign-up/admin/finalise" admin={allowed ? true: false} lng={lng} action="signup" />
      </Suspense>
        
  )
}