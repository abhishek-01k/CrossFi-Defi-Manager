import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useGetNFTTokenDataByCollectionId } from "@/models/Collections/hooks/getNFTTokenDataByCollectionId"
import { ChevronRight } from "lucide-react"
import { RotatingLines } from "react-loader-spinner"

import { shortenAddress } from "@/lib/shortenAddress"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const NFTCollectionInventory = ({ collectionId }: { collectionId: string }) => {
  const { mutate: fetchNFTTokenData, isPending: isLoading } =
    useGetNFTTokenDataByCollectionId()

  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = 10
  const limit = 20

  const [nftInventory, setNFTInventory] = useState<any[]>([])
  const handleFetchNFTTokenData = (currentPage: number) => {
    const offset = (currentPage - 1) * limit

    fetchNFTTokenData(
      {
        collectionId,
        page: offset,
        pageSize: limit,
      },
      {
        onSuccess: (res) => {
          console.log("REs", res)
          setNFTInventory((prev) => [...prev, ...res])
        },
        onError: (err) => {
          console.log("Err", err)
        },
      }
    )
  }

  useEffect(() => {
    if (collectionId) {
      handleFetchNFTTokenData(currentPage)
    }
  }, [collectionId, currentPage])

  const handleLoadMore = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  return (
    <>
      {!!nftInventory.length && (
        <>
          <div className="flex flex-wrap gap-8">
            {nftInventory.map((inventory: any) => {
              const owner = inventory?.current_token_ownerships.find(
                (owner) => owner.amount > 0
              )
              return (
                <Card className="w-[450px]">
                  <CardHeader>
                    <CardTitle className="capitalize">
                      <Image
                        src={inventory.token_uri}
                        width={140}
                        height={140}
                        alt={inventory.token_name}
                      />
                    </CardTitle>
                    <CardDescription></CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                      {inventory.token_name}
                    </h2>

                    <div className="flex flex-col gap-4">
                      <p className="leading-7 text-gray-700 [&:not(:first-child)]:mt-6">
                        {inventory.description.slice(0, 120)}
                      </p>

                      <div>
                        <div className="flex gap-4">
                          <p>Supply:</p>
                          <p>{inventory.supply}</p>
                        </div>
                        <div className="flex gap-4">
                          <p>Owner</p>
                          <p>{shortenAddress(owner?.owner_address, 8)}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          <Button
            onClick={handleLoadMore}
            disabled={currentPage === totalPages}
          >
            Load More
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </>
      )}
      {isLoading && (
        <div className="flex items-center justify-center">
          <RotatingLines
            visible={true}
            width="40"
            strokeColor="#2c68e7"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        </div>
      )}
    </>
  )
}

export default NFTCollectionInventory
