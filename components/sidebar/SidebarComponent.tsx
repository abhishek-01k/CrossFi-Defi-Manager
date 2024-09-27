"use client"

import React, { useContext } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { GlobalContext } from "@/context/GlobalContext"
import {
  Activity,
  ArrowUpDown,
  BarChart,
  Coins,
  Image,
  PieChart,
  TrendingUp,
  User,
  Wallet,
} from "lucide-react"

import { APP_ROUTES } from "@/config/Routes"

import { Button } from "../ui/button"
import { Separator } from "../ui/separator";

import { useActiveAccount } from "thirdweb/react"

const SidebarComponent = () => {
  const { activeTab, setActiveTab, address } = useContext(GlobalContext)

  const activeAccount = useActiveAccount();
  const connectedaddress = activeAccount?.address;
  const pathname = usePathname()
  console.log("router", pathname)

  return (
    <div className="w-64  shadow-md">
      <div className="p-4">
        <h2 className="mb-4 text-xl font-bold">CrossFi DefiManager</h2>
        <nav>
          {APP_ROUTES.map((route, index) => {
            const Icon = route.Icon
            return (
              <Link href={route.href} key={index}>
                <Button
                  variant={pathname.includes(route.href) ? "default" : "ghost"}
                  className="mb-2 w-full justify-start"
                >
                  <Icon className="mr-2 size-4" />
                  {route.title}
                </Button>
              </Link>
            )
          })}

          <Separator />
          <Link href={`/profile/${connectedaddress}`}>
          <Button
            variant={activeTab === "portfolio" ? "default" : "ghost"}
            className="mb-2 w-full justify-start"
            onClick={() => setActiveTab("portfolio")}
          >
            <PieChart className="mr-2 size-4" />
            Portfolio
          </Button>
          </Link>
        </nav>
      </div>
    </div>
  )
}

export { SidebarComponent }
