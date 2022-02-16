import React from 'react'
import { useSelector } from 'react-redux'
import '../styles/Navbar.scss'
import { NavLink } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai'
import { IoMdCart } from 'react-icons/io'

export const Navbar = ({menu, setMenu}) => {
  const { productsInCart } = useSelector(state => state.cart)
  
  return (
    <div className="nav">
      <button className="nav__button"onClick={() => setMenu(!menu)}>
          <AiOutlineMenu size="2em"/>
      </button>
      <NavLink className="nav nav__logo" to ="/">
        frend
      </NavLink>
      <NavLink className="nav nav__cart" to ="/cart">
        {productsInCart.length > 0 && <span className="nav__product-amount">{productsInCart.length}</span>}
        <IoMdCart className="nav" size="2em"/>
      </NavLink>
    </div>
  )
}
