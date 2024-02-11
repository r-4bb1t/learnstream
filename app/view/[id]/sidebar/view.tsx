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

const TABS = [
  { name: "playlist", icon: RiPlayList2Fill },
  { name: "note", icon: FiEdit3 },
  { name: "shared", icon: FiList },
];

export default function SidebarView({
  video,
  playlist,
}: {
  video: VideoType;
  playlist: PlaylistType & { videos: VideoType[] };
}) {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const [isSharedListLoading, setIsSharedListLoading] = useState(true);
  const [isNoteLoading, setIsNoteLoading] = useState(true);

  const [note, setNote] = useState<NoteType | null>(null);
  const [sharedList, setSharedList] = useState<SharedNoteType[]>([]);

  const fetchNote = async (video: VideoType) => {
    if (!video.noteId) {
      setNote(null);
      setIsNoteLoading(false);
      return;
    }
    setIsNoteLoading(true);
    const res = await fetch(`/api/note/${video.noteId}`);
    const note = await res.json();
    setNote(note);
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

  const Loading = () => (
    <div className="absolute inset-0 z-[5] flex items-center justify-center bg-base-100/50">
      <div className="loading loading-spinner text-primary" />
    </div>
  );

  return (
    <div className="relative flex min-h-0 shrink flex-col lg:h-screen lg:w-[400px] lg:shrink-0 lg:pt-16">
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
