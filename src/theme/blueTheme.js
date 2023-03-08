import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const blueTheme = createTheme({
    palette: {
        primary: {
          main: '#073576',
        },
        secondary: {
          main: '#12376b',
        },
        error: {
          main: red.A400,
        },
      }
});
