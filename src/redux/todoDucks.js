export const ADDITEM = "todoDucks/ADDITEM"
export const DELETEITEM = "todoDucks/DELETEITEM"

export const addItem = item => ({
  type: ADDITEM,
  item,
})
export const deleteItem = item => ({
  type: DELETEITEM,
  item,
})
const initialState = {
  todoItem: [],
}

export default function todoDucks(state = initialState, action) {
  if (action.type === ADDITEM) {
    return {
      ...state,
      todoItem: [...state.todoItem, action.item],
    }
  } else if (action.type === DELETEITEM) {
    state.todoItem.splice([...state.todoItem].indexOf(action.item), 1)
    return {
      ...state,
      todoItem: [...state.todoItem],
    }
  } else {
    return state
  }
}
