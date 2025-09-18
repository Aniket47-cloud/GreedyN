"use client";

import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FlagIcon from "@mui/icons-material/Flag";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TodoDetailsModal({ open, onClose, todo, onEdit, onDelete }) {

  const [show, setShow] = useState(open);

  useEffect(() => {
    if (open) {
      setShow(true);
    } else {

      const timer = setTimeout(() => setShow(false), 300); // match duration-300
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!todo) return null;
  return (
    <div
      className={`fixed inset-0 flex justify-end z-50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${open ? "bg-black/40" : "bg-black/0"
          }`}
        onClick={onClose}
      ></div>

      {/* Sliding Drawer */}
      <div
        className={`relative w-full max-w-md bg-white h-full shadow-xl transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center  px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">Todo Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <CloseIcon fontSize="large" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto h-[calc(100%-64px)]">
          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900">{todo.title}</h3>

          {/* Due Date */}
          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <CalendarTodayIcon fontSize="small" className="text-gray-500" />
            <span>
              {new Date(todo.dueDate).toLocaleString()}
            </span>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <FlagIcon fontSize="small" className="text-gray-500" />
            Status
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${todo.status === "Completed"
                  ? "text-green-600 bg-green-100"
                  : "text-yellow-600 bg-yellow-100"
                }`}
            >
               {todo.status}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={() => onEdit(todo)}
              className="text-gray-500 hover:text-gray-700"
            >
              <EditIcon fontSize="small" />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="text-gray-500 hover:text-gray-700"
            >
              <DeleteIcon fontSize="small" />
            </button>
          </div>

          {/* Divider */}
          <hr className="my-6 text-gray-300 " />

          {/* Description */}
          <div className=" flex flex-col items-start px-2 space-y-2">
            <h4 className=" font-semibold text-gray-900 ">Description</h4>
            <p className="text-gray-500 text-sm">{todo.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
