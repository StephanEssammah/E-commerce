import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios'
import '../styles/Home.scss'

export const Category = ()  => {
  const [products, setProducts] = useState([])
  const navigate = useNavigate();
  const { state }  = useLocation();

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get('https://frend-ecom-api.azurewebsites.net/Product')
      setProducts(data.data)
    }
    getData()
  }, [])


  return (
    <div className="home">
      {products.map((product, index) => {
        const { name, price } = product
        const image = product.variants[0].image
        if(state.id !== product.categoryId[0]) return null;
        return <div 
          className="home__product" 
          key={index}
          onClick={() => navigate(`/product/${name}`, { state: product.id})}
          >
          <img className="home__product__image" key={image} alt={name} src={image} />
          <h3 className="home__product__title" key={name}>{name}</h3>
          <p>{price} NOK</p>
        </div>
      })}
    </div>
  )
}
