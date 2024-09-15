"use client"

import React, { useEffect, useState } from "react"
import { useGetNFTDataByCollectionId } from "@/models/Collections/hooks/getNFTDataByCollectionId"
import { RotatingLines } from "react-loader-spinner"

import NFTCollectionBody from "./components/NFTCollectionBody"
import NFTCollectionHeader from "./components/NFTCollectionHeader"

const NFTCollectionData = ({ collectionId }: { collectionId: string }) => {
  const [NFTDetails, setNFTDetails] = useState()
  const { mutate: fetchNFTData, isPending: fetching } =
    useGetNFTDataByCollectionId()

  const handleFetchNFTData = () => {
    fetchNFTData(
      {
        collectionId,
      },
      {
        onSuccess: (res) => {
          console.log("res", res)
          setNFTDetails(res)
        },
        onError: (err) => {
          console.log("Err", err)
        },
      }
    )
  }

  useEffect(() => {
    if (collectionId) {
      handleFetchNFTData()
    }
  }, [collectionId])

  return (
    <div className="w-full px-12 pt-8">
      {fetching && (
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
      {!fetching && NFTDetails && (
        <div className="flex flex-col gap-8">
          <NFTCollectionHeader nftDetail={NFTDetails} />
          <NFTCollectionBody collectionId={collectionId} />
        </div>
      )}
    </div>
  )
}

export { NFTCollectionData }
