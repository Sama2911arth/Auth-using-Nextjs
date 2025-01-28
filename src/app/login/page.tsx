"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function LoginPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            console.log("Login success", response.data)
            toast.success("Login success")
            router.push("/profilepage")
        } catch (error: any) {
            console.log("Login failed due to ", error.message)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-gray-950 via-black to-blue-950 relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(25,25,112,0.1),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(0,0,128,0.15),transparent_40%)]" />

            {/* Floating elements for visual interest */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />

            <div className="max-w-md w-full backdrop-blur-sm bg-black/40 rounded-2xl shadow-[0_0_40px_rgba(8,_112,_184,_0.1)] p-8 space-y-6 border border-gray-800/50 relative z-10">
                <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text mb-2">
                    Login
                </h1>

                <div className="space-y-5">

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                className="block w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition duration-200"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type="password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                className="block w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition duration-200"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>
                </div>

                <button
                    onClick={onLogin}
                    disabled={buttonDisabled || loading}
                    className={`w-full py-3 px-4 rounded-xl text-white font-semibold text-sm transition-all duration-200 
                        ${buttonDisabled || loading
                            ? 'bg-gray-800 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(8,_112,_184,_0.3)]'
                        }`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Logging in...
                        </span>
                    ) : "Login"}
                </button>

                <p className="text-center text-gray-400 text-sm">
                    New to our platform?{' '}
                    <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition duration-200 hover:underline">Sign Up</Link>

                </p>
            </div>
        </div>
    )
}

export default LoginPage