'use client';
import Image from "next/image";
import Img from "@/assets/images/AuthDashImage.jpg"
import logo from "@/assets/images/logo.svg"
import google from "@/assets/images/google-logo.svg"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const handleChange = (e) => {
        const { type, value } = e.target;
        setFormData({
            ...formData,
            [type === "email" ? "email" : type === "password" ? "password" : "name"]: value
        });
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Registration failed");

            
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            localStorage.setItem("role",data.user.role);
            if (data.user.role === 'normal') {
                router.push("dashboard/user");
            } else { router.push("dashboard/superuser") }


        } catch (err) {
            alert(err.message);
        }
        finally {
            setLoading(false);

        }
    };

    return (
        <section className="w-full flex max-w-[100vw] h-screen">
            <div className="w-[45%] overflow-x-hidden "><Image className=" w-full object-cover scale-x-140 h-full " src={Img} width={720} height={600} alt="Image" /></div>
            <div className="flex w-[50%]  justify-center items-center max-h-[100vh] ">
                <div className="w-full max-w-lg flex flex-col items-center  h-full bg-white p-8 space-y-6">
                    <Image className="mt-6" src={logo} width={300} height={95} alt="logo" />
                    <h2 className="text-4xl font-semibold text-gray-800 text-center mb-8">
                        You&apos;re one click away from less busywork
                    </h2>
                    <div className="w-full">
                        <a
                            href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`}
                            className="flex items-center justify-center w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition-colors duration-200"
                        >
                            <Image
                                src={google}
                                width={20}
                                height={20}
                                alt="Google logo"
                                className="mr-2"
                            />
                            Sign Up with Google
                        </a>
                        <div className="flex items-center my-4">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-4 text-gray-500 text-sm">Or</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Example@site.com"
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                                        placeholder="Minimum 8 Characters"
                                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />

                                </div>
                            </div>
                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    className="h-4 w-4 text-teal-600 rounded"
                                />
                                <label
                                    htmlFor="terms"
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    Agree to Terms of Service and Privacy Policy
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-[#0CAF60] text-white rounded-md font-medium hover:bg-[#087742] transition-colors flex gap-2  items-center justify-center duration-200"
                            >
                                {loading && <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>}
                                Get Started
                            </button>
                           
                        </form>
                    </div>

                </div>
            </div>



        </section>
    )
}