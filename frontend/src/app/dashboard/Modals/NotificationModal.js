"use client";

export default function NotificationModal({ isOpen, onClose, notifications }) {
  return (
    <div
      className={`fixed inset-0 z-40 flex justify-end transition-all duration-300 ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`relative w-full max-w-md bg-white h-full shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">All Notifications</h2>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

        <div className="p-4 space-y-3 overflow-y-auto h-full">
          {notifications.length > 0 ? (
            notifications.map((n, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <p className="font-medium">
                  {n.title}{" "}
                  <span
                    className={`${
                      n.status === "Upcoming"
                        ? "text-yellow-500"
                        : n.status === "Completed"
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  >
                    {n.status}
                  </span>
                </p>
                <p className="text-sm text-gray-500">{n.date}</p>
                <p className="text-sm text-gray-400">{n.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No notifications available</p>
          )}
        </div>
      </div>
    </div>
  );
}
