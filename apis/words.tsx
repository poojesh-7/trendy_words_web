'use server'


const BACKEND = process.env.NEXT_BACKEND_URL;

interface WordProps{
    word:string;
    meaning:string;
    token:string;
}

export const AllWords=async()=>{
    const res=await fetch(`${BACKEND}/view/allwords`)
    if(!res.ok){
        throw new Error("Something went wrong")
    }
    const data=await res.json()
    return data
}

export const AddTrendyWord = async (word:string,meaning:string,token:string) => {
    const res = await fetch(`${BACKEND}/addtrendyword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token,
        },
        body: JSON.stringify({
            trendy_word:word,
            alter_word:meaning
        })
    });

    const resData = await res.json(); 
    return resData;
};

export const GetUserWords=async(token:string)=>{
    const res=await fetch(`${BACKEND}/user/getMyWords`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+token
        }
    })
    const data=await res.json()
    return data
}   