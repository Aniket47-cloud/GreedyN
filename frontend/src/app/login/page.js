import Image from "next/image";
import Img from "@/assets/images/AuthDashImage.jpg"
import logo from "@/assets/images/logo.svg"
import google from "@/assets/images/google-logo.svg"
import Link from "next/link";


export default function Login() {
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


                    <button className="flex items-center justify-center w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors duration-200">
                        <Image
                            src={google}
                            width={20}
                            height={20}
                            alt="Google logo"
                            className="mr-2"
                        />
                        Log In with Google
                    </button>

                    <div className="flex items-center my-4 w-full">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-4 text-gray-500 text-sm">Or</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>


                    <form className="w-full space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
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
                            className="w-full py-3 bg-[#0CAF60] text-white rounded-md font-medium hover:bg-[#087742] transition-colors duration-200"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>


        </section>
    )

}