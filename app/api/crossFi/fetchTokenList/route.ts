import { NextRequest, NextResponse } from "next/server"

import { XFISCAN_API } from "@/config/url.config"

export async function POST(req: NextRequest) {
  try {
    const { page, limit } = await req.json()
    const url = `${XFISCAN_API}/tokens?page=${page}&limit=${limit}`

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()

    if (result.errors) {
      return NextResponse.json({ errors: result.errors }, { status: 400 })
    }

    return NextResponse.json({ data: result.docs }, { status: 200 })
  } catch (error) {
    console.error("Fetch error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
