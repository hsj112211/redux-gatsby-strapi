import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { increment, decrement } from "../redux/actions/counter"

const Counter = () => {
  const count = useSelector(state => state.counter.count)
  const dispatch = useDispatch()

  return (
    <div>
      <h2>The current count is : {count}</h2>
      <button onClick={() => dispatch(increment())}>Increment Count</button>
      <button onClick={() => dispatch(decrement())}>Decrement Count</button>
    </div>
  )
}

export default Counter
