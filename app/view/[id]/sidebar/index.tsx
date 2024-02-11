"use client";

import { useCallback, useEffect, useState } from "react";
import Playlist from "./playlist";
import Editor from "@/app/components/editor";
import cc from "classcat";

import { FiList, FiEdit3 } from "react-icons/fi";
import { RiPlayList2Fill } from "react-icons/ri";
import Share from "./share";
import { VideoType } from "@/app/type/playlist";

const TABS = [
  { name: "playlist", icon: RiPlayList2Fill },
  { name: "note", icon: FiEdit3 },
  { name: "share", icon: FiList },
];

export default function Sidebar({ video }: { video: VideoType | undefined }) {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="relative flex h-full w-[460px] max-w-full flex-col md:h-screen md:pt-16">
      <div
        role="tablist"
        className="tabs tabs-bordered sticky top-0 z-10 shrink-0 bg-base-100"
      >
        {TABS.map((tab) => (
          <button
            key={tab.name}
            role="tab"
            className={cc([
              "tab-lifted tab capitalize",
              activeTab === tab ? "tab-active" : "",
            ])}
            onClick={() => setActiveTab(tab)}
          >
            <tab.icon className="mr-1 text-primary" />
            {tab.name}
          </button>
        ))}
      </div>
      <div className="h-full overflow-auto py-2">
        {video && activeTab.name === "playlist" && (
          <Playlist id={video.playlist} />
        )}
        {activeTab.name === "note" && <Editor />}
        {activeTab.name === "share" && <Share />}
      </div>
    </div>
  );
}
