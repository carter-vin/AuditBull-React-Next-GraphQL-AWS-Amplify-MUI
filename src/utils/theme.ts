import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#005AFF',
            light: '#0693e3',
        },
        secondary: {
            main: '#1A202C',
            light: '#2D3748',
        },
        error: {
            main: red.A400,
        },
    },
    // breakpoints: {
    //     values: {
    //         xs: 0,
    //         sm: 768,
    //         md: 900,
    //         lg: 1200,
    //         xl: 1536,
    //     },
    // },
});

export default theme;
