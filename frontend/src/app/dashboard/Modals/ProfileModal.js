"use client";

import Image from "next/image";
import LogoutIcon from '@mui/icons-material/Logout';
import userLogo from "@/assets/images/1.jpg"
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export default function ProfileModal({ isOpen, onClose, todos }) {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    router.push("/login");
  };
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { user, setUser } = useContext(UserContext);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
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
       if (parsedUser.avatarUrl) {
        setAvatarPreview(parsedUser.avatarUrl); 
      }
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [API_URL]);



  const [loading, setLoading] = useState(false);
  

  const handleUpdate = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("email", formData.email);
      if (avatarFile) fd.append("avatar", avatarFile);
      const res = await fetch(`${API_URL}/api/users/me`, {
        method: "PUT",
        headers: {

          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
       if (data.avatarUrl) {
          setAvatarPreview(data.avatarUrl); 
        }
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
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file)); // 👈 instant preview
    }
  };

  return (


    <div
      className={`fixed inset-0 z-40 flex justify-end transition-all duration-300 ${isOpen ? "visible" : "invisible"
        }`}
    >
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
          }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`relative w-full max-w-md bg-white h-full shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center p-4 ">
          <h2 className="text-2xl font-semibold">Profile</h2>
          <button onClick={onClose} className="text-xl text-gray-500">✕</button>
        </div>

        <div className="p-2 space-y-5">
          <div className="space-y-5  mx-auto rounded-md border border-gray-200 shadow-md p-4 ">
            <div className="flex items-center gap-3">
              <div className=" relative flex flex-col items-center  group">
                <Image
                  className="rounded-full"
                   src={avatarPreview || user?.avatarUrl || userLogo} 
                  width={60}
                  height={60}
                  alt="User Avatar"
                />
                <input
                  id="avatarUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />


                <label
                  htmlFor="avatarUpload"
                  className="absolute top-0 right-0 bg-white rounded-[100%] shadow-md p-1 cursor-pointer 
               opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <EditOutlinedIcon className="text-purple-500" fontSize="small" />
                </label>

              </div>
              <div className=" flex flex-col pt-1 items-start space-y-2">

                <p className={` p-2 px-4 rounded-full text-sm text-gray-500 ${user?.role === "normal" ? "bg-green-200 text-green-700" : "bg-yellow-300 text-yellow-700"}`}>{user?.role === "normal" ? "Normal User" : "Super Admin"}</p>
                <p className=" text-gray-500">Joined On : {user?.createdAt ? new Date(user.createdAt).toLocaleString() : "N/A"}</p>
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
                <p className="text-sm text-gray-500">All Todos</p>
                <p className="text-2xl mt-1 font-semibold">{todos.length}</p>

              </div>
              <div className="border-r border-gray-300 mx-4  w-[33.33%] ">
                <p className="text-sm text-gray-500">Upcoming</p>
                <p className="text-2xl mt-1 font-semibold">{todos.filter(todo => todo.status === "Upcoming").length}</p>

              </div>
              <div className=" w-[33.33%] ml-4">
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl mt-1 font-semibold">{todos.filter(todo => todo.status === "Completed").length}</p>

              </div>
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
