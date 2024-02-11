"use client";

import { useCallback, useEffect, useState } from "react";
import cc from "classcat";
import Link from "next/link";
import { CATEGORIES, CategoryType, PlaylistType } from "./type/playlist";
import { format, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { useUserStore } from "./store/user-store";

export default function Main() {
  const [category, setCategory] = useState<CategoryType>("all");
  const [playlists, setPlaylists] = useState([] as PlaylistType[]);
  const { user } = useUserStore();

  const fetchPlaylists = useCallback(async () => {
    const response = await fetch(`/api/playlist?category=${category}`);
    const data = await response.json();
    setPlaylists(data);
  }, [category]);

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  return (
    <div className="flex h-full w-full flex-col items-center pt-16">
      <div className="flex w-full justify-center gap-2">
        {CATEGORIES.map((c) => (
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

      <div className="mt-20 grid w-full max-w-5xl grid-cols-1 gap-4 px-4 md:grid-cols-3 lg:grid-cols-4">
        {playlists.map((playlist) => (
          <div key={playlist.id}>
            <Link
              href={`/view/${playlist.videos[0]}`}
              className="group flex flex-col"
            >
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <img
                  src={playlist.thumbnail}
                  alt={"thumbnail of" + playlist.title}
                  className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              </div>
              <div className="mt-2 px-1">
                <div className="line-clamp-2 h-12 font-bold">
                  {playlist.title}
                </div>
                <div className="text-sm opacity-60">
                  {playlist.channelTitle}
                </div>
              </div>
            </Link>
            <div className="px-1 text-sm opacity-80">
              총 {playlist.videos.length}강 | {playlist.duration} |{" "}
              <span
                className="tooltip"
                data-tooltip={format(
                  new Date(playlist.publishedAt),
                  "yyyy-MM-dd",
                )}
              >
                {formatDistanceToNow(new Date(playlist.publishedAt), {
                  locale: ko,
                  addSuffix: true,
                })}
              </span>
            </div>
            {user && (
              <button
                className={cc([
                  "btn btn-primary btn-sm mt-2 w-full",
                  playlist.isPicked && "btn-outline",
                ])}
                onClick={async () => {
                  await fetch(`/api/playlist/${playlist.id}/pick`, {
                    method: "POST",
                  });
                  fetchPlaylists();
                }}
              >
                {playlist.isPicked ? "Unpick" : "Pick"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
