import { DEFAULT_LANGUAGE, DEFAULT_METADATA } from "#/defines/constants";
import { serverTranslation } from "@/i18n";
import { checkAccess_ServerSide } from "@/lib/helpers/frontend/login";
import { unauthorized } from "next/navigation";

export async function generateMetadata({  searchParams }: {  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>  }){
  const lng = (await searchParams)?.lng?.toString() ?? DEFAULT_LANGUAGE
  const i18n= await serverTranslation(lng)

//   const slug = validator.escape(params.slug)
   let toReturn = DEFAULT_METADATA
//   const newMetaTags = []
  const pageTitle = `${i18n.t("KFORAPPLE")} | ${i18n.t("ADMIN_DASHBOARD", {ns: "dashboard"})}`

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


export default async function DashboardPage({searchParams }:{ searchParams?: Promise<{ [key: string]: string | string[] | undefined }>}) {
  const lng = (await searchParams)?.lng?.toString() ?? DEFAULT_LANGUAGE
  const i18n = await serverTranslation(lng)
  const session = await checkAccess_ServerSide("/dashboard/admin",["admin", "manager"])
  if(!session) unauthorized()
    
  return <h1>{i18n.t("ADMIN_DASHBOARD", {ns: "dashboard"})}</h1>
}