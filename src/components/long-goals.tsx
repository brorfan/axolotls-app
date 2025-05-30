import React, { useState } from "react";

type Goal = {
  id: number;
  text: string;
  completed: number;
};

const GoalsApp: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [input, setInput] = useState("");

  const addGoal = () => {
    if (!input.trim()) return;
    const newGoal: Goal = {
      id: Date.now(),
      text: input,
      completed: 0,
    };
    setGoals([...goals, newGoal]);
    setInput("");
  };

  const removeGoal = (id: number) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const toggleGoal = (id: number) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, completed: goal.completed++} : goal
      )
    );
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Long-term Goals</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add a goal"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addGoal}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {goals.map((goal) => (
          <li
            key={goal.id}
            className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={() => toggleGoal(goal.id)}
              />
              <span>{goal.text}</span>
            </div>
            <button
              onClick={() => removeGoal(goal.id)}
              className="text-red-500 hover:text-red-700"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalsApp;
