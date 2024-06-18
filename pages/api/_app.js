// pages/_app.js
import { NextUIProvider } from '@nextui-org/react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@nextui-org/react/dist/nextui.css'
import "@/app/globals.css";
import '@nextui-org/react/dist/style.css'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import PropTypes from 'prop-types';
import * as React from 'react'
import Head from 'next/head';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography:{
    fontFamily: "Jua, sans-serif",
  },
});

// function MyApp({ Component, pageProps }) {
//   return (
//     <NextUIProvider>
//       <Component {...pageProps} />
//     </NextUIProvider>
//   );
// }

// export default MyApp;
export default function MyApp({ Component, pageProps }) {
  

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
      <link
          href="https://fonts.googleapis.com/css2?family=Jua&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
