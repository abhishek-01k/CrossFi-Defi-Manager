"use client"

import React from "react"

import { WalletSelector } from "./WalletSelector"

const ConnectButton = () => {
  return (
    <div className="flex flex-row gap-2">
      <WalletSelector />
    </div>
  )
}

export default ConnectButton
