import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import "./Todo.css"
import { useSelector, useDispatch } from "react-redux"
import { addItem, deleteItem } from "../redux/todoDucks"

const Todo = () => {
  const [text, setText] = useState("")
  const todoItem = useSelector(state => state.item.todoItem)
  const dispatch = useDispatch()
  //const [todoItem, setTodoItem] = useState([])

  const onChangeValue = e => {
    setText(e.currentTarget.value)
  }
  const insertValue = e => {
    if (e.key === "Enter") {
      dispatch(addItem(text))
      //setTodoItem([...todoItem, text]) // todo 리스트에 추가하기
      setText("") // 할 일 추가하면 창 비우기
    }
  }

  const deleteValue = e => {
    console.log(e.target.outerHTML)
    const newText = e.target.outerHTML.replace(/(<([^>]+)>)/gi, "")

    dispatch(deleteItem(newText))
  }

  return (
    <div className="whole">
      <TextField
        id="standard-basic"
        placeholder="오늘 할 일은 ?"
        onChange={onChangeValue}
        onKeyPress={insertValue}
        value={text}
      />
      <div className="itemContainer">
        {todoItem.map(element => (
          <div className="item" onClick={deleteValue}>
            <li>{element}</li>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Todo
