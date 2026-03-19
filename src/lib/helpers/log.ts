const ALLOWED_LOG_LEVELS = ["production", "debug"]
    
export default function logMessageforAPI(indentifier: string,  message:any ){
    const logLevelFromEnv = (process.env.NEXT_PUBLIC_LOG_LEVEL && ALLOWED_LOG_LEVELS.includes(process.env.NEXT_PUBLIC_LOG_LEVEL)) ? process.env.NEXT_PUBLIC_LOG_LEVEL : "production"
    let shouldLog = true
    if(logLevelFromEnv=="production"){
        shouldLog = false 
    }
    
    if(shouldLog) console.log(`[${indentifier}]: ${message}`)
}