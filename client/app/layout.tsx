
"use client"
import "./globals.css";
import { store } from './store'
import { Provider } from 'react-redux'


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
         <html lang="en" data-theme = "myblacktheme">
      <body>
        {children}
      </body>
    </html>
    </Provider>
   
  );
}
