"use client";

import SignIn from "@/app/components/layout/header/sign-in";
import { useUserStore } from "@/app/store/user-store";
import { SharedNoteType } from "@/app/type/note";
import { useCallback, useEffect, useState } from "react";

export default function Share({
  sharedList,
}: {
  sharedList: SharedNoteType[];
}) {
  const { user } = useUserStore();

  if (!user) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2">
        <h1>Sign in to view shared notes</h1>
        <SignIn />
      </div>
    );
  }

  return (
    <ul className="divide-y divide-base-content/20">
      {sharedList.map((sharedNote, i) => (
        <li className="flex w-full flex-col gap-2 p-4" key={i}>
          <div className="flex flex-row gap-2">
            <div className="mask mask-squircle w-6">
              <img src={sharedNote.userProfile} />
            </div>
            <div className="text-sm font-light">@{sharedNote.username}</div>
          </div>
          <div className="line-clamp-4 text-sm">
            {sharedNote.contents.split("\n").map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
