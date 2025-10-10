import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { IMenu } from "../api/restaurentApi"


export interface CartItem extends IMenu {
  quantity: number
  restaurantId: string
  restaurantName: string
}

interface CartState {
  items: CartItem[]
  restaurantId: string | null
  restaurantName: string | null
}

const initialState: CartState = {
  items: [],
  restaurantId: null,
  restaurantName: null,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        item: IMenu
        restaurantId: string
        restaurantName: string
      }>,
    ) => {
      const { item, restaurantId, restaurantName } = action.payload

      // If cart has items from different restaurant, clear it
      if (state.restaurantId && state.restaurantId !== restaurantId) {
        state.items = []
      }

      state.restaurantId = restaurantId
      state.restaurantName = restaurantName

      const existingItem = state.items.find((i) => i._id === item._id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({
          ...item,
          quantity: 1,
          restaurantId,
          restaurantName,
        })
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload)
      if (state.items.length === 0) {
        state.restaurantId = null
        state.restaurantName = null
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((i) => i._id === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i._id !== action.payload.id)
        }
      }
      if (state.items.length === 0) {
        state.restaurantId = null
        state.restaurantName = null
      }
    },
    clearCart: (state) => {
      state.items = []
      state.restaurantId = null
      state.restaurantName = null
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
