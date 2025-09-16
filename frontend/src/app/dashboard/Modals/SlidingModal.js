'use client';

import CloseIcon from "@mui/icons-material/Close";


export default function SlidingModal({open,
  onClose,
  isEditing,
  formData,
  setFormData,
  onSubmit,}) {

    return (
           <div
        className={`fixed inset-0 flex justify-end z-50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={onClose}
        ></div>

        {/* Panel */}
        <div
          className={`relative w-full max-w-md bg-white h-full shadow-xl transform transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">
              {isEditing ? "Edit Todo" : "Add Todo"}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <CloseIcon />
            </button>
          </div>

          <form onSubmit={onSubmit} className="p-6 space-y-4 overflow-y-auto h-[calc(100%-64px)]">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="mt-1 w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="mt-1 w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-green-500"
                required
              ></textarea>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Due Date *
              </label>
              <input
                type="date"
                value={formData.dueDate.split("T")[0] || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dueDate: e.target.value + "T" + (formData.dueDate.split("T")[1] || "00:00"),
                  })
                }
                className="mt-1 w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Due Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Due Time *
              </label>
              <input
                type="time"
                value={formData.dueDate.split("T")[1] || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dueDate: (formData.dueDate.split("T")[0] || "2023-08-16") + "T" + e.target.value,
                  })
                }
                className="mt-1 w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="mt-1 w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-green-500"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                {isEditing ? "Update Todo" : "Create Todo"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
}