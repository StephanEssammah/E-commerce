import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import '../styles/Home.scss'

export const Home = ()  => {
  const [products, setProducts] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      const data = await axios.get('https://frend-ecom-api.azurewebsites.net/Product')
      setProducts(data.data)
    }
    getProducts()
  }, [])

  return (
    <div className="home">
      {products.map((product, index) => {
        const { name, price } = product
        const image = product.variants[0].image
        return (
          <div 
            className="home__product" 
            key={index}
            onClick={() => navigate(`/product/${name}`, { state: product.id})}
          >
            <img className="home__product__image" key={image} alt={name} src={image} />
            <h3 className="home__product__title" key={name}>{name}</h3>
            <p>{price} NOK</p>
          </div>
        )
      })}
    </div>
  )
}
