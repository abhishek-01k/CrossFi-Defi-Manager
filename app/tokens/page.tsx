"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  useGetCoinDetailsByName,
  useGetCoinDetailsBySymbol,
  useGetCoinLists,
} from "@/models/Coins"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { RotatingLines } from "react-loader-spinner"

import { APP_PATHS } from "@/config/Routes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function TokenPage() {
  const router = useRouter()

  const [searchTerm, setSearchTerm] = useState("")
  const [searchType, setSearchType] = useState("name")
  const [currentPage, setCurrentPage] = useState(1)

  const [searchTokenDetails, setSearchTokenDetails] = useState([])

  const totalPages = 10
  const handlePrevPage = () => {
    const page = Math.max(currentPage - 1, 1)
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    const page = Math.min(currentPage + 1, totalPages)
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const { isLoading, data: coinLists } = useGetCoinLists({
    page: currentPage - 1,
    pageSize: 10,
  })

  const { mutate: fetchCoinDetailsByName, isPending: searching } =
    useGetCoinDetailsByName()
  const { mutate: fetchCoinDetailsBySymbol, isPending: searchingCoinDetails } =
    useGetCoinDetailsBySymbol()

  const handleSearch = async () => {
    if (searchType === "name") {
      fetchCoinDetailsByName(searchTerm, {
        onSuccess: (response) => {
          console.log("fetchCoinDetailsByName", response)
          setSearchTokenDetails(response)
        },
        onError: (err) => {
          console.log("Err", err)
          setSearchTokenDetails([])
        },
      })
    }

    if (searchType === "symbol") {
      fetchCoinDetailsBySymbol(searchTerm, {
        onSuccess: (response) => {
          console.log("fetchCoinDetailsBySymbol", response)
          setSearchTokenDetails(response)
        },
        onError: (err) => {
          console.log("Err", err)
          setSearchTokenDetails([])
        },
      })
    }
  }

  const handleClear = () => {
    setSearchTerm("")
    setSearchTokenDetails([])
  }

  console.log("isLoading", isLoading)

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 text-3xl font-bold">CrossFi Coin Explorer</h1>

      <div className="mb-8">
        <div className="mb-4 flex flex-col gap-4">
          <RadioGroup
            defaultValue="name"
            onValueChange={setSearchType}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="name" id="name" />
              <Label htmlFor="name">Search by Name</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="symbol" id="symbol" />
              <Label htmlFor="symbol">Search by Symbol</Label>
            </div>
          </RadioGroup>
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder={`Search coins by ${searchType}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md"
            />
            <Button onClick={handleSearch} disabled={searchTerm.length <= 0}>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
            <Button disabled={searchTerm.length <= 0} onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>

        {searching ||
          isLoading ||
          (searchingCoinDetails && (
            <RotatingLines
              visible={true}
              width="40"
              strokeColor="#2c68e7"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
          ))}

        {searchTokenDetails.length ? (
          <Card>
            <CardHeader>
              <CardTitle>Coins</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Decimal</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="h-[50vh]">
                  {!searchTokenDetails.length && <div>No Data available</div>}
                  {searchTokenDetails.map((coin: any, index) => (
                    <TableRow key={index}>
                      <TableCell
                        className="cursor-pointer text-blue-500 hover:underline"
                        onClick={() => {
                          router.push(`${APP_PATHS.TOKENS}/${coin.coin_type}`)
                        }}
                      >
                        {coin.name}
                      </TableCell>
                      <TableCell>{coin.symbol}</TableCell>
                      <TableCell>{coin.decimals}</TableCell>
                      <TableCell>{coin.coin_type.slice(0, 90)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Coins</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Holders</TableHead>
                    <TableHead>Transfers</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="h-[50vh]">
                  {!coinLists.length && <div>No Data available</div>}
                  {coinLists.map((coin: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{coin.rank}</TableCell>
                      <TableCell
                        className="cursor-pointer text-blue-500 hover:underline"
                        onClick={() => {
                          router.push(`${APP_PATHS.TOKENS}/${coin.coin_type}`)
                        }}
                      >
                        {coin.name}
                      </TableCell>
                      <TableCell>{coin.price ?? "-"}</TableCell>
                      <TableCell>{coin.symbol}</TableCell>
                      <TableCell>
                        {coin.holder_count.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {coin.transfer_count.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {!!coinLists.length && (
                <div className="mt-4 flex items-center justify-between">
                  <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
