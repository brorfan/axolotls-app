import { useEffect, useState } from "react";
import { CreateTodoModal } from "./to-do-modal";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
  completionTime?: number;
  deadline?: Date;
  importance: number;
};

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(localStorage.getItem("todos") || "[]")
  );
  const [showCompleted, setShowCompleted] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todoData: Todo) => {
    const newTodo: Todo = {
      id: todoData.id,
      text: todoData.text,
      completed: todoData.completed,
      importance: todoData.importance,
      deadline: todoData.deadline,
    };
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, completionTime: Date.now() }
          : todo
      )
    );
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">To-Do List</h2>

      <button
        onClick={() => setShowModal(true)}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Add a new task
      </button>

      <CreateTodoModal
        isVisible={showModal}
        onSubmit={addTodo}
        onCloseClicked={() => setShowModal(false)}
      />

      <ul className="space-y-2 pb-5">
        {todos
          .filter((t) => !t.completed)
          .sort((a, b) => a.id - b.id)
          .map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span className="font-medium">{todo.text}</span>
                </div>
                <div className="ml-6 text-xs text-gray-500">
                  <div>Importance: {todo.importance} / 10</div>
                  {todo.deadline && (
                    <div>
                      Deadline: {new Date(todo.deadline).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => removeTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </li>
          ))}
      </ul>

      <div className="relative mb-4">
        <hr className="border-t border-gray-300" />
        <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-2 text-sm text-gray-500">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="text-sm text-black hover:font-bold"
          >
            {showCompleted ? "Hide Completed Tasks" : "Show Completed Tasks"}
          </button>
        </span>
      </div>
      {showCompleted && (
        <>
          <ul className="space-y-2">
            {todos
              .filter((t) => t.completed)
              .sort((a, b) => b.id - a.id)
              .map((todo) => (
                <li className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-md opacity-60">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked readOnly />
                    <span className="line-through">{todo.text}</span>
                  </div>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TodoApp;
