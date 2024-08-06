import { useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo } from "./Slices/todoSlice";
import { v4 as uuid } from "uuid";

function App() {
  const [inputText, setInputText] = useState("");

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  const onAddTodo = () => {
    dispatch(
      addTodo({
        id: uuid(),
        todo: inputText,
      })
    );
    setInputText("");
  };

  const onDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="bg-slate-200 w-screen h-screen text-center">
      <h1 className="text-purple-950 text-5xl font-semibold p-4 bg-zinc-300 shadow-[0_5px_10px_0_rgba(0,0,0,0.3)]">
        Redux Todo
      </h1>
      <div className="mt-5">
        <input
          type="text"
          value={inputText}
          placeholder="Enter Todo list item..."
          onChange={(e) => setInputText(e.target.value)}
          className="m-3 px-3 py-2 rounded-lg shadow-[0_3px_8px_0_rgba(0,0,0,0.24)] outline-none"
        />
        <button
          className="bg-purple-950 m-3 px-3 py-2 rounded-lg shadow-[0_3px_8px_0_rgba(0,0,0,0.24)] text-white font-bold w-28"
          onClick={onAddTodo}
        >
          Add
        </button>
      </div>
      <div
        className={
          todos?.length > 0 ? "bg-slate-50 m-3 px-3 py-2 rounded-lg" : ""
        }
      >
        {todos?.length > 0 &&
          todos.map((todo) => (
            <div className="flex justify-center items-center" key={todo.id}>
              <div className="bg-slate-200 m-3 px-3 py-2 rounded-lg w-64 text-2xl text-purple-950">
                {todo.todo}
              </div>
              <button
                className="bg-red-500 m-3 px-3 py-2 rounded-lg shadow-[0_3px_8px_0_rgba(0,0,0,0.24)] text-white font-bold w-28"
                onClick={() => onDeleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
