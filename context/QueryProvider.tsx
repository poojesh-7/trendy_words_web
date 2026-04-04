"use client"

import {createContext, ReactNode, useContext, useState} from 'react'

interface QueryProps{
    query:string;
    setQuery:(val:string)=>void
}

const QueryCtx=createContext<QueryProps|undefined>(undefined)

export default function QueryProvider({children}:{children:ReactNode}){
    const [query,setQuery]=useState("")
    return <QueryCtx.Provider value={{query,setQuery}}>
        {children}
    </QueryCtx.Provider>
}

export const useQuery=()=>{
    const ctx=useContext(QueryCtx);
    if(!ctx) throw new Error("useQuery must be used inside QueryProvider");
    return ctx;
}
