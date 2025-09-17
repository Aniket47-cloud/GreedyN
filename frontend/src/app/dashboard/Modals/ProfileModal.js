"use client";

import Image from "next/image";
import LogoutIcon from '@mui/icons-material/Logout';
import userLogo from "@/assets/images/1.jpg"
import { useRouter } from "next/navigation";
import { useState ,useEffect,useContext} from "react";
import { UserContext } from "@/context/UserContext";
export default function ProfileModal({ isOpen, onClose,todos }) {
  const router = useRouter();
   const handleLogout = () => {
   localStorage.clear();
    router.push("/login"); 
  };
  const { user, setUser } = useContext(UserContext); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

     
      setFormData({
        name: parsedUser.name || "",
        email: parsedUser.email || "",
      });
    }
  }, []);

  

  const [loading, setLoading] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleUpdate = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/api/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data); 
        alert("Profile updated!");
        onClose();
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    } finally {
      setLoading(false);
      
    }
  };

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
              <p className="font-medium">{formData.name||""}</p>
              <p className="text-xs text-gray-500">{user?.role === "normal"? "Normal User" : "Super User"}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
             value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <button onClick={handleUpdate} className="bg-green-100 cursor-pointer text-green-700 px-4 py-2 rounded-lg w-full">
           {loading ? "Updating..." : "Update Profile"}
          </button>

          <div className="flex justify-between  p-4 mt-6">
            <div className="border-r border-gray-300 mr-4 w-[33.33%] ">
              <p className="text-lg font-semibold">{todos.length}</p>
              <p className="text-sm text-gray-500">All Todos</p>
            </div>
            <div className="border-r border-gray-300 mx-4 w-[33.33%] ">
              <p className="text-lg font-semibold">{todos.filter(todo => todo.status==="Upcoming").length}</p>
              <p className="text-sm text-gray-500">Upcoming</p>
            </div>
            <div className=" w-[33.33%] ml-4">
              <p className="text-lg font-semibold">{todos.filter(todo => todo.status==="Completed").length}</p>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
          </div>

          <button onClick={handleLogout} className="mt-8 cursor-pointer justify-center  w-full flex items-center gap-2 ">
             <LogoutIcon />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
