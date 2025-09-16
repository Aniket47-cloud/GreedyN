'use client';

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
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
export default function NavBar({setIsSiderBarOpen}) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);


    const notifications = [
        {
            title: "Team stand-up meeting",
            status: "Upcoming",
            date: "16/08/2023 18:00",
            description: "Attend the daily stand-up with the team on Zoom",
        },
        {
            title: "Submit project report",
            status: "Completed",
            date: "16/08/2023 18:00",
            description: "Finalize and submit the quarterly report to manager",
        },
        {
            title: "Client follow-up email",
            status: "Upcoming",
            date: "16/08/2023 18:00",
            description: "Draft and send follow-up email to client",
        },
        {
            title: "Buy groceries",
            status: "Upcoming",
            date: "16/08/2023 18:00",
            description: "Pick up essentials like milk, bread, vegetables",
        },
    ];

    // Close dropdown when clicking outside
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
                    <ArrowForwardOutlinedIcon onClick={() => setIsSiderBarOpen(true)} className="text-gray-600" />
                    <Image src={logo} width={250} height={150} alt="Logo" />
                    <div className=" flex items-center border border-gray-200 bg-gray-100 rounded-md px-2 ">
                        <SearchIcon />
                        <input type="text" placeholder="Search..." className="px-4 py-2 text-neutral-500  focus:outline-none " />
                    </div>

                </div>
                <div className="flex items-center  gap-6 p-5">
                    <NotificationsNoneIcon onClick={() => setShowNotifications(true)} sx={{ fontSize: 30 }} />
                    <div className="relative" ref={dropdownRef}>
                        <div className="flex items-center gap-1" onClick={() => setOpen(!open)} ref={dropdownRef}>
                            <Image className="rounded-full " src={userLogo} width={40} height={40} alt="User Avatar" />
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
                                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
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
                onClose={() => setShowProfile(false)}
            />
        </nav>
    )



}