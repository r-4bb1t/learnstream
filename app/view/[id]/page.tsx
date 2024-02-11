import Sidebar from "./sidebar";
import VideoInfo from "./info";
import { VideoType } from "@/app/type/playlist";
import { CACHE_REVALIDATE } from "@/constant/cache";

const fetchVideo = async (id: string) => {
  const response = await fetch(`${process.env.APP_URL}/api/video/${id}`, {
    next: { revalidate: CACHE_REVALIDATE.video },
  });
  const video: VideoType = await response.json();

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
    <div className="flex h-screen w-full flex-col justify-between md:flex-row">
      <div className="w-full overflow-auto pt-16">
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
