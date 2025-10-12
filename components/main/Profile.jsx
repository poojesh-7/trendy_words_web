"use client";
import { UserProfile } from "@/apis/user";
import { useAuth } from "@/context/AuthProvider";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import WordCard from "./WordCard";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userWords, setUserWords] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  useEffect(() => {
    if (!token) {
      return;
    }

    setLoading(true);
    UserProfile(token)
      .then((data) => {
        setUser(data[0]);
        setUserWords(data[1]);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Failed to fetch profile:", err);
      })
      .finally(() => setLoading(false));
  }, [token]);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="px-10 md:flex md:flex-col md:justify-around">
      <div>
        <h1 className="font-bold text-3xl mb-[20px]">User Profile</h1>
        <h1 className="font-medium text-lg">Username : {user?.name}</h1>
        <h1 className="font-medium text-lg">Email : {user?.email}</h1>
      </div>
      <div>
        <h1 className="font-bold text-3xl my-[20px]">My Words</h1>
        {userWords.length === 0 ? (
          <p className="font-bold">No words posted</p>
        ) : (
          <div className="flex flex-wrap md:w-[80%] md:items-start justify-around">
            {userWords.map((word, i) => (
              <WordCard
                key={i}
                needMargin={true}
                trendy_word={word.trendy_word}
                alter_word={word.alter_word}
                emoji={word.emoji}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
