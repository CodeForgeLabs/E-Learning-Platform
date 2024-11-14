
"use client"
import "./globals.css";
import { store } from './store'
import { Provider } from 'react-redux'
import Navbar from "./components/Navbar";
import { useState } from "react";
import Footer from "./components/Footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme , setTheme] = useState("mywhitetheme")
  return (
    <Provider store={store}>
      
         <html lang="en" data-theme = {theme}>
         
          
      <body className="flex flex-col  min-h-screen">
      <div className="flex flex-col  min-h-screen">
      <Navbar setTheme = {setTheme}/>
            {children}
          </div>
      
      <Footer/>
      </body>
    </html>
    </Provider>
   
  );
}
