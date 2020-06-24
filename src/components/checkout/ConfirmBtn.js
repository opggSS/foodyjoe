import React from 'react'

export default function ConfirmBtn({totalPrice, placeOrder}) {
  return (
    <div className="confirmBtn">
      <div className="left">${totalPrice}</div>
      <div className="right" onClick={placeOrder}> Place Order </div>
    </div>
  )
}
