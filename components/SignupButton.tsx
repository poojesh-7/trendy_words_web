"use client"
import { useAuth } from "@/context/AuthProvider"
import Link from "next/link"

const SignupButton=()=>{
    const {token}=useAuth()
    return <>
    {!token?<Link href="/signup">
              <button type="button" className="text-white cursor-pointer font-bold bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Signup for free</button>
            </Link>:""}
    </>
}

export default SignupButton