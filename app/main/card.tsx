import Link from "next/link";
import { format, formatDistanceToNowStrict } from "date-fns";
import { ko } from "date-fns/locale";
import { PlaylistType } from "../type/playlist";
import { useUserStore } from "../store/user-store";
import { useCallback, useState } from "react";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { FaCaretSquareRight } from "react-icons/fa";

export default function MainCard({
  defaultPlaylist,
}: {
  defaultPlaylist: PlaylistType;
}) {
  const { user } = useUserStore();

  const [playlist, setPlaylist] = useState(defaultPlaylist);

  const handleToggle = useCallback(async () => {
    setPlaylist({
      ...playlist,
      isPicked: !playlist.isPicked,
    });
    await fetch(`/api/playlist/${playlist.id}/pick`, {
      method: "POST",
    });
  }, [playlist]);

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
      <div className="relative px-1 text-sm opacity-80">
        총 {playlist.videos.length}강 · {playlist.duration} ·{" "}
        <span
          className="tooltip"
          data-tip={format(new Date(playlist.publishedAt), "yyyy-MM-dd")}
        >
          {formatDistanceToNowStrict(new Date(playlist.publishedAt), {
            locale: ko,
            addSuffix: true,
          })}
        </span>
        <div className="relative mt-1 flex h-8 gap-2 overflow-clip opacity-80 hover:flex-wrap hover:overflow-visible [&:hover>svg]:hidden">
          {playlist.tags.map((tag) => (
            <div
              key={tag}
              className="h-fit whitespace-nowrap rounded-md border border-primary bg-base-100 px-1 py-0.5 text-xs capitalize text-primary"
            >
              {tag}
            </div>
          ))}
        </div>
        <button
          className="tooltip tooltip-left absolute bottom-9 right-1 text-sm font-semibold text-primary disabled:text-neutral"
          data-tip={
            user
              ? playlist.isPicked
                ? "Unpick"
                : "Pick"
              : "Sign in to pick this playlist"
          }
          onClick={async (e) => {
            handleToggle();
          }}
          disabled={!user}
        >
          {playlist.isPicked ? (
            <IoBookmark size={24} />
          ) : (
            <IoBookmarkOutline size={24} />
          )}
          {playlist.pickedUser?.length}
        </button>
      </div>
    </div>
  );
}
