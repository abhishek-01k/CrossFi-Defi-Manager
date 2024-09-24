"use client"

import React from "react"
import { RotatingLines } from "react-loader-spinner"

import CoinInfo from "@/components/tokens/CoinInfo"
import { useGetCoinPrice } from "@/models/Coins"
import CoinTransfers from "@/components/tokens/CoinTransfers"

const TokenPage = ({ params }: { params: any }) => {
    const { tokenId } = params;
    const { isLoading, data: coinInfo } = useGetCoinPrice({ tokenId });
    return (
        <div className="w-full px-12 py-4">
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
                <>
                    {!coinInfo && <div>No data available</div>}
                    {coinInfo && (
                        <div className="flex flex-col gap-4">
                            <CoinInfo coinInfo={coinInfo} />
                            <CoinTransfers tokenId={coinInfo.coin_type} decimal={coinInfo.decimals} />
                        </div>
                    )}
                </>
            )}

        </div>
    )
}

export default TokenPage
