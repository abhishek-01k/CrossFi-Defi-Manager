"use client"
import React, { useState } from "react"

import { shortenAddress } from "@/lib/shortenAddress"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
const CoinInfo = ({ coinInfo }: { coinInfo: any }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {coinInfo.name} {coinInfo.symbol}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="">
                    <div>
                        <p className="mb-4 text-sm text-gray-600">
                            Total Supply: {" "}
                            {Number(coinInfo.supply).toLocaleString()}
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-semibold">Price</p>
                                <p className="text-sm">
                                    ${coinInfo.price}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold">Creator</p>
                                <p className="text-sm">
                                    {shortenAddress(coinInfo?.creator_address, 5)}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold">Created At</p>
                                <p className="text-sm">{new Date(coinInfo.created_transaction_timestamp).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold">Decimals</p>
                                <p className="text-sm">{coinInfo.decimals}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default CoinInfo
