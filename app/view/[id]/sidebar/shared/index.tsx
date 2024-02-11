"use client";

import SignIn from "@/app/components/layout/header/sign-in";
import Modal from "@/app/components/layout/modal";
import { useUserStore } from "@/app/store/user-store";
import { SharedNoteType } from "@/app/type/note";
import { useState } from "react";
import SharedView from "./view";

export default function Share({
  sharedList,
}: {
  sharedList: SharedNoteType[];
}) {
  const [openedModal, setOpenedModal] = useState<string | null>(null);

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
    <>
      <ul className="flex flex-col gap-2 p-4">
        {sharedList.length > 0 ? (
          sharedList.map((sharedNote, i) => (
            <li key={i}>
              <button
                className="flex w-full flex-col gap-2 rounded-lg p-3 transition-colors hover:bg-primary/10"
                onClick={() => setOpenedModal(sharedNote.id)}
              >
                <div className="flex flex-row gap-2">
                  <div className="mask mask-squircle w-6">
                    <img src={sharedNote.userProfile} />
                  </div>
                  <div className="text-sm font-light">
                    @{sharedNote.username}
                  </div>
                </div>
                <div className="line-clamp-4 w-full text-left text-sm">
                  {sharedNote.preview.split("\n").map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </button>
            </li>
          ))
        ) : (
          <div className="flex h-full w-full items-center justify-center text-center">
            <h1>
              There are no shared notes for this video.
              <br />
              Be the first to share!
            </h1>
          </div>
        )}
      </ul>
      <Modal
        opened={openedModal !== null}
        close={() => setOpenedModal(null)}
        className="viewer h-full max-h-[600px] w-full max-w-4xl"
      >
        <SharedView
          note={sharedList.find((note) => note.id === openedModal)!}
        />
      </Modal>
    </>
  );
}
