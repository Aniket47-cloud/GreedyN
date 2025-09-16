import Image from "next/image";
import Img from "@/assets/images/AuthDashImage.jpg"
import logo from "@/assets/images/logo.svg"
import google from "@/assets/images/google-logo.svg"
import Link from "next/link";


export default function SignUp() {
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
                        <button className="flex items-center justify-center w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition-colors duration-200">
                            <Image
                                src={google}
                                width={20}
                                height={20}
                                alt="Google logo"
                                className="mr-2"
                            />
                            Sign Up with Google
                        </button>
                        <div className="flex items-center my-4">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-4 text-gray-500 text-sm">Or</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
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
                                className="w-full py-3 bg-[#0CAF60] text-white rounded-md font-medium hover:bg-[#087742] transition-colors duration-200"
                            >
                                Get Started
                            </button>
                           
                        </form>
                    </div>
            
                </div>
            </div>

        

        </section>
    )
}