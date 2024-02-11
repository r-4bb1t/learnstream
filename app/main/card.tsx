import Link from "next/link";
import { format, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { PlaylistType, VideoType } from "../type/playlist";
import { useUserStore } from "../store/user-store";
import cc from "classcat";
import { useState } from "react";

export default function MainCard({
  defaultPlaylist,
}: {
  defaultPlaylist: PlaylistType;
}) {
  const { user } = useUserStore();

  const [playlist, setPlaylist] = useState(defaultPlaylist);

  return (
    <div>
      <Link
        href={`/view/${playlist.videos[0]}`}
        className="group flex flex-col"
      >
        <div className="aspect-video w-full overflow-hidden rounded-lg">
          <img
            src={playlist.thumbnail}
            alt={"thumbnail of" + playlist.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="mt-2 px-1">
          <div className="line-clamp-2 h-12 font-bold">{playlist.title}</div>
          <div className="text-sm opacity-60">{playlist.channelTitle}</div>
        </div>
      </Link>
      <div className="px-1 text-sm opacity-80">
        총 {playlist.videos.length}강 | {playlist.duration} |{" "}
        <span
          className="tooltip"
          data-tip={format(new Date(playlist.publishedAt), "yyyy-MM-dd")}
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
            setPlaylist({
              ...playlist,
              isPicked: !playlist.isPicked,
            });
            await fetch(`/api/playlist/${playlist.id}/pick`, {
              method: "POST",
            });
          }}
          disabled={!user}
        >
          {playlist.isPicked ? "Unpick" : "Pick"}
        </button>
      )}
    </div>
  );
}
