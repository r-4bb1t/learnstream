"use client";

import { useCallback, useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { VideoType } from "@/app/type/playlist";

export default function VideoView({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const [video, setVideo] = useState<VideoType>();

  const fetchVideo = useCallback(async () => {
    const response = await fetch(`/api/video/${id}`);
    const data = await response.json();
    setVideo(data);
  }, [id]);

  useEffect(() => {
    fetchVideo();
  }, [fetchVideo]);

  return (
    <div className="flex h-screen w-full flex-col justify-between md:flex-row">
      <div className="w-full pt-16">
        <iframe
          className="aspect-video w-full"
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        {/* <div className="mt-4 px-6">
          <h1 className="text-2xl font-bold">title</h1>
        </div> */}
      </div>
      <Sidebar video={video} />
    </div>
  );
}
