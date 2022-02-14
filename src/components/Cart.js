import React from 'react'
import '../styles/Cart.scss'

export const Cart = () => {
  return (
    <div className="cart">
      <div className="cart__image"/>
      <div className="cart__info">
        <h1>Cart</h1>
        <div className="cart__something">
          <div>
            <p>Size M</p>
            <p>2 400 NOK</p>
          </div>
          <div className="cart__info__amount">
            <button>-</button>
            <p>2</p>
            <button>+</button>
          </div>
        </div>
      </div>
    </div>
  )
}
