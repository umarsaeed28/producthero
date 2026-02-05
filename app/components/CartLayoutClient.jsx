"use client"

import { CartProvider } from "../context/CartContext"
import AddToCartModal from "./AddToCartModal"

export default function CartLayoutClient({ children }) {
  return (
    <CartProvider>
      {children}
      <AddToCartModal />
    </CartProvider>
  )
}
