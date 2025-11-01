"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useContext, useCallback } from "react";
import SearchIcon from '@mui/icons-material/Search';
import logo from "@/assets/images/logo.svg"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import userLogo from "@/assets/images/1.jpg"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import NotificationModal from "../Modals/NotificationModal";
import ProfileModal from "../Modals/ProfileModal";
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";

export default function NavBar({ setIsSiderBarOpen, todos }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const [notifications, setNotifications] = useState([]);
    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const router = useRouter();
    const { user, setUser } = useContext(UserContext);

    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
        router.push("/login");
    };




    const fetchNotifications = useCallback(async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`${API_URL}/api/todos/notifications`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {

                const merged = [
                    ...data.upcoming.map(n => ({ ...n, type: "Upcoming" })),
                    ...data.completed.map(n => ({ ...n, type: "Completed" }))
                ];
                setNotifications(merged);
            }
        } catch (err) {
            console.error("Error fetching notifications:", err);
        }
    }, [API_URL]);

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 10000);
        return () => clearInterval(interval);
    }, [fetchNotifications]);
    
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className=" bg-white w-full max-w-[100vw] shadow-md relative ">
            <div className="w-[95%] bg-white mx-auto flex justify-between items-center py-1">
                <div className="flex items-center gap-4">
                    {user?.role !== "normal" && (
                        <ArrowForwardOutlinedIcon
                            onClick={() => setIsSiderBarOpen(true)}
                            className="text-gray-600 cursor-pointer"
                        />
                    )}
                    <h1 className=" text-[25px] font-extrabold tracking-tight text-black uppercase">
  <span className="font-sans">Greedy</span>
  <span className="ml-2 font-sans">Notes</span>
</h1>
                    <div className=" flex items-center border border-gray-200 bg-gray-100 rounded-md px-2 ">
                        <SearchIcon />
                        <input type="text" placeholder="Search..." className="px-4 py-2 text-neutral-500  focus:outline-none " />
                    </div>

                </div>
                <div className="flex items-center  gap-6 p-5">
                    <NotificationsNoneIcon onClick={() => setShowNotifications(true)} sx={{ fontSize: 30 }} />
                    <div className="relative" ref={dropdownRef}>
                        <div className="flex items-center gap-1" onClick={() => setOpen(!open)} ref={dropdownRef}>
                            <Image
                                className="rounded-full"
                                src={user?.avatarUrl || userLogo}
                                width={40}
                                height={40}
                                alt="User Avatar"
                            />
                            <KeyboardArrowDownIcon className="text-gray-600" />

                        </div>
                        {open && (
                            <>
                                <div className="fixed inset-0 bg-black/30  z-40"></div>
                                <div ref={dropdownRef} className="absolute top-14 right-0 w-44 bg-white shadow-lg rounded-xl border border-gray-100 py-2 z-50">
                                    <button onClick={() => {
                                        setOpen(false);
                                        setTimeout(() => setShowProfile(true), 100); // 100ms delay
                                    }} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <PersonOutlineOutlinedIcon fontSize="small" />
                                        Profile
                                    </button>
                                    <hr />
                                    <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <LogoutIcon fontSize="small" />
                                        Logout
                                    </button>
                                </div></>
                        )}</div>
                </div>
            </div>
            <NotificationModal
                isOpen={showNotifications}
                onClose={() => setShowNotifications(false)}
                notifications={notifications}
            />
            <ProfileModal
                isOpen={showProfile}
                todos={todos}
                onClose={() => setShowProfile(false)}
            />
        </nav>
    )



}
