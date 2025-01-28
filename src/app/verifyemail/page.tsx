"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast/headless'

function VerifyEmailPage() {
    const router = useRouter()
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyEmail = async () => {
        try {
            const response = await axios.post("/api/users/verifyemail", { token })
            setVerified(true)
            toast.success("Email verified successfully")
        } catch (error: any) {
            setError(true)
            setVerified(false)
            console.log(error.response.data)
            toast.error(error.response.data.error)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyEmail()
        }
    }, [token])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-gray-950 via-black to-blue-950 relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(25,25,112,0.1),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(0,0,128,0.15),transparent_40%)]" />

            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />

            <div className="max-w-md w-full backdrop-blur-sm bg-black/40 rounded-2xl shadow-[0_0_40px_rgba(8,_112,_184,_0.1)] p-8 space-y-6 border border-gray-800/50 relative z-10">
                {!verified && !error && (
                    <div className="text-center space-y-4">
                        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                        <h2 className="text-2xl font-semibold text-white">
                            Verifying your email...
                        </h2>
                        <p className="text-gray-400">
                            Please wait while we verify your email address
                        </p>
                    </div>
                )}

                {verified && (
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-green-500/10 rounded-full mx-auto flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-white">
                            Email Verified Successfully!
                        </h2>
                        <p className="text-gray-400">
                            Thank you for verifying your email address
                        </p>
                        <button
                            onClick={() => router.push('/login')}
                            className="mt-4 w-full py-3 px-4 rounded-xl text-white font-semibold text-sm 
                                bg-gradient-to-r from-blue-600 to-indigo-600 
                                hover:from-blue-700 hover:to-indigo-700 
                                transform hover:scale-[1.02] 
                                transition-all duration-200
                                hover:shadow-[0_0_20px_rgba(8,_112,_184,_0.3)]"
                        >
                            Proceed to Login
                        </button>
                    </div>
                )}

                {error && (
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-red-500/10 rounded-full mx-auto flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-red-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-white">
                            Verification Failed
                        </h2>
                        <p className="text-gray-400">
                            Sorry, we couldn't verify your email address. The link may be expired or invalid.
                        </p>
                        <button
                            onClick={() => router.push('/signup')}
                            className="mt-4 w-full py-3 px-4 rounded-xl text-white font-semibold text-sm 
                                bg-gradient-to-r from-red-600 to-red-700
                                hover:from-red-700 hover:to-red-800
                                transform hover:scale-[1.02] 
                                transition-all duration-200
                                hover:shadow-[0_0_20px_rgba(184,_8,_8,_0.3)]"
                        >
                            Back to Sign Up
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default VerifyEmailPage