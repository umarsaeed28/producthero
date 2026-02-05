import { NextResponse } from "next/server"

const PAYPAL_API =
  process.env.PAYPAL_SANDBOX === "true"
    ? "https://api-m.sandbox.paypal.com"
    : "https://api-m.paypal.com"

async function getAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const secret = process.env.PAYPAL_CLIENT_SECRET
  if (!clientId || !secret) throw new Error("PayPal is not configured.")
  const auth = Buffer.from(`${clientId}:${secret}`).toString("base64")
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${auth}`,
    },
    body: "grant_type=client_credentials",
  })
  if (!res.ok) throw new Error("PayPal auth failed")
  const data = await res.json()
  return data.access_token
}

export async function POST(request) {
  try {
    const { orderID } = await request.json()
    if (!orderID || typeof orderID !== "string") {
      return NextResponse.json({ error: "Order ID required." }, { status: 400 })
    }

    const token = await getAccessToken()
    const res = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: data.message || "Capture failed." },
        { status: res.status }
      )
    }
    return NextResponse.json({ ok: true, details: data })
  } catch (err) {
    console.error("PayPal capture error:", err)
    return NextResponse.json(
      { ok: false, error: err.message || "Capture failed." },
      { status: 500 }
    )
  }
}
