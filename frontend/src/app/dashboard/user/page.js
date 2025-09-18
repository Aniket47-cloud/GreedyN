'use client';

import NavBar from "../Components/NavBar";
import TodoTable from "../Components/TodoTable";
import TodoUpdates from "../Components/TodoUpdates";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { Api } from "@mui/icons-material";

export default function UserDashboardPage() {
  const [todos, setTodos] = useState([]);
  const { user } = useContext(UserContext);
  
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/api/todos`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        console.log("Todos response:", res.status, data);

        if (res.ok) setTodos(data);
        else throw new Error(data.message || "Failed to fetch todos");
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchTodos();
  }, [API_URL]);
    return (
        <main className="bg-gray-100 min-h-screen min-w-screen flex flex-col overflow-x-hidden overflow-y-auto ">
          <NavBar todos={todos} />
          <section className="max-w-[100vw] flex flex-col  w-[95%] mx-auto " >
            <div className="flex justify-between items-center mt-6  ">
                <p className="text-2xl font-bold text-black">{`Hello, ${user?.name || "User"}`}</p>
                <p className="text-gray-400  font-normal"> {`Last Login: ${user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : ""}`}</p>
            </div>
            <TodoUpdates todos={todos}/>
           <TodoTable todos={todos} setTodos={setTodos} />

          </section>
        </main>
    );
}