import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload)
    },
    removeProduct: (state) => {
      state.value -= 1
    },
    increaseProduct: (state, action) => {
      state.value += action.payload
    },
    decreaseProduct: (state, action) => {
      state.value += action.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, increaseProduct, decreaseProduct } = cartSlice.actions

export default cartSlice.reducer