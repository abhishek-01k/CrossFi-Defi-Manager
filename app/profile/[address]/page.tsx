"use client"

import React, { useContext, useEffect, useMemo, useState } from "react"
import { GlobalContext } from "@/context/GlobalContext"

import { fetchAccountData } from "@/config/fetchAccountData"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/overview"
import { UserNFTComponent, UserTokenComponent } from "@/components/profile"
import { TransferComponent } from "@/components/transfers"
import { PortfolioAsset } from "@sonarwatch/portfolio-core";
import DefiPage from "@/components/defi/DefiComponent"
import { Button } from "@/components/ui/button"
import { RotatingLines } from "react-loader-spinner"

const ProfilePage = ({ params }: { params: any }) => {
  const { address } = params

  const {
    setTokensData,
    tokensData,
    NFTsData,
  } = useContext(GlobalContext)

  useEffect(() => {
    console.log("Params addres", params.address);

    if (params.address) {
      handleGetUsersTokensData({ address: params.address })
    }
  }, [params])

  const nftsOwned = NFTsData.filter((asset) => asset.amount > 0).length

  console.log("tokensData", NFTsData, tokensData);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetUsersTokensData = async ({ address }: { address: string }) => {
    try {
      setIsLoading(true)
      console.log("Address", address);

      const res = await fetch('/api/crossFi/fetchUsersTokensData', {
        method: 'POST',
        body: JSON.stringify({
          accountAddress: address,
        })
      });
      const response = await res.json();
      console.log("Res", response);
      setIsLoading(false)
      setTokensData(response.data.items)

    } catch (error) {
      setIsLoading(false)
      console.log("Error", error);
    }
  }

  const tokenType = useMemo(() => {
    return tokensData.filter((asset) => asset.balance > 0).length
  }, [tokensData])

  const nativeTokenData = useMemo(() => {
    return tokensData.find((asset) => asset.contract_address == '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
  }, [tokensData])

  return (
    <div className="flex flex-1 flex-col p-8">
      <div className="mb-8 flex flex-row items-center justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Profile Page
        </h1>
        <div>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {address.slice(0, 10)}...{address.slice(-10)}
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
          <Overview coinTypes={tokenType} nftsOwned={nftsOwned} address={address} nativeTokenData={nativeTokenData} />
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
        <TabsContent value="Defi">
          <DefiPage address={address} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProfilePage
