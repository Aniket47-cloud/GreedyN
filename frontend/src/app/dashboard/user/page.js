'use client';

import NavBar from "../Components/NavBar";
import TodoTable from "../Components/TodoTable";
import TodoUpdates from "../Components/TodoUpdates";



export default function UserDashboardPage() {
    return (
        <main className="bg-gray-100 min-h-screen min-w-screen flex flex-col ">
          <NavBar />
          <section className="max-w-[100vw] flex flex-col  w-[95%] mx-auto " >
            <div className="flex justify-between items-center mt-6  ">
                <p className="text-2xl font-bold text-black">Hello, Aniket</p>
                <p className="text-gray-400  font-normal"> Last Login : 18/23/45 16:00</p>
            </div>
            <TodoUpdates/>
           <TodoTable/>

          </section>
        </main>
    );
}