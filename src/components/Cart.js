import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increaseProductQuantity, decreaseProductQuantity, removeProduct } from '../redux/cart'
import '../styles/Cart.scss'

export const Cart = () => {
  const { productsInCart } = useSelector(state => state.cart)
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setTotal(0)
    productsInCart.forEach(product => {
      setTotal(prevstate => prevstate + (product.amount * product.price))
    })
  }, [productsInCart])

  const decrease = (amount, id) => {
    if (amount === 1) {
      dispatch(removeProduct(id))
      return;
    }
    dispatch(decreaseProductQuantity(id))
  }

  const increase = (amount, cartItemId) => {
    const cartItem = productsInCart.find(item => {
      return item.cartItemId === cartItemId
    })
    const stock = cartItem.variants[cartItem.selectedVariant].stock
    if(amount < stock) {
      return dispatch(increaseProductQuantity(cartItemId));
    }
  }

  return (
    <div className="cart">
    
      {productsInCart.map((product, index) => { 
        const { name, price, variants, selectedVariant, amount, cartItemId } = product

        return (
          <div key={index} className="cart__product">
            <img className="cart__product__image" alt={name} src={variants[selectedVariant].image}/>
            <div className="cart__product__info">
              <div>
                <h3>{name}</h3>
                <p>{price * amount} NOK</p>
              </div>
              <div>
                <div className="cart__product__amount">
                  <button 
                    onClick={() => decrease(amount, cartItemId)} 
                    className="cart__product__amount__btn"
                  >-</button>
                  <p className="cart__product__amount__number">{amount}</p>
                  <button 
                    onClick={() => increase(amount, cartItemId)} 
                    className="cart__product__amount__btn"
                  >+</button>
                </div>
                <p className="cart__product__stock">{`Stock: ${variants[selectedVariant].stock}`}</p>
              </div>
            </div>
          </div>
        )
      })}
      <h4>Total: {total} NOK</h4>
      <button className="cart__checkout">Checkout</button>
      
    </div>
  )
}
