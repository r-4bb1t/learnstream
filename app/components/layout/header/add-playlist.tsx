"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Modal from "../modal";
import { CATEGORIES, CategoryType } from "@/app/type/playlist";

export default function AddPlaylist() {
  const [opened, setOpened] = useState(false);
  const [category, setCategory] = useState<CategoryType>("web");
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");

  const handleAddPlaylist = useCallback(async () => {
    const response = await fetch("/api/playlist", {
      method: "POST",
      body: JSON.stringify({ id, title, category }),
    });
    const data = await response.json();
  }, [id, title]);

  useEffect(() => {
    setTitle("");
    setId("");
  }, [opened]);

  return (
    <>
      <div
        className="btn btn-ghost gap-0 text-xl"
        onClick={() => setOpened(true)}
      >
        <IoMdAdd />
      </div>
      <Modal
        opened={opened}
        close={() => setOpened(false)}
        className="max-w-96"
      >
        <div className="flex flex-col gap-2 p-8">
          <div className="font-bold">Add Playlist</div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Category</span>
            </div>
            <select
              className="select select-bordered w-full max-w-xs capitalize"
              value={category}
              onChange={(e) => setCategory(e.target.value as CategoryType)}
            >
              {CATEGORIES.filter((c) => c !== "all").map((c) => (
                <option key={c} value={c} className="capitalize">
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Playlist ID</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Title</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <button
            className="btn btn-primary mt-2 w-full max-w-xs"
            onClick={() => {
              handleAddPlaylist();
              setOpened(false);
            }}
          >
            Add
          </button>
        </div>
      </Modal>
    </>
  );
}
