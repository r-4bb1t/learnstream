import { PlaylistType, VideoType } from "@/app/type/playlist";
import cc from "classcat";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function Playlist({
  id,
  nowPlaying,
}: {
  id: string;
  nowPlaying: string;
}) {
  const [playlist, setPlaylist] = useState<
    PlaylistType & { videos: VideoType[] }
  >();

  const fetchPlaylist = useCallback(async () => {
    const response = await fetch(`/api/playlist/${id}`);
    const data = await response.json();
    setPlaylist(data);
  }, [id]);

  useEffect(() => {
    fetchPlaylist();
  }, [fetchPlaylist]);

  if (!playlist) return <></>;

  return (
    <ul className="flex flex-col gap-1">
      {playlist.videos.map((item: VideoType, i) => (
        <li key={item.id}>
          <Link
            href={`/view/${item.id}`}
            className={cc([
              "group flex items-center gap-2 border-l-2 border-l-transparent px-2 py-2",
              item.id === nowPlaying ? " border-l-inherit bg-primary/10" : "",
            ])}
          >
            <div className="mr-1 w-5 shrink-0 text-sm font-bold">
              {(i + 1).toString().padStart(2, "0")}
            </div>
            <div className="relative aspect-video w-24 shrink-0 overflow-hidden rounded-lg">
              <img
                src={`https://img.youtube.com/vi/${item.id}/0.jpg`}
                alt={"thumbnail of " + item.title}
                className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
              {/* <div className="absolute inset-x-0 bottom-0 h-1/2 bg-primary/50" /> */}
            </div>
            <div className="px-1">
              <div className="line-clamp-2 text-sm font-bold">{item.title}</div>
              <div className="text-xs opacity-80">{item.duration}</div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
