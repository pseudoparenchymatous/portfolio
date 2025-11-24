import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
});

export const metadata = {
  title: "Georey Saliente - Developer Portfolio",
  description: "Portfolio of Georey Saliente, showcasing projects built with Laravel, React, Next.js, and AI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${manrope.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
