import { Inter } from "next/font/google";
import Navbar from "@/components/layout/navbar/navbar";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Novo Concepts",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar isBlack scrollY />
        <main className="">{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
