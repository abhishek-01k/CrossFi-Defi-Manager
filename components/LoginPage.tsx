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
import { ethers, JsonRpcProvider } from "ethers";

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

  const provider = new JsonRpcProvider("https://crossfi-testnet.public.blastapi.io", {
    name: "crossfi-testnet",
    chainId: 4157,
    ensAddress: "0x6944c57331f9C3eFC210F0D49bE1d417452cEe3B",
    ensNetwork: 4157
  });

  // registery address - 0xb127c78d906d9e645dba801aca6786c89ac01f10 or 0x6944c57331f9C3eFC210F0D49bE1d417452cEe3B

//   const test = async () => {
//     const blockNumber = "latest";
// const block = await provider.getBlock(blockNumber)
// console.log("block", block);

// const b = await provider.getResolver("kamal.xfi");
// const a = await  provider.lookupAddress("0x7Daf54Df0f6f6393dF3A9cd6A5795423ba9FaB3f");
// console.log("kamala", a , b)
//   }

  // test();
  console.log("provider", provider)

  const handleConnect = async () => {
    if (!userInput) return
    let resolvedAddress = userInput;

    const isValidAddress = ethers.isAddress(userInput);

    if (searchType === "name" && !isValidAddress) {

      const resolver = await provider.getResolver(userInput);
      if (!resolver) {
        throw new Error("No resolutions found for the provided name.");
      }
      resolvedAddress = await resolver.getAddress() as string;
      console.log("resolvedAddress", resolvedAddress)
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
          <CardTitle className="text-2xl">CrossFi Defi Manager</CardTitle>
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