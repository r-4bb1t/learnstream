"use client";

import { use, useCallback, useEffect, useState } from "react";
import cc from "classcat";
import { CATEGORIES, CategoryType, PlaylistType } from "../type/playlist";
import MainCard from "./card";
import { CACHE_REVALIDATE } from "@/constant/cache";
import { useUserStore } from "../store/user-store";

export default function Main({
  defaultPlaylists,
}: {
  defaultPlaylists: PlaylistType[];
}) {
  const [category, setCategory] = useState<CategoryType>("all");
  const [playlists, setPlaylists] = useState(defaultPlaylists);

  const { user } = useUserStore();

  const fetchPlaylists = useCallback(async () => {
    const response = await fetch(`/api/playlist?category=${category}`, {
      next: {
        revalidate: CACHE_REVALIDATE.playlist,
      },
    });
    const data = await response.json();
    setPlaylists(data);
  }, [category]);

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  return (
    <div className="flex h-full w-full flex-col items-center pt-16">
      <div className="flex w-full flex-wrap justify-center gap-2 bg-base-100 p-4">
        {CATEGORIES.filter((c) => c !== "picked" || user).map((c) => (
          <button
            key={c}
            className={cc([
              "btn btn-primary btn-sm capitalize",
              c === category ? "" : "btn-outline",
            ])}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid w-full max-w-5xl grid-cols-1 gap-4 overflow-y-auto px-4 py-12 md:grid-cols-3 lg:grid-cols-4">
        {playlists.map((playlist) => (
          <MainCard key={playlist.id} defaultPlaylist={playlist} />
        ))}
      </div>
    </div>
  );
}
