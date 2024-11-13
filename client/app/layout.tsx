
"use client"
import "./globals.css";
import { store } from './store'
import { Provider } from 'react-redux'
import Navbar from "./components/Navbar";
import { useState } from "react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme , setTheme] = useState("mywhitetheme")
  return (
    <Provider store={store}>
      
         <html lang="en" data-theme = {theme}>
         
          
      <body>
      <Navbar setTheme = {setTheme}/>
        {children}
      </body>
    </html>
    </Provider>
   
  );
}
