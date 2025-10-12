"use client";

import { FormEvent, useRef, useState } from "react";
import { registerUser } from "@/apis/user";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";

const corner = {
  topl: "absolute bg-blue-400 w-[8px] h-[8px] top-0 left-0",
  topr: "absolute bg-yellow-400 w-[8px] h-[8px] top-0 right-0",
  botl: "absolute bg-yellow-400 w-[8px] h-[8px] bottom-0 left-0",
  botr: "absolute bg-blue-400 w-[8px] h-[8px] bottom-0 right-0",
};

type APIError = {
  msg: string;
};

type APIResponse = {
  token?: string;
  errors?: APIError[];
  error?: string;
  message?: string;
};

const Login = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [message, setMessage] = useState<string | string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { login: loginFn } = useAuth();
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    const name = nameRef.current?.value.trim() || "";
    const email = emailRef.current?.value.trim() || "";
    const password = passwordRef.current?.value.trim() || "";

    try {
      const payload = isLogin
        ? { login: true, email, password }
        : { login: false, name, email, password };

      const resp: APIResponse = await registerUser(payload);

      let finalMessage: string | string[];

      if (resp.errors) {
        finalMessage = resp.errors.map((item) => item.msg);
      } else if (resp.error) {
        finalMessage = resp.error;
      } else if (resp.token) {
        loginFn(resp.token);
        finalMessage = isLogin
          ? "Logged in successfully!"
          : "Account created successfully!";
        router.push("/profile");
      } else {
        finalMessage = "Unexpected response from server.";
      }

      setMessage(finalMessage);
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-[300px] h-[360px] flex flex-col justify-between items-center bg-white shadow-md rounded-lg p-4"
    >
      {message && (
        <div
          className={`text-center text-sm mb-2 ${
            typeof message === "string" && message.startsWith("✅")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {Array.isArray(message) ? message.join(" • ") : message}
        </div>
      )}

      <h1 className="text-lg font-semibold">
        {isLogin ? "Login" : "Signup"}
      </h1>

      {!isLogin && (
        <div className="relative border-b-2 w-[252px]">
          {Object.values(corner).map((cls, i) => (
            <div key={i} className={cls}></div>
          ))}
          <input
            ref={nameRef}
            placeholder="Enter name"
            className="w-full h-[42px] outline-none bg-blue-50 px-2"
            disabled={loading}
          />
        </div>
      )}

      <div className="relative border-b-2 w-[252px]">
        {Object.values(corner).map((cls, i) => (
          <div key={i} className={cls}></div>
        ))}
        <input
          ref={emailRef}
          placeholder="Enter email"
          type="email"
          className="w-full h-[42px] outline-none bg-blue-50 px-2"
          disabled={loading}
        />
      </div>

      <div className="relative border-b-2 w-[252px]">
        {Object.values(corner).map((cls, i) => (
          <div key={i} className={cls}></div>
        ))}
        <input
          ref={passwordRef}
          type="password"
          placeholder="Enter password"
          className="w-full h-[42px] outline-none bg-blue-50 px-2"
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`text-gray-900 self-end bg-gradient-to-r from-teal-200 to-lime-200
          transition ease-in-out duration-500 hover:scale-105 hover:bg-gradient-to-l 
          focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700
          shadow-md hover:shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer
          ${loading ? "opacity-60 cursor-not-allowed hover:scale-100" : ""}`}
      >
        {loading ? "Processing..." : "Submit"}
      </button>

      <p
        className={`select-none cursor-pointer text-blue-600 mt-2 ${
          loading ? "opacity-50 pointer-events-none" : ""
        }`}
        onClick={() => !loading && setIsLogin((prev) => !prev)}
      >
        Switch to {isLogin ? "Signup" : "Login"}
      </p>
    </form>
  );
};

export default Login;
