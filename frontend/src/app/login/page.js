'use client';
import Image from "next/image";
import Img from "@/assets/images/AuthDashImage.jpg"
import logo from "@/assets/images/logo.svg"
import google from "@/assets/images/google-logo.svg"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.type === "email" ? "email" : "password"]: e.target.value });
    }; 
    console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Login failed");

            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            
            localStorage.setItem("role", data.user.role);
            if (data.user.role === 'normal') {
                router.push("dashboard/user");
            } else { router.push("dashboard/superuser") }





        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full flex max-w-[100vw] h-screen">
            <div className="w-[45%]    overflow-x-hidden "><Image className=" w-full object-cover scale-x-140 h-full " src={Img} width={720} height={600} alt="Image" /></div>
            <div className="flex w-[55%] bg-white justify-center items-center max-h-[100vh] ">
                <div className="w-full max-w-lg flex flex-col items-center p-8">

                    <Image className="mb-6" src={logo} width={280} height={95} alt="logo" />


                    <h2 className="text-3xl font-semibold text-gray-900 text-center mb-2">
                        Welcome to GGTodo
                    </h2>
                    <p className="text-gray-500 text-lg font-normal text-center mb-6">
                        To get started, please sign in
                    </p>


                    <a
                        href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`}
                        className="flex items-center justify-center w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors duration-200"
                    >
                        <Image
                            src={google}
                            width={20}
                            height={20}
                            alt="Google logo"
                            className="mr-2"
                        />
                        Log In with Google
                    </a>

                    <div className="flex items-center my-4 w-full">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-4 text-gray-500 text-sm">Or</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>


                    <form onSubmit={handleSubmit} className="w-full space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your registered email"
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0CAF60]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0CAF60]"
                                />

                            </div>
                        </div>


                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 text-[#0CAF60] border-gray-300 rounded"
                                />
                                <span className="ml-2 text-gray-600">Remember me</span>
                            </label>
                            <Link href="#" className="text-gray-600 font-medium hover:underline">
                                Forgot Password
                            </Link>
                        </div>


                        <button
                            type="submit"
                            className="w-full py-3 bg-[#0CAF60] text-white rounded-md font-medium hover:bg-[#087742] flex justify-center items-center gap-2 transition-colors duration-200"
                        >
                            {loading && <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>}
                            Login
                        </button>
                        <p>Dont have an account? <Link href="/sign-up" className="text-[#0CAF60] hover:underline">Sign up</Link></p>
                    </form>
                </div>
            </div>


        </section>
    )

}