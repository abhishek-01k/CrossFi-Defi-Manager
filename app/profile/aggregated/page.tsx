// @ts-nocheck
"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/overview"
import { UserNFTComponent, UserTokenComponent } from "@/components/profile"
import { TransferComponent } from "@/components/transfers"
import { fetchAccountData } from "@/config/fetchAccountData"
import { useSearchParams } from 'next/navigation'

export default function AggregatedPortfolioPage() {
  const searchParams = useSearchParams()
  const [tokensData, setTokensData] = useState([])
  const [NFTsData, setNFTsData] = useState([])

  const addresses = searchParams.get('addresses')?.split(',') || []

  useEffect(() => {
    const fetchDataForAllAddresses = async () => {
      let aggregatedTokensData = []
      let aggregatedNFTsData = []

      for (let address of addresses) {
        const res = await fetchAccountData(address)
        if (res) {
          const { current_fungible_asset_balances, current_token_ownerships_v2 } = res
          aggregatedTokensData = [...aggregatedTokensData, ...current_fungible_asset_balances]
          aggregatedNFTsData = [...aggregatedNFTsData, ...current_token_ownerships_v2]
        }
      }

      setTokensData(aggregatedTokensData)
      setNFTsData(aggregatedNFTsData)
    }

    fetchDataForAllAddresses()
  }, [addresses])

  const coinTypes = tokensData.filter((asset) => asset.amount > 0).length
  const nftsOwned = NFTsData.filter((asset) => asset.amount > 0).length

  return (
    <div className="flex flex-col p-8">
      <div className="mb-8">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Aggregated Portfolio
        </h1>
        <p className="my-6">{addresses.join(', ')}</p>
      </div>
      <Tabs defaultValue="overview">
        <TabsList className="flex flex-row justify-start gap-4">
          <TabsTrigger value="overview" className="w-[100px]">Overview</TabsTrigger>
          <TabsTrigger value="Tokens" className="w-[100px]">Tokens</TabsTrigger>
          <TabsTrigger value="NFTs" className="w-[100px]">NFTs</TabsTrigger>
          <TabsTrigger value="Transfers" className="w-[100px]">Transfers</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Overview coinTypes={coinTypes} nftsOwned={nftsOwned} />
        </TabsContent>
        <TabsContent value="Tokens">
          <UserTokenComponent tokensData={tokensData} />
        </TabsContent>
        <TabsContent value="NFTs">
          <UserNFTComponent NFTsData={NFTsData} />
        </TabsContent>
        <TabsContent value="Transfers">
          <TransferComponent />
        </TabsContent>
      </Tabs>
    </div>
  )
}
