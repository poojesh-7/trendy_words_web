"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { useAuth } from "@/context/AuthProvider";
import { useNav } from "@/context/NavShowProvider";
import { useQuery } from "@/context/QueryProvider";
import {UserLogout } from "@/apis/user";
import {GetAllNotifications } from "@/apis/notifications";

const navClass =
  "text-white-700 block px-3 py-2 rounded-md text-base font-medium hover:text-yellow-300 active:text-yellow-400 focus:outline-none";

let socket: Socket | null = null;

const Navbar = ({ url }: { url: string }) => {
  const { token, logout, userId } = useAuth();
  const { show, setShow } = useNav();
  const { setQuery } = useQuery();
  const [noti, setNoti] = useState<any[]>([]);
  const [openNoti, setOpenNoti] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  // Logout function
  const logoutFn = async () => {
    try {
      logout();
      await UserLogout(token);
      router.push("/");
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    if (!token || !userId) return;

    if (!socket) {
      socket = io(url);
    }

    socket.emit("registerUser", userId);

    socket.on("newWordNotification", (data) => {
      setNoti((prev) => [data, ...prev]);
    });

    GetAllNotifications(token)
      .then((data) => setNoti(data))
      .catch((err) => console.error(err));

    return () => {
      if (socket) {
        socket.off("newWordNotification");
      }
    };
  }, [token, userId]);

  const content =
    noti.length === 0 || !token ? (
      <div className="absolute right-0 top-[64px]">
        <div className="h-[150px] w-[200px] bg-green-400 flex items-center justify-center">
          <p>No Notifications</p>
        </div>
      </div>
    ) : (
      <div className="absolute right-0 top-[64px]">
        <div className="h-[150px] w-[200px] rounded-b-[2px] bg-green-400 overflow-y-auto">
          {noti.map((item, i) => (
            <div key={i} className="p-[5px] border-b-[2px]">
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
    );

  return (
    <nav className="fixed top-0 z-10 border-b border-white-200 w-full bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden md:flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex-shrink-0 text-indigo-600 font-bold text-xl">
                <Image
                  src="https://i.ibb.co/kgkjhc9D/TW.png"
                  alt="TW"
                  width={50}
                  height={50}
                />
              </div>
            </Link>
            <div className="ml-10 flex items-baseline space-x-4">
              <Link onClick={() => setShow(false)} href="/" className={navClass}>
                Home
              </Link>
              <Link
                onClick={() => setShow(false)}
                href="/words"
                className={navClass}
              >
                Words
              </Link>
              {token && (
                <Link
                  onClick={() => setShow(false)}
                  href="/profile"
                  className={navClass}
                >
                  Profile
                </Link>
              )}
              {token && (
                <Link
                  onClick={() => setShow(false)}
                  href="/share"
                  className={navClass}
                >
                  Share
                </Link>
              )}
              {!token && (
                <Link
                  onClick={() => setShow(false)}
                  href="/signup"
                  className={navClass}
                >
                  Signup
                </Link>
              )}
              {token && (
                <button onClick={logoutFn} className={navClass}>
                  Logout
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {pathName.split("/").includes("words") && (
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search"
                className="block w-full pl-10 pr-4 py-2 border border-white-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                style={{ minWidth: "250px" }}
              />
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden flex items-center justify-between h-16 w-full">
          <Link href="/">
            <div className="flex-shrink-0 text-indigo-600 font-bold text-xl">
              <Image
                src="https://i.ibb.co/kgkjhc9D/TW.png"
                alt="TW"
                width={50}
                height={50}
              />
            </div>
          </Link>
          <button
            onClick={() => setShow((prev) => !prev)}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Notification button */}
      {token && (
        <button
          onClick={() => setOpenNoti((prev) => !prev)}
          className="absolute cursor-pointer top-[20px] right-[20px]"
        >
          <Image
            src="https://i.ibb.co/F4HZ9jyG/bell.png"
            width={25}
            height={35}
            alt="bell"
          />
          {noti.length > 0 && (
            <div className="absolute flex justify-center items-center rounded-full w-[16px] h-[16px] bg-white top-0 right-0">
              <p className="text-xs text-black font-bold">{noti.length}</p>
            </div>
          )}
        </button>
      )}

      {openNoti && content}
    </nav>
  );
};

export default Navbar;
