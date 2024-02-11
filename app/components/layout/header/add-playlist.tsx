"use client";

import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Modal from "../modal";

export default function AddPlaylist() {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <div
        className="btn btn-ghost gap-0 text-xl"
        onClick={() => setOpened(true)}
      >
        <IoMdAdd />
      </div>
      <Modal opened={opened} close={() => setOpened(false)}>
        <div>Modal Content</div>
      </Modal>
    </>
  );
}
