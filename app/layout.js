import "./theme.css"
import "./globals.css"
import { Plus_Jakarta_Sans } from "next/font/google"

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata = {
  title: "Safe Mode — Product & UX Discovery Studio",
  description: "Product / UX team. Fixed scope. Capped sprints. Groomed backlogs, research synthesis, UX flows, design foundations.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className={plusJakarta.className} style={{ fontFamily: "var(--font-sans)" }}>{children}</body>
    </html>
  )
}
