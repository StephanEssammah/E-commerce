import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addProduct } from '../redux/cart'
import '../styles/Product.scss'

export const Product = () => {
  const [ variant, setVariant ] = useState(0)
  const [ product, setProduct ] = useState({
    name: '',
    variants: [{image: ''}],
  })
  const { state } = useLocation();
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addProduct({...product, selectedVariant: variant}))
  }

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await axios.get(`https://frend-ecom-api.azurewebsites.net/Product/${state}`)
      setProduct(product.data)
    }
    fetchProduct();
  }, [state])

  return (
    <div className="product">
      <img className="product__image" alt={product.name} src={product.variants[variant].image}/>
      <div>
        <h3>{product.name}</h3>
        <h4>{product.price} NOK</h4>
      {product.variants.length > 1 &&
        <div>
          {product.variants.map((variant, index) => <img key={index} onClick={() => setVariant(index)}className="product__variant__image" alt={variant.name} src={variant.image}/>)}
        </div>
      }
      <p className="product__description">{product.description}</p>
      {product.variants[variant].stock === 0 
      ? <button className="product__button out-of-stock">Out Of Stock</button>
      :  <button onClick={addToCart} className="product__button">Add To Cart</button>}
      </div>
    </div>
  )
}
