import { useTranslationClient } from "@/i18n/client"
import { authClient } from "@/lib/auth-client"
import { getOTPLength } from "@/lib/helpers/env"
import { Button, ButtonGroup, CircularProgress, FormControl, Stack, TextField } from "@mui/material"
import { redirect } from "next/navigation"
import { MouseEventHandler, use, useState } from "react"
import { toast } from "react-toastify"
import isEmail from "validator/lib/isEmail"

export const SimpleLoginForm = ({lng , onBackClicked, callbackURL = '/dashboard', action='login', admin=false}:{lng: string, onBackClicked:MouseEventHandler<HTMLButtonElement>, callbackURL? :string, action?: string, admin?: boolean}) =>{
    const i18n = useTranslationClient(lng)
    
    const [email, setEmail] = useState("")
    const [emailValid, setEmailValid] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [showOTPScreen, setShowOTPScreen] = useState(false)
    const [otp, setOTP] = useState("")
    const [otpValid, setOTPValid] = useState(true)

    const onLoginClicked = async() =>{
        const valid = formIsValid(false)
        if(valid){
            setIsLoading(true)
            const { data, error } = await authClient.emailOtp.sendVerificationOtp({
                email: email,
                type: "sign-in"
            });         
            //console.log("data, error", data, error)
            setIsLoading(false)
            if(error){
                toast.error(i18n.t("ERROR_GENERIC_MESSAGE"))
                console.error("LoginForm /login/ emailOtp.sendVerificationOtp",error.code)
            }

            setShowOTPScreen(true)
        }

    }
    const formIsValid = (checkpass:boolean) =>{
        if(!isEmail(email)){
            setEmailValid(false)
            toast.error(i18n.t("ERROR_INVALID_EMAIL"))
            return false

        }
        setEmailValid(true)


        return true

    }
    const onOTPSubmit = async()=>{
        if(!otp || otp && otp.length<getOTPLength()){
            toast.error(i18n.t("INVALID_OTP"))
            return
        }
        const { data, error } = await authClient.signIn.emailOtp({
        email: email, 
        otp: otp
        });
        setIsLoading(false)
        if(error){
            if(error.status==429){
                toast.error(i18n.t("TOO_MANY_REQUESTS", {ns :"errors"}))
                return
            }
            const code = error.code ? error.code : "ERROR_GENERIC_MESSAGE"
            toast.error(i18n.t(code))
            console.info("LoginForm /login/ emailOtp.sendVerificationOtp",error)
            return

        }
        if(data){
            redirect(callbackURL)
        }

    }

    if(showOTPScreen){
        return(
        <FormControl fullWidth={true}>
            <Stack direction="column" spacing={3}>
                
                <TextField
                required
                id="otp"
                value={otp}
                error={!otpValid}
                slotProps={{ htmlInput: { maxLength: getOTPLength() } }}
                onChange={(e)=>{setOTP(e.target.value)}}
                label={i18n.t("OTP")}
                />
                {!isLoading ?
                (
                    <ButtonGroup fullWidth={true} aria-label="Basic button group"> 
                        <Button onClick={onBackClicked}>{i18n.t("BACK")}</Button>
   
                        <Button onClick={onOTPSubmit} variant="contained">{i18n.t("SUBMIT")}</Button>  
                    </ButtonGroup>

                ): <div style={{textAlign:"center"}}><CircularProgress /></div>
                }           
            </Stack>
        </FormControl>
        )
    }
    return(
      <FormControl fullWidth={true}>
        <Stack direction="column" spacing={3}>
            
            <TextField
            required
            id="email"
            type="email"
            value={email}
            error={!emailValid}
            slotProps={{ htmlInput: { maxLength: 60 } }}
            onChange={(e)=>{setEmail(e.target.value)}}
            label={i18n.t("EMAIL")}
            />
        {!isLoading ?
        (<>
            <Button variant="outlined">{i18n.t("LOGIN_WITH_PASSWORD")}</Button>
            <ButtonGroup fullWidth={true} aria-label="Basic button group">    
                <Button onClick={onBackClicked}>{i18n.t("BACK")}</Button>
                <Button onClick={onLoginClicked} variant="contained">{i18n.t("LOGIN_WITH_EMAIL_OTP")}</Button>
            </ButtonGroup>
        </>)
        : <div style={{textAlign:"center"}}><CircularProgress /></div>
        }
        </Stack>  

        </FormControl>
    )
}
