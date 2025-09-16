"use client";

import { useState } from "react";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SlidingModal from "../Modals/SlidingModal";
import FilterDropdown from "./Dropdown";
import TodoDetailsModal from "../Modals/TodoDetail";
import { CreateOutlined } from "@mui/icons-material";


export default function TodoTable() {
  const [filter, setFilter] = useState("All");
   const [showDetails, setShowDetails] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Submit project report",
      description:
        "Finalize and submit the quarterly project report to the manager by EOD",
      dueDate: "2023-08-16T18:00",
      status: "Completed",
    },
    {
      id: 2,
      title: "Team stand-up meeting",
      description:
        "Attend the daily stand-up meeting with the product team on Zoom",
      dueDate: "2023-08-16T18:00",
      status: "Upcoming",
    },
  ]);
   
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Upcoming",
  });

  // Filtered todos
  const filteredTodos =
    filter === "All" ? todos : todos.filter((todo) => todo.status === filter);
 
    const handleView = (todo) => {
    setSelectedTodo(todo);
    setShowDetails(true);
  };
  // Handle Add/Edit Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      setTodos(
        todos.map((todo) =>
          todo.id === currentId ? { ...todo, ...formData } : todo
        )
      );
    } else {
      setTodos([...todos, { id: Date.now(), ...formData }]);
    }

    setShowModal(false);
    setIsEditing(false);
    setCurrentId(null);
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      status: "Upcoming",
    });
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
     setShowDetails(false);
  };

  const handleEdit = (todo) => {
    setFormData(todo);
    setCurrentId(todo.id);
    setIsEditing(true);
    setShowModal(true);
    setShowDetails(false);
  };

  return (
    <main className=" bg-gray-50 mt-6 max-w-[100vw]  ">
      <div className="w-full  bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">All Todos</h2>
            <p className="text-sm text-gray-500">
              Last Updated : 16/08/2023 18:00
            </p>
          </div>
          <div className="flex items-center gap-3">
          <FilterDropdown filter={filter} setFilter={setFilter} />

            {/* Add Button */}
            <button
              onClick={() => {
                setShowModal(true);
                setIsEditing(false);
                setFormData({
                  title: "",
                  description: "",
                  dueDate: "",
                  status: "Upcoming",
                });
              }}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-md"
            >
              + Add Todo
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b text-sm text-gray-500 text-left">
                <th className="px-4 py-3">Todo</th>
                <th className="px-4 py-3">Due Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTodos.map((todo) => (
                <tr
                  key={todo.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td onClick={() => handleView(todo)} className="px-4 py-3">
                    <p className="text-gray-900 font-medium">{todo.title}</p>
                    <p className="text-gray-500 text-sm">{todo.description.slice(0,40) +"..."}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {new Date(todo.dueDate).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-sm font-medium px-3 py-1 rounded-full ${
                        todo.status === "Completed"
                          ? "text-green-600 bg-green-100"
                          : "text-yellow-600 bg-yellow-100"
                      }`}
                    >
                      {todo.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-3">
                    <button
                      onClick={() => handleEdit(todo)}
                      className="text-purple-500 p-1 bg-[#F4EFFF] rounded-md hover:bg-violet-300"
                    >
                      <CreateOutlined fontSize="small" />
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="text-red-500 p-1 rounded-md bg-red-200 hover:bg-red-300"
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTodos.length === 0 && (
            <p className="text-center py-6 text-gray-500">No todos found.</p>
          )}
        </div>
      </div>

      {/* Sliding Drawer Modal */}
        <SlidingModal
        open={showModal}
        onClose={() => setShowModal(false)}
        isEditing={isEditing}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />
      <TodoDetailsModal
         open={showDetails}
        onClose={() => setShowDetails(false)}
        todo={selectedTodo}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  );
}
