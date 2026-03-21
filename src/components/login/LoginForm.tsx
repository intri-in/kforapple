"use client"
import { DEFAULT_LANGUAGE } from "#/defines/constants"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Paper from '@mui/material/Paper';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import React, { JSXElementConstructor, MouseEventHandler, ReactElement, Suspense, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { useTranslationClient } from "@/i18n/client"
import { getEnabledLoginProviders } from "@/lib/helpers/auth"
import LoginIcon from '@mui/icons-material/Login';
import { Alert } from "@mui/material"
import { SignupWithEmailForm } from "./SignupWithEmailForm"
import { SimpleLoginForm } from "./SimpleLoginForm"
const GetOutputForLoginType = ({name, icon, onClickFunction}: {name: string | ReactElement<unknown, string | JSXElementConstructor<any>>, icon: React.JSX.Element, onClickFunction: MouseEventHandler<HTMLDivElement>} ) =>{

    return(                            
        <Stack sx={{marginBottom:2}} key={name.toString()} onClick={onClickFunction}  spacing={2}>
        <Paper sx={{padding: 2}} elevation={3}>
            <Stack  spacing={5} direction="row">
                   {icon}
                <Typography>{name}</Typography>
            </Stack>
        </Paper>
        </Stack>

    )

}
export const LoginForm =  ({lng , callbackURL = '/dashboard', action='login', admin=false}:{lng: string, callbackURL? :string, action?: string, admin?: boolean}) => {
    const [showScreenTwo, setShowScreenTwo] = useState(false)
    const loginTypes = getEnabledLoginProviders()

    const onClickOAuth = async (name: string) =>{
        const response = await authClient.signIn.oauth2({
        providerId: "AUTHENTIK",
        callbackURL: callbackURL, // the path to redirect to after the user is authenticated
        });
    }
    const onClickEmail = async () =>{
        setShowScreenTwo(true)
    }
    const backClickedSignup = () =>{
        setShowScreenTwo(false)
    }
    const i18n = useTranslationClient(lng)
    const title = (action!="signup") ? i18n.t("LOGIN") : i18n.t("SIGN_UP")
    let finalOutput: React.JSX.Element[] = []
    if(showScreenTwo){
        if(action=="signup"){

            finalOutput.push(<SignupWithEmailForm callbackURL={callbackURL} onBackClicked={backClickedSignup} key="signup-form-email" admin={admin} lng={lng} />)
        }else{
            finalOutput.push(<SimpleLoginForm callbackURL={callbackURL} onBackClicked={backClickedSignup} key="loginForm-email" admin={admin} lng={lng} />)

        }
    }else{
        for (const i in loginTypes){

            switch(loginTypes[i]){
                case "EMAIL":
                    finalOutput.push(<GetOutputForLoginType key={loginTypes[i]} name={i18n.t(loginTypes[i])} icon={<MailOutlineIcon />} onClickFunction ={()=>onClickEmail()} />)
                    break;
        
                default:
                    finalOutput.push(<GetOutputForLoginType key={loginTypes[i]} name={i18n.t(loginTypes[i])} icon={<LoginIcon />} onClickFunction ={()=>onClickOAuth(loginTypes[i])} />)
                    break;
            }
            
        }
    }
    
    return(
        <Suspense>

            <main style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
                    <Card sx={{ minWidth: "60%" }}>
                    <CardContent>
                        <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100%"}}>
                            <img width={200} src="/kforappleLogoHQ.png" />
                        </div>
                        <Typography gutterBottom variant="h4">{title}</Typography>
                        {admin? <Alert sx={{marginBottom:3}} severity="info">{i18n.t("ADMIN_INFO_ALERT")}</Alert> : <></>}
                        {finalOutput}
                    </CardContent>
                    </Card>

            </main>
        </Suspense>
    )
}