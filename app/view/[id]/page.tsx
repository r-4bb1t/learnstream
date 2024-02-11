import Sidebar from "./sidebar";
import VideoInfo from "./info";
import { VideoType } from "@/app/type/playlist";
import { CACHE_REVALIDATE } from "@/constant/cache";
import { cookies } from "next/headers";

const fetchVideo = async (id: string) => {
  const userId = cookies().get("learnstream-user")?.value;
  const response = await fetch(`${process.env.APP_URL}/api/video/${id}`, {
    credentials: "include",
    next: { revalidate: CACHE_REVALIDATE.video },
    headers: { cookie: `learnstream-user=${userId}` },
  });
  const video: VideoType = await response.json();
  if (!video) throw new Error("Video not found");
  return video;
};

export default async function VideoView({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const video = await fetchVideo(id);

  return (
    <div className="flex h-[100dvh] w-full flex-col lg:flex-row">
      <div className="w-full shrink-0 pt-16 lg:shrink lg:overflow-auto">
        <iframe
          className="aspect-video w-full"
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <VideoInfo video={video} />
      </div>
      <Sidebar video={video} />
    </div>
  );
}
