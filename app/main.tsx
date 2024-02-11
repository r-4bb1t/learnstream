"use client";

import { useCallback, useEffect, useState } from "react";
import cc from "classcat";
import Link from "next/link";
import { CATEGORIES, CategoryType, PlaylistType } from "./type/playlist";
import { format, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export default function Main() {
  const [category, setCategory] = useState<CategoryType>("all");
  const [playlists, setPlaylists] = useState([] as PlaylistType[]);

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

      <div className="mt-20 grid w-full max-w-5xl grid-cols-4 gap-4">
        {playlists.map((playlist) => [
          <Link
            href={`/view/${playlist.videos[0]}`}
            className="group flex flex-col"
            key={playlist.id}
          >
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <img
                src={playlist.thumbnail}
                alt={"thumbnail of" + playlist.title}
                className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            </div>
            <div className="px-1 py-2">
              <div className="font-bold">{playlist.title}</div>
              <div className="text-sm opacity-60">{playlist.channelTitle}</div>
              <div className="text-sm opacity-80">
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
            </div>
          </Link>,
        ])}
      </div>
    </div>
  );
}
