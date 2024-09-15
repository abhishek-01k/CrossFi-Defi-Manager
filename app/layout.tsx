import "@/styles/globals.css"
import { Metadata } from "next"
import { GlobalContextProvider } from "@/context/GlobalContext"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SidebarComponent } from "@/crossfi-manager/components/sidebar"
import { SiteHeader } from "@/crossfi-manager/components/site-header"
import { TailwindIndicator } from "@/crossfi-manager/components/tailwind-indicator"
import { ThemeProvider } from "@/crossfi-manager/components/theme-provider"
import { Toaster } from "@/crossfi-manager/components/ui/toaster"
import Provider from "./Provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <GlobalContextProvider>
              <Provider>
                <div className="relative flex min-h-screen flex-col">
                  <SiteHeader />
                  <div className="flex flex-1 flex-row">
                    <SidebarComponent />
                    {children}
                    <Toaster />
                  </div>
                </div>
                <TailwindIndicator />
              </Provider>
            </GlobalContextProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
