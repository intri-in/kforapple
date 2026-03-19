import { useTranslationClient } from "@/i18n/client"
import { Button, ButtonGroup, FormControl, Stack, TextField } from "@mui/material"
import { MouseEventHandler, useState } from "react"
import SimpleSnackbar from "../general/Snackbar"
import { toast } from "react-toastify"
import isEmail from 'validator/lib/isEmail';
import { getMinimumPasswordLength } from "@/lib/helpers/env"
export const SignupWithEmailForm =  ({lng , onBackClicked, callbackURL = '/dashboard', admin}:{lng: string, onBackClicked:MouseEventHandler<HTMLButtonElement>, callbackURL? :string, action?: string, admin?: boolean}) => {
    const i18n = useTranslationClient(lng)
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [email, setEmail] = useState("")
    const [nameValid, setNameValid] = useState(true)
    const [emailValid, setEmailValid] = useState(true)
    const [passwordValid, setPasswordValid] = useState(true)
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(true)
    const onSignUpClicked = () =>{
        formIsValid()
    }

    const formIsValid = () =>{
        let valid=true
        if(!name){
            toast.error(i18n.t("ERROR_INVALID_NAME"))
            setNameValid(false)
            return false
        }
        setNameValid(true)

        if(!isEmail(email)){
            setEmailValid(false)
            toast.error(i18n.t("ERROR_INVALID_EMAIL"))
            return false

        }
        setEmailValid(true)

        if(!password || password && password.length<getMinimumPasswordLength()){
            setPasswordValid(false)
            toast.error(i18n.t("ERROR_VALID_PASSWORD",{length: getMinimumPasswordLength()}))
            return false
        }
        setPasswordValid(true)
        
        if(!confirmPassword || (password && password!==confirmPassword)){
            setConfirmPasswordValid(false)
            toast.error(i18n.t("ERROR_VALID_CONFIRM_PASSWORD"))
            return false
        }
        setConfirmPasswordValid(true)

        return true

    }
    return(<FormControl fullWidth={true}>
        <Stack direction="column" spacing={3}>
            <TextField
            required
            id="name"
            label={i18n.t("NAME")}
            value={name}
            error={!nameValid}
            slotProps={{ htmlInput: { maxLength: 60 } }}
            onChange={(e)=>{setName(e.target.value)}}
            />
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
            <TextField
            required
            id="password"
            label={i18n.t("PASSWORD")}
            value={password}
            type="password"
            error={!passwordValid}
            slotProps={{ htmlInput: { maxLength: 60 } }}
            onChange={(e)=>{setPassword(e.target.value)}}
            />
            <TextField
            required
            id="confirm-password"
            label={i18n.t("CONFIRM_PASSWORD")}
            value={confirmPassword}
            type="password"
            error={!confirmPasswordValid}
            slotProps={{ htmlInput: { maxLength: 60 } }}
            onChange={(e)=>{setConfirmPassword(e.target.value)}}
            />

            {
                !admin ?
                <Button variant="outlined">{i18n.t("SIGN_UP_WITH_EMAIL_OTP")}</Button>
                :
                <></>
            }
            <ButtonGroup fullWidth={true} aria-label="Basic button group">    
                <Button onClick={onBackClicked}>{i18n.t("BACK")}</Button>
                <Button onClick={onSignUpClicked} variant="contained">{i18n.t("SIGN_UP")}</Button>
            </ButtonGroup>
        </Stack>
        
        </FormControl>
    )

}