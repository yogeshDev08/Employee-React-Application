import { createTheme } from '@mui/material/styles';
import { red, blue, purple } from '@mui/material/colors'

const GradientTheme = createTheme({
  palette: {
    primary: {
      main: "rgb(69, 25, 82)"
    },
    warning: {
      main:"rgb(69, 25, 82)"
    }
  },
  components:{
    MuiCard:{
      styleOverrides:{
        root:{
          backgroundColor:'rgb(206, 222, 189)',
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

export default GradientTheme;
