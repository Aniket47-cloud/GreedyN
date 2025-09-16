"use client";

import Image from "next/image";
import LogoutIcon from '@mui/icons-material/Logout';
import userLogo from "@/assets/images/1.jpg"
export default function ProfileModal({ isOpen, onClose }) {
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
          <h2 className="text-lg font-semibold">Profile</h2>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex items-center gap-3">
            <Image className="rounded-full " src={userLogo} width={40} height={40} alt="User Avatar" />
            <div>
              <p className="font-medium">Fawaz Ahamed</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
             
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <button className="bg-green-100 cursor-pointer text-green-700 px-4 py-2 rounded-lg w-full">
            Update Profile
          </button>

          <div className="flex justify-between  p-4 mt-6">
            <div className="border-r border-gray-300 mr-4 w-[33.33%] ">
              <p className="text-lg font-semibold">12</p>
              <p className="text-sm text-gray-500">All Todos</p>
            </div>
            <div className="border-r border-gray-300 mx-4 w-[33.33%] ">
              <p className="text-lg font-semibold">4</p>
              <p className="text-sm text-gray-500">Upcoming</p>
            </div>
            <div className=" w-[33.33%] ml-4">
              <p className="text-lg font-semibold">6</p>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
          </div>

          <button className="mt-8 justify-center  w-full flex items-center gap-2 ">
             <LogoutIcon />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
