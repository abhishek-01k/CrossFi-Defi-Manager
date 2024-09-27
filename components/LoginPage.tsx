"use client"

import { useContext, useState } from "react"
import { useRouter } from "next/navigation"
import { GlobalContext } from "@/context/GlobalContext"

import { APP_PATHS } from "@/config/Routes"
import { fetchAccountData } from "@/config/fetchAccountData"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import SocialIcons from "./SocialIcons"
import { Separator } from "./ui/separator"
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk"
import { ethers } from "ethers";
import {
  resolveAddress,
  BASENAME_RESOLVER_ADDRESS,
} from "thirdweb/extensions/ens";
import { createThirdwebClient, defineChain } from "thirdweb"

export  function LoginPage() {
  const {
    address,
    setAddress,
    setNFTsData,
    setTokensData,
    setTokenTransferData,
    setNFTsTransferData,
  } = useContext(GlobalContext)

  const [userInput, setUserInput] = useState("");
  const [searchType, setSearchType] = useState("address");
  const router = useRouter();

  const config = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(config);

  const provider = new ethers.JsonRpcProvider("https://crossfi-testnet.public.blastapi.io/", {
    name: "crossfi-testnet",
    chainId: 4157,
    ensAddress: "0x6944c57331f9C3eFC210F0D49bE1d417452cEe3B",
  });

  
  console.log("provider", provider)

  const handleConnect = async () => {
    if (!userInput) return
    let resolvedAddress = userInput;

    const a = await  provider.lookupAddress("kamal.xfi");
    console.log("kamala", a)

    const crossfichain = defineChain({
      id: 4157
    });
  
    const client = createThirdwebClient({ clientId: '50fec9cf6c4b9da360d1104e89d9e7f8' });

    // const newaddr = await resolveAddress({
    //   client,
    //   name: "kamal.xfi",
    //   resolverAddress: "0xb127c78D906d9E645DBa801ACA6786C89Ac01f10",
    //   resolverChain: crossfichain,
    // });



    const isValidAddress = ethers.isAddress(userInput);

    if (searchType === "name" && !isValidAddress) {

      const resolver = await provider.getResolver(userInput);
      if (!resolver) {
        throw new Error("No resolutions found for the provided name.");
      }
      resolvedAddress = await resolver.getAddress();
    } else if (isValidAddress) {
      // Input is a valid address, try to find the associated name
      const name = await provider.lookupAddress(userInput);
      if (name) {
        resolvedAddress = userInput;
      }
    } else {
      throw new Error("Invalid input. Please provide a valid address or name.");
    }


    setAddress(resolvedAddress)
    try {
      const res = await fetchAccountData(resolvedAddress)
      console.log("userAddress", res)

      if (res) {
        const {
          current_fungible_asset_balances: userTokensDetails,
          current_token_ownerships_v2: userNFTDetails,
          fungible_asset_activities: userTokenTransferDetails,
          token_activities_v2: userNFTTransferDetails,
        } = res

        if (userTokensDetails) setTokensData(userTokensDetails)
        if (userNFTDetails) setNFTsData(userNFTDetails)
        if (userTokenTransferDetails) setTokenTransferData(userTokenTransferDetails)
        if (userNFTTransferDetails) setNFTsTransferData(userNFTTransferDetails)

        router.push(`${APP_PATHS.PROFILE}/${resolvedAddress}`)
      }
    } catch (error) {
      console.log("Error", error)
    }
  }

  return (
    <div className="flex h-[80vh] w-full items-center justify-center px-4">
      <Card className="mx-auto w-2/3 max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">CrossFiManager</CardTitle>
          <CardDescription>
            Your personalised Bank on CrossFi Blockchain
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-8">
            <Separator />
            <Tabs defaultValue="address" onValueChange={(value) => setSearchType(value)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="address">Address</TabsTrigger>
                <TabsTrigger value="name">XFi Name</TabsTrigger>
              </TabsList>
              <TabsContent value="address">
                <Input
                  type="text"
                  placeholder="Enter XFi address"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
              </TabsContent>
              <TabsContent value="name">
                <Input
                  type="text"
                  placeholder="Enter XFi name (e.g, kamal.xfi)"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
              </TabsContent>
            </Tabs>
            <Button onClick={handleConnect}>Explore</Button>
            <div className="mt-4 text-center text-sm">
              Reach out to us for any query.
              <SocialIcons />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}