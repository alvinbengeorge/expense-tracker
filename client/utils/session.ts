"use server";
import { cookies } from "next/headers";

const cookieStore = cookies();
export const getToken = async () => {
  const token = await cookieStore.get("token");
  return token?.value;
};

export const setToken = (token: string) => {
  document.cookie = `token=${token}; path=/`;
};
