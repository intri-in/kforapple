import CircularProgress from "@mui/material/CircularProgress";

export default function FullPageLoadingPlaceholder() {
    // return(
    //     <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}} >
    //         <div className="spinner" />
    //     </div>
    // )

    return <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}} >

        <CircularProgress />
    </div>
}