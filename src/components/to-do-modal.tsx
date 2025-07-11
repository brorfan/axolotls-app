import { useState } from "react";
import type { Todo } from "./to-do-list";

type Props = {
  isVisible: boolean;
  onSubmit: (x: Todo) => void;
  onCloseClicked: () => void;
};

export const CreateTodoModal = ({
  isVisible,
  onCloseClicked,
  onSubmit,
}: Props) => {
  const [text, setText] = useState<string>("");
  const [importance, setImportance] = useState<number>(5);
  const [isDeadlineOn, setIsDeadlineOn] = useState<boolean>(false);
  const [deadline, setDeadline] = useState<Date>();
  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      aria-hidden={!isVisible}
      className={`${
        isVisible ? "flex" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Add a new task!
            </h3>
            <button
              type="button"
              onClick={() => onCloseClicked()}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </div>

          <form className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="task"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Task
                </label>
                <input
                  type="text"
                  name="task"
                  id="task"
                  onChange={(e) => setText(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type the task here"
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="importance"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Importance
                </label>
                <input
                  id="importance"
                  type="range"
                  min="0"
                  max="10"
                  onChange={(e) => setImportance(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="deadline"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Deadline?
                </label>
                <button
                  type="button"
                  onClick={() => setIsDeadlineOn(!isDeadlineOn)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDeadlineOn
                      ? "bg-blue-600"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span className="sr-only"></span>
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isDeadlineOn ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>

                {isDeadlineOn ? (
                  <input
                    type="date"
                    onChange={(e) => setDeadline(new Date(e.target.value))}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date"
                    required
                  ></input>
                ) : null}
              </div>
            </div>

            <button
              type="submit"
              onClick={() => {
                if (!text.trim()) {
                  alert("Please enter a task name.");
                  return;
                }
                if (isDeadlineOn && deadline == null) {
                  alert("Please enter a correct deadline date.");
                  return;
                }

                onSubmit({
                  text,
                  importance,
                  deadline,
                  id: Date.now(),
                  completed: false,
                });
              }}
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add new task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
