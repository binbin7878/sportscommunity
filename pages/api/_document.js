// import React from "react";
// import Document, {Html,Head,Main,NextScript} from "next/document";
// import { CssBaseline } from "@nextui-org/react";

// class MyDocument extends Document{
//     static async getInitialProps(ctx){
//         const initialProps=await Document.getInitialProps(ctx);
//         return{
//             ...initialProps,
//             styles:React.Children.toArray([initialProps.styles])

//         };

//     }
//     render(){
//         return(
//             <Html lang="en">
//                 <Head>{CssBaseline.flush()}</Head>
//                 <body>
//                     <Main/>
//                     <NextScript/>
//                 </body>
//             </Html>
//         )
//     }
// }

// export default MyDocument;

import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@mui/styles';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content="#1976d2" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};

