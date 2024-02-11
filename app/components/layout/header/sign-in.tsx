"use client";

import { useCallback, useEffect, useState } from "react";
import Modal from "../modal";
import { auth, signIn, signOut } from "@/app/lib/firebase/client";
import { useUserStore } from "@/app/store/user-store";
import {
  IoLogoGoogle,
  IoLogoGithub,
  IoPersonCircleOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import AddPlaylist from "./add-playlist";
import { deleteCookie } from "./delete-cookie";
import { convertUserType } from "@/app/lib/convert-user-type";

const greet = () => {
  const hour = new Date().getHours();
  if (hour >= 4 && hour <= 11) return "Good Morning";
  if (hour >= 12 && hour <= 17) return "Good Afternoon";
  return "Good Evening";
};

export default function SignIn() {
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, setUser } = useUserStore();

  const handleSignIn = useCallback(
    async (provider: "github" | "google") => {
      const user = await signIn(provider);
      if (user) {
        setUser(user);
        setError(null);
        close();
        return;
      }
      setError("Failed to sign in");
    },
    [close, setError, setUser],
  );

  const handleSignOut = async () => {
    deleteCookie();
    await signOut();
  };

  const handleReissue = useCallback(
    async (rawUserData: any) => {
      const res = await (
        await fetch(`/api/auth/sign-in`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(rawUserData),
          cache: "no-store",
        })
      ).json();
      setUser(res);
    },
    [setUser],
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((rawUserData) => {
      if (rawUserData) {
        handleReissue(rawUserData);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [setUser]);

  return user ? (
    <div className="flex items-center gap-2 text-sm">
      {user.role === "admin" && <AddPlaylist />}
      <div className="group relative">
        <button className="flex gap-0 py-2 font-medium normal-case">
          <div className="hidden md:block">
            {greet()},<span className="ml-1 !font-black">{user.username}</span>
          </div>
          <div className="ml-2 h-6 w-6 overflow-hidden rounded-full">
            {user.image ? (
              <img
                src={user.image}
                className="h-full w-full object-cover"
                alt="user profile"
              />
            ) : (
              <IoPersonCircleOutline size={24} />
            )}
          </div>
        </button>
        <ul className="absolute right-0 top-full flex w-max origin-top scale-y-0 flex-col gap-2 rounded-xl bg-base-200 px-4 py-2 text-base-content transition-transform group-hover:scale-y-100">
          <li className="flex flex-col items-center py-2">
            <div className="h-6 w-6 overflow-hidden rounded-full">
              {user.image ? (
                <img
                  src={user.image}
                  className="h-full w-full object-cover"
                  alt="user profile"
                />
              ) : (
                <IoPersonCircleOutline size={24} />
              )}
            </div>
            <div className="font-bold">{user.username}</div>
            <div className="flex items-center gap-1 text-xs text-base-content/40">
              {user.provider === "github.com" && <IoLogoGithub />}
              {user.provider === "google.com" && <IoLogoGoogle />}
              {user.email}
            </div>
          </li>
          <li>
            <button
              className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm transition-colors hover:bg-base-300"
              onClick={() => handleSignOut()}
            >
              Sign Out
              <IoLogOutOutline />
            </button>
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <>
      <div className="btn btn-ghost gap-0" onClick={() => setOpened(true)}>
        Sign In
      </div>
      <Modal opened={opened} close={() => setOpened(false)}>
        <div className="flex flex-col gap-2">
          {error && <div className="text-red-500">{error}</div>}
          <button
            className="btn justify-between bg-[#333] text-white"
            onClick={() => {
              handleSignIn("github");
            }}
          >
            <IoLogoGithub />
            Sign in with GitHub
          </button>
          <button
            className="btn btn-outline btn-primary justify-between"
            onClick={() => {
              handleSignIn("google");
            }}
          >
            <IoLogoGoogle />
            Sign in with Google
          </button>
        </div>
      </Modal>
    </>
  );
}
