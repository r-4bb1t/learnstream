"use client";

import { PLAYLIST } from "@/dummy";
import Link from "next/link";

export default function Playlist() {
  return (
    <ul className="flex flex-col gap-1 py-2">
      {PLAYLIST.items.map((item) => (
        <li key={item.id}>
          <Link
            href={`/view/${item.id}`}
            className="group flex items-center gap-1 px-2"
          >
            <div className="relative aspect-video w-24 shrink-0 overflow-hidden rounded-lg">
              <img
                src={`https://img.youtube.com/vi/${item.snippet.resourceId.videoId}/0.jpg`}
                alt="thumbnail"
                className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
              {/* <div className="absolute inset-x-0 bottom-0 h-1/2 bg-primary/50" /> */}
            </div>
            <div className="px-1 py-2">
              <div className="text-sm font-bold">{item.snippet.title}</div>
              <div className="text-xs opacity-80">10:03</div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
