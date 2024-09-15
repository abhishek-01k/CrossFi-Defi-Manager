import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useGetNFTActivitiesByCollectionId } from "@/models/Collections/hooks/getNFTActivitiesByCollectionId"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { RotatingLines } from "react-loader-spinner"

import { APP_PATHS } from "@/config/Routes"
import { shortenAddress } from "@/lib/shortenAddress"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const NFTCollectionActivities = ({
  collectionId,
}: {
  collectionId: string
}) => {
  const { mutate: fetchNFTActivities, isPending: fetching } =
    useGetNFTActivitiesByCollectionId()

  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 10
  const limit = 20
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const [nftActivities, setNFTActivities] = useState([])

  const handleFetchNFTActivities = (currentPage: number) => {
    const offset = (currentPage - 1) * limit

    fetchNFTActivities(
      {
        collectionId,
        page: offset,
        pageSize: limit,
      },
      {
        onSuccess: (res) => {
          console.log("res", res)
          setNFTActivities(res)
        },
        onError: (err) => {
          console.log("Err", err)
        },
      }
    )
  }
  useEffect(() => {
    if (collectionId) {
      handleFetchNFTActivities(currentPage)
    }
  }, [collectionId, currentPage])

  const router = useRouter()

  return (
    <>
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
      {!fetching && (
        <Card>
          <CardHeader>
            <CardTitle>Transfers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="h-[50vh]">
                {!nftActivities.length && <div>No Data available</div>}
                {nftActivities.map((activity: any, index: number) => {
                  const action_type = activity.type?.split("::")?.slice(2)
                  return (
                    <TableRow key={index}>
                      <TableCell>{activity.transaction_version}</TableCell>
                      <TableCell
                        className="cursor-pointer text-blue-500 hover:underline"
                        onClick={() => {
                          router.push(
                            `${APP_PATHS.PROFILE}/${activity.from_address}`
                          )
                        }}
                      >
                        {shortenAddress(activity.from_address, 5)}
                      </TableCell>
                      <TableCell
                        className="cursor-pointer text-blue-500 hover:underline"
                        onClick={() => {
                          router.push(
                            `${APP_PATHS.PROFILE}/${activity.to_address}`
                          )
                        }}
                      >
                        {shortenAddress(activity.to_address, 5)}
                      </TableCell>
                      <TableCell>{activity.token_amount}</TableCell>
                      <TableCell>{action_type}</TableCell>
                      <TableCell>
                        {new Date(
                          activity.transaction_timestamp
                        ).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
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
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default NFTCollectionActivities
