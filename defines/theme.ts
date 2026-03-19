'use client'
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#8B4FB0",
      light:"#8B4FB0"
      
    },
    secondary:{
        main:"#74B04F",
        light:"#74B04F"
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained:{
          background: '#8B4FB0',

        }
      },
    },
  }

});