"use client";

import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
export default function UsersSection({open}) {
  const [users, setUsers] = useState([
    { id: 1, name: "Fawaz Ahamed", email: "Fawaz.a@greedygame.com", role: "Super Admin", isActive: true },
    { id: 2, name: "Prabeen", email: "Prab@greedygame.com", role: "Viewer", isActive: false },
    { id: 3, name: "Rahul Singh", email: "Rahul.S@greedygame.com", role: "Viewer", isActive: false },
  ]);
  const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#15803d", 
        opacity: 1,
        border: 0,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#e5e7eb", 
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 300,
    }),
  },
}));
  // Toggle role immediately
  const handleToggle = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, role: user.isActive ? "Viewer" : "Super Admin", isActive: !user.isActive }
          : user
      )
    );
  };

  return (
    <section className={`bg-white rounded-lg shadow-sm p-4 mt-10  ${open ? "ml-82 w-[calc(100%-22rem)]" : " w-[95%] mx-auto"} transition-all duration-500`}>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800">All Users</h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 border border-gray-200 px-3 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-100">
            <FilterAltIcon fontSize="small" />
            Filter
          </button>
          <button className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-green-700">
            <AddIcon fontSize="small" />
            Add Users
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-3">
        Last Updated : 16/08/2023 18:00
      </p>

      {/* Table header */}
      <div className="grid grid-cols-3 text-sm font-medium text-gray-500 border-b pb-2">
        <span>Name</span>
        <span className="text-center">Role</span>
        <span className="text-center">Actions</span>
      </div>

      {/* Users List */}
      {users.map((user) => (
        <div
          key={user.id}
          className="grid grid-cols-3 items-center text-sm py-3 border-b last:border-0"
        >
          <div>
            <p className="font-medium text-gray-800">{user.name}</p>
            <p className="text-gray-500 text-xs">{user.email}</p>
          </div>
          <p className="text-center text-gray-700">{user.role}</p>
          <div className="flex justify-center">
            <IOSSwitch
              checked={user.isActive}
              onChange={() => handleToggle(user.id)}
              color="success"
            />
          </div>
        </div>
      ))}
    </section>
  );
}
