import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/Menu.scss'

export const Menu = ({categories, setCategory}) => {
  return (
    <ul className="menu">
      {categories.map((category, index) => {
        return <NavLink className="menu__item" 
        to={`/category/${category.name}`} 
        key={index}
        state={category}
        >
        {category.name}</NavLink>
      })}
    </ul>
  )
}
