import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(request) {
  const secret = process.env.STRIPE_SECRET_KEY
  if (!secret) {
    return NextResponse.json(
      { error: "Stripe is not configured." },
      { status: 500 }
    )
  }

  try {
    const { cart } = await request.json()
    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 })
    }

    const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const stripe = new Stripe(secret)

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: cart.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: Math.round(Number(item.price) * 100),
          product_data: {
            name: item.name,
          },
        },
        quantity: 1,
      })),
      success_url: `${origin}/checkout?success=stripe`,
      cancel_url: `${origin}/checkout`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error("Stripe checkout error:", err)
    return NextResponse.json(
      { error: err.message || "Checkout failed." },
      { status: 500 }
    )
  }
}
