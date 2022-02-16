import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push({...action.payload, amount: 1, cartItemId: Date.now()})
    },
    removeProduct: (state, action) => {
      const index = state.products.findIndex(product => product.cartItemId === action.payload)
      state.products.splice(index, 1)
    },
    increaseProduct: (state, action) => {
      const index = state.products.findIndex(product => product.cartItemId === action.payload)
      state.products[index].amount++
    },
    decreaseProduct: (state, action) => {
      const index = state.products.findIndex(product => product.cartItemId === action.payload)
      state.products[index].amount--
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, increaseProduct, decreaseProduct } = cartSlice.actions

export default cartSlice.reducer