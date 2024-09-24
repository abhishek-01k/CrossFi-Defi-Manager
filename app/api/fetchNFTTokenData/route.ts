import { NextRequest, NextResponse } from "next/server"

import { BASE_MAINNET_URL } from "@/config/url.config"
import { getNFTTokenDataByCollectionId } from "@/queries/NFTCollections"

export async function POST(req: NextRequest) {
    try {
        const { collectionId, page, pageSize } = await req.json()

        const operationsDoc = getNFTTokenDataByCollectionId(collectionId, page, pageSize

        )

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