"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const getUserDetails = async () => {
        try {
            const response = await axios.get("/api/users/me")
            setData(response.data.user._id)
        } catch (error: any) {
            console.log(error.response.data)
            setError(error.response?.data?.error || "An error occurred")
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        try {
            const response = await axios.get("/api/users/logout")
            toast.success("Logout successful")
            router.push("/login")
        } catch (error: any) {
            console.log(error.response.data)
            toast.error(error.response.data.error)
        }
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-950 via-black to-blue-950 relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(25,25,112,0.1),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(0,0,128,0.15),transparent_40%)]" />

            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />

            <div className="w-full max-w-md px-4 py-8 relative z-10">
                <div className="backdrop-blur-sm bg-black/40 rounded-2xl shadow-[0_0_40px_rgba(8,_112,_184,_0.1)] p-8 border border-gray-800/50">
                    <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text mb-6">
                        Profile
                    </h1>

                    <div className="space-y-6">
                        {/* User ID/Details */}
                        <div className="flex justify-center">
                            {data === 'nothing' ? (
                                <span className="px-4 py-2 rounded-lg bg-gray-800/50 text-gray-400">
                                    No user data
                                </span>
                            ) : (
                                <Link
                                    href={`/profile/${data}`}
                                    className="px-4 py-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors duration-200"
                                >
                                    {data}
                                </Link>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={getUserDetails}
                                className="w-full py-3 px-4 rounded-xl text-white font-semibold text-sm 
                                    bg-gradient-to-r from-green-600 to-green-700
                                    hover:from-green-700 hover:to-green-800
                                    transform hover:scale-[1.02] 
                                    transition-all duration-200"
                            >
                                Get User Details
                            </button>

                            <button
                                onClick={logout}
                                className="w-full py-3 px-4 rounded-xl text-white font-semibold text-sm 
                                    bg-gradient-to-r from-blue-600 to-indigo-600 
                                    hover:from-blue-700 hover:to-indigo-700 
                                    transform hover:scale-[1.02] 
                                    transition-all duration-200"
                            >
                                Logout
                            </button>
                        </div>

                        {/* Loading State */}
                        {loading && (
                            <div className="flex justify-center">
                                <div className="animate-spin w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full"></div>
                            </div>
                        )}

                        {/* Error State */}
                        {error && (
                            <div className="text-center text-red-400 bg-red-500/10 rounded-lg px-4 py-2">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage