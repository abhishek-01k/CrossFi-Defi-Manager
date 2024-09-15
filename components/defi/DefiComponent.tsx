"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { PortfolioElement, PortfolioElementMultiple, PortfolioElementLiquidity, PortfolioElementLeverage, PortfolioElementBorrowLend, PortfolioAsset } from "@sonarwatch/portfolio-core"

type DefiPageProps = {
  address: string
}

export default function DefiPage({ address }: DefiPageProps) {
  const [portfolioElements, setPortfolioElements] = useState<PortfolioElement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalValue, setTotalValue] = useState(0)

  useEffect(() => {
    const fetchPortfolioDetails = async () => {
      try {
        const response = await fetch(`https://portfolio-api.sonar.watch/v1/portfolio/fetch?useCache=false&address=${address}&addressSystem=move`, {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SONAR_KEY}`
          }
        })
        const data = await response.json();

        console.log("Portfolio data", data);

        console.log('data elements', data.elements)
        setPortfolioElements(data.elements)
        setTotalValue(data.value)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching portfolio details:", error)
        setIsLoading(false)
      }
    }

    fetchPortfolioDetails();

  }, [address])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-[250px]" />
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-[150px]" />
              <Skeleton className="h-4 w-[200px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[200px] w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">DeFi Positions</h2>
        <div className="text-xl font-semibold">
          Total Value: ${totalValue.toFixed(2)}
        </div>
      </div>
      {portfolioElements.map((element, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{element.label}</CardTitle>
              <Badge>{element.type}</Badge>
            </div>
            <CardDescription>
              Platform: {element.platformId} | Network: {element.networkId}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="font-semibold">Value:</span> ${element.value.toFixed(2)}
              </div>
              <div>
                <span className="font-semibold">% of Portfolio:</span> {((element.value / totalValue) * 100).toFixed(2)}%
              </div>
            </div>
            <Progress value={(element.value / totalValue) * 100} className="mb-4" />
            {renderElementContent(element)}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function renderElementContent(element: PortfolioElement) {
  switch (element.type) {
    case "multiple":
      return renderMultipleElement(element)
    case "liquidity":
      return renderLiquidityElement(element)
    case "leverage":
      return renderLeverageElement(element)
    case "borrowlend":
      return renderBorrowLendElement(element)
    default:
      return null
  }
}

function renderMultipleElement(element: PortfolioElementMultiple) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Asset</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {element.data.assets.map((asset, index) => (
          <TableRow key={index}>
            <TableCell>{renderAssetName(asset)}</TableCell>
            <TableCell>{asset.data.amount.toFixed(6)}</TableCell>
            <TableCell>${asset.value.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function renderLiquidityElement(element: PortfolioElementLiquidity) {
  return (
    <div className="space-y-4">
      {element.data.liquidities.map((liquidity, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{liquidity.name || `Liquidity Pool ${index + 1}`}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Assets</h4>
                <ul>
                  {liquidity.assets.map((asset, i) => (
                    <li key={i}>{renderAssetName(asset)}: {asset.data.amount.toFixed(6)}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Rewards</h4>
                <ul>
                  {liquidity.rewardAssets.map((asset, i) => (
                    <li key={i}>{renderAssetName(asset)}: {asset.data.amount.toFixed(6)}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4">
              <p>Assets Value: ${liquidity.assetsValue.toFixed(2)}</p>
              <p>Reward Value: ${liquidity.rewardAssetsValue.toFixed(2)}</p>
              <p>Total Value: ${liquidity.value.toFixed(2)}</p>
            </div>
            {liquidity.yields.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold">Yields</h4>
                <ul>
                  {liquidity.yields.map((yield_, i) => (
                    <li key={i}>{yield_.apr.toFixed(2)}% APR - {yield_.apy.toFixed(2)}% APY</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function renderLeverageElement(element: PortfolioElementLeverage) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Long Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {element.data.longAssets.map((asset, index) => (
                <li key={index}>{renderAssetName(asset)}: {asset.data.amount.toFixed(6)}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Short Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {element.data.shortAssets.map((asset, index) => (
                <li key={index}>{renderAssetName(asset)}: {asset.data.amount.toFixed(6)}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      <div>
        <h4 className="font-semibold">Leverage Ratio: {element.data.leverageRatio.toFixed(2)}x</h4>
        <Progress value={element.data.leverageRatio * 10} className="mt-2" />
      </div>
    </div>
  )
}

function renderBorrowLendElement(element: PortfolioElementBorrowLend) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Supplied Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {element.data.suppliedAssets.map((asset, index) => (
                <li key={index}>{renderAssetName(asset)}: {asset.data.amount.toFixed(6)}</li>
              ))}
            </ul>
            <p className="mt-2">Total Value: ${element.data.suppliedValue.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Borrowed Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {element.data.borrowedAssets.map((asset, index) => (
                <li key={index}>{renderAssetName(asset)}: {asset.data.amount.toFixed(6)}</li>
              ))}
            </ul>
            <p className="mt-2">Total Value: ${element.data.borrowedValue.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>
      <div>
        <h4 className="font-semibold">Health Ratio</h4>
        <Progress value={element.data.healthRatio !== null ? element.data.healthRatio * 100 : 0} className="mt-2" />
        <p>{element.data.healthRatio !== null ? `${(element.data.healthRatio * 100).toFixed(2)}%` : 'Unknown'}</p>
      </div>
      {element.data.rewardAssets.length > 0 && (
        <div>
          <h4 className="font-semibold">Reward Assets</h4>
          <ul>
            {element.data.rewardAssets.map((asset, index) => (
              <li key={index}>{renderAssetName(asset)}: {asset.data.amount.toFixed(6)}</li>
            ))}
          </ul>
          <p>Reward Value: ${element.data.rewardValue.toFixed(2)}</p>
        </div>
      )}
      {element.data.expireOn && (
        <div>
          <h4 className="font-semibold">Expires On</h4>
          <p>{new Date(element.data.expireOn).toLocaleString()}</p>
        </div>
      )}
    </div>
  )
}

function renderAssetName(asset: PortfolioAsset): string {
  if ('symbol' in asset.data) {
    return asset.data.symbol
  } else if ('name' in asset.data) {
    return asset.data.name
  } else {
    return asset.data.address.slice(0, 10) + '...' + asset.data.address.slice(-10)
  }
}