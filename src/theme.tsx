import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: { 
      main: '#415f91',
    },
    secondary: {
      main: '#705575',
    },
    error: {
      main: '#ba1a1a',
    },
    background: {
      default: '#f9f9ff',
      paper: '#f3f3fa',
    },
  },
});

export default theme;
