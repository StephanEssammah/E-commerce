import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, increaseProductQuantity } from '../redux/cart'
import '../styles/Product.scss'

export const Product = () => {
  const [ variant, setVariant ] = useState(0)
  const [ product, setProduct ] = useState({
    name: '',
    variants: [{image: ''}],
  })
  const { state } = useLocation()
  const dispatch = useDispatch()
  const { productsInCart } = useSelector(state => state.cart)

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await axios.get(`https://frend-ecom-api.azurewebsites.net/Product/${state}`)
      setProduct(product.data)
    }
    fetchProduct()
  }, [state])

  const addToCart = () => {
    const cartItem = productsInCart.find(item => {
      return item.id === product.id && item.selectedVariant === variant
    })
    if(!cartItem) {
      return dispatch(addProduct({...product, selectedVariant: variant}))
    }
    if(cartItem.amount < cartItem.variants[variant].stock) {
      return dispatch(increaseProductQuantity(cartItem.cartItemId))
    }
  }

  const outlineSelectedVariant = (index) => {
    if (index === variant) return "product__variant__image product__variant__image-active"
    return "product__variant__image"
  }

  return (
    <div className="product">
      <img className="product__image" alt={product.name} src={product.variants[variant].image}/>
      <div>
        <h3 className="product__title">{product.name}</h3>
        <h4 className="product__price">{product.price} NOK</h4>
      {product.variants.length > 1 &&
        <div>
          {product.variants.map((variant, index) => (
            <img 
              key={index} 
              onClick={() => setVariant(index)} 
              className={outlineSelectedVariant(index)} 
              alt={variant.name} 
              src={variant.image}
            />
            ))}
        </div>
      }
      <p className="product__description">{product.description}</p>
      {product.variants[variant].stock === 0 
      ? <button className="product__button product__button__out-of-stock">Out Of Stock</button>
      :  <button onClick={addToCart} className="product__button">Add To Cart</button>}
      </div>
    </div>
  )
}
