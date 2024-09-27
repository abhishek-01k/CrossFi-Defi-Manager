"use client"

import React, { useContext, useEffect, useMemo, useState } from "react"
import { GlobalContext } from "@/context/GlobalContext"

import { fetchAccountData } from "@/config/fetchAccountData"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/overview"
import { UserNFTComponent, UserTokenComponent } from "@/components/profile"
import { TransferComponent } from "@/components/transfers"
import { PortfolioAsset } from "@sonarwatch/portfolio-core"
import DefiPage from "@/components/defi/DefiComponent"
import { Button } from "@/components/ui/button"
import { RotatingLines } from "react-loader-spinner"
import { useSearchParams } from "next/navigation"

const AggregatedPortfolioPage = () => {
  const searchParams = useSearchParams()
  const addresses = searchParams.get('addresses')?.split(',') || []
  
  const {
    setTokensData,
    tokensData,
    NFTsData,
    setNFTsData,
  } = useContext(GlobalContext)

  const [isLoading, setIsLoading] = useState(false)

  const handleGetAggregatedData = async () => {
    try {
      setIsLoading(true)
      let aggregatedTokens : any = []
      let aggregatedNFTs : any = []

      for (let address of addresses) {
        const res = await fetch('/api/crossFi/fetchUsersTokensData', {
          method: 'POST',
          body: JSON.stringify({
            accountAddress: address,
          })
        })
        const response = await res.json()

        if (response?.data?.items) {
          aggregatedTokens = [...aggregatedTokens, ...response.data.items]
        }

        if (response?.nftData) {
          aggregatedNFTs = [...aggregatedNFTs, ...response.nftData]
        }
      }

      setTokensData(aggregatedTokens)
      setNFTsData(aggregatedNFTs)
      setIsLoading(false)
    } catch (error) {
      console.log("Error", error)
      setIsLoading(false)
    }
  }

  const tokenType = useMemo(() => {
    return tokensData.filter((asset) => asset.balance > 0).length
  }, [tokensData])

  const nativeTokenData = useMemo(() => {
    return tokensData.find((asset) => asset.contract_address == '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
  }, [tokensData])

  const nftsOwned = NFTsData.filter((asset) => asset.amount > 0).length

  useEffect(() => {
    handleGetAggregatedData()
  }
  , []);
  return (
    <div className="flex flex-1 flex-col p-8">
      <div className="mb-8 flex flex-row items-center justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Aggregated Portfolio
        </h1>
        <div>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {addresses.join(', ')}
          </h4>
        </div>
      </div>
      <Tabs defaultValue="overview">
        <TabsList className="flex w-fit flex-row justify-start gap-4">
          <TabsTrigger value="overview" className="w-[100px]">
            Overview
          </TabsTrigger>
          <TabsTrigger value="Tokens" className="w-[100px]">
            Tokens
          </TabsTrigger>
          <TabsTrigger value="NFTs" className="w-[100px]">
            NFTs
          </TabsTrigger>
          <TabsTrigger value="Transfers" className="w-[100px]">
            Transfers
          </TabsTrigger>
          <TabsTrigger value="Defi" className="w-[100px]">
            Defi
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Overview coinTypes={tokenType} nftsOwned={nftsOwned} address={addresses} nativeTokenData={nativeTokenData} />
        </TabsContent>
        <TabsContent value="Tokens">
          {isLoading ? (
            <RotatingLines
              visible={true}
              width="40"
              strokeColor="#2c68e7"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
          ) : (
            <UserTokenComponent tokensData={tokensData} />
          )}
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

export default AggregatedPortfolioPage
