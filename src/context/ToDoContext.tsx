// import { createContext, FC, ReactNode, useReducer, useState } from "react";
// import { Todo } from "../types/todo";

// import {v4 as uuid} from "uuid"

// export enum ModalType {
//   None = "None",
//   CreateTodo = "CreateTodo",
//   EditTodo = "EditTodo",
//   DeleteTodo = "DeleteTodo"
// }

// interface TodoState {
//   todos: Todo[],
//   currentTodo: Todo,
//   modal: {
//     msg: string,
//     modalType: ModalType
//   }
// }

// export enum ActionType {
//   CreateTodo = "create",
//   DeleteTodo = "delete",
//   EditTodo = "edit",
// }

// interface Action<T> {
//   type: ActionType,
//   payload: T
// }

// export interface Cx {
//   state: TodoState,
//   dispatch: React.Dispatch<Action<Omit<Todo, "id">>>
// }

// export const ToDoContext = createContext<Cx | null>(null);


// const initialState: TodoState = {
//   todos: [], 
//   modal: {
//     msg: "",
//     modalType: ModalType.None
//   },
//   currentTodo: {
//     id: "",
//     title: "",
//     text: ""
//   }
// };

// export const ToDoProvider:FC <{children: ReactNode}> = ({children})=> {
//     const [state, dispatch] = useReducer((state: TodoState, action: Action<Omit<Todo, "id">>) => {
//       switch (action.type) {
//         case ActionType.CreateTodo: return {
//           todos: [
//             ...state.todos,
//             {
//               title: action.payload.title,
//               text: action.payload.text,
//               id: uuid()
//             }
//           ]
//         };
//         case ActionType.EditTodo: return {
//           ...state,
//           ...action.payload
//         };
//         case ActionType.DeleteTodo: return {
//           ...state,
//           todos: state.todos.filter((todo) => todo.id !== state.currentTodo.id),
//           curretTodo: initialState.currentTodo
//         };
//         default: return state;
//       }
//     }, initialState);

//     const value = {
//       state,
//       dispatch
//     };

//     return (
//       <ToDoContext.Provider value={value}>
//         {children}
//       </ToDoContext.Provider>
//     )
// }