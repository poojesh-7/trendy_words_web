"use client";
import { UserLogout } from "@/apis/user";
import { useAuth } from "@/context/AuthProvider";
import { useNav } from "@/context/NavShowProvider";
import { useQuery } from "@/context/QueryProvider";
import {GetAllNotifications} from "@/apis/notifications"
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {io} from "socket.io-client"

const navClass="text-white-700 block px-3 py-2 rounded-md text-base font-medium hover:text-yellow-300 active:text-yellow-400 focus:outline-none"
let socket: Socket | null = null;

const Navbar = ({url}:{url:string}) => {
  const [noti,setNoti]=useState([])
  const {show,setShow}=useNav()
  const [openNoti,setOpenNoti]=useState(false)
  const pathName = usePathname();
  const router=useRouter()
  const { token,logout,userId } = useAuth();
  const {setQuery}=useQuery()
  const logoutFn=async()=>{
    try{
      logout()
      await UserLogout(token)
      router.push("/")
    }catch(e){
      alert(e)
    }
  }

  // useEffect(() => {
  //     GetAllNotifications(token).then(data => setNoti(data));

      // Step 2: Connect to Socket.IO
      
      // }, [token,userId,url]);
      // console.log(noti)
    useEffect(()=>{
      if(!token) return
      else{
        GetAllNotifications(token)
          .then((data) => setNoti(data))
          .catch((err) => console.error(err));
      }

    },[token])  
    
    useEffect(() => {
      if (!token) return;

      if (!socket) {
        socket = io(url);
      }

      // GetAllNotifications(token)
      //   .then((data) => setNoti(data))
      //   .catch((err) => console.error(err));
      socket.emit("registerUser", userId);

      socket.on("newWordNotification", (data) => {
        setNoti((prev) => [data, ...prev]);
      });


      return () => {
        if (socket) {
          socket.off("newWordNotification");
        }
      };
  }, [token, userId]);
  let content
  if(noti.length===0 || !token){
    content=<div className="absolute right-0 top-[64px]">
             <div className="h-[150px] w-[200px] bg-cyan-100 flex items-center justify-center">
              <p className="text-gray-500">No Notifications</p>
            </div>
          </div>
  }else{
    content=<div className="absolute text-sm right-0 top-[64px]">
            <div className="h-[150px] w-[200px]  rounded-b-[2px] bg-cyan-100 overflow-y-auto">
              {noti.map((item,i)=>(
                <div key={i} className="text-gray-500 p-[5px] border-b-[2px]"> 
                  <p>
                    {item.message || `New trendy word added: ${item.trendy_word}`}
                  </p>
                  <p>
                    {item.created_at
                      ? new Date(item.created_at).toLocaleString()
                      : new Date().toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

  }

  return (
    <nav className="fixed top-0 z-1 border-b border-white-200 w-full bg-black text-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden md:flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex-shrink-0 text-indigo-600 font-bold text-xl">
                <Image src="https://i.ibb.co/kgkjhc9D/TW.png" alt="TW" width={50} height={50} />
              </div>
            </Link>
            <div className="ml-10 flex items-baseline space-x-4">
              <Link onClick={()=>setShow(false)}
                href="/"
                className={navClass}
              >
                Home
              </Link>
              <Link onClick={()=>setShow(false)}
                href="/words"
              
                className={navClass}>
                Words
              </Link>
              {token && (
                <Link onClick={()=>setShow(false)}
                  href="/profile"
                
                className={navClass}>
                  Profile
                </Link>
              )}
              {token && (
                <Link onClick={()=>setShow(false)}
                  href="/share"
                
                className={navClass}>
                  Share
                </Link>
              )}
              {!token && (
                <Link onClick={()=>setShow(false)}
                  href="/signup"
                
                className={navClass}>
                  Signup
                </Link>
              )}
              {token && (
                <button 
                onClick={logoutFn}
                
                className={navClass}>
                  Logout
                </button>
              )}
            </div> 
          </div>
          <div className="flex items-center">
            <div className="relative">
              {pathName.split("/").includes("words") && (
                <>
                  <input
                   onChange={(e)=>setQuery(e.target.value)}
                    type="text"
                    placeholder="Search"
                    className="block w-full pl-10 pr-4 py-2 border border-white-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    style={{ minWidth: "250px" }}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-white-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="md:hidden flex items-center justify-between h-16 w-full">
          <Link href="/">
            <div className="flex-shrink-0 text-indigo-600 font-bold text-xl">
                <Image src="https://i.ibb.co/kgkjhc9D/TW.png" alt="TW" width={50} height={50} />
            </div>
          </Link>

          <div className="flex-grow mx-4">
            <div className="relative">
              {pathName.split("/").includes("words") && (
                <>
                  <input 
                   onChange={(e)=>setQuery(e.target.value)}
                    type="text"
                    placeholder="Search"
                    className="block w-full pl-10 pr-4 py-2 border border-white-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-white-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </>
              )}
            </div>
          </div>
          <button
            onClick={()=>setShow(prev=>!prev)}
            className="inline-flex items-center justify-center mr-[50px] p-2 rounded-md text-white-400 hover:text-white-500 hover:bg-white-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {show && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link onClick={()=>setShow(false)}
              href="/"
                className={navClass}
            >
              Home
            </Link>
            <Link onClick={()=>setShow(false)}
              href="/words"
           
                className={navClass} >
              Words
            </Link>
            {token && (
              <Link onClick={()=>setShow(false)}
                href="/profile"
             
                className={navClass}>
                Profile
              </Link>
            )}
              {token && (
                <Link onClick={()=>setShow(false)}
                  href="/share"
               
                className={navClass}>
                  Share
                </Link>
              )}
            {!token && <Link onClick={()=>setShow(false)}
              href="/signup"
            
                className={navClass}>
              Signup
            </Link>}
            {
              token &&
                <button 
                onClick={logoutFn}
               
                className={navClass}>
                  Logout
                </button>
            }
          </div>
          
        </div>
      )}
      <button onClick={()=>{setOpenNoti(prev=>!prev)}} className="absolute cursor-pointer top-[20px] right-[20px]">
        <Image src="https://i.ibb.co/F4HZ9jyG/bell.png" width={25} height={35} alt='bell' />
        <div className="absolute flex justify-center items-center rounded-[50%] w-[12px] h-[12px] bg-white top-3 right-[-2px] top-[-5px]">
          <p className="text-sm text-black font-bold">{!token?0 :noti?.length}</p>
        </div>
      </button>
      {openNoti && content}
    </nav>
  );
};
export default Navbar;