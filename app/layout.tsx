import type { Metadata } from "next";
import {
  ClerkProvider
} from '@clerk/nextjs'
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import 'react-datepicker/dist/react-datepicker.css'



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yoom",
  description: "Lets' Meet",
  icons:{
    icon:'/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <ClerkProvider>
      <body
        className={`${inter.className} bg-dark-2 h-screen`}
      >
        {children}
        <Toaster/>
      </body>
      </ClerkProvider>
    </html>
    
  );
}
