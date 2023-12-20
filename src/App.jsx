// import { useState, useEffect } from "react";
// import { FaTwitter, FaQuoteLeft, FaTumblr } from "react-icons/fa";
// import  { sculptureList } from "./Data.jsx";
import "./App.css";
// import { useImmer } from 'use-immer';
import { useEffect, useState } from "react";
import AddTodo  from "./AddTodo.jsx";
import  TaskList  from "./TaskList.jsx";

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

export default function App() {
  
  return (
  <>
    <TaskApp />
  </>
  );
}


export function TaskApp() {
  const [todos, setTodos]  = useState(initialTodos);

  function handleOnAddTodo (title) {
    setTodos([
      ...todos,
      {id: nextId++, title: title, done: false}
    ]);
  }

  function handleOnChangeTodo (nextTodo) {
    setTodos(todos.map(todo => {
      if (todo.id === nextTodo.id) {
        return nextTodo;
      } else {
        return todo;
      }
    }));
  }

  function handleOnDeleteTodo(todoId) {
    setTodos(todos.filter(t => t.id !== todoId));
  }

  return(<>
  <AddTodo onAddTodo={handleOnAddTodo} />
  <TaskList todos={todos} onChangeTodo={handleOnChangeTodo}
  onDeleteTodo={handleOnDeleteTodo} />
  </>);
}


