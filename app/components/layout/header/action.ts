"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const deleteCookie = async () => {
  cookies().delete("learnstream-user");
};

export const revalidate = () => {
  revalidateTag("playlist");
};
