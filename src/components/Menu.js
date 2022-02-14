import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/Menu.scss'

export const Menu = ({categories}) => {
  return (
    <ul className="menu">
      {categories.map((category, index) => {
        return <NavLink className="menu__item" to={`/${category.name}`} key={index}>{category.name}</NavLink>
      })}
    </ul>
  )
}
