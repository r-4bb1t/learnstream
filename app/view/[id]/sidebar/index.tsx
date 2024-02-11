"use client";

import { useState } from "react";
import Playlist from "./playlist";
import Editor from "@/app/components/editor";
import cc from "classcat";

import { FiList, FiEdit3 } from "react-icons/fi";
import { RiPlayList2Fill } from "react-icons/ri";
import Share from "./share";

const TABS = [
  { name: "playlist", icon: RiPlayList2Fill },
  { name: "note", icon: FiEdit3 },
  { name: "share", icon: FiList },
];

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  return (
    <div className="relative flex h-screen w-[460px] flex-col overflow-auto pt-16">
      <div
        role="tablist"
        className="tabs tabs-bordered sticky top-0 z-10 bg-base-100"
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
            <tab.icon className="mr-1" />
            {tab.name}
          </button>
        ))}
      </div>
      {activeTab.name === "playlist" && <Playlist />}
      {activeTab.name === "note" && (
        <div className="h-full py-2">
          <Editor />
        </div>
      )}
      {activeTab.name === "share" && <Share />}
    </div>
  );
}
