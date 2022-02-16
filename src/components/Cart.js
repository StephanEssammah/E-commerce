import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increaseProduct, decreaseProduct, removeProduct } from '../redux/cart'
import '../styles/Cart.scss'

export const Cart = () => {
  const { products } = useSelector(state => state.cart)
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setTotal(0)
    products.forEach(product => {
      setTotal(prevstate => prevstate + (product.amount * product.price))
    })
  }, [products])

  const dec = (amount, id) => {
    if (amount === 1) {
      dispatch(removeProduct(id))
      return;
    }
    dispatch(decreaseProduct(id))
  }

  const inc = (amount, cartItemId) => {
    const cartItem = products.find(item => {
      return item.cartItemId === cartItemId
    })
    const stock = cartItem.variants[cartItem.selectedVariant].stock
    if(amount < stock) {
      return dispatch(increaseProduct(cartItemId));
    }
  }

  return (
    <div className="cart">

      {products.map((product, index) => { 
        const { name, price, variants, selectedVariant, amount, cartItemId } = product

        return <div key={index} className="cart__product">
            <img className="cart__product__image" alt={name}src={variants[selectedVariant].image}/>
            <div className="cart__product__info">
              <div>
                <h3>{name}</h3>
                <p>{price * amount} NOK</p>
              </div>
            <div className="cart__product__amount">
              <button onClick={() => dec(amount, cartItemId)} className="cart__product__amount__btn">-</button>
              <p className="cart__product__amount__number">{amount}</p>
              <button onClick={() => inc(amount, cartItemId)} className="cart__product__amount__btn">+</button>
            </div>
          </div>
        </div>
      })}
      <h4>Total: {total} NOK</h4>
      <button className="cart__checkout">Checkout</button>
      
    </div>
  )
}
