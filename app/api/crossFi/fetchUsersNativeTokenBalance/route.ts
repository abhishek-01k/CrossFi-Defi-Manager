import { NextRequest, NextResponse } from "next/server"

import { CROSSFI_COVALENT_API } from "@/config/url.config"

export async function POST(req: NextRequest) {
  try {
    const { accountAddress } = await req.json()

    const url = `${CROSSFI_COVALENT_API}/crossfi-evm-testnet/address/${accountAddress}/balances_native/?key=cqt_rQdDRhX8FP9gX7jB9rhBgkY46Pxq`

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()

    console.log("REsult >>>>", result)

    if (result.errors) {
      return NextResponse.json({ errors: result.errors }, { status: 400 })
    }

    return NextResponse.json({ data: result.data }, { status: 200 })
  } catch (error) {
    console.error("Fetch error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
