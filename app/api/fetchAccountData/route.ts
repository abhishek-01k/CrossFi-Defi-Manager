import { NextRequest, NextResponse } from "next/server"
import { getAccountDetailsQuery } from "@/queries/accountqueries/AccountDetailsQuery"

import { BASE_MAINNET_URL } from "@/config/url.config"

export async function POST(req: NextRequest) {
  try {
    const { accountAddress } = await req.json()
    const operationsDoc = getAccountDetailsQuery(accountAddress)
    console.log("OperationDoc", operationsDoc)

    const response = await fetch(BASE_MAINNET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: {},
        operationName: "MyQuery",
      }),
    })

    /**
     * Gives 4 array of objects
     * 1.current_token_ownerships_v2 -> NFTs that the user has
     * 2.token_activities_v2 -> transfer activities of the NFTs
     */

    const result = await response.json()

    if (result.errors) {
      return NextResponse.json({ errors: result.errors }, { status: 400 })
    }

    return NextResponse.json({ data: result.data }, { status: 200 })
  } catch (error) {
    console.error("Fetch error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
