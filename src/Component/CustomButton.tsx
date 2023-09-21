import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { blue } from '@mui/material/colors';

const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[500],
  '&:hover': {
    backgroundColor: blue[700],
  },
}));

export default CustomButton