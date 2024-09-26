"use client"

import React, { useContext, useEffect, useState } from "react"
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
    setAddress,
    setNFTsData,
    setTokensData,
    setTokenTransferData,
    setNFTsTransferData,
    tokensData,
    NFTsData,
  } = useContext(GlobalContext)

  const handleConnect = async (userAddress: string) => {
    if (!userAddress) return
    try {
      const res = await fetchAccountData(userAddress)

      if (res) {
        const {
          current_fungible_asset_balances: userTokensDetails,
          current_token_ownerships_v2: userNFTDetails,
          fungible_asset_activities: userTokenTransferDetails,
          token_activities_v2: userNFTTransferDetails,
        } = res

        if (userTokensDetails) setTokensData(userTokensDetails)
        if (userNFTDetails) setNFTsData(userNFTDetails)
        if (userTokenTransferDetails)
          setTokenTransferData(userTokenTransferDetails)
        if (userNFTTransferDetails) setNFTsTransferData(userNFTTransferDetails)
      }
    } catch (error) {
      console.log("Error", error)
    }
  }

  useEffect(() => {
    console.log("Params addres", params.address);

    if (params.address) {
      handleConnect(params.address)
      handleGetUsersTokensData({ address: params.address })
    }
  }, [params])

  // const { current_fungible_asset_balances } = TokenData
  // const tokensData = current_fungible_asset_balances

  // const { current_token_ownerships_v2 } = NFTData
  // const NFTsData = current_token_ownerships_v2

  const coinTypes = tokensData.filter((asset) => asset.amount > 0).length
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
          <Overview coinTypes={coinTypes} nftsOwned={nftsOwned} address={address} />
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
