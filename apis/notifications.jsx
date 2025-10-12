"use server";
const BACKEND = process.env.NEXT_BACKEND_URL;

export const GetAllNotifications = async (token) => {
  const res = await fetch(`${BACKEND}/notifications`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const notifications = await res.json();
  return notifications;
};
