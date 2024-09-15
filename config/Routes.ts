import { BarChart, Coins, Image, User } from "lucide-react"

export const APP_PATHS = {
  AGGPORTFOLIO: "/aggregated-portfolio",
  PROFILE: "/profile",
  TOKENS: "/tokens",
  NFTS: "/collections",
}

export const APP_ROUTES = [
  {
    title: "Profile",
    Icon: User,
    href: APP_PATHS.PROFILE,
  },
  {
    title: "Agg Portfolio",
    Icon: BarChart,
    href: APP_PATHS.AGGPORTFOLIO,
  },
  {
    title: "Tokens",
    Icon: Coins,
    href: APP_PATHS.TOKENS,
  },
  {
    title: "NFTS",
    Icon: Image,
    href: APP_PATHS.NFTS,
  }
]
