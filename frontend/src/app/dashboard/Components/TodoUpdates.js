'use client';


export default function TodoUpdates({todos}) {
    const UpdateCards = {
        AllTodos: todos.length,
        Upcoming: todos.filter(todo => todo.status === "Upcoming").length,
        Completed: todos.filter(todo => todo.status === "Completed").length

    }


    return (
        <main className="w-full mt-6  rounded-md bg-white">
            <div className="w-[95%] mx-auto flex  ">
                {Object.entries(UpdateCards).map(([key, value], index) => (
                    <div key={key} className={`flex flex-col items-start rounded-md  justify-center p-4 px-12 my-2 w-1/4
          ${index === 0 || index === 1 ? "border-r border-gray-400" : ""}`}
                    >
                        <p className="text-[#21252B] font-semibold text-lg">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className="text-gray-900 text-[24px] font-semibold">{value}</p>
                    </div>
                ))}
            </div>
        </main>

    );
}
