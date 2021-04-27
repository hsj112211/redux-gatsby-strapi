import { INCREMENT, DECREMENT } from "../constants/counter"

export const increment = () => ({
  type: INCREMENT,
})

export const decrement = () => ({
  type: DECREMENT,
})
