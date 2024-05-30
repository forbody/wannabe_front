import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import PretendardRegular from './fonts/Pretendard-Regular.woff'

const theme = createTheme({
  typography: {
    fontFamily: 'Pretendard-Regular',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Pretendard-Regular';
          font-style: normal;
          font-weight: 400;
          src: url(${PretendardRegular}) format('woff');
        }
      `
    },
  },
  palette: {
    primary: {
      light: '#d2ef8f',
      main: '#b1e33d',
      dark: '#85b319',
      contrastText: '#000',
    },
    secondary: {
      light: '#1f7a1f',
      main: '#33cc33',
      dark: '#85e085',
      contrastText: '#fff',
    },
    coral: {
      light: '#ff9999',
      main: '#ff4d4d',
      dark: '#e60000',
      contrastText: '#fff',
    },
    white: {
      light: '#fff',
      main: '#fff',
      dark: '#f6fce9',
      contrastText: '#33cc33',
    },
    black: {
      light: '#333333',
      main: '#1a1a1a',
      dark: '#000000',
      contrastText: '#f2f2f2',
    }
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
