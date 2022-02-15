import React from 'react'
import { useSelector } from 'react-redux'
import '../styles/Cart.scss'

export const Cart = () => {
  const { products } = useSelector(state => state.cart)
  console.log(products);

  return (
    <div className="cart">

      {products.map((product, index) => { 
        return <div key={index} className="cart__product">
            <img className="cart__product__image" alt={product.name}src={product.image}/>
            <div className="cart__product__info">
              <div>
                <h1>{product.name}</h1>
                <p>2 400 NOK</p>
              </div>
            <div className="cart__product__amount">
              <button className="cart__product__amount__btn">-</button>
              <p className="cart__product__amount__number">2</p>
              <button className="cart__product__amount__btn">+</button>
            </div>
          </div>
        </div>
      })}
      
    </div>
  )
}
