import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import '../styles/Product.scss'

export const Product = () => {
  const [ product, setProduct ] = useState({
    name: '',
    variants: [{image: ''}],
  })
  const { state } = useLocation();
  
  const [ variant, setVariant ] = useState(0)

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await axios.get(`https://frend-ecom-api.azurewebsites.net/Product/${state}`)
      setProduct(product.data)
      console.log(product.data)
    }
    fetchProduct();
  }, [state])

  return (
    <div className="product">
      <img className="product__image" alt={product.name} src={product.variants[variant].image}/>
      <h3>{product.name}</h3>
      <h4>{product.price} NOK</h4>
      {product.variants.length > 1 &&
        <div>
          {product.variants.map((variant, index) => <img onClick={() => setVariant(index)}className="product__variant__image" alt={variant.name} src={variant.image}/>)}
        </div>
      }
      <p className="product__description">{product.description}</p>
      {product.variants[variant].stock === 0 
      ? <button className="product__button out-of-stock">Out Of Stock</button>
      :  <button className="product__button">Add To Cart</button>}
      
    </div>
  )
}
