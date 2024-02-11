"use client";

import { useState } from "react";
import cc from "classcat";
import Link from "next/link";

const CATEGORY = ["web", "mobile", "desktop", "game"];

export default function Main() {
  const [category, setCategory] = useState("web");
  return (
    <div className="flex h-full w-full flex-col items-center pt-16">
      <div className="flex w-full justify-center gap-2">
        {CATEGORY.map((c) => (
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

      <div className="mt-20 grid w-full max-w-5xl grid-cols-4">
        <Link href="/view/8kJwTrs6e-4" className="group flex flex-col">
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <img
              src="https://img.youtube.com/vi/8kJwTrs6e-4/0.jpg"
              alt="thumbnail"
              className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>
          <div className="px-1 py-2">
            <div className="font-bold">입문자를 위한 HTML 기초 강의</div>
            <div className="text-sm opacity-80">유노코딩 | 총 17강</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
