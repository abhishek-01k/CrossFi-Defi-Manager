"use client"

import React, { useEffect, useState } from "react"
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Overview = ({
  coinTypes,
  nftsOwned,
  address,
  nativeTokenData
}: {
  coinTypes: any
  nftsOwned: any
  address: string
  nativeTokenData: any
}) => {

  const [portfolioData, setPortfolioData] = useState<any[]>([
    { date: "2023-01-01", value: 1000 },
    { date: "2023-02-01", value: 1200 },
    { date: "2023-03-01", value: 1100 },
    { date: "2023-04-01", value: 1400 },
    { date: "2023-05-01", value: 1300 },
    { date: "2023-06-01", value: 1600 },
  ]);
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
  const coinBalances = []
  const nfts = []

  const renderPortfolioChart = (
    <ResponsiveContainer width="100%" height={200} className="p-2">
      <LineChart data={portfolioData}>
        <XAxis dataKey="date" />
        <YAxis dataKey="value" />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )

  useEffect(() => {

    const fetchData = async () => {
      const apikey = process.env.NEXT_PUBLIC_WALLET_PORTFOLIO_KEY;
      try {
        const response = await fetch(
          `https://warehouse-api.xfi.ms/wh/wallet_portfolio_overtime?api_key=${apikey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              parameters: {
                network: "xfi_test",
                begin_timestamp: "1723526853",
                end_timestamp: "1726230453",
                timeframe: "toStartOfDay",
                holder: address
              },
            }),
          }
        );

        // @kamal - eg address 0x3ed0ea2aab0a201618917365c0e5ab4fc4cbc6a0
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse the JSON response
        console.log(data);
        if (data.length !== 0) {
          const updatedportfolioData = data.map((item: any) => {
            return {
              date: item.timestamp.split(" ")[0],
              value: item.balance_usd,
              tokens_count: item.tokens_count,
            };
          });

          setPortfolioData(updatedportfolioData);
        } else {
          setPortfolioData([
            { date: "2023-01-01", value: 1000 },
            { date: "2023-02-01", value: 1200 },
            { date: "2023-03-01", value: 1100 },
            { date: "2023-04-01", value: 1400 },
            { date: "2023-05-01", value: 1300 },
            { date: "2023-06-01", value: 1600 },
          ]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const d = portfolioData ? portfolioData : '';

  const nativeTokenBalance = nativeTokenData ? (nativeTokenData.balance / (10 ** nativeTokenData.contract_decimals)) : 0

  return (
    <div>
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>XFI Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ${nativeTokenBalance.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Coin Types</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{coinTypes}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>NFTs Owned</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{nftsOwned}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio Value Over Time</CardTitle>
        </CardHeader>
        <CardContent>{renderPortfolioChart}</CardContent>
      </Card>
    </div>
  )
}

export { Overview }
