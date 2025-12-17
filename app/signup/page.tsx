import Login from "@/components/main/Login"
import { Suspense } from "react"
import Loader from "@/components/Loader"
const SignupPage=()=>{
    return <Suspense fallback={<Loader />} >
        <div className="h-[600px] pt-[100px] flex items-center justify-center">
            <Login />
        </div>
    </Suspense> 
}

export default SignupPage