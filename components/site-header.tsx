import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { ConnectButton } from "thirdweb/react"
import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb/chains";

export function SiteHeader() {

  const crossfichain = defineChain({
    id: 4157
  });

  const client = createThirdwebClient({ clientId: 'fa02fb6603c3642ccefecc4a9ce447a4' })
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.twitter className="size-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <ThemeToggle />
            <ConnectButton client={client} chains={[crossfichain]} />
          </nav>
        </div>
      </div>
    </header>
  )
}
