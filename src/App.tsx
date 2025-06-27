import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import TodoApp from "./components/to-do-list";
import GoalsApp from "./components/long-goals";
import Aquarium from "./components/aquarium";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        {/* Navigation */}
        <nav className="bg-blue-600 text-white shadow-md">
          <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Axolotl helper</h1>
            <ul className="flex gap-4">
              <li>
                <Link
                  to="/components/aquarium"
                  className="bg-white text-blue-600 hover:bg-blue-100 font-medium py-1.5 px-4 rounded-lg shadow-sm transition"
                >
                  Aquarium!
                </Link>
              </li>
              <li>
                <Link
                  to="/components/to-do-list"
                  className="bg-white text-blue-600 hover:bg-blue-100 font-medium py-1.5 px-4 rounded-lg shadow-sm transition"
                >
                  To-do List
                </Link>
              </li>
              <li>
                <Link
                  to="/components/long-goals"
                  className="bg-white text-blue-600 hover:bg-blue-100 font-medium py-1.5 px-4 rounded-lg shadow-sm transition"
                >
                  Long-term Goals
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Content */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/components/to-do-list" element={<TodoApp />} />
            <Route path="/components/long-goals" element={<GoalsApp />} />
            <Route path="/" element={<Aquarium />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
