"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/crossfi-manager/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/crossfi-manager/components/ui/card"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="container mx-auto py-6"
      >
        <nav className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="text-2xl font-bold text-primary"
          >
            AptosPortfolio
          </motion.div>
          <div className="hidden space-x-4 md:block">
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">About</Button>
            <Button variant="ghost">Contact</Button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button>Launch App</Button>
            </motion.div>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              Menu
            </Button>
          </div>
        </nav>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 flex flex-col space-y-2 md:hidden"
          >
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">About</Button>
            <Button variant="ghost">Contact</Button>
            <Button>Launch App</Button>
          </motion.div>
        )}
      </motion.header>

      <main className="container mx-auto px-4 py-16">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="mb-6 text-5xl font-extrabold tracking-tight lg:text-6xl"
          >
            Your Ultimate Aptos Portfolio Manager
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground"
          >
            Manage multiple wallets, track NFTs and coins, and optimize your DeFi positions across the Aptos blockchain - all in one powerful platform.
          </motion.p>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" className="px-8 py-6 text-lg">
              Get Started
            </Button>
          </motion.div>
        </motion.section>

        <section className="mt-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center text-3xl font-bold"
          >
            Key Features
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <FeatureCard
              title="Multi-Wallet Management"
              description="Manage and track multiple Aptos wallets in one place, with aggregated portfolio views."
              icon={<WalletIcon className="h-8 w-8" />}
            />
            <FeatureCard
              title="NFT & Coin Tracking"
              description="View and manage your NFTs and coins across all your Aptos wallets."
              icon={<CoinIcon className="h-8 w-8" />}
            />
            <FeatureCard
              title="DeFi Position Management"
              description="Monitor and manage your DeFi positions, including lending, borrowing, and health factors."
              icon={<ChartIcon className="h-8 w-8" />}
            />
            <FeatureCard
              title="Aptos Name Service"
              description="Manage your Aptos names, including registration, renewal, and expiration tracking."
              icon={<TagIcon className="h-8 w-8" />}
            />
            <FeatureCard
              title="Portfolio History"
              description="Track your portfolio's performance over time with detailed historical data."
              icon={<HistoryIcon className="h-8 w-8" />}
            />
            <FeatureCard
              title="Cross-Protocol Actions"
              description="Perform DeFi actions across multiple protocols directly from our platform."
              icon={<LayersIcon className="h-8 w-8" />}
            />
          </motion.div>
        </section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-24 text-center"
        >
          <motion.h2 variants={itemVariants} className="mb-6 text-3xl font-bold">
            Ready to Optimize Your Aptos Portfolio?
          </motion.h2>
          <motion.p variants={itemVariants} className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
            Join thousands of users who are already managing their Aptos assets more efficiently with AptosPortfolio.
          </motion.p>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" className="px-8 py-6 text-lg">
              Launch App
            </Button>
          </motion.div>
        </motion.section>
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-muted mt-24 py-12 text-center text-muted-foreground"
      >
        <div className="container mx-auto">
          <p>&copy; 2023 AptosPortfolio. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  )
}

function FeatureCard({ title, description, icon }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              {icon}
            </motion.div>
            <span>{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function WalletIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  )
}

function CoinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="8" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  )
}

function ChartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  )
}

function TagIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </svg>
  )
}

function HistoryIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  )
}

function LayersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  )
}