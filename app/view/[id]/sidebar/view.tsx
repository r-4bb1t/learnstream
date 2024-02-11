"use client";

import { useCallback, useEffect, useState } from "react";
import Playlist from "./playlist";
import Editor from "@/app/view/[id]/sidebar/editor";
import cc from "classcat";

import { FiList, FiEdit3 } from "react-icons/fi";
import { RiPlayList2Fill } from "react-icons/ri";
import Share from "./shared";
import { PlaylistType, VideoType } from "@/app/type/playlist";
import { NoteType, SharedNoteType } from "@/app/type/note";
import { CACHE_REVALIDATE } from "@/constant/cache";
import { format, formatDistanceToNowStrict } from "date-fns";
import { ko } from "date-fns/locale";
import { useUserStore } from "@/app/store/user-store";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";

const TABS = [
  { name: "playlist", icon: RiPlayList2Fill },
  { name: "note", icon: FiEdit3 },
  { name: "shared", icon: FiList },
];

export default function SidebarView({
  video,
  defaultPlaylist,
}: {
  video: VideoType;
  defaultPlaylist: PlaylistType & { videos: VideoType[] };
}) {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const [isSharedListLoading, setIsSharedListLoading] = useState(true);
  const [isNoteLoading, setIsNoteLoading] = useState(true);

  const [note, setNote] = useState<NoteType | null>(null);
  const [sharedList, setSharedList] = useState<SharedNoteType[]>([]);
  const [playlist, setPlaylist] = useState(defaultPlaylist);

  const { user } = useUserStore();

  const fetchNote = async (video: VideoType) => {
    if (!video.noteId) {
      setNote(null);
      setIsNoteLoading(false);
      return;
    }
    setIsNoteLoading(true);
    try {
      const res = await fetch(`/api/note/${video.noteId}`);
      if (!res.ok) throw new Error("Failed to fetch note");
      const note = await res.json();
      setNote(note);
    } catch (e) {
      setNote(null);
    }
    setIsNoteLoading(false);
  };

  const fetchSharedList = async (video: VideoType) => {
    setIsSharedListLoading(true);
    const res = await fetch(`/api/video/${video.id}/sharednotes`, {
      next: {
        revalidate: CACHE_REVALIDATE.sharedNotesOfVideo,
      },
    });
    const data = await res.json();
    setSharedList(data.sharedNotes);
    setIsSharedListLoading(false);
  };

  const fetchSidebar = useCallback(async () => {
    await Promise.all([fetchNote(video), fetchSharedList(video)]);
  }, [video]);

  useEffect(() => {
    fetchSidebar();
  }, [fetchSidebar]);

  useEffect(() => {
    fetchNote(video);
  }, [video, activeTab]);

  const handleToggle = useCallback(async () => {
    setPlaylist({
      ...playlist,
      isPicked: !playlist.isPicked,
    });
    await fetch(`/api/playlist/${playlist.id}/pick`, {
      method: "POST",
    });
  }, [playlist]);

  const Loading = () => (
    <div className="absolute inset-0 z-[5] flex items-center justify-center bg-base-100/50">
      <div className="loading loading-spinner text-primary" />
    </div>
  );

  return (
    <div className="relative flex min-h-0 shrink flex-col lg:h-[100dvh] lg:w-[400px] lg:shrink-0 lg:pt-16">
      <div className="flex w-full items-center gap-4 px-4 py-4">
        <div>
          <button
            className="tooltip tooltip-right text-sm font-semibold text-primary disabled:text-neutral"
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
              <IoBookmark size={32} />
            ) : (
              <IoBookmarkOutline size={32} />
            )}
            {playlist.pickedUser?.length}
          </button>
        </div>
        <div>
          <div className="text-sm opacity-80">
            {playlist.channelTitle} · 총 {playlist.videos.length}강 ·{" "}
            {playlist.duration} ·{" "}
            <span
              className="tooltip tooltip-bottom"
              data-tip={format(new Date(playlist.publishedAt), "yyyy-MM-dd")}
            >
              {formatDistanceToNowStrict(new Date(playlist.publishedAt), {
                locale: ko,
                addSuffix: true,
              })}
            </span>
          </div>
          <div className="font-semibold">{playlist.title}</div>
        </div>
      </div>
      <div
        role="tablist"
        className="tabs tabs-bordered sticky top-0 z-10 w-full md:tabs-lg lg:tabs-md"
      >
        {TABS.map((tab) => (
          <button
            key={tab.name}
            role="tab"
            className={cc([
              "tab-lifted tab relative z-10 capitalize",
              activeTab === tab ? "tab-active" : "",
            ])}
            onClick={() => setActiveTab(tab)}
          >
            <tab.icon className="mr-1 text-primary" />
            {tab.name}
            {tab.name === "shared" && video.sharedCnt > 0 && (
              <sup className="text-xs font-bold text-primary">
                {video.sharedCnt}
              </sup>
            )}
          </button>
        ))}
      </div>
      <div className="h-full overflow-y-auto">
        {activeTab.name === "playlist" && (
          <Playlist playlist={playlist} nowPlaying={video!.id} />
        )}
        {activeTab.name === "note" &&
          (isNoteLoading ? (
            <Loading />
          ) : (
            <Editor video={video!.id} defaultNote={note} />
          ))}
        {activeTab.name === "shared" &&
          (isSharedListLoading ? (
            <Loading />
          ) : (
            <Share sharedList={sharedList} />
          ))}
      </div>
    </div>
  );
}
