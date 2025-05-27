import React, { useState, useEffect } from "react";

let todos = [];

export const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Todo was updated:", todos);
    document.title = `${todos.length} todos`;
  }, []);

  const addTodo = () => {
    todos.push(inputValue);
    setInputValue("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div style={{ padding: "20px", border: "1px solid black" }}>
      <h1>Todo List</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : null}

      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && addTodo()}
      />
      <button onClick={addTodo}>Add Todo</button>

      <div>
        {todos.map((todo, index) => (
          <div
            key={index}
            onClick={() => {
              todos.splice(index, 1);
            }}
          >
            {todo}
          </div>
        ))}
      </div>
    </div>
  );
};
