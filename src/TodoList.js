import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
import * as Icon from "react-bootstrap-icons";

const TodoList = () => {
  // State to store the todo list
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState(""); // State to store the new todo input

  // Function to fetch todo list from the server
  const fetchTodoList = async () => {
    try {
      const response = await axios.get(
        "https://3095-backend.vercel.app/todos-undone"
      );
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todo list:", error);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("https://3095-backend.vercel.app/todos", {
        action: newTodo,
      });
      fetchTodoList();
      setNewTodo(""); // Clear input field after submitting
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Function to handle marking a todo as completed
  const handleCompleted = async (action) => {
    try {
      // Send a request to mark the todo as completed
      await axios.post(
        `https://3095-backend.vercel.app/todo-complete/${action}`
      );
      fetchTodoList(); // Fetch updated todo list
    } catch (error) {
      console.error("Error marking todo as completed:", error);
    }
  };

  // useEffect hook to fetch todo list when component mounts
  useEffect(() => {
    fetchTodoList();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Add a Task</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What do you need to do today?"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </form>
            </div>
          </div>
          <br></br>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">My To-do List</h5>
              <ul className="list-group mt-4">
                {todos.map((todo) => (
                  <li
                    key={todo.action}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {todo.action}
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleCompleted(todo.action)}
                    >
                      <Icon.Check2/>{" "}
                      {/* Use proper bootstrap icon class */}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
