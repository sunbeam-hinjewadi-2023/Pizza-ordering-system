import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  // name of slice (must be unique)
  name: 'cart',
  initialState: {
    itemCounter: 0,
  },
  reducers: {
    // action: action handler
    addToCart: (state) => {
      state.itemCounter += 1
    },
    // action: action handler
    removeFromCart: (state) => {
      state.itemCounter -= 1
    },
  },
})

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer
