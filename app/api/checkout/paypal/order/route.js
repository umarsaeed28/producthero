import { NextResponse } from "next/server"

const PAYPAL_API =
  process.env.PAYPAL_SANDBOX === "true"
    ? "https://api-m.sandbox.paypal.com"
    : "https://api-m.paypal.com"

async function getAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const secret = process.env.PAYPAL_CLIENT_SECRET
  if (!clientId || !secret) {
    throw new Error("PayPal is not configured.")
  }
  const auth = Buffer.from(`${clientId}:${secret}`).toString("base64")
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${auth}`,
    },
    body: "grant_type=client_credentials",
  })
  if (!res.ok) {
    const t = await res.text()
    throw new Error(t || "PayPal auth failed")
  }
  const data = await res.json()
  return data.access_token
}

export async function POST(request) {
  try {
    const { amount } = await request.json()
    const value = typeof amount === "number" ? amount : parseFloat(amount)
    if (Number.isNaN(value) || value <= 0) {
      return NextResponse.json({ error: "Invalid amount." }, { status: 400 })
    }
    const amountStr = value.toFixed(2)

    const token = await getAccessToken()
    const res = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: amountStr,
            },
          },
        ],
      }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.message || res.statusText)
    }
    const order = await res.json()
    return NextResponse.json({ orderID: order.id })
  } catch (err) {
    console.error("PayPal create order error:", err)
    return NextResponse.json(
      { error: err.message || "PayPal order failed." },
      { status: 500 }
    )
  }
}
