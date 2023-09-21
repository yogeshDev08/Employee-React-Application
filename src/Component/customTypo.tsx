import { Typography } from "@mui/material"

interface propValue {
    value: string;
  }

const typoCss = {
    fontWeight: '700',
    fontSize: 'x-large',
    paddingBottom:"2%"
}
const CustomTypography = ({ value }: propValue) => {
    return <Typography sx={typoCss}>
        {value}
    </Typography>
}

export default CustomTypography