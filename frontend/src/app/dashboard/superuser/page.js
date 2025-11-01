'use client';
import { useState,useEffect, useContext } from "react";
import { GridViewOutlined, PeopleAltOutlined } from "@mui/icons-material";
import NavBar from "../Components/NavBar";
import TodoTable from "../Components/TodoTable";
import TodoUpdates from "../Components/TodoUpdates";
import Image from "next/image";
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import whitelogo from "@/assets/images/whitelogo.svg"
import UsersSection from "../Components/User";
import { UserContext } from "@/context/UserContext";

export default function SuperUserDashboardPage() {
    const [active, setActive] = useState("Dashboard");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [todos, setTodos] = useState([]);
    const { user } = useContext(UserContext);
      const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL
      useEffect(() => {
        const fetchTodos = async () => {
          try {
            const token = localStorage.getItem("token");
            console.log(token);
            const res = await fetch(`${API_URL}/api/todos`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (res.ok) setTodos(data);
            else throw new Error(data.message || "Failed to fetch todos");
          } catch (err) {
            console.error(err.message);
          }
        };
        fetchTodos();
      }, [API_URL]);
    return (
        <>
        <div className="flex ">
             <aside className={`bg-[#111827] text-gray-300 w-72 z-20 absolute h-screen 
              transition-all duration-400 flex flex-col
              ${isSidebarOpen 
                ? "translate-x-0 opacity-100 pointer-events-auto" 
                : "-translate-x-full opacity-0 pointer-events-none"}`}>
        {/* Logo */}
  <div className="flex items-center gap-1  justify-between w-full mx-auto p-6 ">
  <h1 className="mb-6 text-[25px] font-extrabold tracking-tight text-white uppercase">
  <span className="font-sans">Greedy</span>
  <span className="ml-2 font-sans">Notes</span>
</h1>
    <div className="p-0 rounded-full items-center flex justify-center bg-gray-700"><KeyboardDoubleArrowLeftOutlinedIcon onClick={() => setIsSidebarOpen(false)} className="text-gray-300 cursor-pointer"/></div>
  </div>
        {/* Menu */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setActive("Dashboard")}
                className={`flex items-center w-full px-3 py-3 rounded-lg text-sm font-medium transition
                  ${
                    active === "Dashboard"
                      ? "bg-[#383E47] text-green-600"
                      : "hover:bg-gray-700 text-gray-500"
                  }`}
              >
                <GridViewOutlined className="mr-3" />
                Dashboard
              </button>
            </li>

            <li>
              <button
                onClick={() => setActive("Users")}
                className={`flex items-center w-full px-3 py-3 rounded-lg text-sm font-medium transition
                  ${
                    active === "Users"
                      ? "bg-[#383E47] text-green-600"
                      : "hover:bg-gray-700 text-gray-500"
                  }`}
              >
                <PeopleAltOutlined className="mr-3" />
                Users
              </button>
            </li>
          </ul>
        </nav>

    
        
      </aside>
       
        <main className="bg-gray-100 min-h-screen w-full flex flex-col ">
          <NavBar setIsSiderBarOpen={setIsSidebarOpen} todos={todos} />
      {active=== "Dashboard" && (  <section className={`max-w-[100vw] flex flex-col   ${isSidebarOpen ? "ml-82 w-[calc(100%-22rem)]" : " w-[95%] mx-auto"} transition-all duration-500`} >
                  <div className="flex justify-between items-center mt-6  ">
                      <p className="text-2xl font-bold text-black">{`Hello, ${user?.name || "User"}`}</p>
                      <p className="text-gray-400  font-normal"> {`Last Login: ${user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : ""}`}</p>
                  </div>
                  <TodoUpdates todos={todos}/>
                 <TodoTable todos={todos} setTodos={setTodos} />
      
                </section>)}
          {active==="Users"&&(<UsersSection open={isSidebarOpen}/>)}
        </main>
       

         </div>
        </>
    );
}
