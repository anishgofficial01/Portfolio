import { DM_Sans, Syne } from "next/font/google";

/**
 * Display: Syne — editorial, architectural, oversized headline character
 * Body: DM Sans — geometric neutral sans in the General Sans / Satoshi family
 */
export const fontDisplay = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const fontBody = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const fontVariables = `${fontDisplay.variable} ${fontBody.variable}`;
