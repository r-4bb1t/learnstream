import { PlaylistType, VideoType } from "@/app/type/playlist";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function Playlist({ id }: { id: string }) {
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
    <ul className="flex flex-col gap-1 py-2">
      {playlist.videos.map((item: VideoType) => (
        <li key={item.id}>
          <Link
            href={`/view/${item.id}`}
            className="group flex items-center gap-1 px-2"
          >
            <div className="relative aspect-video w-24 shrink-0 overflow-hidden rounded-lg">
              <img
                src={`https://img.youtube.com/vi/${item.id}/0.jpg`}
                alt={"thumbnail of " + item.title}
                className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
              {/* <div className="absolute inset-x-0 bottom-0 h-1/2 bg-primary/50" /> */}
            </div>
            <div className="px-1 py-2">
              <div className="text-sm font-bold">{item.title}</div>
              <div className="text-xs opacity-80">{item.duration}</div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
