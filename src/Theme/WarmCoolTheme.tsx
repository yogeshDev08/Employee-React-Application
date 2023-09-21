import { createTheme } from '@mui/material/styles';
import { red, blue, purple } from '@mui/material/colors'

const WarmCoolTheme = createTheme({
  palette: {
    primary: {
      main: red[300]
    },
    warning: {
      main: "#451952"
    }
  },
  components:{
    MuiCard:{
      styleOverrides:{
        root:{
          backgroundColor:red[100],
          color:red[50]
        }
      }
    },
    MuiTypography:{
      styleOverrides:{
        root:{
          color:"black"
        }
      }
    },
  }
});

export default WarmCoolTheme;
