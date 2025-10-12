"use client"

import { createContext, ReactNode, useContext, useState } from "react"

type NavbarProps={
    show:boolean;
    setShow:(val:boolean)=>void;
}

const NavContext=createContext<NavbarProps|undefined>(undefined)

export default function NavProvider({children}:{children:ReactNode}){
    const [show,setShow]=useState(false)
    return <NavContext.Provider value={{show,setShow}}>
        {children}
    </NavContext.Provider>
}

export const useNav=()=>{
    const ctx=useContext(NavContext);
    return ctx
}