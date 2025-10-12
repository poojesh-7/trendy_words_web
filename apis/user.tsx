"use server"
import { GetUserWords } from "./words";

const BACKEND = process.env.NEXT_BACKEND_URL;

type RegisterModel = {
  name: string;
  email: string;
  password: string;
  login: false; 
};

type LoginModel = {
  email: string;
  password: string;
  login: true; 
};

export const registerUser = async (data: RegisterModel | LoginModel)=> {
    let finalData = {};

    if (data.login) {
        const { email, password } = data;
        finalData = { email, password };
    } else {
        const { name, email, password } = data;
        finalData = { name, email, password };
    }

    const res = await fetch(`${BACKEND}/${data.login ? "login" : "register"}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(finalData)
    });

    const resData = await res.json(); 
    return resData;
};


export const UserProfile = async (token:string) => {
  const [res1, res2] = await Promise.all([
    fetch(`${BACKEND}/profile`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    }),
    GetUserWords(token),
  ]);
  const userData = await res1.json();
  const userWords = res2;
  return [userData, userWords];
};


export const UserLogout=async(token:string)=>{
    const res=await fetch(`${BACKEND}/logout`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+token
        }
    })
    if(!res.ok){
        throw new Error("something went wrong")
    }
    return 
}