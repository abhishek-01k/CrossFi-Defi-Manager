import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import Image from "next/image";

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/xfi.jpg" height={40} width={40} alt="xfi" className="rounded-xl" />
        <span className="inline-block font-bold">CrossFi Defi Manager</span>
      </Link>
    </div>
  )
}
