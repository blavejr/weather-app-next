import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { WeatherContextProvider } from "@/context/weather.context";
import cx from "classnames";
import styles from "./layout.module.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather App",
  description: "Generated by blavejr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={cx(styles.container)}>
        <WeatherContextProvider>
            {children}
        </WeatherContextProvider>
        </div>
      </body>
    </html>
  );
}
