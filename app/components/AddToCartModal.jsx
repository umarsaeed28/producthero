"use client"

import { useRouter } from "next/navigation"
import { useCart } from "../context/CartContext"
import styles from "./AddToCartModal.module.css"

export default function AddToCartModal() {
  const router = useRouter()
  const { showAddModal, closeAddModal } = useCart()

  function handleCheckout() {
    closeAddModal()
    router.push("/cart")
  }

  function handleAddMore() {
    closeAddModal()
    router.push("/#offerings")
  }

  if (!showAddModal) return null

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="add-to-cart-title">
      <div className={styles.backdrop} onClick={closeAddModal} aria-hidden />
      <div className={styles.modal}>
        <h2 id="add-to-cart-title" className={styles.title}>Added to cart</h2>
        <p className={styles.text}>Checkout now or add more services?</p>
        <div className={styles.actions}>
          <button type="button" className={styles.primaryBtn} onClick={handleCheckout}>
            Checkout
          </button>
          <button type="button" className={styles.secondaryBtn} onClick={handleAddMore}>
            Add more services
          </button>
        </div>
      </div>
    </div>
  )
}
