import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  productsInCart: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.productsInCart.push({...action.payload, amount: 1, cartItemId: Date.now()})
    },
    removeProduct: (state, action) => {
      const index = state.productsInCart.findIndex(product => product.cartItemId === action.payload)
      state.productsInCart.splice(index, 1)
    },
    increaseProductQuantity: (state, action) => {
      const index = state.productsInCart.findIndex(product => product.cartItemId === action.payload)
      state.productsInCart[index].amount++
    },
    decreaseProductQuantity: (state, action) => {
      const index = state.productsInCart.findIndex(product => product.cartItemId === action.payload)
      state.productsInCart[index].amount--
    },
    
  },
})

export const { addProduct, removeProduct, increaseProductQuantity, decreaseProductQuantity } = cartSlice.actions

export default cartSlice.reducer