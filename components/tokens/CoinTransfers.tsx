"use client"
import React, { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import CoinTransferListItem from "./components/CoinTransferListItem"
import { Button } from "../ui/button"
import { RotatingLines } from "react-loader-spinner"
import { useGetCoinTransfers } from "@/models/Coins"
import { ChevronLeft, ChevronRight } from "lucide-react"

const CoinTransfers = ({ tokenId, decimal }: { tokenId: string, decimal: number }) => {
    const totalPages = 10
    const limit = 20
    const [coinActivities, setCoinActivities] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const { mutate: fetchCoinTransfers, isPending: isLoading } = useGetCoinTransfers();

    const handleGetTokenDetails = async (currentPage: number) => {

        const offset = (currentPage - 1) * limit;

        fetchCoinTransfers({
            coinType: tokenId,
            page: offset,
            pageSize: limit
        }, {
            onSuccess: (res) => {
                setCoinActivities(res)
            },
            onError: (err) => {
                console.log("Err", err);
                setCoinActivities([])
            }
        })

    }

    useEffect(() => {
        if (tokenId) {
            handleGetTokenDetails(currentPage);
        }
    }, [tokenId, currentPage])

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1))
    }

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    }



    return (
        <>
            {isLoading && <RotatingLines
                visible={true}
                width="40"
                strokeColor="#2c68e7"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
            />}

            {!isLoading && (
                <>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>From Address</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Action Type</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
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
                            <TableBody>
                                {coinActivities.map((collection: any, index: any) => {
                                    return <CoinTransferListItem tokenTransfer={collection} key={index} decimal={decimal} />
                                })}
                            </TableBody>
                        )}

                    </Table>
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
                </>
            )}
        </>
    )
}

export default CoinTransfers
