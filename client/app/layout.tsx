"use client"
import "./globals.css";
import { store } from './store'
import { Provider } from 'react-redux'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Head from 'next/head';
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "./store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const excludeComponents = ['/signup', '/login'];

  return (
    <SessionProvider>
      <Provider store={store}>
        <RootLayoutContent path={path} excludeComponents={excludeComponents}>
          {children}
        </RootLayoutContent>
      </Provider>
    </SessionProvider>
  );
}

function RootLayoutContent({
  children,
  path,
  excludeComponents,
}: {
  children: React.ReactNode;
  path: string;
  excludeComponents: string[];
}) {
  const found = useSelector((state: RootState) => state.found.found);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  return (
    <html lang="en" data-theme="mywhitetheme">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body className="flex flex-col min-h-screen">
        <div className="flex flex-col min-h-screen">
          {found && !excludeComponents.includes(path) && <Navbar />}
          {children}
        </div>
        {found && !excludeComponents.includes(path) && <Footer />}
      </body>
    </html>
  );
}